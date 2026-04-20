import jsPDF from 'jspdf'

interface Client {
  id: string
  name: string
  phone: string
  email?: string | null
  address?: string | null
  zipCode?: string | null
  city?: string | null
  clientType?: string | null
}

interface Service {
  id: string
  name: string
  suggestedPrice: number
}

interface IntakeData {
  repairId: string
  client: Client
  device: {
    model: string
    imei: string
    unlockCode: string
    unlockPattern: string
    condition: number
  }
  services: Service[]
  notes: string
  signature?: string
  date: string
}

export function generateIntakePDF(data: IntakeData) {
  const doc = new jsPDF()
  const margin = 20
  let y = margin

  // Header
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('BON DE PRISE EN CHARGE', margin, y)
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100)
  doc.text(`Réf: ${data.repairId.toUpperCase()}`, 210 - margin, y, { align: 'right' })
  y += 10
  doc.text(`Date: ${data.date}`, 210 - margin, y, { align: 'right' })
  y += 15

  // Shop Info
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0)
  doc.text('MOMUY&TECH - REPARATION SMARTPHONE ET ELECTRONIQUE', margin, y)
  y += 6
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('123 Avenue de la Réparation, 75001 Paris', margin, y)
  y += 5
  doc.text('Tél: 01 23 45 67 89 | contact@repairflow.fr', margin, y)
  y += 15

  // Client Info
  doc.setFillColor(245, 247, 250)
  doc.rect(margin, y, 170, 40, 'F')
  y += 8
  doc.setFont('helvetica', 'bold')
  doc.text(`CLIENT (${data.client.clientType || 'Particulier'})`, margin + 5, y)
  y += 6
  doc.setFont('helvetica', 'normal')
  doc.text(`${data.client.name}`, margin + 5, y)
  y += 5
  doc.text(`${data.client.phone} | ${data.client.email || 'Pas d\'email'}`, margin + 5, y)
  y += 5
  if (data.client.address) {
    doc.text(`${data.client.address}`, margin + 5, y)
    y += 5
    doc.text(`${data.client.zipCode || ''} ${data.client.city || ''}`, margin + 5, y)
  } else {
    doc.text('Adresse non renseignée', margin + 5, y)
  }
  y += 15

  // Device Info
  doc.setFont('helvetica', 'bold')
  doc.text('APPAREIL & ÉTAT', margin, y)
  y += 2
  doc.line(margin, y, 190, y)
  y += 8
  
  doc.setFont('helvetica', 'normal')
  doc.text(`Modèle: ${data.device.model || 'N/A'}`, margin, y)
  doc.text(`IMEI/SN: ${data.device.imei || 'N/A'}`, margin + 85, y)
  y += 7
  doc.text(`Code: ${data.device.unlockCode || 'N/A'}`, margin, y)
  doc.text(`Schéma: ${data.device.unlockPattern || 'AUCUN'}`, margin + 45, y)
  doc.text(`État esthétique: ${data.device.condition}/5`, margin + 95, y)
  y += 12

  // Services
  doc.setFont('helvetica', 'bold')
  doc.text('PRESTATIONS DEMANDÉES', margin, y)
  y += 2
  doc.line(margin, y, 190, y)
  y += 8
  
  doc.setFont('helvetica', 'normal')
  let total = 0
  data.services.forEach((s) => {
    doc.text(s.name, margin, y)
    const priceText = `${s.suggestedPrice.toFixed(2)} €`
    doc.text(priceText, 190, y, { align: 'right' })
    total += s.suggestedPrice
    y += 7
  })

  y += 5
  doc.setFont('helvetica', 'bold')
  doc.text('TOTAL ESTIMÉ (TTC)', margin, y)
  doc.text(`${total.toFixed(2)} €`, 190, y, { align: 'right' })
  y += 15

  // CGV
  doc.setFontSize(8)
  doc.setFont('helvetica', 'italic')
  doc.setTextColor(150)
  const cgv = [
    "1. DONNÉES : L'atelier n'est pas responsable de la perte de données. Une sauvegarde est recommandée.",
    "2. GARANTIE : 6 mois sur les pièces (hors casse/oxydation). Main d'œuvre incluse.",
    "3. RETRAIT : Tout appareil non retiré après 90 jours sera considéré comme abandonné.",
    "4. ACCORD : Le client accepte le montant estimatif et les conditions générales de dépôt."
  ]
  cgv.forEach((line) => {
    doc.text(line, margin, y)
    y += 4
  })
  y += 10

  // Signature
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0)
  doc.text('SIGNATURE DU CLIENT', margin, y)
  y += 5
  
  if (data.signature) {
    try {
      doc.addImage(data.signature, 'PNG', margin, y, 60, 30)
    } catch (e) {
      doc.text('[ Signature reçue ]', margin, y + 10)
    }
  } else {
    doc.rect(margin, y, 60, 30)
    doc.text('CADRE SIGNATURE', margin + 15, y + 15)
  }

  // Footer
  doc.setFontSize(7)
  doc.setTextColor(180)
  doc.text('Généré par RepairFlow v1.0 - Logiciel de gestion atelier', 105, 285, { align: 'center' })

  // Save the PDF
  doc.save(`bon-depot-${data.repairId.toUpperCase()}.pdf`)
}
