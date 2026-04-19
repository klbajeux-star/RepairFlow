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
  clientType?: string | null
  address?: string | null
  zipCode?: string | null
  city?: string | null
  phone: string
  siret?: string | null
  vatNumber?: string | null
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
    const margin = 20
    let y = 30

    // LOGO SECTION
    doc.setFillColor(15, 23, 42) // Slate 950
    doc.roundedRect(margin, y - 5, 12, 12, 4, 4, 'F')
    
    // Draw a simple wrench icon (simplified version of Lucide icon)
    doc.setDrawColor(255, 255, 255)
    doc.setLineWidth(1)
    doc.line(margin + 3, y - 2, margin + 9, y + 4)
    doc.circle(margin + 4, y - 1, 1.5, 'S')
    doc.circle(margin + 8, y + 3, 1.5, 'S')

    // BRAND NAME
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(15, 23, 42)
    doc.text('RepairFlow', margin + 18, y + 2)
    
    doc.setFontSize(8)
    doc.setTextColor(59, 130, 246) // Blue 600
    doc.text('EXPERTISE & RÉPARATION', margin + 18, y + 7)

    // DOCUMENT TYPE (BACKGROUND BIG TEXT)
    doc.setFontSize(60)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(241, 245, 249) // Slate 100
    const docTypeLabel = type === 'quote' ? 'DEVIS' : 'FACTURE'
    doc.text(docTypeLabel, 210 - margin, y + 5, { align: 'right' })

    // DOCUMENT NUMBER & DATE
    doc.setFontSize(16)
    doc.setTextColor(15, 23, 42)
    doc.text(number, 210 - margin, y + 15, { align: 'right' })
    
    doc.setFontSize(8)
    doc.setTextColor(148, 163, 184)
    doc.text(date.toLocaleDateString('fr-FR'), 210 - margin, y + 20, { align: 'right' })

    if (ticketRef || quoteRef) {
      y += 5
      doc.setFontSize(7)
      doc.setTextColor(59, 130, 246)
      let refText = ''
      if (ticketRef) refText += `RÉF TICKET: ${ticketRef}  `
      if (quoteRef) refText += `ISSU DU DEVIS: ${quoteRef}`
      doc.text(refText.trim(), 210 - margin, y + 20, { align: 'right' })
    }

    y += 20

    // SENDER INFO
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(15, 23, 42)
    doc.text(settings?.name || 'MOMUY&TECH SAS', margin, y)
    
    y += 4
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 116, 139) // Slate 500
    doc.text(`${settings?.address || '123 Avenue de la Réparation'}, ${settings?.zipCode || '75001'} ${settings?.city || 'Paris'}`, margin, y)
    
    y += 4
    doc.text(`Tél: ${settings?.phone || '01 23 45 67 89'} — Email: ${settings?.email || 'contact@repairflow.fr'}`, margin, y)
    
    y += 4
    doc.text(`SIRET: ${settings?.siret || '123 456 789 00012'} — TVA: ${settings?.vatNumber || 'FR 12 123 456 789'}`, margin, y)

    y += 20

    // CLIENT SECTION
    const colWidth = 85
    
    // Left side: Client
    doc.setDrawColor(241, 245, 249)
    doc.setLineWidth(1)
    doc.line(margin - 2, y, margin - 2, y + 20) // Vertical line accent

    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(59, 130, 246)
    doc.text('À L\'ATTENTION DE', margin, y)
    
    y += 8
    doc.setFontSize(18)
    doc.setTextColor(15, 23, 42)
    doc.text(client.name.toUpperCase(), margin, y)
    
    y += 5
    doc.setFontSize(10)
    doc.setTextColor(71, 85, 105)
    doc.setFont('helvetica', 'normal')
    if (client.address) {
      doc.text(client.address, margin, y)
      y += 5
    }
    if (client.zipCode || client.city) {
      doc.text(`${client.zipCode || ''} ${client.city || ''}`, margin, y)
      y += 5
    }
    doc.text(client.phone, margin, y)

    // Right side: Conditions (at same Y as client start)
    let conditionsY = y - (client.address ? 18 : 13)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(148, 163, 184)
    doc.text('CONDITIONS DE RÈGLEMENT', 210 - margin, conditionsY, { align: 'right' })
    
    conditionsY += 5
    doc.setFontSize(9)
    doc.setTextColor(51, 65, 85)
    doc.text(`Paiement par ${(data.paymentMethod || 'NON SPÉCIFIÉ').toLowerCase()}`, 210 - margin, conditionsY, { align: 'right' })
    
    conditionsY += 5
    if (type === 'quote') {
      doc.text('Devis valable 30 jours', 210 - margin, conditionsY, { align: 'right' })
    } else {
      const dueDateStr = data.dueDate ? data.dueDate.toLocaleDateString('fr-FR') : 'À réception'
      doc.text(`Échéance: ${dueDateStr}`, 210 - margin, conditionsY, { align: 'right' })
    }

    y += 20

    // ITEMS TABLE
    doc.setDrawColor(15, 23, 42)
    doc.setLineWidth(0.5)
    doc.line(margin, y, 210 - margin, y) // Header top line
    
    y += 6
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(148, 163, 184)
    doc.text('DESCRIPTION DE LA PRESTATION', margin + 4, y)
    doc.text('QUANTITÉ', 115, y, { align: 'center' })
    doc.text('P.U. HT', 140, y, { align: 'right' })
    doc.text('TVA', 160, y, { align: 'center' })
    doc.text('TOTAL HT', 190, y, { align: 'right' })
    
    y += 4
    doc.setDrawColor(241, 245, 249)
    doc.setLineWidth(0.1)
    doc.line(margin, y, 210 - margin, y)
    
    y += 8
    doc.setFontSize(9)
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
      
      y += 10
      doc.line(margin, y - 6, 210 - margin, y - 6)
    })

    y += 10

    // BOTTOM SECTION: NOTES & TOTALS
    const totalBoxWidth = 80
    const totalBoxX = 210 - margin - totalBoxWidth
    
    // Notes Left
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(148, 163, 184)
    doc.text('INFORMATIONS COMPLÉMENTAIRES', margin, y)
    
    y += 5
    doc.setFontSize(8)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 116, 139)
    const splitNotes = doc.splitTextToSize(notes || 'Aucune note spécifique sur ce document.', 80)
    doc.text(splitNotes, margin, y)
    
    // Totals Box Right (Stay on same Y)
    let totalY = y - 5
    doc.setFillColor(248, 250, 252)
    const totalBoxHeight = 25 + (taxDetails.length * 8)
    doc.roundedRect(totalBoxX, totalY, totalBoxWidth, totalBoxHeight, 5, 5, 'F')
    doc.setDrawColor(241, 245, 249)
    doc.roundedRect(totalBoxX, totalY, totalBoxWidth, totalBoxHeight, 5, 5, 'S')
    
    totalY += 10
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(148, 163, 184)
    doc.text('TOTAL HT', totalBoxX + 8, totalY)
    doc.setTextColor(15, 23, 42)
    doc.text(`${(totalHT || 0).toFixed(2)} €`, 210 - margin - 8, totalY, { align: 'right' })
    
    taxDetails.forEach(tax => {
      totalY += 8
      doc.setTextColor(148, 163, 184)
      doc.text(`TVA (${tax.rate || 20}%) SUR ${tax.baseHT.toFixed(2)} €`, totalBoxX + 8, totalY)
      doc.setTextColor(15, 23, 42)
      doc.text(`${(tax.vatAmount || 0).toFixed(2)} €`, 210 - margin - 8, totalY, { align: 'right' })
    })
    
    totalY += 10
    doc.setFontSize(10)
    doc.setTextColor(59, 130, 246)
    doc.text('TOTAL À PAYER', totalBoxX + 8, totalY)
    doc.setFontSize(18)
    doc.setTextColor(15, 23, 42)
    doc.text(`${(totalTTC || 0).toFixed(2)} €`, 210 - margin - 8, totalY, { align: 'right' })

    // CACHET & SIGNATURE
    y += 30
    doc.setFontSize(7)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(203, 213, 225)
    doc.text('CACHET & SIGNATURE DE L\'ENTREPRISE', margin, y)
    doc.line(margin, y - 4, margin + 60, y - 4)

    // FOOTER
    doc.setFontSize(6)
    doc.setTextColor(203, 213, 225)
    const footerText1 = 'REPAIRFLOW — LOGICIEL DE GESTION D\'ATELIER DE RÉPARATION'
    const footerText2 = 'EN CAS DE RETARD DE PAIEMENT, UNE INDEMNITÉ FORFAITAIRE DE 40€ POUR FRAIS DE RECOUVREMENT SERA APPLIQUÉE.'
    const footerText3 = 'AUCUN ESCOMPTE POUR PAIEMENT ANTICIPÉ.'
    
    doc.text(footerText1, 105, 285, { align: 'center' })
    doc.text(footerText2, 105, 288, { align: 'center' })
    doc.text(footerText3, 105, 291, { align: 'center' })

    return new Uint8Array(doc.output('arraybuffer'))
  } catch (err) {
    console.error('PDF Generation Core Error:', err)
    throw err
  }
}
