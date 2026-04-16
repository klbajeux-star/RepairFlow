import { NextResponse } from 'next/server'
import { getDocumentPDF } from '@/lib/document-service'
import { handleApiError } from '@/lib/api-utils'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string; id: string }> }
) {
  try {
    const { type, id } = await params
    if (type !== 'quote' && type !== 'invoice') {
      return NextResponse.json({ error: 'Type invalide' }, { status: 400 })
    }

    const pdfBuffer = await getDocumentPDF(type as any, id)
    if (!pdfBuffer) {
      return NextResponse.json({ error: 'Document non trouvé' }, { status: 404 })
    }

    const filename = `${type.toUpperCase()}_${id}.pdf`

    return new Response(Buffer.from(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    return handleApiError(error, 'Erreur lors de la génération du PDF.')
  }
}
