import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  optionalString,
  requireId,
  requireString,
} from '@/lib/api-utils'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const json = await request.json()
    const { id } = await params

    if (!id || id === 'undefined' || id === 'null') {
      throw new ApiError('ID manquant ou invalide.', 400)
    }

    const model = await prisma.deviceModel.update({
      where: { id },
      data: {
        name: json.name !== undefined ? requireString(json.name, 'Nom') : undefined,
        modelReference: json.modelReference !== undefined ? optionalString(json.modelReference, 50) : undefined,
        brandId: json.brandId !== undefined ? requireId(json.brandId, 'Marque') : undefined,
        typeId: json.typeId !== undefined ? requireId(json.typeId, 'Type') : undefined,
      },
    })

    return NextResponse.json(model)
  } catch (error) {
    return handleApiError(error, 'Impossible de modifier le modèle.')
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!id || id === 'undefined' || id === 'null') {
      return NextResponse.json({ error: 'ID de modèle manquant.' }, { status: 400 })
    }

    const [servicesCount, partsCount] = await Promise.all([
      prisma.service.count({ where: { modelId: id } }),
      prisma.part.count({ where: { modelId: id } }),
    ])

    if (servicesCount > 0 || partsCount > 0) {
      return NextResponse.json(
        { error: 'Ce modèle est lié à des prestations ou des pièces en stock. Supprimez-les d’abord.' },
        { status: 409 }
      )
    }

    await prisma.deviceModel.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return handleApiError(error, 'Impossible de supprimer le modèle.')
  }
}
