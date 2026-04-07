'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
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

export default function RepairsPage() {
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
  }, [repairIdFromUrl, repairs]) // On retire selectedRepair?.id des dépendances pour éviter le feedback loop à la fermeture

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') {
        return
      }

      if (selectedRepair) {
        closeManageModal()
        return
      }

      if (showCreateModal) {
        setShowCreateModal(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedRepair, showCreateModal])

  function updateRepairIdInUrl(repairId?: string) {
    const params = new URLSearchParams(window.location.search)
    if (repairId) {
      params.set('repairId', repairId)
    } else {
      params.delete('repairId')
    }
    const queryString = params.toString()
    router.replace(queryString ? `?${queryString}` : pathname, { scroll: false })
  }

  async function loadData() {
    try {
      setIsLoading(true)
      setError(null)

      const [repairsResponse, clientsResponse, servicesResponse] = await Promise.all([
        fetch('/api/repairs', { cache: 'no-store' }),
        fetch('/api/clients', { cache: 'no-store' }),
        fetch('/api/services', { cache: 'no-store' }),
      ])

      const [repairsData, clientsData, servicesData] = await Promise.all([
        parseJsonResponse<Repair[]>(repairsResponse),
        parseJsonResponse<Client[]>(clientsResponse),
        parseJsonResponse<Service[]>(servicesResponse),
      ])

      if (!repairsResponse.ok) {
        throw new Error(repairsData.error ?? 'Impossible de charger les tickets.')
      }

      if (!clientsResponse.ok) {
        throw new Error(clientsData.error ?? 'Impossible de charger les clients.')
      }

      if (!servicesResponse.ok) {
        throw new Error(servicesData.error ?? 'Impossible de charger les forfaits.')
      }

      const nextRepairs = Array.isArray(repairsData) ? repairsData : []
      setRepairs(nextRepairs)
      setClients(Array.isArray(clientsData) ? clientsData : [])
      setServices(Array.isArray(servicesData) ? servicesData : [])

      if (selectedRepair) {
        const refreshed = nextRepairs.find((repair) => repair.id === selectedRepair.id)
        if (refreshed) {
          setSelectedRepair(refreshed)
          setManageForm((current) => ({
            ...current,
            status: refreshed.status,
            notes: refreshed.notes ?? current.notes,
          }))
        }
      }
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Impossible de charger les tickets.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  function openCreateTicketModal() {
    setCreateForm(initialCreateForm)
    setError(null)
    setShowCreateModal(true)
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
    setManageForm(initialManageForm)
    setError(null)
    updateRepairIdInUrl()
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

  const filteredRepairs = useMemo(() => {
    const query = search.trim().toLowerCase()

    return repairs.filter((repair) => {
      const matchesStatus = statusFilter === 'ALL' || repair.status === statusFilter
      const haystack = [
        repair.client.name,
        repair.client.phone,
        repair.id,
        ...repair.services.map((line) => line.service.name),
      ]
        .join(' ')
        .toLowerCase()

      const matchesSearch = !query || haystack.includes(query)
      return matchesStatus && matchesSearch
    })
  }, [repairs, search, statusFilter])

  const selectedServicesTotal = createForm.serviceIds.reduce((total, serviceId) => {
    const service = services.find((item) => item.id === serviceId)
    return total + (service ? service.laborCost + (service.part?.costPrice ?? 0) : 0)
  }, 0)

  const activeRepairs = repairs.filter((repair) =>
    ['PENDING', 'DIAGNOSIS', 'IN_PROGRESS'].includes(repair.status)
  ).length
  const readyRepairs = repairs.filter((repair) => repair.status === 'READY').length
  const deliveredRepairs = repairs.filter((repair) => repair.status === 'DELIVERED').length

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
            {deliveredRepairs}
          </p>
        </article>
      </section>

      <section className="rounded-[2rem] border border-white/70 bg-white p-6 shadow-sm shadow-slate-200/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher ticket, client ou prestation"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-300 focus:bg-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-300 focus:bg-white"
            >
              <option value="ALL">Tous les statuts</option>
              {repairStatuses.map((status) => (
                <option key={status} value={status}>
                  {getRepairStatusLabel(status)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={openCreateTicketModal}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Nouveau ticket
          </button>
        </div>

        {error ? (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                <th className="px-4 py-4">Ticket</th>
                <th className="px-4 py-4">Client</th>
                <th className="px-4 py-4">Prestations</th>
                <th className="px-4 py-4">Statut</th>
                <th className="px-4 py-4">Montant</th>
                <th className="px-4 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!isLoading && filteredRepairs.length > 0 ? (
                filteredRepairs.map((repair) => (
                  <tr key={repair.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-mono text-sm font-black text-slate-950">
                          #{repair.id.slice(-6).toUpperCase()}
                        </p>
                        <p className="text-sm text-slate-500">
                          {formatDate(repair.createdAt)}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-black text-slate-950">{repair.client.name}</p>
                      <p className="text-sm text-slate-500">{repair.client.phone}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {repair.services.map((line) => line.service.name).join(', ')}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-bold ${getRepairStatusStyle(repair.status)}`}
                      >
                        {getRepairStatusLabel(repair.status)}
                      </span>
                    </td>
                    <td className="px-4 py-4 font-black text-slate-950">
                      {formatCurrency(getRepairTotal(repair))}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => openManageModal(repair)}
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        Gérer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center text-sm text-slate-500">
                    {isLoading
                      ? 'Chargement des tickets...'
                      : 'Aucun ticket ne correspond à la recherche.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showCreateModal ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="w-full max-w-3xl rounded-[2rem] border border-white/60 bg-white p-6 shadow-2xl shadow-slate-900/15"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-blue-600">
                  Réception atelier
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                  Nouveau ticket
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="rounded-2xl bg-slate-100 p-3 text-slate-500 transition hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="mt-6 space-y-6">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Client
                </label>
                <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <div className="relative">
                    <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select
                      required
                      value={createForm.clientId}
                      onChange={(event) =>
                        setCreateForm((current) => ({
                          ...current,
                          clientId: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-300 focus:bg-white"
                    >
                      <option value="">Choisir un client</option>
                      {clients.map((client) => (
                        <option key={client.id} value={client.id}>
                          {client.name} ({client.phone})
                        </option>
                      ))}
                    </select>
                  </div>

                  <Link
                    href="/clients"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Créer un client
                  </Link>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Prestations à appliquer
                </label>
                <div className="grid gap-3 md:grid-cols-2">
                  {services.map((service) => {
                    const selected = createForm.serviceIds.includes(service.id)
                    const totalPrice = service.laborCost + (service.part?.costPrice ?? 0)

                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`rounded-[1.5rem] border p-4 text-left transition ${
                          selected
                            ? 'border-blue-300 bg-blue-50'
                            : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                        }`}
                      >
                        <p className="font-black text-slate-950">{service.name}</p>
                        <p className="mt-2 text-sm text-slate-500">
                          Main d'œuvre : {formatCurrency(service.laborCost)}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Pièce :{' '}
                          {service.part ? service.part.name : 'Aucune pièce associée'}
                        </p>
                        <p className="mt-3 text-lg font-black text-slate-950">
                          {formatCurrency(totalPrice)}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Notes atelier
                </label>
                <textarea
                  value={createForm.notes}
                  onChange={(event) =>
                    setCreateForm((current) => ({
                      ...current,
                      notes: event.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="Décrire rapidement l'appareil, la panne et les accessoires confiés."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white"
                />
              </div>

              <div className="flex flex-col gap-4 rounded-[1.5rem] bg-slate-950 p-5 text-white md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.26em] text-slate-400">
                    Montant estimé
                  </p>
                  <p className="mt-2 text-3xl font-black">
                    {formatCurrency(selectedServicesTotal)}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSaving || !createForm.clientId || createForm.serviceIds.length === 0}
                  className="rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? 'Création...' : 'Créer le ticket et ouvrir le devis'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {selectedRepair ? (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={closeManageModal}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-2xl shadow-slate-900/20"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-slate-500">
                  Ticket #{selectedRepair.id.slice(-6).toUpperCase()}
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                  {selectedRepair.client.name}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Créé le {formatDate(selectedRepair.createdAt)}
                </p>
              </div>

              <button
                type="button"
                aria-label="Fermer la fiche ticket"
                onClick={closeManageModal}
                className="rounded-2xl bg-slate-100 p-3 text-slate-500 transition hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid flex-1 gap-0 overflow-hidden xl:grid-cols-[minmax(0,1.15fr)_360px]">
              <div className="min-h-0 overflow-y-auto px-6 py-6">
                <form onSubmit={handleUpdateTicket} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Statut
                    </label>
                    <select
                      value={manageForm.status}
                      onChange={(event) =>
                        setManageForm((current) => ({
                          ...current,
                          status: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white"
                    >
                      {repairStatuses.map((status) => (
                        <option key={status} value={status}>
                          {getRepairStatusLabel(status)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Notes atelier
                    </label>
                    <textarea
                      value={manageForm.notes}
                      onChange={(event) =>
                        setManageForm((current) => ({
                          ...current,
                          notes: event.target.value,
                        }))
                      }
                      rows={10}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Commentaire de suivi
                    </label>
                    <textarea
                      value={manageForm.comment}
                      onChange={(event) =>
                        setManageForm((current) => ({
                          ...current,
                          comment: event.target.value,
                        }))
                      }
                      rows={4}
                      placeholder="Ex: en attente d'accord client, test batterie OK, micro-soudure terminée."
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-300 focus:bg-white"
                    />
                  </div>

                  <div className="sticky bottom-0 flex flex-col gap-4 rounded-[1.5rem] border border-slate-200 bg-white/95 p-5 backdrop-blur md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.26em] text-slate-400">
                        Total dossier
                      </p>
                      <p className="mt-2 text-3xl font-black text-slate-950">
                        {formatCurrency(getRepairTotal(selectedRepair))}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={closeManageModal}
                        className="rounded-2xl border border-slate-200 px-4 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSaving ? 'Enregistrement...' : 'Enregistrer et fermer'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <aside className="min-h-0 overflow-y-auto border-t border-slate-100 bg-slate-50/80 px-6 py-6 xl:border-l xl:border-t-0">
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
