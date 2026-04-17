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
    
    const invoice = await prisma.invoice.update({
      where: { id: requireId(id, 'La facture') },
      data: {
        paid: json.paid !== undefined ? !!json.paid : undefined,
        clientId: json.clientId ? requireId(json.clientId, 'Client') : undefined,
        repairId: json.repairId !== undefined ? optionalString(json.repairId) : undefined,
        items: json.items ? JSON.stringify(json.items) : undefined,
        totalHT: json.totalHT !== undefined ? requireNumber(json.totalHT, 'Total HT') : undefined,
        totalTTC: json.totalTTC !== undefined ? requireNumber(json.totalTTC, 'Total TTC') : undefined,
        taxDetails: json.taxDetails !== undefined ? JSON.stringify(json.taxDetails) : undefined,
        notes: json.notes !== undefined ? optionalString(json.notes) : undefined,
        dueDate: json.dueDate ? new Date(json.dueDate) : undefined,
        paymentMethod: json.paymentMethod !== undefined ? optionalString(json.paymentMethod) : undefined,
      },
      include: {
        client: true,
      }
    })
    
    return NextResponse.json(invoice)
  } catch (error) {
    return handleApiError(error, 'Impossible de modifier la facture.')
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    await prisma.invoice.delete({
      where: { id: requireId(id, 'La facture') },
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return handleApiError(error, 'Impossible de supprimer la facture.')
  }
}
