'use client'

import { useEffect, useMemo, useState } from 'react'
import { Mail, Phone, Plus, Search, Users, X } from 'lucide-react'
import { formatDate } from '@/lib/repair'

interface Client {
  id: string
  name: string
  email?: string | null
  phone: string
  createdAt: string
  repairCount?: number
}

const initialForm = {
  name: '',
  email: '',
  phone: '',
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState(initialForm)
  const [search, setSearch] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    void fetchClients()
  }, [])

  async function fetchClients() {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/clients')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'Impossible de charger les clients.')
      }

      setClients(Array.isArray(data) ? data : [])
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Impossible de charger les clients.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  function openCreateModal() {
    setEditingClient(null)
    setFormData(initialForm)
    setError(null)
    setShowModal(true)
  }

  function openEditModal(client: Client) {
    setEditingClient(client)
    setFormData({
      name: client.name,
      email: client.email ?? '',
      phone: client.phone,
    })
    setError(null)
    setShowModal(true)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsSaving(true)
      setError(null)

      const response = await fetch(
        editingClient ? `/api/clients/${editingClient.id}` : '/api/clients',
        {
          method: editingClient ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'Impossible d’enregistrer le client.')
      }

      setShowModal(false)
      setEditingClient(null)
      setFormData(initialForm)
      await fetchClients()
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Impossible d’enregistrer le client.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  const filteredClients = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return clients
    }

    return clients.filter((client) =>
      [client.name, client.phone, client.email ?? '']
        .join(' ')
        .toLowerCase()
        .includes(query)
    )
  }, [clients, search])

  const returningClients = clients.filter((client) => (client.repairCount ?? 0) > 0).length

  return (
    <div className="space-y-8 pb-8">
      <section className="grid gap-4 md:grid-cols-3">
        <article className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-sm shadow-slate-200/60">
          <div className="inline-flex rounded-2xl bg-emerald-100 p-3 text-emerald-700">
            <Users className="h-6 w-6" />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.26em] text-slate-400">
            Fichier clients
          </p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {clients.length}
          </p>
        </article>

        <article className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-sm shadow-slate-200/60">
          <div className="inline-flex rounded-2xl bg-blue-100 p-3 text-blue-700">
            <Phone className="h-6 w-6" />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.26em] text-slate-400">
            Clients récurrents
          </p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {returningClients}
          </p>
        </article>

        <article className="rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-sm shadow-slate-200/60">
          <div className="inline-flex rounded-2xl bg-violet-100 p-3 text-violet-700">
            <Mail className="h-6 w-6" />
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.26em] text-slate-400">
            Emails renseignés
          </p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            {clients.filter((client) => Boolean(client.email)).length}
          </p>
        </article>
      </section>

      <section className="rounded-[2rem] border border-white/70 bg-white p-6 shadow-sm shadow-slate-200/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher par nom, téléphone ou email"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-300 focus:bg-white"
            />
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
          >
            <Plus className="h-4 w-4" />
            Ajouter un client
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
                <th className="px-4 py-4">Client</th>
                <th className="px-4 py-4">Coordonnées</th>
                <th className="px-4 py-4">Historique</th>
                <th className="px-4 py-4">Créé le</th>
                <th className="px-4 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!isLoading && filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 font-black text-emerald-700">
                          {client.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-black text-slate-950">{client.name}</p>
                          <p className="text-sm text-slate-500">
                            ID client {client.id.slice(-6).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1 text-sm text-slate-600">
                        <p>{client.phone}</p>
                        <p>{client.email || 'Aucun email renseigné'}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">
                        {client.repairCount ?? 0} réparation(s)
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-slate-600">
                      {formatDate(client.createdAt)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => openEditModal(client)}
                        className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-16 text-center text-sm text-slate-500">
                    {isLoading
                      ? 'Chargement des clients...'
                      : 'Aucun client ne correspond à la recherche.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showModal ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2rem] border border-white/60 bg-white p-6 shadow-2xl shadow-slate-900/15">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-emerald-600">
                  Fiche client
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
                  {editingClient ? 'Modifier le client' : 'Nouveau client'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-2xl bg-slate-100 p-3 text-slate-500 transition hover:bg-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Nom complet
                </label>
                <input
                  required
                  value={formData.name}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, name: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-300 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Téléphone
                </label>
                <input
                  required
                  value={formData.phone}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, phone: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-300 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData((current) => ({ ...current, email: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-300 focus:bg-white"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 rounded-2xl bg-emerald-600 px-4 py-3 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
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
