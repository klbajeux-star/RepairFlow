import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { handleApiError } from '@/lib/api-utils'

export async function GET() {
  try {
    const repairsWithToOrder = await prisma.repair.findMany({
      where: {
        services: {
          some: { partStatus: 'TO_ORDER' }
        },
        status: { notIn: ['CANCELLED', 'ARCHIVED'] }
      },
      include: {
        client: true,
        services: {
          include: {
            service: {
              include: { part: true }
            }
          }
        }
      }
    })

    const orderItems: Record<string, any> = {}

    repairsWithToOrder.forEach(repair => {
      repair.services.forEach(rs => {
        const part = rs.service.part
        if (part && rs.partStatus === 'TO_ORDER') {
          if (!orderItems[part.id]) {
            orderItems[part.id] = {
              id: part.id,
              name: part.name,
              sku: part.sku,
              supplier: part.supplier || 'Générique',
              supplierRef: part.supplierRef,
              quantity: 0,
              tickets: []
            }
          }
          orderItems[part.id].quantity += 1
          orderItems[part.id].tickets.push({
            id: repair.id,
            client: repair.client.name,
            createdAt: repair.createdAt
          })
        }
      })
    })

    return NextResponse.json(Object.values(orderItems))
  } catch (error) {
    return handleApiError(error, 'Impossible de générer la liste de commande.')
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const { repairIds } = json

    if (!Array.isArray(repairIds) || repairIds.length === 0) {
      return NextResponse.json({ message: 'Aucun ticket sélectionné.' }, { status: 400 })
    }

    await prisma.$transaction(async (tx) => {
      // On met à jour le statut des pièces sur les lignes concernées
      await tx.repairService.updateMany({
        where: { 
          repairId: { in: repairIds },
          partStatus: 'TO_ORDER'
        },
        data: { partStatus: 'ORDERED' }
      })

      for (const id of repairIds) {
        await tx.repairLog.create({
          data: {
            repairId: id,
            status: 'PENDING',
            comment: 'Pièces commandées auprès du fournisseur (Flux J+1).'
          }
        })
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error, 'Impossible de valider la commande.')
  }
}
