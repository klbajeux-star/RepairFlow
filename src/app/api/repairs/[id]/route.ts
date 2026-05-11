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

import { getCurrentUserId } from '@/lib/session'
import { 
  releaseReservedPartForRepair, 
  consumeReservedPartsForRepair,
  restorePartsToStock
} from '@/lib/inventory-reservation'

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

    // 1. Extraction et validation stricte
    const incomingStatus = (typeof json.status === 'string' && json.status.trim()) ? String(json.status).trim() : null
    const incomingNotes = json.notes !== undefined ? (json.notes === null ? null : String(json.notes).trim()) : undefined
    const incomingComment = (typeof json.comment === 'string' && json.comment.trim()) ? String(json.comment).trim() : null

    if (incomingStatus && !isRepairStatus(incomingStatus)) {
      throw new ApiError('Statut de réparation invalide.')
    }

    const userId = await getCurrentUserId()

    const result = await prisma.$transaction(async (tx) => {
      // 2. Récupération de l'état actuel
      const current = await tx.repair.findUniqueOrThrow({
        where: { id: repairId },
        include: {
          services: {
            include: { service: true }
          }
        }
      })

      // 3. Logique de Stock selon le changement de statut
      const isFinishing = incomingStatus && ['READY', 'DELIVERED'].includes(incomingStatus) && !['READY', 'DELIVERED'].includes(current.status)
      const isCancelling = incomingStatus === 'CANCELLED' && current.status !== 'CANCELLED'
      const isRevertingFromReady = incomingStatus && !['READY', 'DELIVERED'].includes(incomingStatus) && ['READY', 'DELIVERED'].includes(current.status)

      if (isFinishing) {
        // Consommation réelle du stock
        for (const rs of current.services) {
          if (rs.service.partId) {
            await consumeReservedPartsForRepair(tx, rs.service.partId, rs.quantity)
          }
        }
      } else if (isCancelling) {
        // Libération de la réservation virtuelle
        for (const rs of current.services) {
          if (rs.service.partId) {
            await releaseReservedPartForRepair(tx, rs.service.partId, rs.quantity)
          }
        }
      } else if (isRevertingFromReady) {
        // On remet en stock et on ré-réserve
        for (const rs of current.services) {
          if (rs.service.partId) {
            await restorePartsToStock(tx, rs.service.partId, rs.quantity)
            // On ne ré-réserve que si on n'annule pas
            if (incomingStatus !== 'CANCELLED') {
              await tx.part.update({
                where: { id: rs.service.partId },
                data: { reservedQuantity: { increment: rs.quantity } }
              })
            }
          }
        }
      }

      // 4. Préparation des données de mise à jour
      const updateData: any = { updatedById: userId }
      if (incomingNotes !== undefined) updateData.notes = incomingNotes
      if (incomingStatus) updateData.status = incomingStatus

      // 5. Mise à jour effective
      const updated = await tx.repair.update({
        where: { id: repairId },
        data: updateData,
      })

      // 6. Création du log si nécessaire
      const hasStatusChange = !!incomingStatus && incomingStatus !== current.status

      if (hasStatusChange || incomingComment) {
        let logComment = incomingComment || ''
        if (!logComment && hasStatusChange) {
          logComment = `Statut : ${getRepairStatusLabel(incomingStatus)}`
        }

        await tx.repairLog.create({
          data: {
            repairId: String(repairId),
            status: String(incomingStatus || updated.status),
            comment: String(logComment || 'Mise à jour'),
          },
        })
      }

      // 7. Retour de l'objet complet
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

    // Avant de supprimer, on libère les réservations si le ticket n'était pas déjà finalisé
    await prisma.$transaction(async (tx) => {
      const repair = await tx.repair.findUnique({
        where: { id: repairId },
        include: { services: { include: { service: true } } }
      })

      if (repair && !['READY', 'DELIVERED', 'CANCELLED'].includes(repair.status)) {
        for (const rs of repair.services) {
          if (rs.service.partId) {
            await releaseReservedPartForRepair(tx, rs.service.partId, rs.quantity)
          }
        }
      }

      await tx.repair.delete({
        where: { id: repairId },
      })
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return handleApiError(error, 'Impossible de supprimer le ticket.')
  }
}
