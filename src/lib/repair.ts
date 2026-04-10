export const repairStatuses = [
  'PENDING',
  'DIAGNOSIS',
  'IN_PROGRESS',
  'READY',
  'DELIVERED',
  'CANCELLED',
  'ARCHIVED',
] as const

export type RepairStatus = (typeof repairStatuses)[number]

export const repairStatusLabels: Record<RepairStatus, string> = {
  PENDING: 'En attente',
  DIAGNOSIS: 'Diagnostic',
  IN_PROGRESS: 'En cours',
  READY: 'Prêt',
  DELIVERED: 'Restitué',
  CANCELLED: 'Annulé',
  ARCHIVED: 'Archivé',
}

export const repairStatusStyles: Record<RepairStatus, string> = {
  PENDING: 'bg-amber-100 text-amber-800',
  DIAGNOSIS: 'bg-violet-100 text-violet-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  READY: 'bg-emerald-100 text-emerald-800',
  DELIVERED: 'bg-slate-200 text-slate-800',
  CANCELLED: 'bg-rose-100 text-rose-800',
  ARCHIVED: 'bg-slate-100 text-slate-500 opacity-60',
}

export function isRepairStatus(value: unknown): value is RepairStatus {
  return (
    typeof value === 'string' &&
    repairStatuses.includes(value as RepairStatus)
  )
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(value)
}

export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))
}

export function getRepairTotal(
  repair:
    | Array<{ priceAtTime: number; quantity?: number }>
    | { services: Array<{ priceAtTime: number; quantity?: number }> }
) {
  const lines = Array.isArray(repair) ? repair : repair.services

  return lines.reduce((total, service) => {
    return total + service.priceAtTime * (service.quantity ?? 1)
  }, 0)
}

export function getRepairStatusLabel(status: string) {
  return repairStatusLabels[status as RepairStatus] ?? status
}

export function getRepairStatusStyle(status: string) {
  return repairStatusStyles[status as RepairStatus] ?? repairStatusStyles.PENDING
}
