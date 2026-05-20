import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { handleApiError } from '@/lib/api-utils'
import { calculateMissingParts } from '@/lib/inventory'

export async function GET() {
  try {
    const repairs = await prisma.repair.findMany({
      where: {
        status: { in: ['PENDING', 'DIAGNOSIS', 'IN_PROGRESS'] }
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

    const missingParts = calculateMissingParts(repairs)

    // Adapter le format pour le OrderDrawer existant
    const orderItems = missingParts.map(mp => ({
      id: mp.partId,
      name: mp.name,
      sku: mp.sku,
      supplier: 'Générique', // On pourra affiner avec mp.supplier si on l'ajoute à MissingPart
      supplierRef: null,
      quantity: mp.quantityToOrder,
      tickets: mp.relatedRepairs.map(r => ({
        id: r.id,
        client: r.clientName,
        createdAt: new Date().toISOString() // Temporaire
      }))
    }))

    return NextResponse.json(orderItems)
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
