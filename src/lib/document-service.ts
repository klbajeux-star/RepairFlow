import prisma from './prisma'
import { generatePDF, DocumentData, InvoiceLine } from './pdf-generator'
import { generateFacturXXML } from './facturx-xml'
// import { generate as generateFacturx } from '@stafyniaksacha/facturx'

export async function getDocumentPDF(type: 'quote' | 'invoice', id: string): Promise<Uint8Array | null> {
  console.log(`[DOC-SERVICE] Generating PDF for ${type} ${id}`)
  const settings = await prisma.workshopSettings.findFirst()
  console.log('[DOC-SERVICE] Settings found:', !!settings)
  
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
    console.log('[DOC-SERVICE] Document not found in DB')
    return null
  }
  console.log('[DOC-SERVICE] Document data found:', docData.number)

  const items: InvoiceLine[] = JSON.parse(docData.items || '[]')
  console.log('[DOC-SERVICE] Items parsed:', items.length)
  
  const data: DocumentData = {
    type,
    number: docData.number,
    date: new Date(docData.createdAt),
    client: {
      name: docData.client.name,
      address: docData.client.address,
      zipCode: docData.client.zipCode,
      city: docData.client.city,
      phone: docData.client.phone
    },
    items,
    totalHT: docData.totalHT,
    totalTTC: docData.totalTTC,
    tva: docData.totalTTC - docData.totalHT,
    notes: docData.notes,
    ticketRef: docData.repair?.number,
    quoteRef: docData.quote?.number,
    settings: settings as any
  }

  // Generate the regular PDF
  console.log('[DOC-SERVICE] Calling generatePDF...')
  const pdfBytes = await generatePDF(data)
  console.log('[DOC-SERVICE] generatePDF success, bytes:', pdfBytes.length)

  // If it's an invoice, generate Factur-X
  if (type === 'invoice') {
    console.log('[DOC-SERVICE] Generating Factur-X for invoice...')
    try {
      const xml = generateFacturXXML(data)
      console.log('[DOC-SERVICE] XML generated, importing facturx...')
      const { generate: generateFacturx } = await import('@stafyniaksacha/facturx')
      console.log('[DOC-SERVICE] facturx imported, generating...')
      const facturxPdf = await generateFacturx({
        pdf: Buffer.from(pdfBytes),
        xml: xml,
        flavor: 'facturx',
        level: 'basic'
      })
      console.log('[DOC-SERVICE] Factur-X PDF success')
      return facturxPdf
    } catch (err) {
      console.error('[DOC-SERVICE] Factur-X Generation Error:', err)
      // Fallback to regular PDF if Factur-X fails
      return pdfBytes
    }
  }

  return pdfBytes
}
