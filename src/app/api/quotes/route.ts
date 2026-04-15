import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  optionalString,
  requireId,
  requireNumber,
  requireString,
} from '@/lib/api-utils'

async function generateQuoteNumber() {
  const year = new Date().getFullYear()
  const lastQuote = await prisma.quote.findFirst({
    where: { number: { startsWith: `DEV-${year}` } },
    orderBy: { createdAt: 'desc' },
  })

  let sequence = 1
  if (lastQuote) {
    const parts = lastQuote.number.split('-')
    const lastSeq = parseInt(parts[parts.length - 1], 10)
    if (!isNaN(lastSeq)) {
      sequence = lastSeq + 1
    }
  }

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
        notes: optionalString(json.notes),
        validUntil: json.validUntil ? new Date(json.validUntil) : null,
      },
      include: {
        client: true,
      }
    })
    
    return NextResponse.json(quote, { status: 201 })
  } catch (error) {
    return handleApiError(error, 'Impossible de créer le devis.')
  }
}
