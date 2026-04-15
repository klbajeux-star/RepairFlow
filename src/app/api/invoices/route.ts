import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  optionalString,
  requireId,
  requireNumber,
  requireString,
} from '@/lib/api-utils'

async function generateInvoiceNumber() {
  const year = new Date().getFullYear()
  const last = await prisma.invoice.findFirst({
    where: { number: { startsWith: `FAC-${year}` } },
    orderBy: { createdAt: 'desc' },
  })
  let seq = 1
  if (last) {
    const lastSeq = parseInt(last.number.split('-').pop() || '0')
    if (!isNaN(lastSeq)) seq = lastSeq + 1
  }
  return `FAC-${year}-${seq.toString().padStart(4, '0')}`
}

export async function GET() {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        client: true,
        repair: true,
        quote: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(invoices)
  } catch (error) {
    return handleApiError(error, 'Impossible de charger les factures.')
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json().catch(() => null)
    if (!json) {
      return NextResponse.json({ error: 'Payload JSON invalide ou manquant.' }, { status: 400 })
    }

    if (!json.clientId) {
      return NextResponse.json({ error: 'Le client est obligatoire.' }, { status: 400 })
    }

    const number = await generateInvoiceNumber().catch(e => {
      console.error('[INVOICE NUMBER ERROR]', e)
      throw new Error('Erreur lors de la génération du numéro de facture.')
    })
    
    const quoteId = optionalString(json.quoteId)
    
    const invoice = await prisma.invoice.create({
      data: {
        number,
        clientId: json.clientId,
        repairId: optionalString(json.repairId),
        items: JSON.stringify(json.items || []),
        totalHT: requireNumber(json.totalHT || 0, 'Total HT'),
        totalTTC: requireNumber(json.totalTTC || 0, 'Total TTC'),
        notes: optionalString(json.notes),
        paid: !!json.paid,
      },
      include: {
        client: true,
      }
    })
    
    if (quoteId) {
      await prisma.quote.update({
        where: { id: quoteId },
        data: { status: 'CONVERTI', invoiceId: invoice.id }
      })
    }
    
    return NextResponse.json(invoice, { status: 201 })
  } catch (error) {
    return handleApiError(error, 'Impossible de créer la facture.')
  }
}
