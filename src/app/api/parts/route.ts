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

    const part = await prisma.part.create({
      data: {
        name: requireString(json.name, 'La désignation', { maxLength: 120 }),
        sku: requireString(json.sku, 'La référence SKU', { maxLength: 60 }),
        costPrice: requireNumber(json.costPrice, "Le prix d'achat", { min: 0 }),
        stock: requireInteger(json.stock, 'Le stock', { min: 0 }),
        description: optionalString(json.description, 500),
      },
    })

    return NextResponse.json(part, { status: 201 })
  } catch (error) {
    return handleApiError(error, 'Impossible de créer la pièce.')
  }
}
