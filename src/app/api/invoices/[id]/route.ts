import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  optionalString,
  requireId,
  requireNumber,
  requireString,
} from '@/lib/api-utils'
import { validateInvoiceForIssuance } from '@/lib/invoice-validation'
import { DocumentData } from '@/lib/pdf-generator'

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const json = await request.json()
    
    // 1. Récupérer l'état actuel
    const currentInvoice = await prisma.invoice.findUnique({
      where: { id: requireId(id, 'La facture') },
      include: { client: true }
    })

    if (!currentInvoice) {
      return NextResponse.json({ error: 'Facture non trouvée' }, { status: 404 })
    }

    // 2. Sécurité Back-end : Bloquer si déjà émise
    if (currentInvoice.status === 'EMISE') {
      const keys = Object.keys(json)
      const onlyPaid = keys.length === 1 && (keys[0] === 'paid' || keys[0] === 'status')
      // Note: On autorise 'status' si la valeur ne change pas ou si c'est pour confirmer EMISE
      if (!onlyPaid && keys.length > 0) {
        return NextResponse.json(
          { error: 'Cette facture est émise et verrouillée. Seul le paiement est modifiable.' },
          { status: 403 }
        )
      }
    }

    // 3. Validation de conformité lors du passage à EMISE
    if (json.status === 'EMISE' && currentInvoice.status !== 'EMISE') {
      const settings = await prisma.workshopSettings.findFirst()
      const validationData: DocumentData = {
        type: 'invoice',
        number: currentInvoice.number,
        date: new Date(),
        client: currentInvoice.client as any,
        items: json.items || JSON.parse(currentInvoice.items),
        totalHT: json.totalHT !== undefined ? json.totalHT : currentInvoice.totalHT,
        totalTTC: json.totalTTC !== undefined ? json.totalTTC : currentInvoice.totalTTC,
        tva: (json.totalTTC !== undefined ? json.totalTTC : currentInvoice.totalTTC) - (json.totalHT !== undefined ? json.totalHT : currentInvoice.totalHT),
        taxDetails: json.taxDetails || (currentInvoice.taxDetails ? JSON.parse(currentInvoice.taxDetails) : []),
        notes: json.notes !== undefined ? json.notes : currentInvoice.notes,
        dueDate: json.dueDate ? new Date(json.dueDate) : currentInvoice.dueDate,
        paymentMethod: json.paymentMethod !== undefined ? json.paymentMethod : currentInvoice.paymentMethod,
        settings: settings as any
      }

      const validation = validateInvoiceForIssuance(validationData)
      if (!validation.isValid) {
        return NextResponse.json({ 
          error: 'Conformité non respectée pour émission', 
          details: validation.errors.map(e => e.message) 
        }, { status: 400 })
      }
    }

    const invoice = await prisma.invoice.update({
      where: { id: currentInvoice.id },
      data: {
        status: json.status || undefined,
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
    
    const currentInvoice = await prisma.invoice.findUnique({
      where: { id: requireId(id, 'La facture') }
    })

    if (currentInvoice?.status === 'EMISE') {
      return NextResponse.json(
        { error: 'Impossible de supprimer une facture émise.' },
        { status: 403 }
      )
    }

    await prisma.invoice.delete({
      where: { id: id },
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return handleApiError(error, 'Impossible de supprimer la facture.')
  }
}
