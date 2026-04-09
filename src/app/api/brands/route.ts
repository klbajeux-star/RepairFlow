import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  requireString,
} from '@/lib/api-utils'

export async function GET() {
  try {
    const brands = await prisma.deviceBrand.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { models: true },
        },
      },
    })

    return NextResponse.json(brands)
  } catch (error) {
    return handleApiError(error, 'Impossible de charger les marques.')
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    const brand = await prisma.deviceBrand.create({
      data: {
        name: requireString(json.name, 'Le nom de la marque', { maxLength: 50 }),
      },
    })

    return NextResponse.json(brand, { status: 201 })
  } catch (error) {
    return handleApiError(error, 'Impossible de créer la marque.')
  }
}
