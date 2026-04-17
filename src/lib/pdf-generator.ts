import jsPDF from 'jspdf'

export interface InvoiceLine {
  name: string
  quantity: number
  price: number
  vatRate: number
  unit?: string
}

export interface TaxDetail {
  rate: number
  baseHT: number
  vatAmount: number
}

export interface WorkshopSettings {
  name: string
  address: string
  zipCode: string
  city: string
  phone: string
  email: string
  siret: string
  vatNumber: string
  legalForm: string
  capital: string
  rcs: string
  iban?: string | null
  bic?: string | null
}

export interface ClientData {
  name: string
  address?: string | null
  zipCode?: string | null
  city?: string | null
  phone: string
}

export interface DocumentData {
  type: 'quote' | 'invoice'
  number: string
  date: Date
  client: ClientData
  items: InvoiceLine[]
  totalHT: number
  totalTTC: number
  tva: number
  taxDetails: TaxDetail[]
  notes?: string | null
  dueDate?: Date | null
  paymentMethod?: string | null
  ticketRef?: string | null
  quoteRef?: string | null
  settings: WorkshopSettings | null
}

export async function generatePDF(data: DocumentData): Promise<Uint8Array> {
  try {
    const { type, number, date, client, items, totalHT, totalTTC, taxDetails, notes, ticketRef, quoteRef, settings } = data
    const doc = new jsPDF()
    const margin = 15
    let y = 30

    // Header Background
    doc.setFillColor(248, 250, 252)
    doc.rect(0, 0, 210, 45, 'F')

    // Logo Placeholder / Name
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(15, 23, 42)
    const brandName = settings?.name || 'REPAIR FLOW'
    const brandFirst = brandName.split(' ')[0]
    const brandRest = brandName.split(' ').slice(1).join(' ')
    
    doc.text(brandFirst, margin, 25)
    doc.setTextColor(59, 130, 246)
    doc.text(brandRest, margin + (doc.getTextWidth(brandFirst) + 1), 25)

    // Document Info Badge
    doc.setFillColor(15, 23, 42)
    doc.roundedRect(135, y - 22, 60, 15, 2, 2, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text(number, 165, y - 14, { align: 'center' })
    doc.setFontSize(6)
    doc.setFont('helvetica', 'normal')
    doc.text(`ÉMIS LE ${date.toLocaleDateString('fr-FR')}`, 165, y - 10, { align: 'center' })
    
    if (ticketRef || quoteRef) {
      doc.setFontSize(5)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(59, 130, 246)
      let refText = ''
      if (ticketRef) refText += `RÉF TICKET: ${ticketRef}  `
      if (quoteRef) refText += `ISSU DU DEVIS: ${quoteRef}`
      doc.text(refText.trim(), 165, y - 6, { align: 'center' })
      doc.setTextColor(15, 23, 42)
    }

    doc.setDrawColor(241, 245, 249)
    doc.setLineWidth(0.5)
    doc.line(margin, y, 210 - margin, y)

    y += 10

    // Two Columns: Company vs Client
    const colWidth = (210 - (margin * 3)) / 2
    
    // Left: Company Info
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(148, 163, 184)
    doc.text('ÉMETTEUR', margin, y)
    y += 5
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(15, 23, 42)
    doc.text(settings?.name || 'MOMUY&TECH SAS', margin, y)
    y += 4
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100)
    doc.text(`${settings?.address || '123 Avenue de la Réparation'}, ${settings?.zipCode || '75001'} ${settings?.city || 'Paris'}`, margin, y)
    y += 3.5
    doc.text(`Tél: ${settings?.phone || '01 23 45 67 89'} — Email: ${settings?.email || 'contact@repairflow.fr'}`, margin, y)
    y += 3.5
    doc.text(`SIRET: ${settings?.siret || '123 456 789 00012'} — TVA: ${settings?.vatNumber || 'FR 12 123 456 789'}`, margin, y)

    // Right: Client Info (Same Y level)
    let clientY = y - 16
    doc.setFillColor(248, 250, 252)
    doc.roundedRect(margin + colWidth + margin, clientY - 5, colWidth, 32, 3, 3, 'F')
    
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(59, 130, 246)
    doc.text('DESTINATAIRE', margin + colWidth + margin + 6, clientY)
    clientY += 6
    doc.setFontSize(11)
    doc.setTextColor(15, 23, 42)
    doc.text(client.name.toUpperCase(), margin + colWidth + margin + 6, clientY)
    clientY += 5
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(71, 85, 105)
    if (client.address) {
      doc.text(client.address, margin + colWidth + margin + 6, clientY)
      clientY += 4
    }
    if (client.zipCode || client.city) {
      doc.text(`${client.zipCode || ''} ${client.city || ''}`, margin + colWidth + margin + 6, clientY)
      clientY += 4
    }
    doc.text(client.phone, margin + colWidth + margin + 6, clientY)
    
    y += 18

    // Table Header
    doc.setFillColor(248, 250, 252)
    doc.rect(margin, y, 210 - (margin * 2), 8, 'F')
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(148, 163, 184)
    doc.text('DESCRIPTION DES PRESTATIONS', margin + 4, y + 5.5)
    doc.text('QTÉ', 115, y + 5.5, { align: 'center' })
    doc.text('P.U. HT', 140, y + 5.5, { align: 'right' })
    doc.text('TVA', 160, y + 5.5, { align: 'center' })
    doc.text('TOTAL HT', 190, y + 5.5, { align: 'right' })
    
    y += 12
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(15, 23, 42)
    
    items.forEach((line) => {
      const rate = line.vatRate || 20
      const puHT = line.price / (1 + rate / 100)
      const totalHTLine = (line.price * line.quantity) / (1 + rate / 100)

      doc.setFont('helvetica', 'bold')
      doc.text(line.name, margin + 4, y)
      doc.setFont('helvetica', 'normal')
      doc.text(line.quantity.toString(), 115, y, { align: 'center' })
      doc.text(`${puHT.toFixed(2)} €`, 140, y, { align: 'right' })
      doc.text(`${rate}%`, 160, y, { align: 'center' })
      doc.text(`${totalHTLine.toFixed(2)} €`, 190, y, { align: 'right' })
      y += 8
      doc.setDrawColor(248, 250, 252)
      doc.setLineWidth(0.1)
      doc.line(margin, y - 4, 210 - margin, y - 4)
    })

    y += 5
    // Totals Box (Compact)
    const totalWidth = 65
    const totalBoxX = 210 - margin - totalWidth
    const totalBoxHeight = 25 + (taxDetails.length * 5) // Increased height for payment method
    doc.setFillColor(15, 23, 42)
    doc.roundedRect(totalBoxX, y, totalWidth, totalBoxHeight, 2, 2, 'F')
    
    y += 7
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(148, 163, 184)
    doc.text('TOTAL HT', totalBoxX + 6, y)
    doc.setTextColor(255, 255, 255)
    doc.text(`${(totalHT || 0).toFixed(2)} €`, 210 - margin - 6, y, { align: 'right' })
    
    taxDetails.forEach(tax => {
      y += 5
      doc.setTextColor(148, 163, 184)
      doc.text(`TVA (${tax.rate || 20}%)`, totalBoxX + 6, y)
      doc.setTextColor(255, 255, 255)
      doc.text(`${(tax.vatAmount || 0).toFixed(2)} €`, 210 - margin - 6, y, { align: 'right' })
    })
    
    y += 7
    doc.setFontSize(9)
    doc.setTextColor(59, 130, 246)
    doc.text('TOTAL TTC À PAYER', totalBoxX + 6, y)
    doc.setFontSize(12)
    doc.setTextColor(255, 255, 255)
    doc.text(`${(totalTTC || 0).toFixed(2)} €`, 210 - margin - 6, y, { align: 'right' })

    // Payment Info in the total box
    y += 6
    doc.setFontSize(6)
    doc.setTextColor(148, 163, 184)
    doc.setFont('helvetica', 'normal')
    const paymentLabel = type === 'invoice' ? 'RÈGLEMENT :' : 'VALIDITÉ :'
    const paymentVal = type === 'invoice' 
      ? (data.paymentMethod || 'NON SPÉCIFIÉ') 
      : '30 JOURS'
    doc.text(`${paymentLabel} ${paymentVal}`, totalBoxX + 6, y)
    
    if (type === 'invoice' && data.dueDate) {
      y += 3
      doc.text(`ÉCHÉANCE : ${data.dueDate.toLocaleDateString('fr-FR')}`, totalBoxX + 6, y)
    }

    // Notes & Signature
    y += 15
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(148, 163, 184)
    doc.text('INFORMATIONS COMPLÉMENTAIRES', margin, y)
    y += 5
    doc.setFontSize(7)
    doc.setFont('helvetica', 'italic')
    doc.setTextColor(100)
    const splitNotes = doc.splitTextToSize(notes || 'Aucune note spécifique.', 100)
    doc.text(splitNotes, margin, y)
    
    const signatureY = y + 15
    doc.setDrawColor(241, 245, 249)
    doc.setLineWidth(0.5)
    doc.line(margin, signatureY, margin + 70, signatureY)
    doc.setFontSize(6)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(203, 213, 225)
    doc.text('CACHET & SIGNATURE DE L\'ENTREPRISE', margin, signatureY + 4)

    // Legal Footer (Fixed at the bottom)
    doc.setDrawColor(241, 245, 249)
    doc.line(margin, 280, 210 - margin, 280)
    doc.setFontSize(6)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(180)
    const footerLine1 = `${settings?.name || 'RepairFlow'} — ${settings?.legalForm || 'SAS'} au capital de ${settings?.capital || '1000'}€ — SIRET ${settings?.siret || '12345678900012'} — RCS ${settings?.rcs || 'PARIS'} — TVA Intra: ${settings?.vatNumber || 'FR 12 123 456 789'}`
    doc.text(footerLine1, 105, 285, { align: 'center' })
    if (settings?.iban) {
      doc.text(`IBAN: ${settings.iban} — BIC: ${settings.bic || ''}`, 105, 288, { align: 'center' })
      doc.text('En cas de retard de paiement, une indemnité forfaitaire de 40€ pour frais de recouvrement sera appliquée.', 105, 291, { align: 'center' })
    } else {
      doc.text('En cas de retard de paiement, une indemnité forfaitaire de 40€ pour frais de recouvrement sera appliquée.', 105, 288, { align: 'center' })
    }

    return new Uint8Array(doc.output('arraybuffer'))
  } catch (err) {
    console.error('PDF Generation Core Error:', err)
    throw err
  }
}
