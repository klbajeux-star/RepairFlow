import { PDFDocument, PDFName, PDFHexString, AFRelationship } from 'pdf-lib'
import { generateFacturXXML } from './facturx-xml'
import { DocumentData } from './pdf-generator'
import { randomBytes } from 'node:crypto'

/**
 * Embeds Factur-X XML into a PDF buffer and adds mandatory metadata for PDF/A-3 compliance.
 * Profile: COMFORT (EN 16931)
 */
export async function embedFacturX(pdfBuffer: Uint8Array, data: DocumentData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBuffer)
  const xmlContent = generateFacturXXML(data)
  const documentId = randomBytes(16).toString('hex')
  
  // 1. PDF Identification
  const id = PDFHexString.of(documentId)
  pdfDoc.context.trailerInfo.ID = pdfDoc.context.obj([id, id])

  // 2. Attach the XML file
  const xmlBuffer = Buffer.from(xmlContent, 'utf-8')
  await pdfDoc.attach(xmlBuffer, 'factur-x.xml', {
    mimeType: 'text/xml',
    description: 'Factur-X Invoice XML',
    creationDate: data.date || new Date(),
    modificationDate: new Date(),
    afRelationship: AFRelationship.Data
  })

  // 3. Add PDF/A-3 & Factur-X Metadata (XMP)
  const xmpDate = new Date().toISOString().split('.')[0] + 'Z'
  const title = `${data.type === 'invoice' ? 'Facture' : 'Devis'} ${data.number}`
  const author = data.settings?.name || 'RepairFlow'
  const creator = 'RepairFlow ERP (Factur-X EN 16931)'
  const subject = `Invoice ${data.number} issued by ${author}`

  const xmpMetadata = `<?xpacket begin="" id="${documentId}"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about="" xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/">
      <pdfaid:part>3</pdfaid:part>
      <pdfaid:conformance>B</pdfaid:conformance>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <dc:format>application/pdf</dc:format>
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
      <fx:ConformanceLevel>COMFORT</fx:ConformanceLevel>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`.trim()

  // Set Metadata
  pdfDoc.setTitle(title)
  pdfDoc.setAuthor(author)
  pdfDoc.setSubject(subject)
  pdfDoc.setProducer(creator)
  pdfDoc.setCreator(creator)
  
  const metadataStream = pdfDoc.context.stream(xmpMetadata, {
    Type: 'Metadata',
    Subtype: 'XML',
  })
  const metadataStreamRef = pdfDoc.context.register(metadataStream)
  pdfDoc.catalog.set(PDFName.of('Metadata'), metadataStreamRef)

  return await pdfDoc.save()
}
