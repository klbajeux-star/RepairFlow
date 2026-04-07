'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  AlertCircle,
  Package,
  Plus,
  Search,
  Settings,
  Wrench,
  X,
} from 'lucide-react'
import { formatCurrency } from '@/lib/repair'

type CatalogTab = 'products' | 'services'

interface Part {
  id: string
  name: string
  sku: string
  costPrice: number
  stock: number
  description?: string | null
  linkedServicesCount?: number
}

interface ServicePart {
  id: string
  name: string
  costPrice: number
}

interface Service {
  id: string
  name: string
  laborCost: number
  partId?: string | null
  part?: ServicePart | null
  description?: string | null
}

const initialPartForm = {
  name: '',
  sku: '',
  costPrice: '',
  stock: '',
  description: '',
}

const initialServiceForm = {
  name: '',
  laborCost: '',
  partId: '',
  description: '',
}

export function CatalogWorkspace({
  defaultTab = 'products',
}: {
  defaultTab?: CatalogTab
}) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const paramTab = searchParams.get('tab')
  const initialTab = paramTab === 'services' ? 'services' : defaultTab

  const [activeTab, setActiveTab] = useState<CatalogTab>(initialTab)
  const [parts, setParts] = useState<Part[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showPartModal, setShowPartModal] = useState(false)
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [editingPart, setEditingPart] = useState<Part | null>(null)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [partForm, setPartForm] = useState(initialPartForm)
  const [serviceForm, setServiceForm] = useState(initialServiceForm)

  useEffect(() => {
    void loadCatalog()
  }, [])

  useEffect(() => {
    const nextTab = paramTab === 'services' ? 'services' : paramTab === 'products' ? 'products' : defaultTab
    setActiveTab(nextTab)
  }, [defaultTab, paramTab])

  async function loadCatalog() {
    try {
      setIsLoading(true)
      setError(null)

      const [partsResponse, servicesResponse] = await Promise.all([
        fetch('/api/parts'),
        fetch('/api/services'),
      ])

      const [partsData, servicesData] = await Promise.all([
        partsResponse.json(),
        servicesResponse.json(),
      ])

      if (!partsResponse.ok) {
        throw new Error(partsData.error ?? 'Impossible de charger les produits.')
      }

      if (!servicesResponse.ok) {
        throw new Error(servicesData.error ?? 'Impossible de charger les services.')
      }

      setParts(Array.isArray(partsData) ? partsData : [])
      setServices(Array.isArray(servicesData) ? servicesData : [])
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Impossible de charger le catalogue.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  function updateTab(nextTab: CatalogTab) {
    setActiveTab(nextTab)

    if (pathname === '/catalog') {
      const nextSearchParams = new URLSearchParams(searchParams.toString())
      nextSearchParams.set('tab', nextTab)
      router.replace(`/catalog?${nextSearchParams.toString()}`)
    }
  }

  function openPartModal(part?: Part) {
    setEditingPart(part ?? null)
    setPartForm(
      part
        ? {
            name: part.name,
            sku: part.sku,
            costPrice: String(part.costPrice),
            stock: String(part.stock),
            description: part.description ?? '',
          }
        : initialPartForm
    )
    setError(null)
    setShowPartModal(true)
  }

  function openServiceModal(service?: Service) {
    setEditingService(service ?? null)
    setServiceForm(
      service
        ? {
            name: service.name,
            laborCost: String(service.laborCost),
            partId: service.partId ?? '',
            description: service.description ?? '',
          }
        : initialServiceForm
    )
    setError(null)
    setShowServiceModal(true)
  }

  async function submitPart(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsSaving(true)
      setError(null)

      const response = await fetch(
        editingPart ? `/api/parts/${editingPart.id}` : '/api/parts',
        {
          method: editingPart ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(partForm),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'Impossible d’enregistrer le produit.')
      }

      setShowPartModal(false)
      setEditingPart(null)
      setPartForm(initialPartForm)
      await loadCatalog()
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Impossible d’enregistrer le produit.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  async function submitService(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsSaving(true)
      setError(null)

      const response = await fetch(
        editingService ? `/api/services/${editingService.id}` : '/api/services',
        {
          method: editingService ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(serviceForm),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'Impossible d’enregistrer le service.')
      }

      setShowServiceModal(false)
      setEditingService(null)
      setServiceForm(initialServiceForm)
      await loadCatalog()
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Impossible d’enregistrer le service.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  const filteredParts = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return parts
    }

    return parts.filter((part) =>
      [part.name, part.sku, part.description ?? '']
        .join(' ')
        .toLowerCase()
        .includes(query)
    )
  }, [parts, search])

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return services
    }

    return services.filter((service) =>
      [service.name, service.description ?? '', service.part?.name ?? '']
        .join(' ')
        .toLowerCase()
        .includes(query)
    )
  }, [search, services])

  const totalUnits = parts.reduce((sum, part) => sum + part.stock, 0)
  const lowStockCount = parts.filter((part) => part.stock < 5).length
  const inventoryValue = parts.reduce((sum, part) => sum + part.costPrice * part.stock, 0)
  const averageServicePrice =
    services.length > 0
      ? services.reduce(
          (sum, service) =>
            sum + service.laborCost + (service.part?.costPrice ?? 0),
          0
        ) / services.length
      : 0

  return (
    <div className="space-y-6 pb-6">
      <section className="rounded-[1.75rem] border border-white/70 bg-white p-5 shadow-sm shadow-slate-200/60">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-slate-400">
                Espace catalogue
              </p>
              <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                Produits et services atelier
              </h1>
            </div>

            <div className="flex gap-2">
              {pathname !== '/catalog' ? (
                <Link
                  href={`/catalog?tab=${activeTab}`}
                  className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Ouvrir en vue catalogue
                </Link>
              ) : null}
              <button
                type="button"
                onClick={() =>
                  activeTab === 'products' ? openPartModal() : openServiceModal()
                }
                className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700"
              >
                <Plus className="h-4 w-4" />
                {activeTab === 'products' ? 'Nouveau produit' : 'Nouveau service'}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-2">
            {[
              { key: 'products', label: `Produits (${parts.length})`, icon: Package },
              { key: 'services', label: `Services (${services.length})`, icon: Wrench },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => updateTab(tab.key as CatalogTab)}
                className={`inline-flex items-center gap-2 rounded-[1rem] px-4 py-2.5 text-sm font-bold transition ${
                  activeTab === tab.key
                    ? 'bg-violet-100 text-violet-800 shadow-sm'
                    : 'text-slate-600 hover:bg-white'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}

            <div className="ml-auto hidden items-center gap-2 rounded-[1rem] px-4 py-2.5 text-sm font-semibold text-slate-400 lg:inline-flex">
              Vue pensée pour l’accueil atelier et le stock.
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr_1fr]">
            <article className="rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                Stock valorisé
              </p>
              <p className="mt-3 text-3xl font-black text-slate-950">
                {formatCurrency(inventoryValue)}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                {totalUnits} unité(s) référencée(s)
              </p>
            </article>

            <article className="rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                Alertes stock
              </p>
              <p className="mt-3 text-3xl font-black text-slate-950">
                {lowStockCount}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Produits sous le seuil recommandé
              </p>
            </article>

            <article className="rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                Forfait moyen
              </p>
              <p className="mt-3 text-3xl font-black text-slate-950">
                {formatCurrency(averageServicePrice)}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Pièce + main d’œuvre comprise
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-white/70 bg-white p-5 shadow-sm shadow-slate-200/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={
                activeTab === 'products'
                  ? 'Rechercher par produit, catégorie, SKU...'
                  : 'Rechercher par service, pièce liée, description...'
              }
              className="w-full rounded-[1.1rem] border border-violet-200 bg-violet-50/50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-violet-300 focus:bg-white"
            />
          </div>

          <div className="text-sm text-slate-500">
            {activeTab === 'products'
              ? `${filteredParts.length} produit(s) affiché(s)`
              : `${filteredServices.length} service(s) affiché(s)`}
          </div>
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}

        <div className="mt-5 overflow-x-auto">
          {activeTab === 'products' ? (
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-y border-violet-100 text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                  <th className="px-4 py-4">Statut</th>
                  <th className="px-4 py-4">Produit</th>
                  <th className="px-4 py-4">SKU</th>
                  <th className="px-4 py-4">Coût achat</th>
                  <th className="px-4 py-4">Quantité</th>
                  <th className="px-4 py-4">Services liés</th>
                  <th className="px-4 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-100/70">
                {!isLoading && filteredParts.length > 0 ? (
                  filteredParts.map((part) => (
                    <tr key={part.id} className="hover:bg-violet-50/40">
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold ${
                            part.stock < 5
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          <AlertCircle className="h-3.5 w-3.5" />
                          {part.stock < 5 ? 'Limité' : 'En stock'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-black text-slate-950">{part.name}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {part.description || 'Aucune note technique'}
                        </p>
                      </td>
                      <td className="px-4 py-4 font-mono text-sm font-bold text-slate-700">
                        {part.sku}
                      </td>
                      <td className="px-4 py-4 font-black text-slate-950">
                        {formatCurrency(part.costPrice)}
                      </td>
                      <td className="px-4 py-4">
                        <span className="rounded-[0.9rem] border border-violet-200 bg-white px-4 py-2 text-sm font-black text-violet-800">
                          {part.stock}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-slate-600">
                        {part.linkedServicesCount ?? 0}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => openPartModal(part)}
                          className="rounded-[0.9rem] border border-violet-200 px-4 py-2 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
                        >
                          Voir plus
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-16 text-center text-sm text-slate-500">
                      {isLoading
                        ? 'Chargement des produits...'
                        : 'Aucun produit ne correspond à la recherche.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-y border-violet-100 text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
                  <th className="px-4 py-4">Service</th>
                  <th className="px-4 py-4">Pièce liée</th>
                  <th className="px-4 py-4">Main d’œuvre</th>
                  <th className="px-4 py-4">Prix catalogue</th>
                  <th className="px-4 py-4">Description</th>
                  <th className="px-4 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-100/70">
                {!isLoading && filteredServices.length > 0 ? (
                  filteredServices.map((service) => {
                    const total = service.laborCost + (service.part?.costPrice ?? 0)

                    return (
                      <tr key={service.id} className="hover:bg-violet-50/40">
                        <td className="px-4 py-4">
                          <p className="font-black text-slate-950">{service.name}</p>
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-slate-600">
                          {service.part?.name || 'Aucune pièce'}
                        </td>
                        <td className="px-4 py-4 font-black text-slate-950">
                          {formatCurrency(service.laborCost)}
                        </td>
                        <td className="px-4 py-4">
                          <span className="rounded-[0.9rem] bg-violet-100 px-4 py-2 text-sm font-black text-violet-800">
                            {formatCurrency(total)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-500">
                          {service.description || 'Service standard'}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => openServiceModal(service)}
                            className="rounded-[0.9rem] border border-violet-200 px-4 py-2 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
                          >
                            Voir plus
                          </button>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center text-sm text-slate-500">
                      {isLoading
                        ? 'Chargement des services...'
                        : 'Aucun service ne correspond à la recherche.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {showPartModal ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[1.75rem] border border-white/60 bg-white p-6 shadow-2xl shadow-slate-900/15">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-violet-600">
                  Produit catalogue
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                  {editingPart ? 'Modifier le produit' : 'Nouveau produit'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowPartModal(false)}
                className="rounded-2xl bg-slate-100 p-3 text-slate-500 transition hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={submitPart} className="mt-6 space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Produit
                  </label>
                  <input
                    required
                    value={partForm.name}
                    onChange={(event) =>
                      setPartForm((current) => ({ ...current, name: event.target.value }))
                    }
                    className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-300 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Référence / SKU
                  </label>
                  <input
                    required
                    value={partForm.sku}
                    onChange={(event) =>
                      setPartForm((current) => ({ ...current, sku: event.target.value }))
                    }
                    className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-300 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Quantité
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={partForm.stock}
                    onChange={(event) =>
                      setPartForm((current) => ({ ...current, stock: event.target.value }))
                    }
                    className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-300 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Prix d’achat
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0"
                    value={partForm.costPrice}
                    onChange={(event) =>
                      setPartForm((current) => ({
                        ...current,
                        costPrice: event.target.value,
                      }))
                    }
                    className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-300 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={partForm.description}
                  onChange={(event) =>
                    setPartForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-300 focus:bg-white"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPartModal(false)}
                  className="flex-1 rounded-[1rem] border border-slate-200 px-4 py-3 font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 rounded-[1rem] bg-violet-600 px-4 py-3 font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {showServiceModal ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[1.75rem] border border-white/60 bg-white p-6 shadow-2xl shadow-slate-900/15">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-violet-600">
                  Service catalogue
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                  {editingService ? 'Modifier le service' : 'Nouveau service'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowServiceModal(false)}
                className="rounded-2xl bg-slate-100 p-3 text-slate-500 transition hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={submitService} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Service
                </label>
                <input
                  required
                  value={serviceForm.name}
                  onChange={(event) =>
                    setServiceForm((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-300 focus:bg-white"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Pièce liée
                  </label>
                  <select
                    value={serviceForm.partId}
                    onChange={(event) =>
                      setServiceForm((current) => ({
                        ...current,
                        partId: event.target.value,
                      }))
                    }
                    className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-300 focus:bg-white"
                  >
                    <option value="">Aucune pièce</option>
                    {parts.map((part) => (
                      <option key={part.id} value={part.id}>
                        {part.name} ({formatCurrency(part.costPrice)})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    Main d’œuvre
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={serviceForm.laborCost}
                    onChange={(event) =>
                      setServiceForm((current) => ({
                        ...current,
                        laborCost: event.target.value,
                      }))
                    }
                    className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-300 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={serviceForm.description}
                  onChange={(event) =>
                    setServiceForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  className="w-full rounded-[1rem] border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-violet-300 focus:bg-white"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowServiceModal(false)}
                  className="flex-1 rounded-[1rem] border border-slate-200 px-4 py-3 font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 rounded-[1rem] bg-violet-600 px-4 py-3 font-bold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}
