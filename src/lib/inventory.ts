/**
 * RepairFlow Inventory & Ordering Logic
 * Handles detection of missing parts based on active repair tickets.
 */

export type MissingPart = {
  partId: string
  name: string
  sku: string
  costPrice: number
  currentStock: number
  totalNeeded: number
  quantityToOrder: number
  relatedRepairs: Array<{
    id: string
    clientName: string
    quantity: number
  }>
}

/**
 * Calculates missing parts for active repairs (PENDING, DIAGNOSIS, IN_PROGRESS).
 * Takes the full list of repairs with nested services and parts.
 */
export function calculateMissingParts(repairs: any[]): MissingPart[] {
  // Only consider active repairs
  const activeRepairs = repairs.filter(r => 
    ['PENDING', 'DIAGNOSIS', 'IN_PROGRESS'].includes(r.status)
  )

  const partMap = new Map<string, MissingPart>()

  activeRepairs.forEach(repair => {
    // Navigate through the Prisma include structure: repair.services[].service.part
    repair.services?.forEach((rs: any) => {
      // DEBUG: console.log(`Repair ${repair.id} - Part: ${rs.service?.part?.name} - Status: ${rs.partStatus}`)
      
      // On compte les pièces qui ne sont pas encore COMMANDÉES ou REÇUES
      // On NE skip PAS 'IN_STOCK' car si le stock a baissé manuellement, 
      // il faut pouvoir redéclencher une commande.
      if (rs.partStatus === 'ORDERED' || rs.partStatus === 'RECEIVED') return

      const part = rs.service?.part
      if (part) {
        const partId = part.id
        const needed = rs.quantity || 1

        if (!partMap.has(partId)) {
          partMap.set(partId, {
            partId,
            name: part.name,
            sku: part.sku,
            costPrice: part.costPrice || 0,
            currentStock: part.stock,
            totalNeeded: 0,
            quantityToOrder: 0,
            relatedRepairs: []
          })
        }

        const entry = partMap.get(partId)!
        entry.totalNeeded += needed
        entry.relatedRepairs.push({
          id: repair.id,
          clientName: repair.client?.name || 'Client Inconnu',
          quantity: needed
        })
      }
    })
  })

  // Filter only those where stock is insufficient
  const missing: MissingPart[] = []
  partMap.forEach(entry => {
    // If we need more than we have in stock
    if (entry.currentStock < entry.totalNeeded) {
      entry.quantityToOrder = entry.totalNeeded - entry.currentStock
      missing.push(entry)
    }
  })

  return missing
}
