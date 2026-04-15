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
    
    const quote = await prisma.quote.update({
      where: { id: requireId(id, 'Le devis') },
      data: {
        status: json.status !== undefined ? requireString(json.status, 'Statut') : undefined,
        clientId: json.clientId ? requireId(json.clientId, 'Client') : undefined,
        repairId: json.repairId !== undefined ? optionalString(json.repairId) : undefined,
        items: json.items ? JSON.stringify(json.items) : undefined,
        totalHT: json.totalHT !== undefined ? requireNumber(json.totalHT, 'Total HT') : undefined,
        totalTTC: json.totalTTC !== undefined ? requireNumber(json.totalTTC, 'Total TTC') : undefined,
        notes: json.notes !== undefined ? optionalString(json.notes) : undefined,
        validUntil: json.validUntil ? new Date(json.validUntil) : undefined,
      },
      include: {
        client: true,
      }
    })
    
    return NextResponse.json(quote)
  } catch (error) {
    return handleApiError(error, 'Impossible de modifier le devis.')
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    await prisma.quote.delete({
      where: { id: requireId(id, 'Le devis') },
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return handleApiError(error, 'Impossible de supprimer le devis.')
  }
}
