import { NextResponse } from 'next/server'
import { getDocumentPDF } from '@/lib/document-service'
import { handleApiError } from '@/lib/api-utils'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  try {
    const { type, id } = await params
    console.log(`[API/PDF] Params received: type=${type}, id=${id}`)
    if (type !== 'quote' && type !== 'invoice') {
      return NextResponse.json({ error: 'Type invalide' }, { status: 400 })
    }

    console.log(`[API/PDF] Request for ${type} ${id}`)
    const pdfBuffer = await getDocumentPDF(type as any, id)
    if (!pdfBuffer) {
      console.log(`[API/PDF] Document not found: ${type} ${id}`)
      return NextResponse.json({ error: 'Document non trouvé' }, { status: 404 })
    }
    console.log(`[API/PDF] Success generating PDF for ${type} ${id}`)

    const filename = `${type.toUpperCase()}_${id}.pdf`

    return new Response(pdfBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (error) {
    return handleApiError(error, 'Erreur lors de la génération du PDF.')
  }
}
