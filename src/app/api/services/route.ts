import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  optionalString,
  requireNumber,
  requireString,
} from '@/lib/api-utils'

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      include: { part: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(services)
  } catch (error) {
    return handleApiError(error, 'Impossible de charger les services.')
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    const service = await prisma.service.create({
      data: {
        name: requireString(json.name, 'Le nom du forfait', { maxLength: 140 }),
        laborCost: requireNumber(json.laborCost, "La main d'oeuvre", { min: 0 }),
        partId:
          typeof json.partId === 'string' && json.partId.trim()
            ? json.partId
            : null,
        description: optionalString(json.description, 500),
      },
      include: { part: true },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    return handleApiError(error, 'Impossible de créer le forfait.')
  }
}
