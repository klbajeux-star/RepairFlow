import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { handleApiError } from '@/lib/api-utils'

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        _count: {
          select: { lines: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(orders)
  } catch (error) {
    return handleApiError(error, 'Impossible de récupérer les commandes.')
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const { supplier, items } = json // items: [{ partId, quantity, repairId, costPrice }]

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: 'Aucun article à commander.' }, { status: 400 })
    }

    // Générer un numéro de commande
    const date = new Date()
    const prefix = `CMD-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`
    
    // Compter les commandes du jour pour le suffixe
    const count = await prisma.order.count({
      where: {
        number: { startsWith: prefix }
      }
    })
    const orderNumber = `${prefix}-${(count + 1).toString().padStart(3, '0')}`

    const order = await prisma.$transaction(async (tx) => {
      // Calculer le total HT (optionnel car on pourra le recalculer)
      const totalHT = items.reduce((sum, item) => sum + (item.costPrice || 0) * (item.quantity || 1), 0)

      const newOrder = await tx.order.create({
        data: {
          number: orderNumber,
          supplier: supplier || 'Générique',
          status: 'COMMANDÉE',
          totalHT,
          lines: {
            create: items.map(item => ({
              partId: item.partId,
              quantityOrdered: item.quantity,
              costPrice: item.costPrice || 0,
              repairId: item.repairId,
              status: 'EN_COMMANDE'
            }))
          }
        },
        include: { 
          lines: {
            include: { part: true, repair: { include: { client: true } } }
          }
        }
      })

      // Mettre à jour les statuts de pièces dans les réparations si lié
      // On regroupe par ticket pour les logs
      const repairIds = [...new Set(items.filter(i => i.repairId).map(i => i.repairId))]
      
      for (const repairId of repairIds) {
        // Mettre à jour partStatus pour les lignes de ce ticket qui utilisent les pièces commandées
        const ticketParts = items.filter(i => i.repairId === repairId).map(i => i.partId)
        
        await tx.repairService.updateMany({
          where: {
            repairId: repairId as string,
            service: { partId: { in: ticketParts } },
            partStatus: { in: ['IN_STOCK', 'TO_ORDER'] } // On force à ORDERED même si c'était noté en stock mais qu'on commande quand même
          },
          data: { partStatus: 'ORDERED' }
        })

        // Ajouter un log
        await tx.repairLog.create({
          data: {
            repairId: repairId as string,
            status: 'PENDING',
            comment: `Pièces commandées via ${orderNumber}.`
          }
        })
      }

      return newOrder
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Order creation error:', error)
    return handleApiError(error, 'Impossible de créer la commande.')
  }
}
