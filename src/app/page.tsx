'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FilePlus2,
  FileText,
  GripVertical,
  Loader2,
  Package,
  PencilLine,
  Plus,
  Search,
  StickyNote,
  UserPlus,
  Wrench,
  X,
} from 'lucide-react'
import {
  formatCurrency,
  formatDate,
  getRepairStatusLabel,
  getRepairStatusStyle,
  getRepairTotal,
} from '@/lib/repair'

type KanbanStatus = 'PENDING' | 'DIAGNOSIS' | 'IN_PROGRESS' | 'READY'
type QuickFlowMode = 'repair' | 'quote'
type BoardDensity = 'compact' | 'detail'

interface Client {
  id: string
  name: string
  phone: string
  email?: string | null
}

interface Part {
  id: string
  name: string
  stock: number
}

interface Service {
  id: string
  name: string
  laborCost: number
  description?: string | null
  part?: {
    id: string
    name: string
    costPrice: number
  } | null
}

interface RepairService {
  id?: string
  priceAtTime: number
  quantity?: number
  service: {
    id: string
    name: string
  }
}

interface RepairLog {
  id: string
  status: string
  comment?: string | null
  createdAt: string
}

interface Repair {
  id: string
  status: string
  notes?: string | null
  createdAt: string
  updatedAt: string
  client: Client
  services: RepairService[]
  logs?: RepairLog[]
}

const kanbanColumns: Array<{
  status: KanbanStatus
  title: string
  subtitle: string
  accent: string
  accentSoft: string
  ring: string
}> = [
  {
    status: 'PENDING',
    title: 'En attente',
    subtitle: 'Réception et qualification',
    accent: 'bg-amber-500',
    accentSoft: 'bg-amber-50',
    ring: 'ring-amber-200/80',
  },
  {
    status: 'DIAGNOSIS',
    title: 'Diagnostic',
    subtitle: 'Contrôle et devis',
    accent: 'bg-sky-500',
    accentSoft: 'bg-sky-50',
    ring: 'ring-sky-200/80',
  },
  {
    status: 'IN_PROGRESS',
    title: 'En cours',
    subtitle: 'Intervention atelier',
    accent: 'bg-violet-500',
    accentSoft: 'bg-violet-50',
    ring: 'ring-violet-200/80',
  },
  {
    status: 'READY',
    title: 'Terminée',
    subtitle: 'Prête à restituer',
    accent: 'bg-emerald-500',
    accentSoft: 'bg-emerald-50',
    ring: 'ring-emerald-200/80',
  },
]

const initialClientForm = {
  name: '',
  phone: '',
  email: '',
}

const initialQuickFlowForm = {
  clientId: '',
  serviceIds: [] as string[],
  notes: '',
}

type ApiErrorPayload = {
  error?: string
  message?: string
}

function getApiErrorMessage(payload: unknown, fallbackMessage: string) {
  if (payload && typeof payload === 'object') {
    const candidate = payload as ApiErrorPayload
    if (typeof candidate.error === 'string' && candidate.error.trim()) {
      return candidate.error
    }
    if (typeof candidate.message === 'string' && candidate.message.trim()) {
      return candidate.message
    }
  }

  return fallbackMessage
}

async function parseApiResponse(response: Response) {
  const contentType = response.headers.get('content-type') ?? ''
  const responseText = await response.text()

  if (!responseText) {
    return null
  }

  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(responseText) as unknown
    } catch {
      throw new Error('La réponse JSON du serveur est invalide.')
    }
  }

  if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
    throw new Error(
      `Le serveur a renvoyé une page HTML au lieu des données attendues (${response.status}). Vérifiez que les routes API Next.js répondent correctement.`
    )
  }

  try {
    return JSON.parse(responseText) as unknown
  } catch {
    throw new Error('La réponse du serveur est dans un format inattendu.')
  }
}

async function apiRequest<T>(input: RequestInfo | URL, init: RequestInit, fallbackMessage: string) {
  const response = await fetch(input, init)
  const payload = await parseApiResponse(response)

  if (!response.ok) {
    throw new Error(getApiErrorMessage(payload, fallbackMessage))
  }

  return payload as T
}

function getTicketReference(repair: Repair) {
  const createdAt = new Date(repair.createdAt)
  const dateFragment = `${String(createdAt.getFullYear()).slice(-2)}${String(
    createdAt.getMonth() + 1
  ).padStart(2, '0')}${String(createdAt.getDate()).padStart(2, '0')}`

  return `INT-${dateFragment}-${repair.id.slice(-4).toUpperCase()}`
}

function getRepairSummary(repair: Repair) {
  const serviceLabel = repair.services.map((service) => service.service.name).join(' • ')
  return serviceLabel || 'Aucune prestation renseignée'
}

export default function Dashboard() {
  const router = useRouter()
  const [repairs, setRepairs] = useState<Repair[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [parts, setParts] = useState<Part[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [selectedRepairId, setSelectedRepairId] = useState<string | null>(null)
  const [draggedRepairId, setDraggedRepairId] = useState<string | null>(null)
  const [hoveredStatus, setHoveredStatus] = useState<KanbanStatus | null>(null)
  const [showClientModal, setShowClientModal] = useState(false)
  const [showQuickFlowModal, setShowQuickFlowModal] = useState<QuickFlowMode | null>(null)
  const [clientForm, setClientForm] = useState(initialClientForm)
  const [quickFlowForm, setQuickFlowForm] = useState(initialQuickFlowForm)
  const [search, setSearch] = useState('')
  const [density, setDensity] = useState<BoardDensity>('detail')
  const [isLoading, setIsLoading] = useState(true)
  const [isSavingClient, setIsSavingClient] = useState(false)
  const [isSavingFlow, setIsSavingFlow] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void loadDashboard()
  }, [])

  async function loadDashboard() {
    try {
      setIsLoading(true)
      setError(null)

      const [repairsResult, clientsResult, partsResult, servicesResult] = await Promise.allSettled([
        apiRequest<Repair[]>('/api/repairs', {}, 'Impossible de charger les réparations.'),
        apiRequest<Client[]>('/api/clients', {}, 'Impossible de charger les clients.'),
        apiRequest<Part[]>('/api/parts', {}, 'Impossible de charger le stock.'),
        apiRequest<Service[]>('/api/services', {}, 'Impossible de charger les forfaits.'),
      ])

      if (repairsResult.status === 'rejected') {
        throw repairsResult.reason
      }

      if (clientsResult.status === 'rejected') {
        throw clientsResult.reason
      }

      const nextRepairs = Array.isArray(repairsResult.value) ? repairsResult.value : []
      const nextClients = Array.isArray(clientsResult.value) ? clientsResult.value : []
      const nextParts =
        partsResult.status === 'fulfilled' && Array.isArray(partsResult.value)
          ? partsResult.value
          : []
      const nextServices =
        servicesResult.status === 'fulfilled' && Array.isArray(servicesResult.value)
          ? servicesResult.value
          : []

      const nonBlockingErrors = [partsResult, servicesResult]
        .filter((result) => result.status === 'rejected')
        .map((result) => (result as PromiseRejectedResult).reason)
        .map((reason) =>
          reason instanceof Error ? reason.message : 'Une partie du tableau de bord est indisponible.'
        )

      setRepairs(nextRepairs)
      setClients(nextClients)
      setParts(nextParts)
      setServices(nextServices)

      setSelectedRepairId((currentSelected) => {
        if (currentSelected && nextRepairs.some((repair) => repair.id === currentSelected)) {
          return currentSelected
        }
        return nextRepairs[0]?.id ?? null
      })

      if (nonBlockingErrors.length > 0) {
        setError(nonBlockingErrors[0])
      }
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Impossible de charger le tableau de bord.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const selectedRepair = useMemo(() => {
    if (!selectedRepairId) {
      return null
    }
    return repairs.find((repair) => repair.id === selectedRepairId) ?? null
  }, [repairs, selectedRepairId])

  const filteredRepairs = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return repairs
    }

    return repairs.filter((repair) => {
      const servicesLabel = repair.services.map((service) => service.service.name).join(' ')
      return [
        repair.id,
        getTicketReference(repair),
        repair.client.name,
        repair.client.phone,
        repair.notes ?? '',
        servicesLabel,
        getRepairStatusLabel(repair.status),
      ]
        .join(' ')
        .toLowerCase()
        .includes(query)
    })
  }, [repairs, search])

  const boardData = useMemo(() => {
    return kanbanColumns.map((column) => ({
      ...column,
      items: filteredRepairs.filter((repair) => repair.status === column.status),
      totalValue: filteredRepairs
        .filter((repair) => repair.status === column.status)
        .reduce((sum, repair) => sum + getRepairTotal(repair), 0),
    }))
  }, [filteredRepairs])

  const pendingCount = repairs.filter((repair) => repair.status === 'PENDING').length
  const diagnosisCount = repairs.filter((repair) => repair.status === 'DIAGNOSIS').length
  const inProgressCount = repairs.filter((repair) => repair.status === 'IN_PROGRESS').length
  const readyCount = repairs.filter((repair) => repair.status === 'READY').length
  const quoteWaitingCount = repairs.filter(
    (repair) => repair.status === 'DIAGNOSIS' && getRepairTotal(repair) > 0
  ).length
  const lowStockParts = parts.filter((part) => part.stock <= 2)
  const totalOpenRevenue = repairs
    .filter((repair) => ['PENDING', 'DIAGNOSIS', 'IN_PROGRESS', 'READY'].includes(repair.status))
    .reduce((total, repair) => total + getRepairTotal(repair), 0)

  async function createClient(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsSavingClient(true)
      setError(null)

      await apiRequest<Client>(
        '/api/clients',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clientForm),
        },
        'Impossible de créer le client.'
      )

      setShowClientModal(false)
      setClientForm(initialClientForm)
      await loadDashboard()
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : 'Impossible de créer le client.'
      )
    } finally {
      setIsSavingClient(false)
    }
  }

  async function createQuickFlow(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsSavingFlow(true)
      setError(null)

      const data = await apiRequest<Repair>(
        '/api/repairs',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(quickFlowForm),
        },
        'Impossible de créer le ticket.'
      )

      setShowQuickFlowModal(null)
      setQuickFlowForm(initialQuickFlowForm)
      await loadDashboard()

      if (showQuickFlowModal === 'quote' && data?.id) {
        router.push(`/billing?repairId=${data.id}&mode=devis`)
        return
      }

      if (data?.id) {
        setSelectedRepairId(data.id)
      }
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : 'Impossible de créer le ticket.'
      )
    } finally {
      setIsSavingFlow(false)
    }
  }

  async function moveRepairToStatus(repairId: string, nextStatus: KanbanStatus) {
    const currentRepair = repairs.find((repair) => repair.id === repairId)

    if (!currentRepair || currentRepair.status === nextStatus) {
      setHoveredStatus(null)
      return
    }

    const previousRepairs = repairs
    const optimisticRepair: Repair = {
      ...currentRepair,
      status: nextStatus,
      updatedAt: new Date().toISOString(),
    }

    setRepairs((currentRepairs) =>
      currentRepairs.map((repair) => (repair.id === repairId ? optimisticRepair : repair))
    )
    setSelectedRepairId(repairId)
    setHoveredStatus(null)

    try {
      setError(null)

      const data = await apiRequest<Repair>(
        `/api/repairs/${repairId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: nextStatus,
            notes: currentRepair.notes ?? '',
            comment: `Déplacé dans la colonne ${getRepairStatusLabel(nextStatus)} depuis le tableau de bord.`,
          }),
        },
        'Impossible de déplacer le ticket.'
      )

      setRepairs((currentRepairs) =>
        currentRepairs.map((repair) => (repair.id === repairId ? data : repair))
      )
    } catch (moveError) {
      setRepairs(previousRepairs)
      setError(
        moveError instanceof Error ? moveError.message : 'Impossible de déplacer le ticket.'
      )
    }
  }

  function toggleService(serviceId: string) {
    setQuickFlowForm((current) => {
      const exists = current.serviceIds.includes(serviceId)
      return {
        ...current,
        serviceIds: exists
          ? current.serviceIds.filter((id) => id !== serviceId)
          : [...current.serviceIds, serviceId],
      }
    })
  }

  function resetClientModal() {
    setClientForm(initialClientForm)
    setShowClientModal(false)
  }

  function resetQuickFlowModal() {
    setQuickFlowForm(initialQuickFlowForm)
    setShowQuickFlowModal(null)
  }

  return (
    <>
      <div className="space-y-6 pb-8">
        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.65fr)]">
          <div className="rounded-[2rem] border border-white/80 bg-slate-950 px-5 py-6 text-white shadow-[0_28px_80px_-36px_rgba(15,23,42,0.5)] sm:px-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.32em] text-blue-300">
                  Workflow atelier
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-[1.9rem]">
                  Un dashboard pensé pour faire avancer les dossiers vite.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                  Créez un client, ouvrez un ticket, lancez un devis et pilotez le flux atelier depuis
                  un seul écran, avec un kanban central, lisible et réactif.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <QuickActionCard
                  icon={<UserPlus className="h-5 w-5" />}
                  title="Nouveau client"
                  description="Créer une fiche sans quitter le dashboard"
                  tone="light"
                  onClick={() => {
                    setError(null)
                    setShowClientModal(true)
                  }}
                />
                <QuickActionCard
                  icon={<FilePlus2 className="h-5 w-5" />}
                  title="Nouveau devis"
                  description="Créer un dossier et ouvrir le devis"
                  tone="brand"
                  onClick={() => {
                    setError(null)
                    setShowQuickFlowModal('quote')
                  }}
                />
                <QuickActionCard
                  icon={<Plus className="h-5 w-5" />}
                  title="Nouveau ticket"
                  description="Démarrer une intervention atelier"
                  tone="dark"
                  onClick={() => {
                    setError(null)
                    setShowQuickFlowModal('repair')
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            <StatCard
              icon={<Wrench className="h-5 w-5" />}
              title="Tickets ouverts"
              value={pendingCount + diagnosisCount + inProgressCount + readyCount}
              subtitle="Vision instantanée de la charge atelier"
            />
            <StatCard
              icon={<FileText className="h-5 w-5" />}
              title="Devis à traiter"
              value={quoteWaitingCount}
              subtitle="Dossiers au stade diagnostic"
            />
            <StatCard
              icon={<Package className="h-5 w-5" />}
              title="Stock faible"
              value={lowStockParts.length}
              subtitle="Pièces à surveiller rapidement"
            />
            <StatCard
              icon={<CheckCircle2 className="h-5 w-5" />}
              title="Montant ouvert"
              value={formatCurrency(totalOpenRevenue)}
              subtitle="Total cumulé des dossiers actifs"
              compactValue
            />
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur sm:p-6">
          <div className="flex flex-col gap-4 2xl:flex-row 2xl:items-end 2xl:justify-between">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.3em] text-blue-600">
                Tableau principal
              </p>
              <h2 className="mt-2 text-[1.65rem] font-black tracking-tight text-slate-950">
                Kanban des tickets d’intervention
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Le kanban occupe toute la largeur du dashboard pour rester visible, rapide à lire,
                déplaçable et directement exploitable au comptoir comme à l’atelier.
              </p>
            </div>

            <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
              <label className="flex min-w-[290px] items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Rechercher client, ticket, statut ou prestation"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </label>

              <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
                <button
                  type="button"
                  onClick={() => setDensity('detail')}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    density === 'detail'
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Vue détaillée
                </button>
                <button
                  type="button"
                  onClick={() => setDensity('compact')}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    density === 'compact'
                      ? 'bg-white text-slate-950 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Vue compacte
                </button>
              </div>
            </div>
          </div>

          {error ? (
            <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {error}
            </div>
          ) : null}

          {isLoading ? (
            <div className="mt-6 flex min-h-[360px] items-center justify-center rounded-[1.6rem] border border-dashed border-slate-200 bg-slate-50 text-slate-500">
              <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              Chargement du kanban...
            </div>
          ) : (
            <div className="scrollbar-thin mt-6 overflow-x-auto pb-2">
              <div className="grid min-w-[1240px] grid-cols-4 gap-4">
                {boardData.map((column) => {
                  const isDropTarget = hoveredStatus === column.status

                  return (
                    <section
                      key={column.status}
                      onDragOver={(event) => {
                        event.preventDefault()
                        setHoveredStatus(column.status)
                      }}
                      onDragLeave={() => {
                        if (hoveredStatus === column.status) {
                          setHoveredStatus(null)
                        }
                      }}
                      onDrop={async () => {
                        if (!draggedRepairId) {
                          return
                        }
                        await moveRepairToStatus(draggedRepairId, column.status)
                        setDraggedRepairId(null)
                      }}
                      className={`flex min-h-[620px] flex-col rounded-[1.75rem] border border-slate-200/80 bg-slate-50/70 p-3 transition ${
                        isDropTarget ? `ring-2 ${column.ring}` : ''
                      }`}
                    >
                      <div className="border-b border-slate-200/80 px-1 pb-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-3">
                              <span
                                className={`h-10 w-1.5 shrink-0 rounded-full ${column.accent}`}
                                aria-hidden="true"
                              />
                              <div className="min-w-0">
                                <div className="flex items-center gap-3">
                                  <h3 className="text-[1.05rem] font-black tracking-tight text-slate-950">
                                    {column.title}
                                  </h3>
                                  <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-slate-100 px-2 text-xs font-bold text-slate-700">
                                    {column.items.length}
                                  </span>
                                </div>
                                <p className="mt-0.5 text-sm text-slate-500">{column.subtitle}</p>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-right">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                              Valeur
                            </p>
                            <p className="text-sm font-bold text-slate-950">
                              {formatCurrency(column.totalValue)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex-1 space-y-3">
                        {column.items.length === 0 ? (
                          <div
                            className={`flex min-h-[180px] items-center justify-center rounded-[1.4rem] border border-dashed px-4 text-center text-sm ${
                              isDropTarget
                                ? 'border-slate-300 bg-white text-slate-600'
                                : 'border-slate-200 bg-white/70 text-slate-400'
                            }`}
                          >
                            Déposez un ticket ici ou laissez la colonne vide pour l’instant.
                          </div>
                        ) : null}

                        {column.items.map((repair) => {
                          const total = getRepairTotal(repair)
                          const isSelected = selectedRepairId === repair.id
                          const summary = getRepairSummary(repair)

                          return (
                            <article
                              key={repair.id}
                              draggable
                              onDragStart={() => setDraggedRepairId(repair.id)}
                              onDragEnd={() => {
                                setDraggedRepairId(null)
                                setHoveredStatus(null)
                              }}
                              onClick={() => setSelectedRepairId(repair.id)}
                              className={`group rounded-[1.45rem] border bg-white p-4 shadow-[0_16px_35px_-28px_rgba(15,23,42,0.35)] transition ${
                                isSelected
                                  ? `border-transparent ${column.accentSoft} ring-2 ${column.ring}`
                                  : 'border-slate-200/80 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_22px_40px_-28px_rgba(15,23,42,0.4)]'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="text-sm font-black tracking-tight text-emerald-500">
                                    {getTicketReference(repair)}
                                  </p>
                                  <p className="mt-2 line-clamp-1 text-[1.05rem] font-semibold text-slate-950">
                                    {repair.client.name}
                                  </p>
                                  <p className="mt-1 text-sm text-slate-500">{repair.client.phone}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={(event) => {
                                      event.stopPropagation()
                                      router.push(`/repairs?repairId=${repair.id}`)
                                    }}
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                                  >
                                    Modifier
                                  </button>
                                  <span className="rounded-xl bg-slate-100 p-2 text-slate-400">
                                    <GripVertical className="h-4 w-4" />
                                  </span>
                                </div>
                              </div>

                              <div className="mt-4 flex items-center justify-between gap-3">
                                <span
                                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getRepairStatusStyle(
                                    repair.status
                                  )}`}
                                >
                                  {getRepairStatusLabel(repair.status)}
                                </span>
                                <span className="text-sm font-semibold text-slate-400">
                                  {formatDate(repair.updatedAt)}
                                </span>
                              </div>

                              <div className="mt-4 rounded-2xl bg-slate-50 px-3 py-3">
                                <p className="line-clamp-2 text-sm font-medium leading-6 text-slate-700">
                                  {summary}
                                </p>
                              </div>

                              {density === 'detail' ? (
                                <>
                                  <div className="mt-3 flex items-start gap-2 text-sm text-slate-600">
                                    <StickyNote className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                                    <p className="line-clamp-2">
                                      {repair.notes?.trim() || 'Aucune note enregistrée sur ce ticket.'}
                                    </p>
                                  </div>

                                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                                    <div>
                                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-slate-400">
                                        Total estimé
                                      </p>
                                      <p className="mt-2 text-lg font-black tracking-tight text-slate-950">
                                        {formatCurrency(total)}
                                      </p>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(event) => {
                                        event.stopPropagation()
                                        router.push(`/repairs?repairId=${repair.id}`)
                                      }}
                                      className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
                                    >
                                      Ouvrir
                                      <ArrowRight className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                                  <span className="text-slate-500">{repair.services.length} prestation(s)</span>
                                  <span className="font-bold text-slate-950">{formatCurrency(total)}</span>
                                </div>
                              )}
                            </article>
                          )
                        })}
                      </div>
                    </section>
                  )
                })}
              </div>
            </div>
          )}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-blue-600">
                  Ticket sélectionné
                </p>
                <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                  Focus intervention
                </h2>
              </div>

              {selectedRepair ? (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => router.push(`/repairs?repairId=${selectedRepair.id}`)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                  >
                    <PencilLine className="h-4 w-4" />
                    Modifier le ticket
                  </button>
                  <Link
                    href={`/billing?repairId=${selectedRepair.id}&mode=devis`}
                    className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                  >
                    Ouvrir le devis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : null}
            </div>

            {selectedRepair ? (
              <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
                <div className="rounded-[1.6rem] bg-slate-950 px-5 py-5 text-white">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black tracking-tight text-emerald-300">
                        {getTicketReference(selectedRepair)}
                      </p>
                      <p className="mt-2 text-2xl font-black tracking-tight">
                        {selectedRepair.client.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-300">{selectedRepair.client.phone}</p>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getRepairStatusStyle(
                        selectedRepair.status
                      )}`}
                    >
                      {getRepairStatusLabel(selectedRepair.status)}
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <MetricMini label="Créé le" value={formatDate(selectedRepair.createdAt)} />
                    <MetricMini label="Mis à jour" value={formatDate(selectedRepair.updatedAt)} />
                    <MetricMini label="Prestations" value={String(selectedRepair.services.length)} />
                    <MetricMini
                      label="Montant"
                      value={formatCurrency(getRepairTotal(selectedRepair))}
                    />
                  </div>

                  <div className="mt-5 rounded-[1.4rem] bg-white/8 px-4 py-4">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-slate-400">
                      Notes atelier
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-100">
                      {selectedRepair.notes?.trim() || 'Aucune note enregistrée pour ce ticket.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-slate-400">
                      Prestations prévues
                    </p>
                    <div className="mt-4 space-y-2">
                      {selectedRepair.services.map((serviceLine) => (
                        <div
                          key={`${selectedRepair.id}-${serviceLine.service.id}`}
                          className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-medium">{serviceLine.service.name}</span>
                            <span className="text-slate-500">x{serviceLine.quantity ?? 1}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.6rem] border border-slate-200 bg-slate-50 p-4">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-slate-400">
                      Historique récent
                    </p>
                    <div className="mt-4 space-y-2">
                      {(selectedRepair.logs ?? []).slice(0, 4).map((log) => (
                        <div
                          key={log.id}
                          className="rounded-2xl bg-white px-4 py-3 text-sm shadow-sm"
                        >
                          <p className="font-semibold text-slate-900">
                            {getRepairStatusLabel(log.status)}
                          </p>
                          <p className="mt-1 text-slate-500">
                            {log.comment?.trim() || 'Mise à jour sans commentaire.'}
                          </p>
                          <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                            {formatDate(log.createdAt)}
                          </p>
                        </div>
                      ))}

                      {(selectedRepair.logs ?? []).length === 0 ? (
                        <div className="rounded-2xl bg-white px-4 py-6 text-sm text-slate-500 shadow-sm">
                          Aucun historique disponible pour ce ticket.
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-[1.5rem] border border-dashed border-slate-200 bg-slate-50 px-4 py-12 text-center text-sm text-slate-500">
                Sélectionnez un ticket dans le kanban pour afficher ses informations rapides.
              </div>
            )}
          </div>

          <aside className="space-y-5">
            <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-blue-600">
                    Priorités atelier
                  </p>
                  <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                    Points d’attention
                  </h2>
                </div>
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>

              <div className="mt-5 space-y-3">
                <AlertItem
                  title={`${readyCount} appareil(s) terminé(s)`}
                  description="À contacter ou restituer rapidement pour garder un flux atelier propre."
                />
                <AlertItem
                  title={`${quoteWaitingCount} devis à valider`}
                  description="Les dossiers en diagnostic doivent avancer vite pour éviter les blocages."
                />
                <AlertItem
                  title={`${lowStockParts.length} pièce(s) en stock faible`}
                  description={
                    lowStockParts.length > 0
                      ? lowStockParts
                          .slice(0, 3)
                          .map((part) => `${part.name} (${part.stock})`)
                          .join(' • ')
                      : 'Aucune alerte stock critique pour le moment.'
                  }
                  tone={lowStockParts.length > 0 ? 'warning' : 'neutral'}
                />
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)] backdrop-blur sm:p-6">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-blue-600">
                Raccourcis utiles
              </p>
              <div className="mt-4 grid gap-2">
                <Link
                  href="/clients"
                  className="inline-flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  Base clients
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/repairs"
                  className="inline-flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  Gestion complète des tickets
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/billing"
                  className="inline-flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  Facturation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          </aside>
        </section>
      </div>

      {(showClientModal || showQuickFlowModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
          {showClientModal ? (
            <div className="w-full max-w-lg rounded-[2rem] border border-white/70 bg-white p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-blue-600">
                    Action rapide
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                    Créer un client
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Ajoutez la fiche client sans quitter le tableau de bord.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetClientModal}
                  className="rounded-2xl border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-950"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={createClient} className="mt-6 space-y-4">
                <Field label="Nom du client">
                  <input
                    required
                    value={clientForm.name}
                    onChange={(event) =>
                      setClientForm((current) => ({ ...current, name: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white"
                    placeholder="Ex. Jean Dupont"
                  />
                </Field>

                <Field label="Téléphone">
                  <input
                    required
                    value={clientForm.phone}
                    onChange={(event) =>
                      setClientForm((current) => ({ ...current, phone: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white"
                    placeholder="06 00 00 00 00"
                  />
                </Field>

                <Field label="Email">
                  <input
                    type="email"
                    value={clientForm.email}
                    onChange={(event) =>
                      setClientForm((current) => ({ ...current, email: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white"
                    placeholder="optionnel@client.fr"
                  />
                </Field>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetClientModal}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingClient}
                    className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSavingClient ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          ) : null}

          {showQuickFlowModal ? (
            <div className="w-full max-w-3xl rounded-[2rem] border border-white/70 bg-white p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.28em] text-blue-600">
                    Workflow rapide
                  </p>
                  <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                    {showQuickFlowModal === 'quote' ? 'Créer un devis' : 'Créer un ticket'}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Sélectionnez un client, ajoutez les prestations utiles et lancez le dossier sans
                    quitter la page principale.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetQuickFlowModal}
                  className="rounded-2xl border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-950"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={createQuickFlow} className="mt-6 space-y-5">
                <Field label="Client">
                  <select
                    required
                    value={quickFlowForm.clientId}
                    onChange={(event) =>
                      setQuickFlowForm((current) => ({ ...current, clientId: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white"
                  >
                    <option value="">Sélectionner un client</option>
                    {clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name} — {client.phone}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Prestations">
                  <div className="grid max-h-[300px] gap-3 overflow-y-auto rounded-[1.5rem] border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2">
                    {services.length > 0 ? (
                      services.map((service) => {
                        const checked = quickFlowForm.serviceIds.includes(service.id)
                        const totalServicePrice =
                          service.laborCost + (service.part?.costPrice ?? 0)

                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => toggleService(service.id)}
                            className={`rounded-[1.3rem] border px-4 py-4 text-left transition ${
                              checked
                                ? 'border-blue-200 bg-blue-50 shadow-sm'
                                : 'border-transparent bg-white hover:border-slate-200'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="font-semibold text-slate-950">{service.name}</p>
                                <p className="mt-1 text-sm text-slate-500">
                                  {service.description?.trim() || 'Prestation atelier'}
                                </p>
                                {service.part ? (
                                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    Pièce liée : {service.part.name}
                                  </p>
                                ) : null}
                              </div>
                              <span className="text-sm font-bold text-slate-900">
                                {formatCurrency(totalServicePrice)}
                              </span>
                            </div>
                          </button>
                        )
                      })
                    ) : (
                      <div className="rounded-[1.25rem] bg-white px-4 py-6 text-sm text-slate-500">
                        Aucun forfait disponible.
                      </div>
                    )}
                  </div>
                </Field>

                <Field label="Notes atelier">
                  <textarea
                    rows={4}
                    value={quickFlowForm.notes}
                    onChange={(event) =>
                      setQuickFlowForm((current) => ({ ...current, notes: event.target.value }))
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white"
                    placeholder="Panne signalée, informations utiles, remarques client..."
                  />
                </Field>

                <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-4">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-slate-400">
                    Total estimé
                  </p>
                  <p className="mt-2 text-xl font-black tracking-tight text-slate-950">
                    {formatCurrency(
                      quickFlowForm.serviceIds.reduce((total, serviceId) => {
                        const service = services.find((item) => item.id === serviceId)
                        return total + (service ? service.laborCost + (service.part?.costPrice ?? 0) : 0)
                      }, 0)
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetQuickFlowModal}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingFlow}
                    className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSavingFlow ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {showQuickFlowModal === 'quote' ? 'Créer et ouvrir le devis' : 'Créer le ticket'}
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      )}
    </>
  )
}

function QuickActionCard({
  icon,
  title,
  description,
  onClick,
  tone,
}: {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
  tone: 'light' | 'brand' | 'dark'
}) {
  const toneClasses =
    tone === 'brand'
      ? 'bg-blue-600 text-white hover:bg-blue-500'
      : tone === 'dark'
        ? 'border border-white/12 bg-white/8 text-white hover:bg-white/12'
        : 'bg-white text-slate-900 hover:-translate-y-0.5'

  const iconClasses =
    tone === 'brand'
      ? 'bg-white/15 text-white'
      : tone === 'dark'
        ? 'bg-white/12 text-white'
        : 'bg-blue-50 text-blue-600'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[1.6rem] px-4 py-4 text-left transition ${toneClasses}`}
    >
      <div className={`mb-3 inline-flex rounded-2xl p-3 ${iconClasses}`}>{icon}</div>
      <p className="font-semibold">{title}</p>
      <p className={`mt-1 text-sm ${tone === 'light' ? 'text-slate-500' : tone === 'brand' ? 'text-blue-100' : 'text-slate-300'}`}>
        {description}
      </p>
    </button>
  )
}

function StatCard({
  icon,
  title,
  value,
  subtitle,
  compactValue = false,
}: {
  icon: React.ReactNode
  title: string
  value: string | number
  subtitle: string
  compactValue?: boolean
}) {
  return (
    <article className="rounded-[1.7rem] border border-white/90 bg-white/88 p-5 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.35)]">
      <div className="inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600">{icon}</div>
      <p className="mt-4 text-sm font-semibold text-slate-500">{title}</p>
      <p
        className={`mt-2 font-black tracking-tight text-slate-950 ${
          compactValue ? 'text-2xl' : 'text-3xl'
        }`}
      >
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
    </article>
  )
}

function MetricMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/8 px-3 py-3">
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  )
}

function AlertItem({
  title,
  description,
  tone = 'warning',
}: {
  title: string
  description: string
  tone?: 'warning' | 'neutral'
}) {
  return (
    <div
      className={`rounded-[1.4rem] border px-4 py-4 ${
        tone === 'warning' ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-slate-50'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 rounded-xl p-2 ${
            tone === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-white text-slate-500'
          }`}
        >
          <AlertTriangle className="h-4 w-4" />
        </div>
        <div>
          <p className="font-semibold text-slate-950">{title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      {children}
    </label>
  )
}
