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
    const products = await prisma.shopProduct.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(products)
  } catch (error) {
    return handleApiError(error, 'Impossible de charger la boutique.')
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const product = await prisma.shopProduct.create({
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
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return handleApiError(error, 'Impossible de créer le produit.')
  }
}
