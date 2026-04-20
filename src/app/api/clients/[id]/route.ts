import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  handleApiError,
  optionalString,
  requireId,
  requireString,
} from '@/lib/api-utils'

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const json = await request.json()

    const firstName = optionalString(json.firstName, 60)
    const lastName = optionalString(json.lastName, 60)
    const fullName = [firstName, lastName].filter(Boolean).join(' ') || json.name || 'Client Inconnu'

    const client = await prisma.client.update({
      where: { id: requireId(id, 'Le client') },
      data: {
        name: fullName,
        firstName,
        lastName,
        clientType: json.clientType || 'Particulier',
        email: optionalString(json.email, 120),
        phone: requireString(json.phone, 'Le téléphone', { maxLength: 40 }),
        address: optionalString(json.address, 200),
        zipCode: optionalString(json.zipCode, 20),
        city: optionalString(json.city, 100),
        siret: optionalString(json.siret, 20),
        vatNumber: optionalString(json.vatNumber, 30),
      },
    })

    return NextResponse.json(client)
  } catch (error) {
    return handleApiError(error, 'Impossible de modifier le client.')
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const clientId = requireId(id, 'Le client')

    // On vérifie d'abord s'il y a des réparations en cours ou des factures
    // Pour simplifier ici, on autorise la suppression en cascade manuelle si nécessaire
    // ou on laisse Prisma échouer si des contraintes existent.
    // Dans cet ERP, on préfère supprimer proprement.

    await prisma.client.delete({
      where: { id: clientId },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[DELETE CLIENT ERROR]', error)
    return handleApiError(error, 'Impossible de supprimer le client. Vérifiez s\'il n\'a pas de factures ou de tickets liés.')
  }
}
