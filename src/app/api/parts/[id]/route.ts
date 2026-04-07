import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  optionalString,
  requireId,
  requireInteger,
  requireNumber,
  requireString,
} from '@/lib/api-utils'

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const json = await request.json()

    const part = await prisma.part.update({
      where: { id: requireId(id, 'La pièce') },
      data: {
        name: requireString(json.name, 'La désignation', { maxLength: 120 }),
        sku: requireString(json.sku, 'La référence SKU', { maxLength: 60 }),
        costPrice: requireNumber(json.costPrice, "Le prix d'achat", { min: 0 }),
        stock: requireInteger(json.stock, 'Le stock', { min: 0 }),
        description: optionalString(json.description, 500),
      },
    })

    return NextResponse.json(part)
  } catch (error) {
    return handleApiError(error, 'Impossible de modifier la pièce.')
  }
}
