import prisma from './prisma'
import { generateDocumentPDF, DocumentData, InvoiceLine } from './pdf-generator'
import { validateInvoiceForIssuance } from './invoice-validation'

export async function getDocumentPDF(type: 'quote' | 'invoice', id: string): Promise<Uint8Array | null> {
  try {
    console.log(`[DOC-SERVICE] Starting PDF generation for ${type} ${id}`)
    const settings = await prisma.workshopSettings.findFirst()
    
    let docData: any
    if (type === 'quote') {
      docData = await prisma.quote.findUnique({
        where: { id },
        include: { client: true, repair: true }
      })
    } else {
      docData = await prisma.invoice.findUnique({
        where: { id },
        include: { client: true, repair: true, quote: true }
      })
    }

    if (!docData) {
      console.log('[DOC-SERVICE] Document not found')
      return null
    }

    const items: InvoiceLine[] = JSON.parse(docData.items || '[]')

    // Tax Details parsing
    let taxDetails = []
    try {
      taxDetails = docData.taxDetails ? JSON.parse(docData.taxDetails) : []
      if (taxDetails.length === 0) {
        taxDetails = [{
          rate: 20,
          baseHT: docData.totalHT || 0,
          vatAmount: (docData.totalTTC || 0) - (docData.totalHT || 0)
        }]
      }
    } catch (err) {
      taxDetails = [{
        rate: 20,
        baseHT: docData.totalHT || 0,
        vatAmount: (docData.totalTTC || 0) - (docData.totalHT || 0)
      }]
    }
    
    const data: DocumentData = {
      type,
      number: docData.number,
      date: new Date(docData.createdAt),
      client: {
        name: docData.client.name,
        clientType: docData.client.clientType,
        address: docData.client.address,
        zipCode: docData.client.zipCode,
        city: docData.client.city,
        phone: docData.client.phone,
        siret: docData.client.siret,
        vatNumber: docData.client.vatNumber
      },
      items,
      taxDetails,
      totalHT: docData.totalHT || 0,
      totalTTC: docData.totalTTC || 0,
      tva: (docData.totalTTC || 0) - (docData.totalHT || 0),
      notes: docData.notes,
      dueDate: (docData as any).dueDate ? new Date((docData as any).dueDate) : null,
      paymentMethod: (docData as any).paymentMethod,
      ticketRef: docData.repair?.number,
      quoteRef: docData.quote?.number,
      settings: settings as any
    }

    // Backend Validation
    const validation = validateInvoiceForIssuance(data)
    if (!validation.isValid && type === 'invoice' && (docData as any).status === 'EMISE') {
      const errorMsg = validation.errors.map(e => e.message).join(' | ')
      console.error(`[DOC-SERVICE] Validation failed for ${type} ${id}: ${errorMsg}`)
      throw new Error(`Conformité non respectée pour émission : ${errorMsg}`)
    }

    // Generate the PDF (includes Factur-X if type is invoice)
    return await generateDocumentPDF(data)
  } catch (err) {
    console.error('[DOC-SERVICE] Global PDF error:', err)
    throw err
  }
}
