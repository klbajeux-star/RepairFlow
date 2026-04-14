import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import {
  ApiError,
  handleApiError,
  optionalString,
  requireId,
} from '@/lib/api-utils'
import {
  isRepairStatus,
  isPartStatus,
  getRepairStatusLabel,
  getPartStatusLabel,
} from '@/lib/repair'

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const repairId = String(id).trim()
    
    if (!repairId) {
      throw new ApiError('Identifiant du ticket manquant.')
    }

    const json = await request.json()
    if (!json || typeof json !== 'object') {
      throw new ApiError('Corps de la requête invalide.')
    }

    // 1. Extraction et validation stricte (pas d'undefined passé à Prisma)
    const incomingStatus = (typeof json.status === 'string' && json.status.trim()) ? String(json.status).trim() : null
    const incomingPartStatus = (typeof json.partStatus === 'string' && json.partStatus.trim()) ? String(json.partStatus).trim() : null
    const incomingNotes = json.notes !== undefined ? (json.notes === null ? null : String(json.notes).trim()) : undefined
    const incomingComment = (typeof json.comment === 'string' && json.comment.trim()) ? String(json.comment).trim() : null

    if (incomingStatus && !isRepairStatus(incomingStatus)) {
      throw new ApiError('Statut de réparation invalide.')
    }

    if (incomingPartStatus && !isPartStatus(incomingPartStatus)) {
      throw new ApiError('Statut de pièce invalide.')
    }

    const result = await prisma.$transaction(async (tx) => {
      // 2. Récupération de l'état actuel
      const current = await tx.repair.findUniqueOrThrow({
        where: { id: repairId },
      })

      // 3. Préparation des données de mise à jour (Prisma ignore undefined)
      const updateData: any = {}
      if (incomingNotes !== undefined) updateData.notes = incomingNotes
      if (incomingStatus) updateData.status = incomingStatus
      if (incomingPartStatus) updateData.partStatus = incomingPartStatus

      // 4. Mise à jour effective (on cast status car Prisma est strict sur String)
      const updated = await tx.repair.update({
        where: { id: repairId },
        data: updateData,
      })

      // 5. Création du log si nécessaire
      const hasStatusChange = !!incomingStatus && incomingStatus !== current.status
      const hasPartStatusChange = !!incomingPartStatus && incomingPartStatus !== current.partStatus

      if (hasStatusChange || hasPartStatusChange || incomingComment) {
        let logComment = incomingComment || ''
        if (!logComment) {
          if (hasStatusChange) {
            logComment = `Statut : ${getRepairStatusLabel(incomingStatus)}`
          } else if (hasPartStatusChange) {
            logComment = `Pièce : ${getPartStatusLabel(incomingPartStatus)}`
          } else {
            logComment = 'Mise à jour'
          }
        }

        const logStatus = String(incomingStatus || updated.status || current.status || 'PENDING')

        await tx.repairLog.create({
          data: {
            repairId: String(repairId),
            status: logStatus,
            comment: String(logComment),
          },
        })
      }

      // 6. Retour de l'objet complet
      return tx.repair.findUniqueOrThrow({
        where: { id: repairId },
        include: {
          client: true,
          logs: { orderBy: { createdAt: 'desc' } },
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

    return NextResponse.json(result)
  } catch (error) {
    console.error('[API PATCH ERROR]', error)
    return handleApiError(error, 'Impossible de mettre à jour le ticket.')
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const repairId = requireId(id, 'Le ticket')

    await prisma.repair.delete({
      where: { id: repairId },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return handleApiError(error, 'Impossible de supprimer le ticket.')
  }
}
