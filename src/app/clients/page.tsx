'use client'

import { useEffect, useMemo, useState } from 'react'
import { Mail, MapPin, Phone, Plus, Search, Trash2, Users, X } from 'lucide-react'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { AddressAutocomplete } from '@/components/address-autocomplete'
import { useConfirm } from '@/hooks/use-confirm'
import { formatDate } from '@/lib/repair'

interface Client {
  id: string
  name: string
  firstName?: string | null
  lastName?: string | null
  email?: string | null
  phone: string
  clientType?: string | null
  address?: string | null
  zipCode?: string | null
  city?: string | null
  createdAt: string
  repairCount?: number
}

const initialForm = {
  firstName: '',
  lastName: '',
  name: '',
  email: '',
  phone: '',
  clientType: 'Particulier',
  address: '',
  zipCode: '',
  city: '',
}

export default function ClientsPage() {
  const confirmDialog = useConfirm()
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
      firstName: client.firstName ?? '',
      lastName: client.lastName ?? '',
      name: client.name,
      email: client.email ?? '',
      phone: client.phone,
      clientType: client.clientType ?? 'Particulier',
      address: client.address ?? '',
      zipCode: client.zipCode ?? '',
      city: client.city ?? '',
    })
    setError(null)
    setShowModal(true)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsSaving(true)
      setError(null)

      const payload = {
        ...formData,
        name: formData.firstName && formData.lastName 
          ? `${formData.firstName} ${formData.lastName}`.trim()
          : formData.name || `${formData.firstName} ${formData.lastName}`.trim()
      }

      const response = await fetch(
        editingClient ? `/api/clients/${editingClient.id}` : '/api/clients',
        {
          method: editingClient ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'Une erreur est survenue.')
      }

      await fetchClients()
      setShowModal(false)
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : 'Une erreur est survenue.'
      )
    } finally {
      setIsSaving(false)
    }
  }

  async function deleteClient(id: string) { 
    confirmDialog.confirm({ 
      title: 'Supprimer le client', 
      message: 'Voulez-vous vraiment supprimer ce client ? Cette action est irréversible.', 
      type: 'danger', 
      confirmLabel: 'Supprimer', 
      onConfirm: async () => { 
        try { 
          setIsLoading(true); 
          setError(null);
          const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' }); 
          if (res.ok) { 
            setClients(clients.filter(c => c.id !== id)); 
          } else {
            const data = await res.json().catch(() => ({}));
            setError(data.error || 'Impossible de supprimer le client.');
          }
        } catch (err) { 
          console.error(err); 
          setError('Une erreur réseau est survenue.');
        } finally { 
          setIsLoading(false); 
        } 
      } 
    }); 
  }
  const returningClients = useMemo(() => {
    const query = search.toLowerCase()
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(query) ||
        client.phone.includes(query) ||
        client.email?.toLowerCase().includes(query)
    )
  }, [clients, search])

  const stats = useMemo(() => {
    return {
      total: clients.length,
      professionals: clients.filter((c) => c.clientType === 'Professionnel').length,
      newThisMonth: clients.filter((c) => {
        const date = new Date(c.createdAt)
        const now = new Date()
        return (
          date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
        )
      }).length,
    }
  }, [clients])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Clients
          </h1>
          <p className="mt-2 font-medium text-slate-500">
            Gérez votre base de données clients et leur historique
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white shadow-xl shadow-slate-950/20 transition hover:bg-slate-800 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Nouveau Client
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-[2rem] border border-white bg-white/50 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Total Clients</p>
              <p className="text-2xl font-black text-slate-950">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white bg-white/50 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Professionnels</p>
              <p className="text-2xl font-black text-slate-950">
                {stats.professionals}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white bg-white/50 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-purple-50 p-3 text-purple-600">
              <Plus className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Ce mois-ci</p>
              <p className="text-2xl font-black text-slate-950">
                {stats.newThisMonth}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un client par nom, tel ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-4 outline-none transition focus:border-emerald-300 focus:ring-4 focus:ring-emerald-50"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-[2.5rem] border border-white bg-white/50 shadow-sm backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Client
                </th>
                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Contact
                </th>
                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Localisation
                </th>
                <th className="px-6 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Tickets
                </th>
                <th className="px-6 py-5 text-right text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {returningClients.map((client) => (
                <tr
                  key={client.id}
                  className="group transition hover:bg-white"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 font-black text-slate-600 transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
                        {client.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-950">{client.name}</p>
                        <span className={`inline-flex items-center rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                          client.clientType === 'Professionnel' 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {client.clientType}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        {client.phone}
                      </div>
                      {client.email && (
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                          <Mail className="h-3.5 w-3.5" />
                          {client.email}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {client.city ? (
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {client.city} {client.zipCode && `(${client.zipCode})`}
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-slate-300 italic">Non renseigné</span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-600">
                        {client.repairCount ?? 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button
                      onClick={() => openEditModal(client)}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      Modifier
                    </button>
                    <button onClick={() => deleteClient(client.id)} className="ml-2 rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-600 transition hover:border-rose-200 hover:bg-rose-100 active:scale-95"><Trash2 className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {returningClients.length === 0 && (
            <div className="py-20 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[2rem] bg-slate-50 text-slate-300">
                <Search className="h-10 w-10" />
              </div>
              <h3 className="mt-6 text-xl font-black tracking-tight text-slate-950">Aucun client trouvé</h3>
              <p className="mt-2 font-medium text-slate-500">Essayez d'ajuster votre recherche ou créez un nouveau client.</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog isOpen={confirmDialog.isOpen} onClose={confirmDialog.close} onConfirm={confirmDialog.options?.onConfirm || (() => {})} title={confirmDialog.options?.title || ''} message={confirmDialog.options?.message || ''} type={confirmDialog.options?.type} confirmLabel={confirmDialog.options?.confirmLabel} cancelLabel={confirmDialog.options?.cancelLabel} />

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-950/20 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-full max-w-2xl animate-in fade-in zoom-in duration-300 rounded-[3rem] border border-white bg-white p-8 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-950">
                  {editingClient ? 'Modifier le client' : 'Nouveau Client'}
                </h2>
                <p className="mt-1 font-medium text-slate-500">
                  Remplissez les informations essentielles du client
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-2xl bg-slate-100 p-3 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {error ? (
              <div className="mb-6 rounded-2xl bg-rose-50 p-4 text-sm font-bold text-rose-600 border border-rose-100">
                {error}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-400">
                    Prénom
                  </label>
                  <input
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-300 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-400">
                    Nom
                  </label>
                  <input
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-300 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-400">
                    Téléphone
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-300 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-400">
                    Type de client
                  </label>
                  <select
                    value={formData.clientType}
                    onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-300 focus:bg-white appearance-none"
                  >
                    <option value="Particulier">Particulier</option>
                    <option value="Professionnel">Professionnel</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-300 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Adresse
                </label>
                <AddressAutocomplete
                  value={formData.address}
                  onChange={(val) => setFormData({ ...formData, address: val })}
                  onSelect={(addr) => setFormData({
                    ...formData,
                    address: addr.street,
                    zipCode: addr.zipCode,
                    city: addr.city
                  })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-400">
                    Code Postal
                  </label>
                  <input
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-300 focus:bg-white"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-slate-400">
                    Ville
                  </label>
                  <input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-300 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-2xl border border-slate-200 px-6 py-4 font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white shadow-xl shadow-slate-950/20 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? 'Enregistrement...' : 'Enregistrer le client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}
