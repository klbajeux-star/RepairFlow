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

    if (!id || id === 'undefined' || id === 'null') {
      throw new ApiError('ID manquant ou invalide.', 400)
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        name: json.name !== undefined ? requireString(json.name, 'Nom') : undefined,
        laborCost: json.laborCost !== undefined ? requireNumber(json.laborCost, "Main d'oeuvre") : undefined,
        suggestedPrice: json.suggestedPrice !== undefined ? requireNumber(json.suggestedPrice, "Prix vente") : undefined,
        duration: json.duration !== undefined ? requireInteger(json.duration, "Durée") : undefined,
        partId: json.partId !== undefined ? ( (typeof json.partId === 'string' && json.partId.trim()) ? json.partId : null ) : undefined,
        modelId: json.modelId !== undefined ? ( (typeof json.modelId === 'string' && json.modelId.trim()) ? json.modelId : null ) : undefined,
        description: json.description !== undefined ? optionalString(json.description, 500) : undefined,
      },
    })

    return NextResponse.json(service)
  } catch (error) {
    return handleApiError(error, 'Impossible de modifier le service.')
  }
}

export async function DELETE(
  request: Request,
  props: { params: { id: string } }
) {
  try {
    const id = props.params.id
    
    if (!id || id === 'undefined' || id === 'null') {
      return NextResponse.json({ error: `ID de service invalide (${id}).` }, { status: 400 })
    }

    await prisma.service.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return handleApiError(error, 'Impossible de supprimer le service.')
  }
}
