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
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const json = await request.json()

    const client = await prisma.client.update({
      where: { id: requireId(id, 'Le client') },
      data: {
        name: requireString(json.name, 'Le nom du client', { maxLength: 120 }),
        email: optionalString(json.email, 120),
        phone: requireString(json.phone, 'Le téléphone', { maxLength: 40 }),
      },
    })

    return NextResponse.json(client)
  } catch (error) {
    return handleApiError(error, 'Impossible de modifier le client.')
  }
}
