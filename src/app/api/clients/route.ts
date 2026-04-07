import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  optionalString,
  requireString,
} from '@/lib/api-utils'

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      include: {
        _count: {
          select: { repairs: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(
      clients.map((client) => ({
        ...client,
        repairCount: client._count.repairs,
      }))
    )
  } catch (error) {
    return handleApiError(error, 'Impossible de charger les clients.')
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    const client = await prisma.client.create({
      data: {
        name: requireString(json.name, 'Le nom du client', { maxLength: 120 }),
        email: optionalString(json.email, 120),
        phone: requireString(json.phone, 'Le téléphone', { maxLength: 40 }),
      },
    })

    return NextResponse.json(client, { status: 201 })
  } catch (error) {
    return handleApiError(error, 'Impossible de créer le client.')
  }
}
