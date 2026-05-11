import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { handleApiError } from '@/lib/api-utils'
import * as XLSX from 'xlsx'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const exportExcel = searchParams.get('export') === 'true'

    // 1. Fetch all inventory items
    const [parts, shopProducts] = await Promise.all([
      prisma.part.findMany({
        include: { model: { include: { brand: true } } }
      }),
      prisma.shopProduct.findMany()
    ])

    // 2. Calculate valuations
    const partsValuation = parts.reduce((acc, p) => acc + (p.costPrice * p.stock), 0)
    const shopValuation = shopProducts.reduce((acc, p) => acc + (p.purchasePrice * p.stock), 0)

    const data = {
      summary: {
        totalValue: Number((partsValuation + shopValuation).toFixed(2)),
        partsValue: Number(partsValuation.toFixed(2)),
        shopValue: Number(shopValuation.toFixed(2)),
        totalItems: parts.length + shopProducts.length
      },
      details: {
        partsCount: parts.length,
        shopCount: shopProducts.length
      }
    }

    if (exportExcel) {
      // 3. Prepare Excel rows
      const rows = [
        ...parts.map(p => ({
          'Type': 'Pièce Détachée',
          'Référence / SKU': p.sku,
          'Désignation': p.name,
          'Marque/Modèle': p.model ? `${p.model.brand.name} ${p.model.name}` : 'N/A',
          'Stock': p.stock,
          'Prix d\'achat HT (€)': p.costPrice,
          'Valeur Stock HT (€)': Number((p.costPrice * p.stock).toFixed(2)),
          'Emplacement': p.location || '-'
        })),
        ...shopProducts.map(p => ({
          'Type': 'Produit Boutique',
          'Référence / SKU': p.sku || p.barcode || '-',
          'Désignation': p.name,
          'Marque/Modèle': p.category,
          'Stock': p.stock,
          'Prix d\'achat HT (€)': p.purchasePrice,
          'Valeur Stock HT (€)': Number((p.purchasePrice * p.stock).toFixed(2)),
          'Emplacement': 'Boutique'
        }))
      ]

      const worksheet = XLSX.utils.json_to_sheet(rows)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventaire')
      
      const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
      const filename = `inventaire_${new Date().toISOString().split('T')[0]}.xlsx`

      return new Response(buf, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="${filename}"`
        }
      })
    }

    return NextResponse.json(data)
  } catch (error) {
    return handleApiError(error, 'Impossible de récupérer la valorisation du stock.')
  }
}
