import prisma from './prisma'
import { generatePDF, DocumentData, InvoiceLine } from './pdf-generator'
import { generateFacturXXML } from './facturx-xml'
import { validateInvoiceForIssuance } from './invoice-validation'
import { PDFDocument, PDFName, PDFHexString, AFRelationship } from 'pdf-lib'
import { format } from 'date-fns'
import { randomBytes } from 'node:crypto'

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
    // On ne bloque la génération PDF que pour les factures EMISE.
    // Pour les brouillons et les devis, on autorise la génération même si incomplète.
    const validation = validateInvoiceForIssuance(data)
    if (!validation.isValid && type === 'invoice' && (docData as any).status === 'EMISE') {
      const errorMsg = validation.errors.map(e => e.message).join(' | ')
      console.error(`[DOC-SERVICE] Validation failed for ${type} ${id}: ${errorMsg}`)
      throw new Error(`Conformité non respectée pour émission : ${errorMsg}`)
    }

    // Generate the base PDF using jsPDF
    const basePdfBytes = await generatePDF(data)

    // If it's a quote, just return the base PDF
    if (type === 'quote') {
      return basePdfBytes
    }

    // For invoices, implement pure-JS Factur-X (Basic)
    try {
      console.log('[DOC-SERVICE] Implementing Factur-X (Pure JS)...')
      const xml = generateFacturXXML(data)
      const pdfDoc = await PDFDocument.load(basePdfBytes)
      
      const documentId = randomBytes(16).toString('hex')
      const id = PDFHexString.of(documentId)
      pdfDoc.context.trailerInfo.ID = pdfDoc.context.obj([id, id])

      // Metadata preparation
      const dateStr = format(data.date, 'yyyyMMdd')
      const title = `${settings?.name || 'Ma Boutique'}: Invoice ${data.number}`
      const subject = `Invoice ${data.number} dated ${dateStr} issued by ${settings?.name || 'Ma Boutique'}`
      const author = settings?.name || 'Ma Boutique'
      const creator = 'RepairFlow ERP (Factur-X EN 16931)'
      
      // Attach the XML
      const encoder = new TextEncoder()
      const xmlBytes = encoder.encode(xml)
      await pdfDoc.attach(xmlBytes, 'factur-x.xml', {
        afRelationship: AFRelationship.Data,
        mimeType: 'text/xml',
        creationDate: data.date,
        modificationDate: data.date,
        description: 'Factur-X XML file'
      })

      // Set PDF Metadata
      pdfDoc.setTitle(title)
      pdfDoc.setSubject(subject)
      pdfDoc.setAuthor(author)
      pdfDoc.setCreator(creator)
      pdfDoc.setProducer(creator)
      pdfDoc.setCreationDate(data.date)
      pdfDoc.setModificationDate(data.date)
      pdfDoc.setKeywords(['Invoice', 'Factur-X'])

      // Inject XMP Metadata for PDF/A-3 and Factur-X Compliance
      const formatXmpDate = (d: Date) => `${d.toISOString().split('.')[0]}Z`
      const xmpDate = formatXmpDate(data.date)
      
      const metadataXML = `
<?xpacket begin="" id="${documentId}"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about="" xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/">
      <pdfaid:part>3</pdfaid:part>
      <pdfaid:conformance>B</pdfaid:conformance>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <dc:creator><rdf:Seq><rdf:li>${author}</rdf:li></rdf:Seq></dc:creator>
      <dc:title><rdf:Alt><rdf:li xml:lang="x-default">${title}</rdf:li></rdf:Alt></dc:title>
      <dc:description><rdf:Alt><rdf:li xml:lang="x-default">${subject}</rdf:li></rdf:Alt></dc:description>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:pdf="http://ns.adobe.com/pdf/1.3/">
      <pdf:Producer>${creator}</pdf:Producer>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/">
      <xmp:CreatorTool>${creator}</xmp:CreatorTool>
      <xmp:CreateDate>${xmpDate}</xmp:CreateDate>
      <xmp:ModifyDate>${xmpDate}</xmp:ModifyDate>
      <xmp:MetadataDate>${xmpDate}</xmp:MetadataDate>
    </rdf:Description>
    <rdf:Description xmlns:pdfaExtension="http://www.aiim.org/pdfa/ns/extension/" xmlns:pdfaSchema="http://www.aiim.org/pdfa/ns/schema#" xmlns:pdfaProperty="http://www.aiim.org/pdfa/ns/property#" rdf:about="">
      <pdfaExtension:schemas>
        <rdf:Bag>
          <rdf:li rdf:parseType="Resource">
            <pdfaSchema:schema>Factur-X PDFA Extension Schema</pdfaSchema:schema>
            <pdfaSchema:namespaceURI>urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#</pdfaSchema:namespaceURI>
            <pdfaSchema:prefix>fx</pdfaSchema:prefix>
            <pdfaSchema:property>
              <rdf:Seq>
                <rdf:li rdf:parseType="Resource">
                  <pdfaProperty:name>DocumentFileName</pdfaProperty:name>
                  <pdfaProperty:valueType>Text</pdfaProperty:valueType>
                  <pdfaProperty:category>external</pdfaProperty:category>
                  <pdfaProperty:description>name of the embedded XML invoice file</pdfaProperty:description>
                </rdf:li>
                <rdf:li rdf:parseType="Resource">
                  <pdfaProperty:name>DocumentType</pdfaProperty:name>
                  <pdfaProperty:valueType>Text</pdfaProperty:valueType>
                  <pdfaProperty:category>external</pdfaProperty:category>
                  <pdfaProperty:description>INVOICE</pdfaProperty:description>
                </rdf:li>
                <rdf:li rdf:parseType="Resource">
                  <pdfaProperty:name>Version</pdfaProperty:name>
                  <pdfaProperty:valueType>Text</pdfaProperty:valueType>
                  <pdfaProperty:category>external</pdfaProperty:category>
                  <pdfaProperty:description>The actual version of the Factur-X XML schema</pdfaProperty:description>
                </rdf:li>
                <rdf:li rdf:parseType="Resource">
                  <pdfaProperty:name>ConformanceLevel</pdfaProperty:name>
                  <pdfaProperty:valueType>Text</pdfaProperty:valueType>
                  <pdfaProperty:category>external</pdfaProperty:category>
                  <pdfaProperty:description>The conformance level of the embedded Factur-X data</pdfaProperty:description>
                </rdf:li>
              </rdf:Seq>
            </pdfaSchema:property>
          </rdf:li>
        </rdf:Bag>
      </pdfaExtension:schemas>
    </rdf:Description>
    <rdf:Description xmlns:fx="urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#" rdf:about="">
      <fx:DocumentType>INVOICE</fx:DocumentType>
      <fx:DocumentFileName>factur-x.xml</fx:DocumentFileName>
      <fx:Version>1.0</fx:Version>
      <fx:ConformanceLevel>EN 16931</fx:ConformanceLevel>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`.trim()

      const metadataStream = pdfDoc.context.stream(metadataXML, {
        Type: 'Metadata',
        Subtype: 'XML',
        Length: metadataXML.length
      })
      const metadataStreamRef = pdfDoc.context.register(metadataStream)
      pdfDoc.catalog.set(PDFName.of('Metadata'), metadataStreamRef)

      const finalPdfBytes = await pdfDoc.save()
      console.log('[DOC-SERVICE] Factur-X generated successfully (Pure JS)')
      return finalPdfBytes
    } catch (err) {
      console.error('[DOC-SERVICE] Factur-X failed (Pure JS), returning base PDF:', err)
      return basePdfBytes
    }
  } catch (err) {
    console.error('[DOC-SERVICE] Global PDF error:', err)
    throw err
  }
}
