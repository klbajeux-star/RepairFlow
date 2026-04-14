'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FilePlus2,
  FileText,
  Gamepad2,
  GripVertical,
  Loader2,
  Monitor,
  Package,
  PencilLine,
  Plus,
  Search,
  StickyNote,
  Smartphone,
  Tablet,
  User,
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
import { SideDrawer } from '@/components/side-drawer'

type KanbanStatus = 'PENDING' | 'DIAGNOSIS' | 'IN_PROGRESS' | 'READY'
type QuickFlowMode = 'repair' | 'quote'
type BoardDensity = 'compact' | 'detail'
type WorkflowStep = 'client' | 'device' | 'services' | 'summary' | 'signature'



function SignaturePad({ onSign }: { onSign: (data: string) => void }) {
  const [isDrawing, setIsDrawing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  function getPos(e: any) {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const clientX = e.clientX || e.touches?.[0]?.clientX || 0
    const clientY = e.clientY || e.touches?.[0]?.clientY || 0
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  function startDrawing(e: any) {
    setIsDrawing(true)
    const pos = getPos(e)
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
    }
  }

  function draw(e: any) {
    if (!isDrawing) return
    const pos = getPos(e)
    const ctx = canvasRef.current?.getContext('2d')
    if (ctx) {
      ctx.lineTo(pos.x, pos.y)
      ctx.strokeStyle = '#2563eb'
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.stroke()
    }
  }

  function stopDrawing() {
    setIsDrawing(false)
    if (canvasRef.current) {
      onSign(canvasRef.current.toDataURL())
    }
  }

  function clear() {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
      onSign('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[1.5rem] border-2 border-dashed border-slate-200 bg-slate-50">
        <canvas
          ref={canvasRef}
          width={400}
          height={180}
          className="h-[180px] w-full touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <button
          type="button"
          onClick={clear}
          className="absolute right-4 top-4 rounded-lg bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 shadow-sm transition hover:text-red-500"
        >
          Effacer
        </button>
      </div>
      <p className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-400">
        Signez ci-dessus pour acceptation des conditions
      </p>
    </div>
  )
}

interface DeviceBrand {
  id: string
  name: string
}

interface DeviceType {
  id: string
  name: string
}

interface DeviceModel {
  id: string
  name: string
  brandId: string
  typeId: string
  brand: DeviceBrand
  type: DeviceType
}

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
  modelId?: string | null
  model?: DeviceModel | null
}

interface Service {
  id: string
  name: string
  laborCost: number
  description?: string | null
  modelId?: string | null
  model?: DeviceModel | null
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
  const [models, setModels] = useState<DeviceModel[]>([])
  const [selectedRepairId, setSelectedRepairId] = useState<string | null>(null)
  const [draggedRepairId, setDraggedRepairId] = useState<string | null>(null)
  const [hoveredStatus, setHoveredStatus] = useState<KanbanStatus | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [workflowStep, setWorkflowStep] = useState<WorkflowStep>('client')
  const [drawerMode, setDrawerMode] = useState<QuickFlowMode>('repair')
  const [showNewClientForm, setShowNewClientForm] = useState(false)
  const [clientSearch, setClientSearch] = useState('')
  const [showModelSuggestions, setShowModelSuggestions] = useState(false)
  const [signatureData, setSignatureData] = useState('')
  const [deviceForm, setDeviceForm] = useState({
    model: '',
    modelId: '',
    imei: '',
    unlockCode: '',
    condition: 5,
  })
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

      const [repairsResult, clientsResult, partsResult, servicesResult, modelsResult] =
        await Promise.allSettled([
          apiRequest<Repair[]>('/api/repairs', {}, 'Impossible de charger les réparations.'),
          apiRequest<Client[]>('/api/clients', {}, 'Impossible de charger les clients.'),
          apiRequest<Part[]>('/api/parts', {}, 'Impossible de charger le stock.'),
          apiRequest<Service[]>('/api/services', {}, 'Impossible de charger les forfaits.'),
          apiRequest<DeviceModel[]>('/api/models', {}, 'Impossible de charger les modèles.'),
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
      const nextModels =
        modelsResult.status === 'fulfilled' && Array.isArray(modelsResult.value)
          ? modelsResult.value
          : []

      const nonBlockingErrors = [partsResult, servicesResult, modelsResult]
        .filter((result) => result.status === 'rejected')
        .map((result) => (result as PromiseRejectedResult).reason)
        .map((reason) =>
          reason instanceof Error
            ? reason.message
            : 'Une partie du tableau de bord est indisponible.'
        )

      setRepairs(nextRepairs)
      setClients(nextClients)
      setParts(nextParts)
      setServices(nextServices)
      setModels(nextModels)

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

  const selectedClient = useMemo(() => {
    return clients.find((c) => c.id === quickFlowForm.clientId) ?? null
  }, [clients, quickFlowForm.clientId])

  const filteredClients = useMemo(() => {
    const q = clientSearch.trim().toLowerCase()
    if (!q) return []
    return clients
      .filter((c) => c.name.toLowerCase().includes(q) || c.phone.includes(q))
      .slice(0, 5)
  }, [clients, clientSearch])

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

  async function createClient() {
    try {
      setIsSavingClient(true)
      setError(null)

      const data = await apiRequest<Client>(
        '/api/clients',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clientForm),
        },
        'Impossible de créer le client.'
      )

      setQuickFlowForm((prev) => ({ ...prev, clientId: data.id }))
      setClientSearch(data.name)
      setShowNewClientForm(false)
      await loadDashboard()
      setWorkflowStep('device')
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : 'Impossible de créer le client.'
      )
    } finally {
      setIsSavingClient(false)
    }
  }

  async function createQuickFlow() {
    try {
      setIsSavingFlow(true)
      setError(null)

      const notesForApi = `
${quickFlowForm.notes}

--- 
APPAREIL : ${deviceForm.model}
IMEI : ${deviceForm.imei}
CODE : ${deviceForm.unlockCode}
ÉTAT : ${deviceForm.condition}/5
SIGNATURE : ${signatureData ? 'REÇUE' : 'ABSENTE'}
`.trim()

      const data = await apiRequest<Repair>(
        '/api/repairs',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...quickFlowForm,
            notes: notesForApi,
          }),
        },
        'Impossible de créer le ticket.'
      )

      resetWorkflow()
      await loadDashboard()

      if (drawerMode === 'quote' && data?.id) {
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

  async function deleteRepair(repairId: string) {
    if (!confirm('Voulez-vous vraiment supprimer ce ticket ? Cette action est irréversible.')) {
      return
    }

    try {
      setIsLoading(true)
      setError(null)
      const res = await fetch(`/api/repairs/${repairId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Impossible de supprimer le ticket.')
      }

      setRepairs((current) => current.filter((r) => r.id !== repairId))
      setSelectedRepairId(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    } finally {
      setIsLoading(false)
    }
  }

  async function archiveRepair(repairId: string) {
    const repair = repairs.find((r) => r.id === repairId)
    if (!repair) return

    try {
      setIsLoading(true)
      setError(null)
      const res = await fetch(`/api/repairs/${repairId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'ARCHIVED',
          notes: repair.notes || '',
          comment: 'Dossier archivé par l’utilisateur.',
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Impossible d’archiver le ticket.')
      }

      const updatedRepair = await res.json()
      setRepairs((current) => current.map((r) => (r.id === repairId ? updatedRepair : r)))
      setSelectedRepairId(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    } finally {
      setIsLoading(false)
    }
  }



  function resetWorkflow() {
    setDrawerOpen(false)
    setWorkflowStep('client')
    setShowNewClientForm(false)
    setClientForm(initialClientForm)
    setQuickFlowForm(initialQuickFlowForm)
    setClientSearch('')
    setShowModelSuggestions(false)
    setSignatureData('')
    setDeviceForm({ model: '', modelId: '', imei: '', unlockCode: '', condition: 5 })
    setError(null)
  }

  function openWorkflow(mode: QuickFlowMode) {
    resetWorkflow()
    setDrawerMode(mode)
    setDrawerOpen(true)
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
                  onClick={() => openWorkflow('repair')}
                />
                <QuickActionCard
                  icon={<FilePlus2 className="h-5 w-5" />}
                  title="Nouveau devis"
                  description="Créer un dossier et ouvrir le devis"
                  tone="brand"
                  onClick={() => openWorkflow('quote')}
                />
                <QuickActionCard
                  icon={<Plus className="h-5 w-5" />}
                  title="Nouveau ticket"
                  description="Démarrer une intervention atelier"
                  tone="dark"
                  onClick={() => openWorkflow('repair')}
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
            onClick={() => router.push('/repairs')}
            />
            <StatCard
              icon={<FileText className="h-5 w-5" />}
              title="Devis à traiter"
              value={quoteWaitingCount}
              subtitle="Dossiers au stade diagnostic"
            onClick={() => router.push('/billing')}
            />
            <StatCard
              icon={<Package className="h-5 w-5" />}
              title="Stock faible"
              value={lowStockParts.length}
              subtitle="Pièces à surveiller rapidement"
            onClick={() => router.push('/inventory')}
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
                    onClick={() => deleteRepair(selectedRepair.id)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 hover:text-rose-700 shadow-sm"
                  >
                    <X className="h-4 w-4" />
                    Supprimer
                  </button>
                  {selectedRepair.status !== 'ARCHIVED' && (
                    <button
                      type="button"
                      onClick={() => archiveRepair(selectedRepair.id)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950 shadow-sm"
                    >
                      <Package className="h-4 w-4" />
                      Archiver
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => router.push(`/repairs?repairId=${selectedRepair.id}`)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950 shadow-sm"
                  >
                    <PencilLine className="h-4 w-4" />
                    Modifier
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
                      {(selectedRepair.logs ?? []).slice(0, 4).map((log) => {
                        const vividColors = {
                          PENDING: 'bg-amber-500',
                          DIAGNOSIS: 'bg-sky-500',
                          IN_PROGRESS: 'bg-violet-500',
                          READY: 'bg-emerald-500',
                          DELIVERED: 'bg-slate-500',
                          CANCELLED: 'bg-rose-500',
                          ARCHIVED: 'bg-slate-400',
                        }
                        const accentColor = vividColors[log.status] || 'bg-slate-400'

                        return (
                          <div
                            key={log.id}
                            className="group relative overflow-hidden rounded-2xl bg-white pl-7 pr-4 py-3 text-sm shadow-sm transition-all hover:shadow-md"
                          >
                            <div className={`absolute left-0 top-0 h-full w-2 ${accentColor}`} />
                            <div className="flex items-center justify-between gap-3">
                              <p className="font-black tracking-tight text-slate-950 uppercase text-[0.85rem]">
                                {getRepairStatusLabel(log.status)}
                              </p>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                {formatDate(log.createdAt)}
                              </p>
                            </div>
                            <p className="mt-1.5 leading-relaxed text-slate-600 font-medium">
                              {log.comment?.trim() || 'Mise à jour sans commentaire.'}
                            </p>
                          </div>
                        )
                      })}

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

      <SideDrawer
        isOpen={drawerOpen}
        onClose={resetWorkflow}
        title={
          workflowStep === 'client'
            ? 'Sélection Client'
            : workflowStep === 'device'
              ? 'Appareil'
              : workflowStep === 'services'
                ? 'Prestations'
                : workflowStep === 'summary'
                  ? 'Résumé'
                  : 'Validation & Signature'
        }
        subtitle={drawerMode === 'quote' ? 'Nouveau Devis' : 'Nouveau Ticket'}
        footer={
          <div className="flex items-center justify-between">
            {workflowStep !== 'client' ? (
              <button
                type="button"
                onClick={() => {
                  if (workflowStep === 'device') setWorkflowStep('client')
                  if (workflowStep === 'services') setWorkflowStep('device')
                  if (workflowStep === 'summary') setWorkflowStep('services')
                  if (workflowStep === 'signature') setWorkflowStep('summary')
                }}
                className="flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-4">
              {workflowStep !== 'signature' ? (
                <button
                  type="button"
                  disabled={
                    (workflowStep === 'client' && !quickFlowForm.clientId) ||
                    (workflowStep === 'device' && !deviceForm.model)
                  }
                  onClick={() => {
                    if (workflowStep === 'client') setWorkflowStep('device')
                    else if (workflowStep === 'device') setWorkflowStep('services')
                    else if (workflowStep === 'services') setWorkflowStep('summary')
                    else if (workflowStep === 'summary') setWorkflowStep('signature')
                  }}
                  className="flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-600 disabled:opacity-30"
                >
                  Suivant
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={createQuickFlow}
                  disabled={isSavingFlow || !signatureData}
                  className="flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSavingFlow ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {drawerMode === 'quote' ? 'Générer le devis' : 'Valider & Ouvrir'}
                </button>
              )}
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          <StepIndicator
            current={
              workflowStep === 'client'
                ? 1
                : workflowStep === 'device'
                  ? 2
                  : workflowStep === 'services'
                    ? 3
                    : workflowStep === 'summary'
                      ? 4
                      : 5
            }
            total={5}
          />

          {workflowStep === 'client' && (
            <div className="space-y-6">
              <SectionTitle label="Étape 1" title="Qui est le client ?" icon={<User className="h-5 w-5" />} />
              
              {!showNewClientForm ? (
                <>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      autoFocus
                      value={clientSearch}
                      onChange={(e) => setClientSearch(e.target.value)}
                      placeholder="Rechercher par nom ou téléphone..."
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50 py-4 pl-12 pr-4 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-50/50"
                    />
                  </div>

                  {filteredClients.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Résultats</p>
                      {filteredClients.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setQuickFlowForm(prev => ({ ...prev, clientId: c.id }))
                            setClientSearch(c.name)
                          }}
                          className={`flex w-full items-center justify-between rounded-2xl border p-4 transition ${
                            quickFlowForm.clientId === c.id
                              ? 'border-blue-200 bg-blue-50/50 ring-2 ring-blue-100'
                              : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                          }`}
                        >
                          <div className="text-left">
                            <p className="font-bold text-slate-950">{c.name}</p>
                            <p className="text-sm text-slate-500">{c.phone}</p>
                          </div>
                          {quickFlowForm.clientId === c.id && <CheckCircle2 className="h-5 w-5 text-blue-600" />}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center transition-all hover:bg-slate-50/50">
                    <p className="text-sm text-slate-500">Le client n'existe pas encore ?</p>
                    <button
                      onClick={() => {
                        setError(null)
                        setShowNewClientForm(true)
                      }}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline"
                    >
                      <UserPlus className="h-4 w-4" />
                      Créer une nouvelle fiche
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-5 rounded-[2rem] border border-blue-100 bg-blue-50/30 p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.65rem] font-bold uppercase tracking-widest text-blue-600">Nouveau Client</p>
                    <button onClick={() => setShowNewClientForm(false)} className="text-xs font-bold text-slate-400 hover:text-slate-900">
                      Annuler
                    </button>
                  </div>
                  <div className="space-y-4">
                    <Field label="Nom complet">
                      <input 
                        value={clientForm.name} 
                        onChange={e => setClientForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full rounded-2xl border border-slate-100 bg-white px-4 py-3 outline-none focus:border-blue-200"
                        placeholder="Ex: Marc Lefebvre"
                      />
                    </Field>
                    <Field label="Téléphone">
                      <input 
                        value={clientForm.phone} 
                        onChange={e => setClientForm(p => ({ ...p, phone: e.target.value }))}
                        className="w-full rounded-2xl border border-slate-100 bg-white px-4 py-3 outline-none focus:border-blue-200"
                        placeholder="06 00 00 00 00"
                      />
                    </Field>
                    <Field label="Email (optionnel)">
                      <input 
                        value={clientForm.email} 
                        onChange={e => setClientForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full rounded-2xl border border-slate-100 bg-white px-4 py-3 outline-none focus:border-blue-200"
                        placeholder="contact@client.com"
                      />
                    </Field>
                    <button 
                      onClick={createClient}
                      disabled={isSavingClient || !clientForm.name || !clientForm.phone}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-50 shadow-lg shadow-blue-600/20"
                    >
                      {isSavingClient ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                      Enregistrer et continuer
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {workflowStep === 'device' && (
            <div className="space-y-6">
              <SectionTitle label="Étape 2" title="Quel est l'appareil ?" icon={<Smartphone className="h-5 w-5" />} />
              
              <div className="grid gap-5">
                <div className="relative">
                  <Field label="Modèle de l'appareil">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        value={deviceForm.model}
                        onChange={(e) => {
                          setDeviceForm((prev) => ({ ...prev, model: e.target.value, modelId: '' }))
                          setShowModelSuggestions(true)
                        }}
                        placeholder="Chercher ou saisir un modèle..."
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50 py-4 pl-12 pr-4 outline-none transition focus:border-blue-200 focus:bg-white"
                      />
                    </div>
                  </Field>
                  {showModelSuggestions &&
                    deviceForm.model.length > 1 &&
                    models.filter((m) =>
                      `${m.brand.name} ${m.name}`.toLowerCase().includes(deviceForm.model.toLowerCase())
                    ).length > 0 && (
                      <div className="absolute z-10 mt-2 w-full rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
                        {models
                          .filter((m) =>
                            `${m.brand.name} ${m.name}`
                              .toLowerCase()
                              .includes(deviceForm.model.toLowerCase())
                          )
                          .slice(0, 5)
                          .map((m) => (
                            <button
                              key={m.id}
                              onClick={() => {
                                setDeviceForm((prev) => ({
                                  ...prev,
                                  model: `${m.brand.name} ${m.name}`,
                                  modelId: m.id,
                                }))
                                setShowModelSuggestions(false)
                              }}
                              className="flex w-full items-center gap-2 rounded-xl p-3 text-sm font-bold text-slate-700 hover:bg-slate-50 text-left"
                            >
                                <TypeIcon type={m.type.name} className="h-4 w-4 text-slate-400" /> {m.brand.name} {m.name}
                             </button>
                          ))}
                     </div>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="IMEI / Numéro de série">
                    <input
                      value={deviceForm.imei}
                      onChange={(e) => setDeviceForm(prev => ({ ...prev, imei: e.target.value }))}
                      placeholder="15 chiffres"
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-200 focus:bg-white"
                    />
                  </Field>
                  <Field label="Code de déverrouillage">
                    <input
                      value={deviceForm.unlockCode}
                      onChange={(e) => setDeviceForm(prev => ({ ...prev, unlockCode: e.target.value }))}
                      placeholder="ex: 123456"
                      className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-200 focus:bg-white"
                    />
                  </Field>
                </div>

                <Field label={`État cosmétique : ${deviceForm.condition}/5`}>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={deviceForm.condition}
                    onChange={(e) => setDeviceForm(prev => ({ ...prev, condition: parseInt(e.target.value) }))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-100 accent-blue-600"
                  />
                  <div className="mt-2 flex justify-between text-[0.6rem] font-bold uppercase tracking-widest text-slate-400">
                    <span>Médiocre</span>
                    <span>Excellent</span>
                  </div>
                </Field>
              </div>
            </div>
          )}

          {workflowStep === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <SectionTitle label="Étape 3" title="Prestations" icon={<Wrench className="h-5 w-5" />} />
                {deviceForm.model && (
                  <span className="rounded-lg bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-blue-600 ring-1 ring-inset ring-blue-200">
                    Filtre : {deviceForm.model}
                  </span>
                )}
              </div>
              
              <div className="grid gap-3 sm:grid-cols-2">
                {services
                  .filter((s) => {
                    if (deviceForm.modelId) {
                      return s.modelId === deviceForm.modelId || !s.modelId
                    }
                    return !s.modelId
                  }).length > 0 ? (
                  services
                    .filter((s) => {
                      if (deviceForm.modelId) {
                        return s.modelId === deviceForm.modelId || !s.modelId
                      }
                      return !s.modelId
                    })
                    .map((s) => {
                      const isSelected = quickFlowForm.serviceIds.includes(s.id)
                      const totalPrice = s.suggestedPrice || (s.laborCost + (s.part?.costPrice ?? 0))
                      return (
                        <button
                          key={s.id}
                          onClick={() => toggleService(s.id)}
                          className={`flex flex-col rounded-2xl border p-4 text-left transition ${
                            isSelected
                              ? 'border-blue-200 bg-blue-50/50 ring-2 ring-blue-100'
                              : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <span className={`rounded-lg p-2 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                              <Plus className="h-4 w-4" />
                            </span>
                            <span className="text-sm font-bold text-slate-900">{formatCurrency(totalPrice)}</span>
                          </div>
                          <p className="mt-4 font-bold text-slate-950">{s.name}</p>
                          <div className="mt-1 flex items-center gap-2">
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.duration || 30} min</p>
                             <p className="text-xs text-slate-500 line-clamp-1">— {s.description || 'Intervention atelier'}</p>
                          </div>
                        </button>
                      )
                    })
                ) : (
                  <div className="col-span-full rounded-2xl border border-dashed border-slate-200 p-8 text-center">
                    <p className="text-sm font-bold text-slate-400">Aucune prestation spécifique trouvée pour ce modèle.</p>
                    <p className="mt-1 text-xs text-slate-400">Ajoutez des forfaits universels dans le catalogue.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {workflowStep === 'summary' && (
            <div className="space-y-6">
              <SectionTitle label="Étape 4" title="Finalisation" icon={<StickyNote className="h-5 w-5" />} />
              
              <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-xl">
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Client</p>
                    <p className="text-lg font-bold">{selectedClient?.name || 'Inconnu'}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600/20 text-emerald-400">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Appareil</p>
                    <p className="text-lg font-bold">{deviceForm.model || 'Modèle non spécifié'}</p>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-slate-500">Total estimé</p>
                    <p className="text-2xl font-black text-white">
                      {formatCurrency(
                        quickFlowForm.serviceIds.reduce((total, id) => {
                          const s = services.find(x => x.id === id)
                          return total + (s ? s.suggestedPrice || (s.laborCost + (s.part?.costPrice ?? 0)) : 0)
                        }, 0)
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <Field label="Notes & Observations">
                <textarea
                  rows={4}
                  value={quickFlowForm.notes}
                  onChange={(e) => setQuickFlowForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Informations complémentaires, code promo, urgence..."
                  className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-200 focus:bg-white"
                />
              </Field>
            </div>
          )}

          {workflowStep === 'signature' && (
            <div className="space-y-6">
              <SectionTitle label="Étape 5" title="Signature du client" icon={<PencilLine className="h-5 w-5" />} />
              
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-[11px] leading-relaxed text-slate-500">
                  En signant, le client reconnaît avoir pris connaissance des conditions générales de réparation 
                  et valide l'état cosmétique de l'appareil mentionné à l'étape 2.
                </p>
              </div>

              <SignaturePad onSign={setSignatureData} />
            </div>
          )}
        </div>
      </SideDrawer>
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
  onClick,
}: {
  icon: React.ReactNode
  title: string
  value: string | number
  subtitle: string
  compactValue?: boolean;
  onClick?: () => void;
}) {
  return (
    <article 
      onClick={onClick}
      className={`rounded-[1.7rem] border border-white/90 bg-white/88 p-5 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.35)] transition-all ${
        onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_22px_50px_-32px_rgba(15,23,42,0.45)] hover:border-blue-100' : ''
      }`}
    >
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

function TypeIcon({ type, className }: { type: string; className?: string }) {
  const t = type.toLowerCase()
  if (t.includes('phone') || t.includes('mobile')) return <Smartphone className={className} />
  if (t.includes('tablette') || t.includes('tablet')) return <Tablet className={className} />
  if (t.includes('console')) return <Gamepad2 className={className} />
  if (t.includes('ordinateur') || t.includes('pc') || t.includes('laptop')) return <Monitor className={className} />
  return <Smartphone className={className} />
}

function SectionTitle({
  label,
  title,
  icon,
}: {
  label: string
  title: string
  icon?: React.ReactNode
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        {icon && <div className="text-blue-600">{icon}</div>}
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-slate-400">
          {label}
        </p>
      </div>
      <h4 className="mt-1 text-xl font-black tracking-tight text-slate-950">{title}</h4>
    </div>
  )
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
            i < current ? 'bg-blue-600' : 'bg-slate-100'
          }`}
        />
      ))}
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
