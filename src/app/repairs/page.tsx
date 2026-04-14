'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from 'react'
import {
  CheckCircle,
  Clock,
  Plus,
  Search,
  User,
  Wrench,
  X,
} from 'lucide-react'
import {
  formatCurrency,
  formatDate,
  getRepairStatusLabel,
  getRepairStatusStyle,
  getRepairTotal,
  repairStatuses,
} from '@/lib/repair'

interface Client {
  id: string
  name: string
  phone: string
}

interface Part {
  id: string
  name: string
  costPrice: number
}

interface Service {
  id: string
  name: string
  laborCost: number
  duration: number
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
  service: Service
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

type ApiError = { error?: string }

const initialCreateForm = {
  clientId: '',
  serviceIds: [] as string[],
  notes: '',
}

const initialManageForm = {
  status: 'PENDING',
  notes: '',
  comment: '',
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    const text = await response.text()
    throw new Error(
      text.includes('<!DOCTYPE')
        ? 'La réponse serveur est invalide. Vérifie que les routes API fonctionnent correctement.'
        : 'Réponse serveur invalide.'
    )
  }

  return response.json()
}

function RepairsContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [repairs, setRepairs] = useState<Repair[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null)
  const [createForm, setCreateForm] = useState(initialCreateForm)
  const [manageForm, setManageForm] = useState(initialManageForm)
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
    if (!repairIdFromUrl || repairs.length === 0) {
      return
    }

    if (selectedRepair?.id === repairIdFromUrl) {
      return
    }

    const repairToOpen = repairs.find((repair) => repair.id === repairIdFromUrl)
    if (repairToOpen) {
      openManageModal(repairToOpen, false)
    }
  }, [repairIdFromUrl, repairs])

  async function loadData() {
    try {
      setIsLoading(true)
      const [repairsResponse, clientsResponse, servicesResponse] = await Promise.all([
        fetch('/api/repairs'),
        fetch('/api/clients'),
        fetch('/api/services'),
      ])

      const [repairsData, clientsData, servicesData] = await Promise.all([
        parseJsonResponse<Repair[]>(repairsResponse),
        parseJsonResponse<Client[]>(clientsResponse),
        parseJsonResponse<Service[]>(servicesResponse),
      ])

      setRepairs(repairsData)
      setClients(clientsData)
      setServices(servicesData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données.')
    } finally {
      setIsLoading(false)
    }
  }

  function updateRepairIdInUrl(repairId: string | null) {
    const params = new URLSearchParams(searchParams?.toString())
    if (repairId) {
      params.set('repairId', repairId)
    } else {
      params.delete('repairId')
    }
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

    if (syncUrl) {
      updateRepairIdInUrl(repair.id)
    }
  }

  function closeManageModal() {
    setSelectedRepair(null)
    updateRepairIdInUrl(null)
  }

  function toggleService(serviceId: string) {
    setCreateForm((current) => ({
      ...current,
      serviceIds: current.serviceIds.includes(serviceId)
        ? current.serviceIds.filter((id) => id !== serviceId)
        : [...current.serviceIds, serviceId],
    }))
  }

  async function handleCreateTicket(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsSaving(true)
      setError(null)

      const response = await fetch('/api/repairs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createForm),
      })

      const data = await parseJsonResponse<Repair & ApiError>(response)

      if (!response.ok) {
        throw new Error(data.error ?? 'Impossible de créer le ticket.')
      }

      setShowCreateModal(false)
      setCreateForm(initialCreateForm)
      await loadData()
      router.push(`/billing?repairId=${data.id}&mode=devis`)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Impossible de créer le ticket.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  async function handleUpdateTicket(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selectedRepair) {
      return
    }

    const repairId = selectedRepair.id

    try {
      setIsSaving(true)
      setError(null)

      const response = await fetch(`/api/repairs/${repairId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manageForm),
      })

      const data = await parseJsonResponse<Repair & ApiError>(response)

      if (!response.ok) {
        throw new Error(data.error ?? 'Impossible de mettre à jour le ticket.')
      }

      setRepairs((current) =>
        current.map((repair) =>
          repair.id === repairId
            ? {
                ...repair,
                status: manageForm.status,
                notes: manageForm.notes,
              }
            : repair
        )
      )

      closeManageModal()
      router.refresh()
      router.push('/')
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Impossible de mettre à jour le ticket.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDeleteTicket() {
    if (!selectedRepair || !confirm('Voulez-vous vraiment supprimer ce ticket ? Cette action est irréversible.')) {
      return
    }

    const repairId = selectedRepair.id

    try {
      setIsSaving(true)
      setError(null)

      const response = await fetch(`/api/repairs/${repairId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await parseJsonResponse<ApiError>(response)
        throw new Error(data.error ?? 'Impossible de supprimer le ticket.')
      }

      setRepairs((current) => current.filter((r) => r.id !== repairId))
      closeManageModal()
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : 'Impossible de supprimer le ticket.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  async function handleArchiveTicket() {
    if (!selectedRepair) return

    const repairId = selectedRepair.id

    try {
      setIsSaving(true)
      setError(null)

      const response = await fetch(`/api/repairs/${repairId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...manageForm,
          status: 'ARCHIVED',
          comment: 'Dossier archivé par l’utilisateur.',
        }),
      })

      const data = await parseJsonResponse<Repair & ApiError>(response)

      if (!response.ok) {
        throw new Error(data.error ?? 'Impossible d’archiver le ticket.')
      }

      setRepairs((current) =>
        current.map((repair) => (repair.id === repairId ? data : repair))
      )

      closeManageModal()
    } catch (archiveError) {
      setError(
        archiveError instanceof Error
          ? archiveError.message
          : 'Impossible d’archiver le ticket.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  const filteredRepairs = useMemo(() => {
    const query = search.trim().toLowerCase()

    return repairs.filter((repair) => {
      const matchesStatus = statusFilter === 'ALL' || repair.status === statusFilter
      const haystack = [
        repair.client.name,
        repair.client.phone,
        repair.notes ?? '',
        getRepairStatusLabel(repair.status),
      ]
        .join(' ')
        .toLowerCase()

      return matchesStatus && haystack.includes(query)
    })
  }, [repairs, search, statusFilter])

  const activeRepairs = repairs.filter((repair) =>
    ['PENDING', 'DIAGNOSIS', 'IN_PROGRESS'].includes(repair.status)
  ).length
  const readyRepairs = repairs.filter((repair) => repair.status === 'READY').length
  const closedRepairs = repairs.filter((repair) => ['DELIVERED', 'ARCHIVED'].includes(repair.status)).length

  return (
    <div className="space-y-8 pb-8">
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-sm shadow-slate-200/60">
          <div className="inline-flex rounded-2xl bg-blue-100 p-3 text-blue-700">
            <Wrench className="h-6 w-6" />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.26em] text-slate-400">
            Tickets actifs
          </p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {activeRepairs}
          </p>
        </article>

        <article className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-sm shadow-slate-200/60">
          <div className="inline-flex rounded-2xl bg-emerald-100 p-3 text-emerald-700">
            <CheckCircle className="h-6 w-6" />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.26em] text-slate-400">
            Appareils prêts
          </p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {readyRepairs}
          </p>
        </article>

        <article className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-sm shadow-slate-200/60">
          <div className="inline-flex rounded-2xl bg-slate-100 p-3 text-slate-700">
            <Clock className="h-6 w-6" />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.26em] text-slate-400">
            Dossiers clôturés
          </p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {closedRepairs}
          </p>
        </article>
      </section>

      <section className="rounded-[2.2rem] border border-white/80 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un ticket par client, téléphone ou notes..."
              className="w-full rounded-2xl border border-slate-100 bg-slate-50/50 py-4 pl-12 pr-4 outline-none transition focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-50/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-2xl border border-slate-100 bg-white px-4 py-4 text-sm font-bold text-slate-700 outline-none transition hover:border-slate-200 focus:ring-4 focus:ring-slate-50"
            >
              <option value="ALL">Tous les statuts</option>
              {repairStatuses.map((status) => (
                <option key={status} value={status}>
                  {getRepairStatusLabel(status)}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              Nouveau ticket
            </button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-slate-100 bg-white shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-slate-400">
                <th className="px-6 py-5">Référence</th>
                <th className="px-6 py-5">Client</th>
                <th className="px-6 py-5">Prestations</th>
                <th className="px-6 py-5">Statut</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRepairs.length > 0 ? (
                filteredRepairs.map((repair) => (
                  <tr
                    key={repair.id}
                    className="group transition hover:bg-blue-50/30"
                  >
                    <td className="px-6 py-5">
                      <p className="font-mono text-xs font-bold text-slate-400 uppercase">
                        #{repair.id.slice(-6)}
                      </p>
                      <p className="mt-1 text-[0.65rem] font-medium text-slate-400">
                        {formatDate(repair.createdAt)}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-black text-slate-950">{repair.client.name}</p>
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {repair.client.phone}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-1.5">
                        {repair.services.slice(0, 2).map((line) => (
                          <span
                            key={line.id}
                            className="rounded-lg bg-slate-100 px-2 py-1 text-[0.65rem] font-bold text-slate-600"
                          >
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
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getRepairStatusStyle(
                          repair.status
                        )}`}
                      >
                        {getRepairStatusLabel(repair.status)}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => openManageModal(repair)}
                        className="rounded-xl border border-slate-100 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-blue-200 hover:text-blue-600 hover:shadow-md"
                      >
                        Gérer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-500">
                    {isLoading ? 'Chargement...' : 'Aucun ticket trouvé.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal Création Ticket */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[2.5rem] border border-white/70 bg-white p-8 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-blue-600">
                  Nouveau dossier
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                  Ouvrir un ticket atelier
                </h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-2xl border border-slate-100 p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-900"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="mt-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Client
                </label>
                <select
                  required
                  value={createForm.clientId}
                  onChange={(e) => setCreateForm({ ...createForm, clientId: e.target.value })}
                  className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-200 focus:bg-white"
                >
                  <option value="">Sélectionner un client</option>
                  {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name} — {client.phone}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Prestations
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggleService(service.id)}
                      className={`flex flex-col rounded-2xl border p-4 text-left transition ${
                        createForm.serviceIds.includes(service.id)
                          ? 'border-blue-200 bg-blue-50/50 ring-2 ring-blue-100'
                          : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      <span className="font-bold text-slate-950">{service.name}</span>
                      <span className="mt-1 text-xs font-medium text-slate-500">
                        {formatCurrency(service.laborCost)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Notes
                </label>
                <textarea
                  value={createForm.notes}
                  onChange={(e) => setCreateForm({ ...createForm, notes: e.target.value })}
                  placeholder="Informations sur la panne, état de l'appareil..."
                  className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-200 focus:bg-white"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-2xl px-6 py-4 font-bold text-slate-400 transition hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-60"
                >
                  {isSaving ? 'Création...' : 'Créer et facturer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Gestion Ticket */}
      {selectedRepair ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/70 bg-white shadow-2xl">
            <div className="grid h-[85vh] grid-cols-1 xl:grid-cols-[1fr_360px]">
              <div className="flex flex-col min-h-0 bg-white">
                <div className="flex items-center justify-between border-b border-slate-100 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 font-bold">
                      #{selectedRepair.id.slice(-4).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-black tracking-tight text-slate-950">
                        {selectedRepair.client.name}
                      </h2>
                      <p className="text-sm text-slate-500">
                        Créé le {formatDate(selectedRepair.createdAt)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeManageModal}
                    className="rounded-2xl border border-slate-100 p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleUpdateTicket} className="flex flex-1 flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto p-6 space-y-8 text-slate-950">
                    {error && (
                      <div className="rounded-2xl bg-rose-50 p-4 text-sm font-bold text-rose-600 ring-1 ring-inset ring-rose-200">
                        {error}
                      </div>
                    )}

                    <div className="grid gap-8 sm:grid-cols-2">
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          Statut actuel
                        </label>
                        <select
                          value={manageForm.status}
                          onChange={(e) => setManageForm({ ...manageForm, status: e.target.value })}
                          className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 font-bold text-slate-950 outline-none transition focus:border-blue-200 focus:bg-white"
                        >
                          {repairStatuses.map((status) => (
                            <option key={status} value={status}>
                              {getRepairStatusLabel(status)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                          Nouveau commentaire
                        </label>
                        <input
                          value={manageForm.comment}
                          onChange={(e) => setManageForm({ ...manageForm, comment: e.target.value })}
                          placeholder="Ex: Écran reçu, en attente de montage..."
                          className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-200 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Notes détaillées
                      </label>
                      <textarea
                        value={manageForm.notes}
                        onChange={(e) => setManageForm({ ...manageForm, notes: e.target.value })}
                        rows={10}
                        className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 outline-none transition focus:border-blue-200 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="sticky bottom-0 border-t border-slate-100 bg-white p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleDeleteTicket}
                          className="text-sm font-bold text-rose-500 hover:text-rose-700 hover:underline"
                        >
                          Supprimer
                        </button>
                        {selectedRepair.status !== 'ARCHIVED' && (
                          <button
                            type="button"
                            onClick={handleArchiveTicket}
                            className="text-sm font-bold text-slate-400 hover:text-slate-900 hover:underline ml-4"
                          >
                            Archiver
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={closeManageModal}
                          className="rounded-2xl px-4 py-3 font-bold text-slate-400 transition hover:bg-slate-50"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          disabled={isSaving}
                          className="rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:opacity-60"
                        >
                          {isSaving ? 'Enregistrement...' : 'Enregistrer et fermer'}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <aside className="min-h-0 overflow-y-auto border-t border-slate-100 bg-slate-50/80 px-6 py-6 xl:border-l xl:border-t-0 text-slate-950">
                <div className="space-y-6">
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                      Prestations
                    </p>
                    <div className="mt-3 space-y-3">
                      {selectedRepair.services.map((line) => (
                        <div key={line.id} className="rounded-2xl bg-slate-50 p-4">
                          <p className="font-black text-slate-950">{line.service.name}</p>
                          <p className="mt-1 text-sm text-slate-500">
                            {line.service.part
                              ? `Pièce : ${line.service.part.name}`
                              : 'Sans pièce liée'}
                          </p>
                          <p className="mt-2 text-sm font-bold text-slate-900">
                            {formatCurrency(line.priceAtTime)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                      Historique
                    </p>
                    <div className="mt-3 space-y-3">
                      {selectedRepair.logs.length > 0 ? (
                        selectedRepair.logs.map((log) => (
                          <div key={log.id} className="rounded-2xl bg-slate-50 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${getRepairStatusStyle(log.status)}`}
                              >
                                {getRepairStatusLabel(log.status)}
                              </span>
                              <span className="text-xs font-medium text-slate-500">
                                {formatDate(log.createdAt)}
                              </span>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                              {log.comment || 'Aucun commentaire'}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="rounded-2xl bg-slate-50 px-4 py-5 text-sm text-slate-500">
                          Aucun événement enregistré pour ce ticket.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      ) : null}
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
