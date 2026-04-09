import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  optionalString,
  requireInteger,
  requireNumber,
  requireString,
} from '@/lib/api-utils'

export async function PATCH(
  request: Request,
  props: { params: { id: string } }
) {
  try {
    const json = await request.json()
    const id = props.params.id
    console.log('[PATCH] Route Param ID:', id)

    if (!id || id === 'undefined' || id === 'null') {
      throw new ApiError('ID manquant ou invalide.', 400)
    }

    const part = await prisma.part.update({
      where: { id },
      data: {
        name: json.name !== undefined ? requireString(json.name, 'Désignation') : undefined,
        sku: json.sku !== undefined ? requireString(json.sku, 'SKU') : undefined,
        costPrice: json.costPrice !== undefined ? requireNumber(json.costPrice, "Prix achat") : undefined,
        stock: json.stock !== undefined ? requireInteger(json.stock, "Stock") : undefined,
        minStock: json.minStock !== undefined ? requireInteger(json.minStock, "Seuil") : undefined,
        quality: json.quality !== undefined ? (optionalString(json.quality, 20) || 'ORIGINAL') : undefined,
        supplier: json.supplier !== undefined ? optionalString(json.supplier, 100) : undefined,
        supplierRef: json.supplierRef !== undefined ? optionalString(json.supplierRef, 100) : undefined,
        location: json.location !== undefined ? optionalString(json.location, 100) : undefined,
        description: json.description !== undefined ? optionalString(json.description, 500) : undefined,
        modelId: json.modelId !== undefined ? ( (typeof json.modelId === 'string' && json.modelId.trim()) ? json.modelId : null ) : undefined,
      },
    })

    return NextResponse.json(part)
  } catch (error) {
    return handleApiError(error, 'Impossible de modifier la pièce.')
  }
}

export async function DELETE(
  request: Request,
  props: { params: { id: string } }
) {
  try {
    const id = props.params.id
    console.log('[DELETE] Route Param ID:', id)
    
    if (!id || id === 'undefined' || id === 'null') {
      return NextResponse.json({ error: `ID de pièce invalide (${id}).` }, { status: 400 })
    }

    await prisma.part.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return handleApiError(error, 'Impossible de supprimer la pièce.')
  }
}
