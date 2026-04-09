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
    const parts = await prisma.part.findMany({
      include: {
        model: {
          include: { brand: true },
        },
        _count: {
          select: { services: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(
      parts.map((part) => ({
        ...part,
        linkedServicesCount: part._count.services,
      }))
    )
  } catch (error) {
    return handleApiError(error, 'Impossible de charger le stock.')
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    if (!json || typeof json !== 'object') {
      throw new ApiError('Données invalides.', 400)
    }

    const part = await prisma.part.create({
      data: {
        name: requireString(json.name, 'Désignation', { maxLength: 120 }),
        sku: requireString(json.sku, 'SKU', { maxLength: 60 }),
        costPrice: requireNumber(json.costPrice, "Prix d'achat", { min: 0 }),
        stock: requireInteger(json.stock, 'Stock'),
        minStock: requireInteger(json.minStock, 'Seuil d’alerte'),
        quality: optionalString(json.quality, 20) || 'ORIGINAL',
        supplier: optionalString(json.supplier, 100),
        supplierRef: optionalString(json.supplierRef, 100),
        location: optionalString(json.location, 100),
        description: optionalString(json.description, 500),
        modelId: (typeof json.modelId === 'string' && json.modelId.trim()) ? json.modelId : null,
      },
      include: {
        model: {
          include: { brand: true },
        },
      },
    })

    return NextResponse.json(part, { status: 201 })
  } catch (error) {
    return handleApiError(error, 'Impossible de créer la pièce.')
  }
}
