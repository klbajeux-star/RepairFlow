'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, Building2, MapPin, Phone, Mail, FileText, Landmark, Info } from 'lucide-react'

interface WorkshopSettings {
  id: string
  name: string
  address: string
  zipCode: string
  city: string
  countryCode: string
  phone: string
  email: string
  siret: string
  vatNumber: string
  legalForm: string
  capital: string
  rcs: string
  iban?: string | null
  bic?: string | null
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<WorkshopSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data)
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err)
        setIsLoading(false)
      })
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!settings) return

    setIsSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Paramètres enregistrés avec succès.' })
      } else {
        setMessage({ type: 'error', text: 'Erreur lors de l\'enregistrement.' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Erreur réseau.' })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-blue-600">Configuration</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Paramètres Boutique</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl transition hover:bg-blue-600 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
          Enregistrer les modifications
        </button>
      </div>

      {message && (
        <div className={`rounded-2xl p-4 text-sm font-bold ${message.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
          {message.text}
        </div>
      )}

      <form className="grid gap-8 md:grid-cols-2">
        {/* Informations de base */}
        <section className="rounded-[2.5rem] border border-white/60 bg-white/40 p-8 shadow-sm backdrop-blur-md space-y-6">
          <div className="flex items-center gap-3 text-blue-600">
            <Building2 className="w-5 h-5" />
            <h2 className="text-xl font-black">Identité</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Nom de l'enseigne</label>
              <input
                value={settings?.name || ''}
                onChange={e => setSettings(s => s ? { ...s, name: e.target.value } : null)}
                className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 font-bold outline-none focus:border-blue-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Forme Juridique</label>
                <input
                  value={settings?.legalForm || ''}
                  onChange={e => setSettings(s => s ? { ...s, legalForm: e.target.value } : null)}
                  placeholder="ex: SAS, SARL..."
                  className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 font-bold outline-none focus:border-blue-300"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Capital (€)</label>
                <input
                  value={settings?.capital || ''}
                  onChange={e => setSettings(s => s ? { ...s, capital: e.target.value } : null)}
                  className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 font-bold outline-none focus:border-blue-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Localisation */}
        <section className="rounded-[2.5rem] border border-white/60 bg-white/40 p-8 shadow-sm backdrop-blur-md space-y-6">
          <div className="flex items-center gap-3 text-blue-600">
            <MapPin className="w-5 h-5" />
            <h2 className="text-xl font-black">Localisation</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Adresse</label>
              <input
                value={settings?.address || ''}
                onChange={e => setSettings(s => s ? { ...s, address: e.target.value } : null)}
                className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 font-bold outline-none focus:border-blue-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Code Postal</label>
                <input
                  value={settings?.zipCode || ''}
                  onChange={e => setSettings(s => s ? { ...s, zipCode: e.target.value } : null)}
                  className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 font-bold outline-none focus:border-blue-300"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Ville</label>
                <input
                  value={settings?.city || ''}
                  onChange={e => setSettings(s => s ? { ...s, city: e.target.value } : null)}
                  className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 font-bold outline-none focus:border-blue-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Coordonnées */}
        <section className="rounded-[2.5rem] border border-white/60 bg-white/40 p-8 shadow-sm backdrop-blur-md space-y-6">
          <div className="flex items-center gap-3 text-blue-600">
            <Phone className="w-5 h-5" />
            <h2 className="text-xl font-black">Coordonnées</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Téléphone</label>
              <input
                value={settings?.phone || ''}
                onChange={e => setSettings(s => s ? { ...s, phone: e.target.value } : null)}
                className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 font-bold outline-none focus:border-blue-300"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email</label>
              <input
                value={settings?.email || ''}
                onChange={e => setSettings(s => s ? { ...s, email: e.target.value } : null)}
                className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 font-bold outline-none focus:border-blue-300"
              />
            </div>
          </div>
        </section>

        {/* Fiscalité & RCS */}
        <section className="rounded-[2.5rem] border border-white/60 bg-white/40 p-8 shadow-sm backdrop-blur-md space-y-6">
          <div className="flex items-center gap-3 text-blue-600">
            <FileText className="w-5 h-5" />
            <h2 className="text-xl font-black">Légal & Fiscal</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">SIRET</label>
              <input
                value={settings?.siret || ''}
                onChange={e => setSettings(s => s ? { ...s, siret: e.target.value } : null)}
                className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 font-bold outline-none focus:border-blue-300"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Numéro de TVA</label>
              <input
                value={settings?.vatNumber || ''}
                onChange={e => setSettings(s => s ? { ...s, vatNumber: e.target.value } : null)}
                className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 font-bold outline-none focus:border-blue-300"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Ville du RCS</label>
              <input
                value={settings?.rcs || ''}
                onChange={e => setSettings(s => s ? { ...s, rcs: e.target.value } : null)}
                className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 font-bold outline-none focus:border-blue-300"
              />
            </div>
          </div>
        </section>

        {/* Paiement */}
        <section className="rounded-[2.5rem] border border-white/60 bg-white/40 p-8 shadow-sm backdrop-blur-md space-y-6 md:col-span-2">
          <div className="flex items-center gap-3 text-blue-600">
            <Landmark className="w-5 h-5" />
            <h2 className="text-xl font-black">Informations Bancaires</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">IBAN</label>
              <input
                value={settings?.iban || ''}
                onChange={e => setSettings(s => s ? { ...s, iban: e.target.value } : null)}
                className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 font-bold outline-none focus:border-blue-300"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">BIC</label>
              <input
                value={settings?.bic || ''}
                onChange={e => setSettings(s => s ? { ...s, bic: e.target.value } : null)}
                className="w-full rounded-xl border border-slate-100 bg-white px-4 py-3 font-bold outline-none focus:border-blue-300"
              />
            </div>
          </div>
        </section>

        {/* Information Factur-X */}
        <section className="rounded-3xl bg-blue-50/50 p-6 border border-blue-100 md:col-span-2">
          <div className="flex gap-4">
            <Info className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
            <div>
              <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest mb-2">Conformité EN 16931-1 (Factur-X)</h3>
              <p className="text-sm text-blue-700/80 leading-relaxed font-bold">
                Ces informations sont indispensables pour générer des factures conformes. 
                Elles seront prochainement utilisées pour injecter les données XML structurées (Factur-X) 
                obligatoires pour la réforme de la facturation électronique 2026.
              </p>
            </div>
          </div>
        </section>
      </form>
    </div>
  )
}
