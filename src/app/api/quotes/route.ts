import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  optionalString,
  requireId,
  requireNumber,
  requireString,
} from '@/lib/api-utils'

async function getNextDocSequence() {
  const year = new Date().getFullYear()
  
  // Trouver le dernier numéro dans les deux tables
  const [lastQuote, lastInvoice] = await Promise.all([
    prisma.quote.findFirst({
      where: { number: { contains: `-${year}-` } },
      orderBy: { number: 'desc' },
    }),
    prisma.invoice.findFirst({
      where: { number: { contains: `-${year}-` } },
      orderBy: { number: 'desc' },
    })
  ])

  let maxSeq = 0
  
  const parseSeq = (docNumber: string | undefined) => {
    if (!docNumber) return 0
    const parts = docNumber.split('-')
    const seq = parseInt(parts[parts.length - 1], 10)
    return isNaN(seq) ? 0 : seq
  }

  maxSeq = Math.max(parseSeq(lastQuote?.number), parseSeq(lastInvoice?.number))
  
  return maxSeq + 1
}

async function generateQuoteNumber() {
  const year = new Date().getFullYear()
  const sequence = await getNextDocSequence()
  return `DEV-${year}-${sequence.toString().padStart(4, '0')}`
}

export async function GET() {
  try {
    const quotes = await prisma.quote.findMany({
      include: {
        client: true,
        repair: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(quotes)
  } catch (error) {
    return handleApiError(error, 'Impossible de charger les devis.')
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

    const number = await generateQuoteNumber().catch(e => {
      console.error('[QUOTE NUMBER ERROR]', e)
      throw new Error('Erreur lors de la génération du numéro de devis.')
    })
    
    const quote = await prisma.quote.create({
      data: {
        number,
        status: optionalString(json.status) || 'BROUILLON',
        clientId: json.clientId,
        repairId: optionalString(json.repairId),
        items: JSON.stringify(json.items || []),
        totalHT: requireNumber(json.totalHT || 0, 'Total HT'),
        totalTTC: requireNumber(json.totalTTC || 0, 'Total TTC'),
        taxDetails: json.taxDetails ? JSON.stringify(json.taxDetails) : null,
        notes: optionalString(json.notes),
        validUntil: json.validUntil ? new Date(json.validUntil) : null,
        paymentMethod: optionalString(json.paymentMethod),
      },
      include: {
        client: true,
      }
    })
    
    return NextResponse.json(quote, { status: 201 })
  } catch (error) {
    console.error('[PRISMA ERROR IN POST]', error)
    return handleApiError(error, 'Impossible de créer le devis.')
  }
}
