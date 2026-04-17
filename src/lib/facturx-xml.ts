import { DocumentData } from './pdf-generator'

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&"']/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '"': return '&quot;'
      case "'": return '&apos;'
      default: return c
    }
  })
}

export function generateFacturXXML(data: DocumentData): string {
  const { number, date, client, items, totalHT, totalTTC, tva, taxDetails, settings, dueDate, paymentMethod } = data
  
  const isValidDate = (d: any): d is Date => d instanceof Date && !isNaN(d.getTime())
  
  const dateStr = isValidDate(date) 
    ? date.toISOString().split('T')[0].replace(/-/g, '') 
    : new Date().toISOString().split('T')[0].replace(/-/g, '')

  const dueDateStr = isValidDate(dueDate) 
    ? dueDate.toISOString().split('T')[0].replace(/-/g, '') 
    : dateStr
  
  // Mapping payment methods to UN/EDIFACT codes (subset for EN 16931)
  const getPaymentCode = (method?: string | null) => {
    switch (method?.toUpperCase()) {
      case 'VIREMENT': return '30' // Credit transfer
      case 'CARTE': return '48'    // Bank card
      case 'ESPECES': return '10'  // Cash
      case 'CHEQUE': return '20'   // Cheque
      default: return '1'          // Instrument not defined
    }
  }

  // EN 16931 (Comfort) XML Template
  // GuidelineID urn:cen.eu:en16931:2017 is the mandatory ID for full compliance
  return `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:a="urn:un:unece:uncefact:data:standard:QualifiedDataType:100" xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100" xmlns:qdt="urn:un:unece:uncefact:data:standard:QualifiedDataType:10" xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  <rsm:ExchangedDocumentContext>
    <ram:GuidelineSpecifiedDocumentContextParameter>
      <ram:ID>urn:cen.eu:en16931:2017</ram:ID>
    </ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>
  <rsm:ExchangedDocument>
    <ram:ID>${escapeXml(number)}</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    <ram:IssueDateTime>
      <udt:DateTimeString format="102">${dateStr}</udt:DateTimeString>
    </ram:IssueDateTime>
  </rsm:ExchangedDocument>
  <rsm:SupplyChainTransaction>
    ${items.map((item, index) => {
      const rate = item.vatRate || 20
      const puHT = item.price / (1 + rate / 100)
      const lineHT = (item.price * item.quantity) / (1 + rate / 100)
      const categoryCode = rate === 0 ? 'E' : 'S'
      
      return `
    <ram:IncludedSupplyChainTradeLineItem>
      <ram:AssociatedDocumentLineDocument>
        <ram:LineID>${index + 1}</ram:LineID>
      </ram:AssociatedDocumentLineDocument>
      <ram:SpecifiedTradeProduct>
        <ram:Name>${escapeXml(item.name || 'Prestation')}</ram:Name>
      </ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeAgreement>
        <ram:NetPriceProductTradePrice>
          <ram:ChargeAmount>${puHT.toFixed(2)}</ram:ChargeAmount>
        </ram:NetPriceProductTradePrice>
      </ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeDelivery>
        <ram:BilledQuantity unitCode="${item.unit || 'C62'}">${item.quantity || 1}</ram:BilledQuantity>
      </ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax>
          <ram:TypeCode>VAT</ram:TypeCode>
          <ram:CategoryCode>${categoryCode}</ram:CategoryCode>
          <ram:RateApplicablePercent>${rate}</ram:RateApplicablePercent>
        </ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation>
          <ram:LineTotalAmount>${lineHT.toFixed(2)}</ram:LineTotalAmount>
        </ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>`}).join('')}
    <ram:ApplicableHeaderTradeAgreement>
      <ram:SellerTradeParty>
        <ram:Name>${escapeXml(settings?.name || 'Ma Boutique')}</ram:Name>
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0002">${(settings?.siret || '').replace(/\s/g, '')}</ram:ID>
        </ram:SpecifiedLegalOrganization>
        <ram:PostalTradeAddress>
          <ram:PostcodeCode>${escapeXml(settings?.zipCode || '')}</ram:PostcodeCode>
          <ram:LineOne>${escapeXml(settings?.address || '')}</ram:LineOne>
          <ram:CityName>${escapeXml(settings?.city || '')}</ram:CityName>
          <ram:CountryID>FR</ram:CountryID>
        </ram:PostalTradeAddress>
        <ram:SpecifiedTaxRegistration>
          <ram:ID schemeID="VA">${(settings?.vatNumber || '').replace(/\s/g, '')}</ram:ID>
        </ram:SpecifiedTaxRegistration>
      </ram:SellerTradeParty>
      <ram:BuyerTradeParty>
        <ram:Name>${escapeXml(client.name || 'Client')}</ram:Name>
        <ram:PostalTradeAddress>
          <ram:PostcodeCode>${escapeXml(client.zipCode || '')}</ram:PostcodeCode>
          <ram:LineOne>${escapeXml(client.address || '')}</ram:LineOne>
          <ram:CityName>${escapeXml(client.city || '')}</ram:CityName>
          <ram:CountryID>FR</ram:CountryID>
        </ram:PostalTradeAddress>
        ${client.vatNumber ? `
        <ram:SpecifiedTaxRegistration>
          <ram:ID schemeID="VA">${(client.vatNumber || '').replace(/\s/g, '')}</ram:ID>
        </ram:SpecifiedTaxRegistration>` : ''}
      </ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>
    <ram:ApplicableHeaderTradeDelivery>
      <ram:ShipToTradeParty>
        <ram:Name>${escapeXml(client.name || 'Client')}</ram:Name>
      </ram:ShipToTradeParty>
    </ram:ApplicableHeaderTradeDelivery>
    <ram:ApplicableHeaderTradeSettlement>
      <ram:PaymentReference>${escapeXml(number)}</ram:PaymentReference>
      <ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>
      <ram:SpecifiedTradeSettlementPaymentMeans>
        <ram:TypeCode>${getPaymentCode(paymentMethod)}</ram:TypeCode>
        ${settings?.iban ? `
        <ram:PayeePartyCreditorFinancialAccount>
          <ram:IBANID>${(settings.iban || '').replace(/\s/g, '')}</ram:IBANID>
        </ram:PayeePartyCreditorFinancialAccount>
        <ram:PayeeSpecifiedCreditorFinancialInstitution>
          <ram:BICID>${(settings.bic || '').replace(/\s/g, '') || ''}</ram:BICID>
        </ram:PayeeSpecifiedCreditorFinancialInstitution>` : ''}
      </ram:SpecifiedTradeSettlementPaymentMeans>
      ${taxDetails.map(tax => {
        const categoryCode = tax.rate === 0 ? 'E' : 'S'
        return `
      <ram:ApplicableTradeTax>
        <ram:CalculatedAmount>${(tax.vatAmount || 0).toFixed(2)}</ram:CalculatedAmount>
        <ram:TypeCode>VAT</ram:TypeCode>
        <ram:BasisAmount>${(tax.baseHT || 0).toFixed(2)}</ram:BasisAmount>
        <ram:CategoryCode>${categoryCode}</ram:CategoryCode>
        <ram:RateApplicablePercent>${tax.rate || 20}</ram:RateApplicablePercent>
        ${tax.rate === 0 ? '<ram:ExemptionReason>Exonération de TVA, article 293 B du CGI</ram:ExemptionReason>' : ''}
      </ram:ApplicableTradeTax>`}).join('')}
      <ram:SpecifiedTradePaymentTerms>
        <ram:DueDateDateTime>
          <udt:DateTimeString format="102">${dueDateStr}</udt:DateTimeString>
        </ram:DueDateDateTime>
      </ram:SpecifiedTradePaymentTerms>
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>${(totalHT || 0).toFixed(2)}</ram:LineTotalAmount>
        <ram:TaxBasisTotalAmount>${(totalHT || 0).toFixed(2)}</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount currencyID="EUR">${(tva || 0).toFixed(2)}</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>${(totalTTC || 0).toFixed(2)}</ram:GrandTotalAmount>
        <ram:DuePayableAmount>${(totalTTC || 0).toFixed(2)}</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTransaction>
</rsm:CrossIndustryInvoice>`
}
