import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  requireString,
} from '@/lib/api-utils'

export async function GET() {
  try {
    const types = await prisma.deviceType.findMany({
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(types)
  } catch (error) {
    return handleApiError(error, 'Impossible de charger les types d’appareils.')
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    const type = await prisma.deviceType.create({
      data: {
        name: requireString(json.name, 'Le nom du type', { maxLength: 50 }),
      },
    })

    return NextResponse.json(type, { status: 201 })
  } catch (error) {
    return handleApiError(error, 'Impossible de créer le type d’appareil.')
  }
}
