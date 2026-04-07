import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  optionalString,
  requireId,
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

    const service = await prisma.service.update({
      where: { id: requireId(id, 'Le forfait') },
      data: {
        name: requireString(json.name, 'Le nom du forfait', { maxLength: 140 }),
        laborCost: requireNumber(json.laborCost, "La main d'oeuvre", { min: 0 }),
        partId:
          typeof json.partId === 'string' && json.partId.trim()
            ? json.partId
            : null,
        description: optionalString(json.description, 500),
      },
      include: { part: true },
    })

    return NextResponse.json(service)
  } catch (error) {
    return handleApiError(error, 'Impossible de modifier le forfait.')
  }
}
