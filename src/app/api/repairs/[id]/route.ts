import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  ApiError,
  handleApiError,
  optionalString,
  requireId,
} from '@/lib/api-utils'
import { isRepairStatus } from '@/lib/repair'

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const repairId = requireId(id, 'Le ticket')
    const json = await request.json()

    const notes = optionalString(json.notes, 2000)
    const comment = optionalString(json.comment, 500)
    const nextStatus =
      json.status === undefined || json.status === null || json.status === ''
        ? null
        : json.status

    if (nextStatus !== null && !isRepairStatus(nextStatus)) {
      throw new ApiError('Le statut demandé est invalide.')
    }

    const repair = await prisma.$transaction(async (tx) => {
      const currentRepair = await tx.repair.findUniqueOrThrow({
        where: { id: repairId },
      })

      const updatedRepair = await tx.repair.update({
        where: { id: repairId },
        data: {
          notes,
          status: nextStatus ?? currentRepair.status,
        },
      })

      if (nextStatus !== null || comment) {
        await tx.repairLog.create({
          data: {
            repairId,
            status: nextStatus ?? currentRepair.status,
            comment:
              comment ??
              (nextStatus && nextStatus !== currentRepair.status
                ? `Statut passé à ${nextStatus}.`
                : 'Dossier mis à jour.'),
          },
        })
      }

      return tx.repair.findUniqueOrThrow({
        where: { id: updatedRepair.id },
        include: {
          client: true,
          logs: {
            orderBy: { createdAt: 'desc' },
          },
          services: {
            include: {
              service: {
                include: { part: true },
              },
            },
          },
        },
      })
    })

    return NextResponse.json(repair)
  } catch (error) {
    return handleApiError(error, 'Impossible de mettre à jour le ticket.')
  }
}
