import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { handleApiError } from '@/lib/api-utils'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString())
    const monthParam = searchParams.get('month')
    const month = monthParam && monthParam !== 'all' ? parseInt(monthParam) : null
    
    // 1. Fetch ALL invoices for the period to separate ISSUED and DRAFT
    const allInvoices = await prisma.invoice.findMany({
      where: {
        createdAt: {
          gte: new Date(year, month !== null ? month : 0, 1),
          lt: new Date(year, month !== null ? month + 1 : 12, 1),
        }
      }
    })

    const issuedInvoices = allInvoices.filter(i => i.status === 'EMISE')
    const draftInvoices = allInvoices.filter(i => i.status === 'BROUILLON')

    // 2. Initialize Accounting data (Only for ISSUED invoices)
    let totalRevenueHT = 0
    let totalRevenueTTC = 0
    let totalVAT = 0
    const vatDistribution: Record<number, { baseHT: number; vatAmount: number }> = {}
    const paymentDistribution: Record<string, number> = {}

    issuedInvoices.forEach(invoice => {
      totalRevenueHT += invoice.totalHT
      totalRevenueTTC += invoice.totalTTC
      totalVAT += (invoice.totalTTC - invoice.totalHT)

      // Parse tax details if available, otherwise assume standard 20%
      let taxDetails = []
      try {
        taxDetails = invoice.taxDetails ? JSON.parse(invoice.taxDetails) : []
      } catch (e) {
        taxDetails = []
      }

      if (taxDetails.length > 0) {
        taxDetails.forEach((tax: any) => {
          const rate = tax.rate || 20
          if (!vatDistribution[rate]) {
            vatDistribution[rate] = { baseHT: 0, vatAmount: 0 }
          }
          vatDistribution[rate].baseHT += tax.baseHT || 0
          vatDistribution[rate].vatAmount += tax.vatAmount || 0
        })
      } else {
        // Fallback for old invoices or malformed data
        const rate = 20
        if (!vatDistribution[rate]) {
          vatDistribution[rate] = { baseHT: 0, vatAmount: 0 }
        }
        vatDistribution[rate].baseHT += invoice.totalHT
        vatDistribution[rate].vatAmount += (invoice.totalTTC - invoice.totalHT)
      }

      // Payment Method distribution
      const method = invoice.paymentMethod || 'NON SPÉCIFIÉ'
      paymentDistribution[method] = (paymentDistribution[method] || 0) + invoice.totalTTC
    })

    return NextResponse.json({
      summary: {
        invoiceCount: issuedInvoices.length,
        draftCount: draftInvoices.length,
        draftValue: Number(draftInvoices.reduce((acc, i) => acc + i.totalTTC, 0).toFixed(2)),
        totalRevenueHT: Number(totalRevenueHT.toFixed(2)),
        totalRevenueTTC: Number(totalRevenueTTC.toFixed(2)),
        totalVAT: Number(totalVAT.toFixed(2)),
      },
      vatDistribution: Object.entries(vatDistribution).map(([rate, data]) => ({
        rate: Number(rate),
        baseHT: Number(data.baseHT.toFixed(2)),
        vatAmount: Number(data.vatAmount.toFixed(2))
      })),
      paymentDistribution: Object.entries(paymentDistribution).map(([method, total]) => ({
        method,
        total: Number(total.toFixed(2))
      }))
    })
  } catch (error) {
    return handleApiError(error, 'Impossible de récupérer les statistiques comptables.')
  }
}
