import prisma from './prisma'
import { generatePDF, DocumentData, InvoiceLine } from './pdf-generator'
import { generateFacturXXML } from './facturx-xml'
import { generate as generateFacturx } from '@stafyniaksacha/facturx'

export async function getDocumentPDF(type: 'quote' | 'invoice', id: string): Promise<Uint8Array | null> {
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

  if (!docData) return null

  const items: InvoiceLine[] = JSON.parse(docData.items || '[]')
  
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
  const pdfBytes = await generatePDF(data)

  // If it's an invoice, generate Factur-X
  if (type === 'invoice') {
    try {
      const xml = generateFacturXXML(data)
      const facturxPdf = await generateFacturx({
        pdf: Buffer.from(pdfBytes),
        xml: xml,
        flavor: 'facturx',
        level: 'basic'
      })
      return facturxPdf
    } catch (err) {
      console.error('Factur-X Generation Error:', err)
      // Fallback to regular PDF if Factur-X fails
      return pdfBytes
    }
  }

  return pdfBytes
}
