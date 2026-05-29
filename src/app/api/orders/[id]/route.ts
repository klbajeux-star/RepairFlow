import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { handleApiError } from '@/lib/api-utils'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        lines: {
          include: {
            part: true,
            repair: { include: { client: true } }
          }
        }
      }
    })

    if (!order) {
      return NextResponse.json({ message: 'Commande non trouvée.' }, { status: 404 })
    }

    return NextResponse.json(order)
    } catch (error: any) {
      console.error('API Order Detail Error:', error)
      return NextResponse.json({ 
        message: 'Impossible de récupérer la commande.',
        details: error.message 
      }, { status: 500 })
    }

}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const json = await request.json()
    const { action, lineId, quantityReceived } = json

    if (action === 'RECEIVE_LINE') {
      return await receiveLine(id, lineId, quantityReceived)
    }

    if (action === 'CANCEL_ORDER') {
      const order = await prisma.$transaction(async (tx) => {
        // Mettre à jour les statuts des lignes
        await tx.orderLine.updateMany({
          where: { orderId: id },
          data: { status: 'ANNULÉE' }
        })
        
        // Mettre à jour le statut global
        return await tx.order.update({
          where: { id: id },
          data: { status: 'ANNULÉE' }
        })
      })
      return NextResponse.json(order)
    }

    if (action === 'UPDATE_STATUS') {
      const { status } = json
      const order = await prisma.order.update({
        where: { id: id },
        data: { status }
      })
      return NextResponse.json(order)
    }

    return NextResponse.json({ message: 'Action non reconnue.' }, { status: 400 })
  } catch (error) {
    return handleApiError(error, 'Impossible de mettre à jour la commande.')
  }
}

async function receiveLine(orderId: string, lineId: string, qty: number) {
  try {
    return await prisma.$transaction(async (tx) => {
      const line = await tx.orderLine.findUnique({
        where: { id: lineId },
        include: { part: true, order: true }
      })

      if (!line) throw new Error('Ligne de commande non trouvée.')

      const newQtyReceived = line.quantityReceived + qty
      const isFullyReceived = newQtyReceived >= line.quantityOrdered
      const status = isFullyReceived ? 'REÇUE' : 'PARTIELLEMENT_REÇUE'

      // 1. Mettre à jour la ligne de commande
      const updatedLine = await tx.orderLine.update({
        where: { id: lineId },
        data: {
          quantityReceived: newQtyReceived,
          status: status
        }
      })

      // 2. Augmenter le stock de la pièce
      await tx.part.update({
        where: { id: line.partId },
        data: {
          stock: { increment: qty }
        }
      })

      // 3. Si lié à un ticket, mettre à jour le statut de pièce en IN_STOCK
      if (line.repairId) {
        await tx.repairService.updateMany({
          where: {
            repairId: line.repairId,
            service: { partId: line.partId },
            partStatus: 'ORDERED'
          },
          data: { partStatus: 'IN_STOCK' }
        })
        
        await tx.repairLog.create({
          data: {
            repairId: line.repairId,
            status: 'IN_PROGRESS',
            comment: `Pièce ${line.part.name} reçue (Commande ${line.order.number}).`
          }
        })
      }

      // 4. Mettre à jour le statut global de la commande
      const allLines = await tx.orderLine.findMany({
        where: { orderId: orderId }
      })
      
      const totalOrdered = allLines.reduce((sum, l) => sum + l.quantityOrdered, 0)
      const totalReceived = allLines.reduce((sum, l) => sum + (l.id === lineId ? newQtyReceived : l.quantityReceived), 0)

      let orderStatus = 'PARTIELLEMENT_REÇUE'
      if (totalReceived >= totalOrdered) {
        orderStatus = 'RÉCEPTIONNÉE'
      } else if (totalReceived === 0) {
        orderStatus = 'COMMANDÉE'
      }

      await tx.order.update({
        where: { id: orderId },
        data: { status: orderStatus }
      })

      return NextResponse.json({ success: true, line: updatedLine, orderStatus })
    })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}
