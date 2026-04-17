import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  requireString,
} from '@/lib/api-utils'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const json = await request.json()
    const { id } = await params

    if (!id || id === 'undefined') {
      return NextResponse.json({ error: 'ID manquant.' }, { status: 400 })
    }

    const type = await prisma.deviceType.update({
      where: { id },
      data: {
        name: json.name !== undefined ? requireString(json.name, 'Nom') : undefined,
      },
    })

    return NextResponse.json(type)
  } catch (error) {
    return handleApiError(error, 'Impossible de modifier la catégorie.')
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    if (!id || id === 'undefined') {
      return NextResponse.json({ error: 'ID manquant.' }, { status: 400 })
    }

    // Check if there are models using this type
    const modelsCount = await prisma.deviceModel.count({
      where: { typeId: id }
    })

    if (modelsCount > 0) {
      return NextResponse.json(
        { error: `Impossible de supprimer : ${modelsCount} modèle(s) utilisent cette catégorie.` },
        { status: 400 }
      )
    }

    await prisma.deviceType.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return handleApiError(error, 'Impossible de supprimer la catégorie.')
  }
}
