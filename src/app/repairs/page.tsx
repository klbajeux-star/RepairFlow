'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  Clock,
  Cpu,
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
  Smartphone,
  Tablet,
  User,
  UserPlus,
  Wrench,
  X,
  ChevronRight,
  StickyNote
} from 'lucide-react'
import {
  formatCurrency,
  formatDate,
  getRepairStatusLabel,
  getRepairStatusStyle,
  getRepairTotal,
  repairStatuses,
} from '@/lib/repair'
import { SideDrawer } from '@/components/side-drawer'
import { generateIntakePDF } from '@/lib/pdf'

// --- Types ---

interface Client {
  id: string
  name: string
  firstName?: string | null
  lastName?: string | null
  clientType?: string | null
  phone: string
  email?: string | null
  address?: string | null
  zipCode?: string | null
  city?: string | null
}

interface Part {
  id: string
  name: string
  costPrice: number
  stock: number
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
  brand: DeviceBrand
  type: DeviceType
}

interface Service {
  id: string
  name: string
  laborCost: number
  suggestedPrice: number
  duration: number
  description?: string | null
  part?: Part | null
}

interface RepairLog {
  id: string
  status: string
  comment?: string | null
  createdAt: string
}

interface RepairServiceLine {
  id: string
  priceAtTime: number
  quantity: number
  service: {
    id: string
    name: string
    part?: Part | null
  }
}

interface Repair {
  id: string
  status: string
  notes?: string | null
  createdAt: string
  updatedAt: string
  client: Client
  services: RepairServiceLine[]
  logs: RepairLog[]
}

type WorkflowStep = 'client' | 'device' | 'services' | 'summary' | 'signature'
type QuickFlowMode = 'repair' | 'quote'

// --- Components ---

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

function SectionTitle({ label, title, icon }: { label: string; title: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-sm ring-1 ring-inset ring-blue-100/50">
        {icon}
      </div>
      <div>
        <p className="text-[0.65rem] font-black uppercase tracking-[0.24em] text-blue-600">
          {label}
        </p>
        <h3 className="mt-0.5 text-lg font-black tracking-tight text-slate-950">
          {title}
        </h3>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
        {label}
      </label>
      {children}
    </div>
  )
}

// --- Utils ---

async function apiRequest<T>(input: RequestInfo | URL, init?: RequestInit, fallbackMessage?: string) {
  const response = await fetch(input, init)
  const data = await response.json().catch(() => ({}))
  
  if (!response.ok) {
    throw new Error(data.error || fallbackMessage || 'Une erreur est survenue.')
  }
  
  return data as T
}

const initialClientForm = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  clientType: 'Particulier',
  address: '',
  zipCode: '',
  city: '',
}

const initialDeviceForm = {
  model: '',
  modelId: '',
  imei: '',
  unlockCode: '',
  condition: 5,
}

const initialManageForm = {
  status: 'PENDING',
  notes: '',
  comment: '',
}

// --- Main Component ---

function RepairsContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Data States
  const [repairs, setRepairs] = useState<Repair[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [models, setModels] = useState<DeviceModel[]>([])

  // Workflow States
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<QuickFlowMode>('repair')
  const [workflowStep, setWorkflowStep] = useState<WorkflowStep>('client')
  const [clientSearch, setClientSearch] = useState('')
  const [showClientSuggestions, setShowClientSuggestions] = useState(false)
  const [showNewClientForm, setShowNewClientForm] = useState(false)
  const [showModelSuggestions, setShowModelSuggestions] = useState(false)
  const [signatureData, setSignatureData] = useState('')
  
  const [clientForm, setClientForm] = useState(initialClientForm)
  const [deviceForm, setDeviceForm] = useState(initialDeviceForm)
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([])
  const [repairNotes, setRepairNotes] = useState('')
  const [selectedClientId, setSelectedClientId] = useState('')

  // Manage State
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null)
  const [manageForm, setManageForm] = useState(initialManageForm)

  // Global UI State
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const repairIdFromUrl = searchParams?.get('repairId') ?? null

  useEffect(() => {
    void loadData()
  }, [])

  useEffect(() => {
    if (!repairIdFromUrl || repairs.length === 0) return
    if (selectedRepair?.id === repairIdFromUrl) return
    const repairToOpen = repairs.find((repair) => repair.id === repairIdFromUrl)
    if (repairToOpen) openManageModal(repairToOpen, false)
  }, [repairIdFromUrl, repairs])

  async function loadData() {
    try {
      setIsLoading(true)
      const [repairsData, clientsData, servicesData, modelsData] = await Promise.all([
        apiRequest<Repair[]>('/api/repairs'),
        apiRequest<Client[]>('/api/clients'),
        apiRequest<Service[]>('/api/services'),
        apiRequest<DeviceModel[]>('/api/models'),
      ])
      setRepairs(repairsData)
      setClients(clientsData)
      setServices(servicesData)
      setModels(modelsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données.')
    } finally {
      setIsLoading(false)
    }
  }

  function resetWorkflow() {
    setWorkflowStep('client')
    setSelectedClientId('')
    setClientSearch('')
    setShowNewClientForm(false)
    setClientForm(initialClientForm)
    setDeviceForm(initialDeviceForm)
    setSelectedServiceIds([])
    setRepairNotes('')
    setSignatureData('')
    setError(null)
  }

  function openWorkflow(mode: QuickFlowMode = 'repair') {
    resetWorkflow()
    setDrawerMode(mode)
    setDrawerOpen(true)
  }

  function updateRepairIdInUrl(repairId: string | null) {
    const params = new URLSearchParams(searchParams?.toString())
    if (repairId) params.set('repairId', repairId)
    else params.delete('repairId')
    router.replace(`${pathname}?${params.toString()}`)
  }

  function openManageModal(repair: Repair, syncUrl = true) {
    setSelectedRepair(repair)
    setManageForm({
      status: repair.status,
      notes: repair.notes ?? '',
      comment: '',
    })
    setError(null)
    if (syncUrl) updateRepairIdInUrl(repair.id)
  }

  function closeManageModal() {
    setSelectedRepair(null)
    updateRepairIdInUrl(null)
  }

  const selectedClient = useMemo(() => {
    return clients.find((c) => c.id === selectedClientId) ?? null
  }, [clients, selectedClientId])

  const filteredClients = useMemo(() => {
    const q = clientSearch.trim().toLowerCase()
    if (!q) return []
    return clients
      .filter((c) => c.name.toLowerCase().includes(q) || c.phone.includes(q))
      .slice(0, 5)
  }, [clients, clientSearch])

  const filteredRepairs = useMemo(() => {
    const query = search.trim().toLowerCase()
    return repairs.filter((repair) => {
      const matchesStatus = statusFilter === 'ALL' || repair.status === statusFilter
      const haystack = [
        repair.client.name,
        repair.client.phone,
        repair.notes ?? '',
        getRepairStatusLabel(repair.status),
      ].join(' ').toLowerCase()
      return matchesStatus && haystack.includes(query)
    })
  }, [repairs, search, statusFilter])

  async function handleCreateRepair() {
    try {
      setIsSaving(true)
      setError(null)

      let clientId = selectedClientId

      if (showNewClientForm) {
        const newClient = await apiRequest<Client>('/api/clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...clientForm,
            name: `${clientForm.firstName} ${clientForm.lastName}`.trim(),
          }),
        })
        clientId = newClient.id
      }

      const response = await apiRequest<Repair>('/api/repairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          serviceIds: selectedServiceIds,
          notes: repairNotes,
        }),
      })

      // PDF Generation
      const selectedServicesList = services.filter((s) => selectedServiceIds.includes(s.id))
      generateIntakePDF({
        repairId: response.id,
        client: selectedClient || { id: clientId, name: `${clientForm.firstName} ${clientForm.lastName}`, phone: clientForm.phone },
        device: {
          model: deviceForm.model,
          imei: deviceForm.imei,
          unlockCode: deviceForm.unlockCode,
          condition: deviceForm.condition,
        },
        services: selectedServicesList.map(s => ({
          id: s.id,
          name: s.name,
          suggestedPrice: s.suggestedPrice
        })),
        notes: repairNotes,
        signature: signatureData,
        date: new Date().toLocaleDateString('fr-FR')
      })

      setDrawerOpen(false)
      await loadData()
      router.push(`/billing?repairId=${response.id}&mode=${drawerMode === 'quote' ? 'devis' : 'facture'}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de créer le ticket.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleUpdateRepair(event: React.FormEvent) {
    event.preventDefault()
    if (!selectedRepair) return
    try {
      setIsSaving(true)
      await apiRequest(`/api/repairs/${selectedRepair.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manageForm),
      })
      await loadData()
      closeManageModal()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour.')
    } finally {
      setIsSaving(false)
    }
  }

  const activeRepairsCount = repairs.filter((r) => ['PENDING', 'DIAGNOSIS', 'IN_PROGRESS'].includes(r.status)).length
  const readyRepairsCount = repairs.filter((r) => r.status === 'READY').length
  const closedRepairsCount = repairs.filter((r) => ['DELIVERED', 'ARCHIVED'].includes(r.status)).length

  return (
    <div className="space-y-8 pb-8">
      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[1.75rem] border border-white/60 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all hover:bg-white/50">
          <div className="inline-flex rounded-2xl bg-blue-100 p-3 text-blue-700">
            <Wrench className="h-6 w-6" />
          </div>
          <p className="mt-5 text-[0.7rem] font-black uppercase tracking-[0.26em] text-slate-400">Tickets actifs</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">{activeRepairsCount}</p>
        </article>
        <article className="rounded-[1.75rem] border border-white/60 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all hover:bg-white/50">
          <div className="inline-flex rounded-2xl bg-emerald-100 p-3 text-emerald-700 shadow-sm ring-1 ring-inset ring-emerald-200/50">
            <CheckCircle className="h-6 w-6" />
          </div>
          <p className="mt-5 text-[0.7rem] font-black uppercase tracking-[0.26em] text-slate-400">Appareils prêts</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">{readyRepairsCount}</p>
        </article>
        <article className="rounded-[1.75rem] border border-white/60 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all hover:bg-white/50">
          <div className="inline-flex rounded-2xl bg-slate-100 p-3 text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200/50">
            <Clock className="h-6 w-6" />
          </div>
          <p className="mt-5 text-[0.7rem] font-black uppercase tracking-[0.26em] text-slate-400">Dossiers clôturés</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">{closedRepairsCount}</p>
        </article>
      </section>

      {/* Main Bar */}
      <section className="rounded-[2.5rem] border border-white/60 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un ticket par client, téléphone ou notes..."
              className="w-full rounded-2xl border border-slate-100 bg-white/60 py-4 pl-12 pr-4 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-50/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl border border-slate-100 bg-white/60 px-4 py-4 text-sm font-bold text-slate-700 outline-none transition hover:border-slate-200 focus:bg-white focus:ring-4 focus:ring-slate-50"
            >
              <option value="ALL">Tous les statuts</option>
              {repairStatuses.map((status) => (
                <option key={status} value={status}>{getRepairStatusLabel(status)}</option>
              ))}
            </select>

            <button
              onClick={() => openWorkflow('repair')}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 active:scale-95"
            >
              <Plus className="h-5 w-5" />
              Nouveau ticket
            </button>
          </div>
        </div>

        {/* List */}
        <div className="mt-8 overflow-hidden rounded-[2.2rem] border border-white/60 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/50 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-slate-400 backdrop-blur-sm">
                <th className="px-6 py-5">Référence</th>
                <th className="px-6 py-5">Client</th>
                <th className="px-6 py-5">Prestations</th>
                <th className="px-6 py-5">Statut</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {filteredRepairs.length > 0 ? (
                filteredRepairs.map((repair) => (
                  <tr key={repair.id} className="group transition-colors hover:bg-white/40">
                    <td className="px-6 py-5">
                      <p className="font-mono text-xs font-bold text-slate-400 uppercase">#{repair.id.slice(-6)}</p>
                      <p className="mt-1 text-[0.65rem] font-medium text-slate-400">{formatDate(repair.createdAt)}</p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-black text-slate-950">{repair.client.name}</p>
                      <p className="mt-1 text-xs font-medium text-slate-500">{repair.client.phone}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-1.5">
                        {repair.services.slice(0, 2).map((line) => (
                          <span key={line.id} className="rounded-lg bg-slate-100 px-2 py-1 text-[0.65rem] font-bold text-slate-600">
                            {line.service.name}
                          </span>
                        ))}
                        {repair.services.length > 2 && (
                          <span className="rounded-lg bg-slate-100 px-2 py-1 text-[0.65rem] font-bold text-slate-400">
                            +{repair.services.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`rounded-full px-3 py-1.5 text-[0.7rem] font-black uppercase tracking-widest ${getRepairStatusStyle(repair.status)}`}>
                        {getRepairStatusLabel(repair.status)}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={() => openManageModal(repair)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 active:scale-95"
                      >
                        Gérer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <p className="text-sm font-bold text-slate-400">Aucun ticket trouvé.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* SideDrawer Workflow (Add Ticket) */}
      <SideDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={drawerMode === 'quote' ? 'NOUVEAU DEVIS' : 'NOUVELLE RÉPARATION'}
        subtitle="Tunnel de prise en charge client"
        footer={
          <div className="flex items-center justify-between gap-4">
            {workflowStep !== 'client' && (
              <button
                onClick={() => {
                  if (workflowStep === 'device') setWorkflowStep('client')
                  if (workflowStep === 'services') setWorkflowStep('device')
                  if (workflowStep === 'summary') setWorkflowStep('services')
                  if (workflowStep === 'signature') setWorkflowStep('summary')
                }}
                className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div className="flex-1" />
            {workflowStep === 'signature' ? (
              <button
                disabled={isSaving || !signatureData}
                onClick={handleCreateRepair}
                className="inline-flex h-14 items-center gap-2 rounded-2xl bg-blue-600 px-8 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-30"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Encaisser & Générer BPEC'}
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        }
      >
        <div className="space-y-8">
          {/* Workflow Steps Indicator */}
          <div className="flex items-center gap-2">
            {(['client', 'device', 'services', 'summary', 'signature'] as WorkflowStep[]).map((step, idx) => {
              const isActive = workflowStep === step
              const isPast = ['client', 'device', 'services', 'summary', 'signature'].indexOf(workflowStep) > idx
              return (
                <div
                  key={step}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    isActive ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : isPast ? 'bg-blue-200' : 'bg-slate-100'
                  }`}
                />
              )
            })}
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-2xl bg-rose-50 p-4 text-sm font-bold text-rose-600 ring-1 ring-inset ring-rose-200">
              {error}
            </div>
          )}

          {/* STEP 1: CLIENT */}
          {workflowStep === 'client' && (
            <div className="space-y-6">
              <SectionTitle label="Étape 1" title="Qui est le client ?" icon={<User className="h-5 w-5" />} />
              
              {!showNewClientForm ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Field label="Rechercher un client existant">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          value={clientSearch}
                          onChange={(e) => {
                            setClientSearch(e.target.value)
                            setShowClientSuggestions(true)
                          }}
                          placeholder="Nom, Prénom ou Téléphone..."
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 pl-11 text-sm font-bold outline-none focus:border-blue-400"
                        />
                      </div>
                    </Field>

                    {showClientSuggestions && filteredClients.length > 0 && (
                      <div className="absolute left-0 top-full z-20 mt-2 w-full space-y-1 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl">
                        {filteredClients.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => {
                              setSelectedClientId(c.id)
                              setClientSearch(c.name)
                              setShowClientSuggestions(false)
                            }}
                            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition ${
                              selectedClientId === c.id ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50'
                            }`}
                          >
                            <div>
                              <p className="font-bold">{c.name}</p>
                              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">{c.phone}</p>
                            </div>
                            <ChevronRight className={`h-4 w-4 ${selectedClientId === c.id ? 'text-blue-400' : 'text-slate-300'}`} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 py-2">
                    <div className="h-px flex-1 bg-slate-100" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Ou</span>
                    <div className="h-px flex-1 bg-slate-100" />
                  </div>

                  <button
                    onClick={() => setShowNewClientForm(true)}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 py-5 text-sm font-bold text-slate-500 transition hover:border-blue-300 hover:bg-blue-50/30 hover:text-blue-600"
                  >
                    <UserPlus className="h-5 w-5" />
                    Créer une nouvelle fiche client
                  </button>

                  <div className="pt-4">
                    <button
                      disabled={!selectedClientId}
                      onClick={() => setWorkflowStep('device')}
                      className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-30"
                    >
                      Continuer
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Prénom">
                      <input value={clientForm.firstName} onChange={e => setClientForm({...clientForm, firstName: e.target.value})} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-blue-300" />
                    </Field>
                    <Field label="Nom">
                      <input value={clientForm.lastName} onChange={e => setClientForm({...clientForm, lastName: e.target.value})} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-blue-300" />
                    </Field>
                  </div>
                  <Field label="Téléphone">
                    <input value={clientForm.phone} onChange={e => setClientForm({...clientForm, phone: e.target.value})} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-blue-300" />
                  </Field>
                  <Field label="Email">
                    <input value={clientForm.email} onChange={e => setClientForm({...clientForm, email: e.target.value})} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold outline-none focus:border-blue-300" />
                  </Field>

                  <div className="flex gap-3 pt-4">
                    <button onClick={() => setShowNewClientForm(false)} className="flex-1 rounded-2xl bg-slate-100 py-4 text-sm font-bold text-slate-600">Retour</button>
                    <button onClick={() => setWorkflowStep('device')} disabled={!clientForm.firstName || !clientForm.lastName || !clientForm.phone} className="flex-[2] rounded-2xl bg-slate-950 py-4 text-sm font-bold text-white disabled:opacity-30">Continuer</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: DEVICE */}
          {workflowStep === 'device' && (
            <div className="space-y-6">
              <SectionTitle label="Étape 2" title="Quel est l'appareil ?" icon={<Smartphone className="h-5 w-5" />} />
              
              <div className="space-y-4">
                <div className="relative">
                  <Field label="Modèle de l'appareil">
                    <input
                      value={deviceForm.model}
                      onChange={(e) => {
                        setDeviceForm({ ...deviceForm, model: e.target.value })
                        setShowModelSuggestions(e.target.value.length > 1)
                      }}
                      placeholder="iPhone 13, Galaxy S21..."
                      className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-sm font-bold outline-none focus:border-blue-400"
                    />
                  </Field>
                  {showModelSuggestions && (
                    <div className="absolute left-0 top-full z-20 mt-2 w-full space-y-1 rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl">
                      {models.filter(m => m.name.toLowerCase().includes(deviceForm.model.toLowerCase())).slice(0, 4).map(m => (
                        <button key={m.id} onClick={() => { setDeviceForm({...deviceForm, model: m.name, modelId: m.id}); setShowModelSuggestions(false); }} className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm hover:bg-slate-50">
                          <div>
                            <p className="font-bold">{m.name}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{m.brand.name} • {m.type.name}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="IMEI / SN">
                    <input value={deviceForm.imei} onChange={e => setDeviceForm({...deviceForm, imei: e.target.value})} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-300" />
                  </Field>
                  <Field label="Code">
                    <input value={deviceForm.unlockCode} onChange={e => setDeviceForm({...deviceForm, unlockCode: e.target.value})} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-300" />
                  </Field>
                </div>

                <Field label={`État esthétique : ${deviceForm.condition}/5`}>
                  <input type="range" min="1" max="5" value={deviceForm.condition} onChange={e => setDeviceForm({...deviceForm, condition: parseInt(e.target.value)})} className="w-full accent-blue-600" />
                </Field>

                <div className="pt-4">
                  <button onClick={() => setWorkflowStep('services')} disabled={!deviceForm.model} className="w-full rounded-2xl bg-slate-950 py-4 text-sm font-bold text-white disabled:opacity-30">Continuer</button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SERVICES */}
          {workflowStep === 'services' && (
            <div className="space-y-6">
              <SectionTitle label="Étape 3" title="Sélectionnez les forfaits" icon={<Wrench className="h-5 w-5" />} />
              <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                {services.map(s => {
                  const isSelected = selectedServiceIds.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedServiceIds(prev => isSelected ? prev.filter(id => id !== s.id) : [...prev, s.id])}
                      className={`flex flex-col rounded-2xl border p-4 text-left transition ${isSelected ? 'border-blue-400 bg-blue-50/50 ring-2 ring-blue-100' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                      <p className="font-bold text-slate-950 leading-tight">{s.name}</p>
                      <p className="mt-2 text-xs font-black text-blue-600">{formatCurrency(s.suggestedPrice)}</p>
                    </button>
                  )
                })}
              </div>
              <button disabled={selectedServiceIds.length === 0} onClick={() => setWorkflowStep('summary')} className="w-full rounded-2xl bg-slate-950 py-4 text-sm font-bold text-white disabled:opacity-30">Suivant</button>
            </div>
          )}

          {/* STEP 4: SUMMARY */}
          {workflowStep === 'summary' && (
            <div className="space-y-6">
              <SectionTitle label="Étape 4" title="Résumé & Notes" icon={<StickyNote className="h-5 w-5" />} />
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-500">Client</span>
                  <span className="font-bold text-slate-950">{selectedClient?.name || `${clientForm.firstName} ${clientForm.lastName}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-500">Appareil</span>
                  <span className="font-bold text-slate-950">{deviceForm.model}</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Prestations</p>
                  {services.filter(s => selectedServiceIds.includes(s.id)).map(s => (
                    <div key={s.id} className="flex justify-between text-xs py-1">
                      <span className="text-slate-600">{s.name}</span>
                      <span className="font-bold text-slate-950">{formatCurrency(s.suggestedPrice)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Field label="Notes & Observations">
                <textarea value={repairNotes} onChange={e => setRepairNotes(e.target.value)} rows={4} className="w-full rounded-2xl border border-slate-200 px-4 py-4 text-sm outline-none focus:border-blue-300" placeholder="Informations complémentaires..." />
              </Field>
              <button onClick={() => setWorkflowStep('signature')} className="w-full rounded-2xl bg-slate-950 py-4 text-sm font-bold text-white">Continuer vers la signature</button>
            </div>
          )}

          {/* STEP 5: SIGNATURE */}
          {workflowStep === 'signature' && (
            <div className="space-y-6">
              <SectionTitle label="Dernière étape" title="Signature du client" icon={<PencilLine className="h-5 w-5" />} />
              <SignaturePad onSign={setSignatureData} />
              <p className="text-[11px] leading-relaxed text-slate-400 text-center italic">
                En signant, le client accepte les conditions générales de prise en charge et autorise l'intervention sur l'appareil désigné.
              </p>
            </div>
          )}
        </div>
      </SideDrawer>

      {/* Management Modal (Centered) */}
      {selectedRepair && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/70 bg-white shadow-2xl">
            <div className="grid h-[85vh] grid-cols-1 xl:grid-cols-[1fr_360px]">
              <div className="flex flex-col min-h-0 bg-white">
                <div className="flex items-center justify-between border-b border-slate-100 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 font-bold uppercase">
                      #{selectedRepair.id.slice(-4)}
                    </div>
                    <div>
                      <h2 className="text-xl font-black tracking-tight text-slate-950">{selectedRepair.client.name}</h2>
                      <p className="text-sm text-slate-500">Créé le {formatDate(selectedRepair.createdAt)}</p>
                    </div>
                  </div>
                  <button onClick={closeManageModal} className="rounded-2xl border border-slate-100 p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-900">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleUpdateRepair} className="flex flex-1 flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-6 space-y-8 text-slate-950">
                    <div className="grid gap-8 sm:grid-cols-2">
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Statut actuel</label>
                        <select
                          value={manageForm.status}
                          onChange={(e) => setManageForm({ ...manageForm, status: e.target.value })}
                          className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 font-bold text-slate-950 outline-none transition focus:border-blue-200 focus:bg-white"
                        >
                          {repairStatuses.map((s) => <option key={s} value={s}>{getRepairStatusLabel(s)}</option>)}
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Nouveau commentaire</label>
                        <input value={manageForm.comment} onChange={(e) => setManageForm({ ...manageForm, comment: e.target.value })} placeholder="Ex: Écran reçu..." className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-200 focus:bg-white" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Notes détaillées</label>
                      <textarea value={manageForm.notes} onChange={(e) => setManageForm({ ...manageForm, notes: e.target.value })} rows={10} className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-200 focus:bg-white" />
                    </div>
                  </div>

                  <div className="border-t border-slate-100 p-6 flex items-center justify-end gap-3 bg-white">
                    <button type="button" onClick={closeManageModal} className="rounded-2xl px-4 py-3 font-bold text-slate-400 transition hover:bg-slate-50">Annuler</button>
                    <button type="submit" disabled={isSaving} className="rounded-2xl bg-blue-600 px-8 py-3 font-bold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-700 disabled:opacity-60">
                      {isSaving ? 'Enregistrement...' : 'Enregistrer et fermer'}
                    </button>
                  </div>
                </form>
              </div>

              <aside className="min-h-0 overflow-y-auto border-t border-slate-100 bg-slate-50/80 px-6 py-6 xl:border-l xl:border-t-0 text-slate-950">
                <div className="space-y-6">
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                    <p className="text-[0.7rem] font-black uppercase tracking-[0.24em] text-slate-400">Prestations</p>
                    <div className="mt-3 space-y-3">
                      {selectedRepair.services.map((line) => (
                        <div key={line.id} className="rounded-2xl bg-slate-50 p-4">
                          <p className="font-black text-slate-950">{line.service.name}</p>
                          <p className="mt-1 text-[10px] font-bold text-blue-600 uppercase tracking-widest">{formatCurrency(line.priceAtTime)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                    <p className="text-[0.7rem] font-black uppercase tracking-[0.24em] text-slate-400">Historique</p>
                    <div className="mt-3 space-y-3">
                      {selectedRepair.logs.map((log) => (
                        <div key={log.id} className="rounded-2xl bg-slate-50 p-4">
                          <div className="flex items-center justify-between gap-3">
                            <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${getRepairStatusStyle(log.status)}`}>{getRepairStatusLabel(log.status)}</span>
                            <span className="text-[10px] font-bold text-slate-400">{formatDate(log.createdAt)}</span>
                          </div>
                          <p className="mt-3 text-xs leading-5 text-slate-600 font-medium">{log.comment || 'Aucun commentaire'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function RepairsPage() {
  return (
    <Suspense fallback={null}>
      <RepairsContent />
    </Suspense>
  )
}
