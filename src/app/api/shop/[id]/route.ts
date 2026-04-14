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
    const product = await prisma.shopProduct.update({
      where: { id: requireId(id, 'Le produit') },
      data: {
        name: requireString(json.name, 'Nom', { maxLength: 120 }),
        category: requireString(json.category, 'Catégorie', { maxLength: 60 }),
        sku: optionalString(json.sku, 60),
        barcode: optionalString(json.barcode, 60),
        purchasePrice: requireNumber(json.purchasePrice, "Prix d'achat HT", { min: 0 }),
        sellingPrice: requireNumber(json.sellingPrice, "Prix de vente TTC", { min: 0 }),
        stock: requireInteger(json.stock, 'Stock'),
        minStock: requireInteger(json.minStock, 'Seuil d’alerte'),
        supplier: optionalString(json.supplier, 100),
        description: optionalString(json.description, 500),
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    return handleApiError(error, 'Impossible de modifier le produit.')
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    await prisma.shopProduct.delete({
      where: { id: requireId(id, 'Le produit') },
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return handleApiError(error, 'Impossible de supprimer le produit.')
  }
}
