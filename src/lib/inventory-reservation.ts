import prisma from './prisma'

/**
 * Logique de réservation intelligente pour l'inventaire RepairFlow.
 * Les pièces sont "réservées" (virtuel) à la création et "consommées" (réel) à la finalisation.
 */

export async function reservePartForRepair(tx: any, partId: string, quantity: number = 1) {
  return tx.part.update({
    where: { id: partId },
    data: {
      reservedQuantity: { increment: quantity }
    }
  })
}

export async function releaseReservedPartForRepair(tx: any, partId: string, quantity: number = 1) {
  const part = await tx.part.findUnique({ where: { id: partId } })
  if (!part) return

  // On évite de descendre sous 0 pour le virtuel
  const decrement = Math.min(part.reservedQuantity, quantity)
  
  return tx.part.update({
    where: { id: partId },
    data: {
      reservedQuantity: { decrement: decrement }
    }
  })
}

export async function consumeReservedPartsForRepair(tx: any, partId: string, quantity: number = 1) {
  const part = await tx.part.findUnique({ where: { id: partId } })
  if (!part) return

  return tx.part.update({
    where: { id: partId },
    data: {
      stock: { decrement: quantity },
      reservedQuantity: { decrement: Math.min(part.reservedQuantity, quantity) }
    }
  })
}

export async function restorePartsToStock(tx: any, partId: string, quantity: number = 1) {
  return tx.part.update({
    where: { id: partId },
    data: {
      stock: { increment: quantity }
    }
  })
}
