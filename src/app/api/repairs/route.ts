import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  ApiError,
  handleApiError,
  optionalString,
  requireId,
} from '@/lib/api-utils'

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

    // Determine initial part status based on stock if not provided
    let partStatus = json.partStatus || 'IN_STOCK'
    const hasOutOfStockParts = services.some(s => s.part && s.part.stock < 1)
    
    if (hasOutOfStockParts && !json.partStatus) {
      partStatus = 'TO_ORDER'
    }

    const repair = await prisma.$transaction(async (tx) => {
      const newRepair = await tx.repair.create({
        data: {
          clientId,
          notes,
          status: 'PENDING',
          partStatus,
        },
      })

      for (const service of services) {
        const totalPrice = service.suggestedPrice || (service.laborCost + (service.part?.costPrice ?? 0))

        await tx.repairService.create({
          data: {
            repairId: newRepair.id,
            serviceId: service.id,
            priceAtTime: totalPrice,
            quantity: 1,
          },
        })

        if (service.partId && service.part && service.part.stock > 0) {
          await tx.part.update({
            where: { id: service.partId },
            data: { stock: { decrement: 1 } },
          })
        }
      }

      await tx.repairLog.create({
        data: {
          repairId: newRepair.id,
          status: 'PENDING',
          comment: 'Ticket créé à la réception atelier.',
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
