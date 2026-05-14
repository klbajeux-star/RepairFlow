import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  ApiError,
  handleApiError,
  optionalString,
  requireId,
} from '@/lib/api-utils'

import { reservePartForRepair } from '@/lib/inventory-reservation'
import { getCurrentUserId } from '@/lib/session'

export async function GET() {
  try {
    const repairs = await prisma.repair.findMany({
      include: {
        client: true,
        logs: {
          orderBy: { createdAt: 'desc' },
        },
        services: {
          include: {
            service: {
              include: { part: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(repairs)
  } catch (error) {
    return handleApiError(error, 'Impossible de charger les réparations.')
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getCurrentUserId()
    const json = await request.json()

    const clientId = requireId(json.clientId, 'Le client')
    const notes = optionalString(json.notes, 2000)

    if (!Array.isArray(json.serviceIds) || json.serviceIds.length === 0) {
      throw new ApiError('Sélectionnez au moins un forfait.')
    }

    const serviceIds: string[] = Array.from(new Set(json.serviceIds.map((value: unknown) => requireId(value, 'Le forfait'))))

    const services = await prisma.service.findMany({
      where: { id: { in: serviceIds } },
      include: { part: true },
    }) as any[]

    if (services.length !== serviceIds.length) {
      throw new ApiError('Au moins un forfait sélectionné est introuvable.')
    }

    const repair = await prisma.$transaction(async (tx) => {
      const newRepair = await tx.repair.create({
        data: {
          clientId,
          notes,
          status: 'PENDING',
          createdById: userId,
          updatedById: userId,
        },
      })

      for (const service of services) {
        const totalPrice = service.finalPriceTTC ?? (service.laborCost + (service.part?.costPrice ?? 0))

        
        // Determine individual part status
        let linePartStatus = 'IN_STOCK'
        if (service.part && service.part.stock < 1) {
          linePartStatus = 'TO_ORDER'
        }

        await tx.repairService.create({
          data: {
            repairId: newRepair.id,
            serviceId: service.id,
            priceAtTime: totalPrice,
            vatRate: (service as any).vatRate ?? 20,
            quantity: 1,
            partStatus: linePartStatus,
          },
        })

        if (service.partId && service.part) {
          // Réservation virtuelle immédiate
          await reservePartForRepair(tx, service.partId, 1)
        }
      }

      await tx.repairLog.create({
        data: {
          repairId: newRepair.id,
          status: 'PENDING',
          comment: 'Ticket créé à la réception atelier.',
          userId,
        },
      })

      return tx.repair.findUniqueOrThrow({
        where: { id: newRepair.id },
        include: {
          client: true,
          logs: {
            orderBy: { createdAt: 'desc' },
          },
          services: {
            include: {
              service: {
                include: { part: true },
              },
            },
          },
        },
      })
    })

    return NextResponse.json(repair, { status: 201 })
  } catch (error) {
    return handleApiError(error, 'Impossible de créer le ticket.')
  }
}
