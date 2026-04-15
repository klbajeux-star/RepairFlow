import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { handleApiError, optionalString } from '@/lib/api-utils'

export async function GET() {
  try {
    const settings = await prisma.workshopSettings.upsert({
      where: { id: 'singleton' },
      update: {},
      create: {
        id: 'singleton',
      },
    })
    return NextResponse.json(settings)
  } catch (error) {
    return handleApiError(error, 'Impossible de charger les paramètres.')
  }
}

export async function PATCH(request: Request) {
  try {
    const json = await request.json()
    const settings = await prisma.workshopSettings.update({
      where: { id: 'singleton' },
      data: {
        name: json.name || undefined,
        address: json.address || undefined,
        zipCode: json.zipCode || undefined,
        city: json.city || undefined,
        countryCode: json.countryCode || undefined,
        phone: json.phone || undefined,
        email: json.email || undefined,
        siret: json.siret || undefined,
        vatNumber: json.vatNumber || undefined,
        legalForm: json.legalForm || undefined,
        capital: json.capital || undefined,
        rcs: json.rcs || undefined,
        iban: json.iban || null,
        bic: json.bic || null,
      },
    })
    return NextResponse.json(settings)
  } catch (error) {
    return handleApiError(error, 'Impossible de mettre à jour les paramètres.')
  }
}
