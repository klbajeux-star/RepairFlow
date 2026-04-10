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

    const brand = await prisma.deviceBrand.update({
      where: { id },
      data: {
        name: json.name !== undefined ? requireString(json.name, 'Nom') : undefined,
      },
    })

    return NextResponse.json(brand)
  } catch (error) {
    return handleApiError(error, 'Impossible de modifier la marque.')
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

    await prisma.deviceBrand.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return handleApiError(error, 'Impossible de supprimer la marque.')
  }
}
