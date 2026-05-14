import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  ApiError,
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
        extraCosts: requireNumber(json.extraCosts || 0, "Frais annexes", { min: 0 }),
        finalPriceTTC: requireNumber(json.finalPriceTTC, "Prix final TTC", { min: 0 }),
        suggestedPriceTTC: requireNumber(json.suggestedPriceTTC || 0, "Prix suggéré TTC", { min: 0 }),
        pricingMode: json.pricingMode || 'MANUAL',
        vatRate: json.vatRate !== undefined ? requireNumber(json.vatRate, "Taux TVA") : 20,
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
