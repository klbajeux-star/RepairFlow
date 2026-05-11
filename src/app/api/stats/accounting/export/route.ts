import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { handleApiError } from '@/lib/api-utils'
import * as XLSX from 'xlsx'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString())
    const monthParam = searchParams.get('month')
    const month = monthParam && monthParam !== 'all' ? parseInt(monthParam) : null
    
    // 1. Fetch ISSUED invoices
    const invoices = await prisma.invoice.findMany({
      where: {
        status: 'EMISE',
        createdAt: {
          gte: new Date(year, month !== null ? month : 0, 1),
          lt: new Date(year, month !== null ? month + 1 : 12, 1),
        }
      },
      include: {
        client: true
      },
      orderBy: {
        number: 'asc'
      }
    })

    // 2. Prepare data for Excel
    const rows = invoices.map(invoice => {
      let taxDetails = []
      try {
        taxDetails = invoice.taxDetails ? JSON.parse(invoice.taxDetails) : []
      } catch (e) {
        taxDetails = []
      }

      // Extract specific tax rates for columns
      const tva20 = taxDetails.find((t: any) => t.rate === 20)?.vatAmount || 0
      const tva55 = taxDetails.find((t: any) => t.rate === 5.5)?.vatAmount || 0
      const otherVAT = taxDetails
        .filter((t: any) => t.rate !== 20 && t.rate !== 5.5)
        .reduce((sum: number, t: any) => sum + (t.vatAmount || 0), 0)

      return {
        'Date': new Date(invoice.createdAt).toLocaleDateString('fr-FR'),
        'Facture N°': invoice.number,
        'Client': invoice.client.name,
        'Total HT (€)': Number(invoice.totalHT.toFixed(2)),
        'TVA 20% (€)': Number(tva20.toFixed(2)),
        'TVA 5.5% (€)': Number(tva55.toFixed(2)),
        'Autres TVA (€)': Number(otherVAT.toFixed(2)),
        'Total TTC (€)': Number(invoice.totalTTC.toFixed(2)),
        'Mode de Paiement': invoice.paymentMethod || 'Non spécifié',
        'Statut': invoice.paid ? 'Payée' : 'À régler'
      }
    })

    // 3. Create Workbook
    const worksheet = XLSX.utils.json_to_sheet(rows)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Journal des Ventes')

    // Write to buffer
    const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    const filename = `export_compta_${year}${month !== null ? '_' + (month + 1) : ''}.xlsx`

    return new Response(buf, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })
  } catch (error) {
    return handleApiError(error, 'Impossible de générer l\'export comptable.')
  }
}
