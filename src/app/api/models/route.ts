import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  optionalString,
  requireId,
  requireString,
} from '@/lib/api-utils'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const brandId = searchParams.get('brandId')
    const typeId = searchParams.get('typeId')

    const where: any = {}
    if (brandId) where.brandId = brandId
    if (typeId) where.typeId = typeId

    const models = await prisma.deviceModel.findMany({
      where,
      include: {
        brand: true,
        type: true,
        _count: {
          select: { services: true, parts: true },
        },
      },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(models)
  } catch (error) {
    return handleApiError(error, 'Impossible de charger les modèles.')
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    const model = await prisma.deviceModel.create({
      data: {
        name: requireString(json.name, 'Le nom du modèle', { maxLength: 100 }),
        modelReference: optionalString(json.modelReference, 50),
        brandId: requireId(json.brandId, 'La marque'),
        typeId: requireId(json.typeId, 'Le type'),
      },
      include: {
        brand: true,
        type: true,
      },
    })

    return NextResponse.json(model, { status: 201 })
  } catch (error) {
    return handleApiError(error, 'Impossible de créer le modèle.')
  }
}
