import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  optionalString,
  requireInteger,
  requireNumber,
  requireString,
} from '@/lib/api-utils'

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: {
        part: true,
        model: {
          include: { 
            brand: true,
            type: true
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(services)
  } catch (error) {
    return handleApiError(error, 'Impossible de charger les services.')
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    if (!json || typeof json !== 'object') {
      throw new ApiError('Données invalides.', 400)
    }

    const service = await prisma.service.create({
      data: {
        name: requireString(json.name, 'Nom du forfait', { maxLength: 140 }),
        laborCost: requireNumber(json.laborCost, "Main d'oeuvre", { min: 0 }),
        suggestedPrice: requireNumber(json.suggestedPrice, "Prix de vente TTC", { min: 0 }),
        duration: requireInteger(json.duration, 'Durée'),
        partId: (typeof json.partId === 'string' && json.partId.trim()) ? json.partId : null,
        modelId: (typeof json.modelId === 'string' && json.modelId.trim()) ? json.modelId : null,
        description: optionalString(json.description, 500),
      },
      include: {
        part: true,
        model: {
          include: { brand: true },
        },
      },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    return handleApiError(error, 'Impossible de créer le forfait.')
  }
}
