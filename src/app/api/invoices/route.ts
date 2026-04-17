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
  
  // Trouver le dernier numéro dans les deux tables pour éviter les collisions
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

  const parseSeq = (docNumber: string | undefined) => {
    if (!docNumber) return 0
    const parts = docNumber.split('-')
    const seq = parseInt(parts[parts.length - 1], 10)
    return isNaN(seq) ? 0 : seq
  }

  const maxSeq = Math.max(parseSeq(lastQuote?.number), parseSeq(lastInvoice?.number))
  return maxSeq + 1
}

async function generateInvoiceNumber() {
  const year = new Date().getFullYear()
  const seq = await getNextDocSequence()
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

    const quoteId = optionalString(json.quoteId)
    let number: string

    if (quoteId) {
      // Si on vient d'un devis, on reprend le numéro du devis en changeant le préfixe
      const quote = await prisma.quote.findUnique({
        where: { id: quoteId },
        select: { number: true }
      })
      if (!quote) throw new Error('Devis introuvable.')
      number = quote.number.replace('DEV-', 'FAC-')
      
      // Vérifier si ce numéro de facture existe déjà (cas rare de collision manuelle)
      const existing = await prisma.invoice.findUnique({ where: { number } })
      if (existing) {
        // Fallback sur une génération classique si collision (pour ne pas bloquer)
        number = await generateInvoiceNumber()
      }
    } else {
      number = await generateInvoiceNumber().catch(e => {
        console.error('[INVOICE NUMBER ERROR]', e)
        throw new Error('Erreur lors de la génération du numéro de facture.')
      })
    }

    const invoice = await prisma.invoice.create({
      data: {
        number,
        clientId: json.clientId,
        repairId: optionalString(json.repairId),
        items: JSON.stringify(json.items || []),
        totalHT: requireNumber(json.totalHT || 0, 'Total HT'),
        totalTTC: requireNumber(json.totalTTC || 0, 'Total TTC'),
        taxDetails: json.taxDetails ? JSON.stringify(json.taxDetails) : null,
        notes: optionalString(json.notes),
        paid: !!json.paid,
        dueDate: json.dueDate ? new Date(json.dueDate) : null,
        paymentMethod: optionalString(json.paymentMethod),
      },
      include: {
        client: true,
        quote: true,
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
