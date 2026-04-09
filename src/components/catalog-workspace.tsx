'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  AlertCircle,
  ChevronRight,
  Database,
  Layers,
  LayoutGrid,
  Loader2,
  Package,
  Plus,
  Search,
  Smartphone,
  Tablet,
  Tag,
  Wrench,
  X,
} from 'lucide-react'
import { formatCurrency } from '@/lib/repair'
import { SideDrawer } from '@/components/side-drawer'

type CatalogTab = 'models' | 'services' | 'parts'

interface Brand {
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
  brand: Brand
  type: DeviceType
  _count?: {
    services: number
    parts: number
  }
}

interface Part {
  id: string
  name: string
  sku: string
  costPrice: number
  stock: number
  minStock: number
  quality?: string | null // ORIGINAL | COMPATIBLE
  supplier?: string | null
  supplierRef?: string | null
  location?: string | null
  description?: string | null
  modelId?: string | null
  model?: (DeviceModel & { brand: Brand }) | null
  linkedServicesCount?: number
}

interface Service {
  id: string
  name: string
  laborCost: number
  partId?: string | null
  part?: { name: string; costPrice: number } | null
  modelId?: string | null
  model?: (DeviceModel & { brand: Brand }) | null
  description?: string | null
}

const initialModelForm = {
  name: '',
  modelReference: '',
  brandId: '',
  typeId: '',
}

const initialServiceForm = {
  name: '',
  laborCost: '',
  suggestedPrice: '',
  duration: '30',
  partId: '',
  modelId: '',
  description: '',
}

const initialPartForm = {
  name: '',
  sku: '',
  costPrice: '0',
  stock: '0',
  minStock: '0',
  quality: 'ORIGINAL',
  supplier: '',
  supplierRef: '',
  location: '',
  modelId: '',
  description: '',
  createLinkedService: false,
}

export function CatalogWorkspace() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const paramTab = searchParams.get('tab') as CatalogTab
  
  const [activeTab, setActiveTab] = useState<CatalogTab>(paramTab || 'models')
  const [brands, setBrands] = useState<Brand[]>([])
  const [types, setTypes] = useState<DeviceType[]>([])
  const [models, setModels] = useState<DeviceModel[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [parts, setParts] = useState<Part[]>([])
  
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [drawerError, setDrawerError] = useState<string | null>(null)

  // Drawer states
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerType, setDrawerType] = useState<'model' | 'service' | 'part' | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form states
  const [modelForm, setModelForm] = useState(initialModelForm)
  const [serviceForm, setServiceForm] = useState(initialServiceForm)
  const [partForm, setPartForm] = useState(initialPartForm)

  // Filter states
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null)

  useEffect(() => {
    void loadAllData()
  }, [])

  useEffect(() => {
    if (paramTab && ['models', 'services', 'parts'].includes(paramTab)) {
      setActiveTab(paramTab)
    }
  }, [paramTab])

  async function loadAllData() {
    try {
      setIsLoading(true)
      const [bRes, tRes, mRes, sRes, pRes] = await Promise.all([
        fetch('/api/brands'),
        fetch('/api/types'),
        fetch('/api/models'),
        fetch('/api/services'),
        fetch('/api/parts'),
      ])

      const [bData, tData, mData, sData, pData] = await Promise.all([
        bRes.json(),
        tRes.json(),
        mRes.json(),
        sRes.json(),
        pRes.json(),
      ])

      setBrands(bData)
      setTypes(tData)
      setModels(mData)
      setServices(sData)
      setParts(pData)
    } catch (err) {
      setError('Erreur lors du chargement du catalogue.')
    } finally {
      setIsLoading(false)
    }
  }

  const filteredModels = useMemo(() => {
    return models.filter(m => {
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                          m.brand.name.toLowerCase().includes(search.toLowerCase())
      const matchBrand = !selectedBrandId || m.brandId === selectedBrandId
      return matchSearch && matchBrand
    })
  }, [models, search, selectedBrandId])

  const filteredServices = useMemo(() => {
    return services.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.model?.name.toLowerCase().includes(search.toLowerCase())
      const matchBrand = !selectedBrandId || s.model?.brandId === selectedBrandId
      return matchSearch && matchBrand
    })
  }, [services, search, selectedBrandId])

  const filteredParts = useMemo(() => {
    return parts.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.sku.toLowerCase().includes(search.toLowerCase()) ||
                          p.model?.name.toLowerCase().includes(search.toLowerCase())
      const matchBrand = !selectedBrandId || p.model?.brandId === selectedBrandId
      return matchSearch && matchBrand
    })
  }, [parts, search, selectedBrandId])

  function openDrawer(type: 'model' | 'service' | 'part', item?: any) {
    setDrawerType(type)
    setEditingId(item?.id || null)
    setDrawerError(null)
    
    if (type === 'model') setModelForm(item ? { name: item.name, modelReference: item.modelReference || '', brandId: item.brandId, typeId: item.typeId } : initialModelForm)
    if (type === 'service') setServiceForm(item ? { name: item.name, laborCost: item.laborCost.toString(), suggestedPrice: item.suggestedPrice?.toString() || '', duration: item.duration?.toString() || '30', partId: item.partId || '', modelId: item.modelId || '', description: item.description || '' } : initialServiceForm)
    if (type === 'part') setPartForm(item ? { name: item.name, sku: item.sku, costPrice: item.costPrice.toString(), stock: item.stock.toString(), minStock: item.minStock?.toString() || '0', quality: item.quality || 'ORIGINAL', supplier: item.supplier || '', supplierRef: item.supplierRef || '', location: item.location || '', modelId: item.modelId || '', description: item.description || '', createLinkedService: false } : initialPartForm)
    
    setDrawerOpen(true)
  }

  async function handleDelete() {
    if (!editingId || !confirm('Voulez-vous vraiment supprimer cet élément ?')) return
    
    try {
      setDrawerError(null)
      setIsSaving(true)
      const baseUrl = activeTab === 'models' ? '/api/models' : activeTab === 'services' ? '/api/services' : '/api/parts'
      const res = await fetch(`${baseUrl}/${editingId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Erreur lors de la suppression.')
      }

      await loadAllData()
      setDrawerOpen(false)
    } catch (err) {
      setDrawerError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleSave() {
    try {
      setDrawerError(null)
      setIsSaving(true)
      const baseUrl = drawerType === 'model' ? '/api/models' : drawerType === 'service' ? '/api/services' : '/api/parts'
      const url = editingId ? `${baseUrl}/${editingId}` : baseUrl
      const method = editingId ? 'PATCH' : 'POST'
      const body = drawerType === 'model' ? modelForm : drawerType === 'service' ? serviceForm : partForm
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l’enregistrement.')
      }
      
      const savedItem = data

      // Logic for automatic service creation
      if (drawerType === 'part' && !editingId && partForm.createLinkedService) {
         const sRes = await fetch('/api/services', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
              name: `Remplacement ${partForm.name}`,
              laborCost: 30,
              suggestedPrice: (parseFloat(partForm.costPrice) || 0) + 60,
              partId: savedItem.id,
              modelId: partForm.modelId,
              description: `Service généré automatiquement.`
           })
         })
         if (!sRes.ok) {
           const sData = await sRes.json().catch(() => ({}))
           console.error('Erreur creation service auto:', sData.error)
         }
      }

      await loadAllData()
      setDrawerOpen(false)
    } catch (err) {
      setDrawerError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    } finally {
      setIsSaving(false)
    }
  }

  function changeTab(tab: CatalogTab) {
    setActiveTab(tab)
    router.push(`/catalog?tab=${tab}`)
  }

  return (
    <div className="min-h-screen space-y-8 pb-12">
      {/* Header Section */}
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-blue-600">Espace Catalogue</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Gestion Technique</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => openDrawer(activeTab === 'models' ? 'model' : activeTab === 'services' ? 'service' : 'part')}
            className="flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl transition hover:bg-blue-600 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Nouveau {activeTab === 'models' ? 'modèle' : activeTab === 'services' ? 'forfait' : 'produit'}
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-2 rounded-[2rem] border border-slate-100 bg-white p-1.5 shadow-sm">
        <TabButton active={activeTab === 'models'} onClick={() => changeTab('models')} icon={<Smartphone className="h-4 w-4" />} label="Modèles" count={models.length} />
        <TabButton active={activeTab === 'services'} onClick={() => changeTab('services')} icon={<Wrench className="h-4 w-4" />} label="Prestations" count={services.length} />
        <TabButton active={activeTab === 'parts'} onClick={() => changeTab('parts')} icon={<Package className="h-4 w-4" />} label="Pièces détachées" count={parts.length} />
      </nav>

      {/* Main Content */}
      <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar Filters */}
        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Recherche</p>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Filtrer..."
                className="w-full rounded-xl border border-slate-50 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-100 focus:bg-white focus:ring-4 focus:ring-blue-50/50"
              />
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Marques</p>
            <div className="mt-4 space-y-1">
              <button 
                onClick={() => setSelectedBrandId(null)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition ${!selectedBrandId ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                Toutes
              </button>
              {brands.map(b => (
                <button 
                  key={b.id}
                  onClick={() => setSelectedBrandId(b.id)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition ${selectedBrandId === b.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* List Content */}
        <main>
          {isLoading ? (
            <div className="flex h-64 items-center justify-center rounded-[2.5rem] bg-white shadow-sm">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    {activeTab === 'models' ? (
                      <>
                        <th className="px-8 py-5">Marque & Type</th>
                        <th className="px-8 py-5">Modèle & Réf.</th>
                        <th className="px-8 py-5">Contenu</th>
                        <th className="px-8 py-5 text-right">Action</th>
                      </>
                    ) : activeTab === 'services' ? (
                      <>
                        <th className="px-8 py-5">Forfait & Temps</th>
                        <th className="px-8 py-5">Modèle Lié</th>
                        <th className="px-8 py-5">Prix de Vente</th>
                        <th className="px-8 py-5 text-right">Action</th>
                      </>
                    ) : (
                      <>
                        <th className="px-8 py-5">Produit & Qualité</th>
                        <th className="px-8 py-5">SKU / Stock</th>
                        <th className="px-8 py-5">Coût Achat</th>
                        <th className="px-8 py-5 text-right">Action</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {activeTab === 'models' && filteredModels.map(m => (
                    <tr key={m.id} className="group hover:bg-blue-50/30 transition">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <span className="rounded-lg bg-slate-900 px-2.5 py-1 text-[10px] font-black text-white uppercase tracking-wider">{m.brand.name}</span>
                          <span className="text-xs font-bold text-slate-400">{m.type.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="font-black text-slate-950">{m.name}</p>
                        {m.modelReference && <p className="text-[10px] font-bold text-blue-600 uppercase">{m.modelReference}</p>}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex gap-4">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                            <Wrench className="h-3.5 w-3.5" /> {m._count?.services || 0}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                            <Package className="h-3.5 w-3.5" /> {m._count?.parts || 0}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button onClick={() => openDrawer('model', m)} className="text-blue-600 hover:underline text-sm font-bold">Détails</button>
                      </td>
                    </tr>
                  ))}
                  
                  {activeTab === 'services' && filteredServices.map(s => (
                    <tr key={s.id} className="group hover:bg-blue-50/30 transition">
                      <td className="px-8 py-5">
                        <p className="font-black text-slate-950">{s.name}</p>
                        <p className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                          <Tag className="h-3 w-3" /> {s.duration || 30} min
                        </p>
                      </td>
                      <td className="px-8 py-5">
                        {s.model ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500">{s.model.brand.name}</span>
                            <span className="text-xs font-black text-slate-950">{s.model.name}</span>
                          </div>
                        ) : <span className="text-xs text-slate-400">—</span>}
                      </td>
                      <td className="px-8 py-5 font-bold text-blue-600">{formatCurrency(s.suggestedPrice || s.laborCost)}</td>
                      <td className="px-8 py-5 text-right">
                        <button onClick={() => openDrawer('service', s)} className="text-blue-600 hover:underline text-sm font-bold">Modifier</button>
                      </td>
                    </tr>
                  ))}

                  {activeTab === 'parts' && filteredParts.map(p => (
                    <tr key={p.id} className="group hover:bg-blue-50/30 transition">
                      <td className="px-8 py-5">
                        <p className="font-black text-slate-950">{p.name}</p>
                        <div className="flex items-center gap-2">
                           <span className={`rounded px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider ${p.quality === 'ORIGINAL' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{p.quality === 'ORIGINAL' ? 'Origine' : 'Compatible'}</span>
                           <p className="text-[10px] font-bold text-slate-400">{p.model ? `${p.model.brand.name} ${p.model.name}` : 'Pièce universelle'}</p>
                           {p.location && <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-black text-slate-500">{p.location}</span>}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="font-mono text-[10px] font-bold text-slate-400 uppercase">{p.sku}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="h-1.5 w-12 rounded-full bg-slate-100 overflow-hidden">
                            <div className={`h-full ${p.stock <= (p.minStock || 0) ? 'bg-red-500 animate-pulse' : p.stock < 5 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(p.stock * 10, 100)}%` }} />
                          </div>
                          <span className={`text-xs font-black ${p.stock <= (p.minStock || 0) ? 'text-red-600' : 'text-slate-950'}`}>{p.stock}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right font-bold text-slate-950">{formatCurrency(p.costPrice)}</td>
                      <td className="px-8 py-5 text-right">
                        <button onClick={() => openDrawer('part', p)} className="text-blue-600 hover:underline text-sm font-bold">Stock</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </section>

      {/* SideDrawer for Creation/Edition */}
      <SideDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingId ? 'Modifier' : 'Ajouter'}
        subtitle={drawerType === 'model' ? 'Modèle' : drawerType === 'service' ? 'Prestation' : 'Pièce'}
        footer={
          <div className="flex items-center justify-between gap-3">
             {editingId ? (
               <button 
                 onClick={handleDelete}
                 className="text-sm font-bold text-red-500 hover:text-red-700 hover:underline"
               >
                 Supprimer
               </button>
             ) : (
               <div />
             )}
             <div className="flex items-center gap-3">
               <button onClick={() => setDrawerOpen(false)} className="text-sm font-bold text-slate-400">Annuler</button>
               <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 disabled:opacity-50"
               >
                 {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enregistrer'}
               </button>
             </div>
          </div>
        }
      >
        <div className="space-y-6">
          {drawerError && (
            <div className="rounded-2xl bg-red-50 p-4 text-red-600 ring-1 ring-inset ring-red-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm font-bold">{drawerError}</p>
              </div>
            </div>
          )}
          
          {drawerType === 'model' && (
            <>
              <Field label="Nom du modèle">
                <input value={modelForm.name} onChange={e => setModelForm(p => ({...p, name: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3" placeholder="ex: iPhone 15 Pro" />
              </Field>
              <Field label="Référence Technique">
                <input value={modelForm.modelReference} onChange={e => setModelForm(p => ({...p, modelReference: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3" placeholder="ex: A2403" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Marque">
                  <select value={modelForm.brandId} onChange={e => setModelForm(p => ({...p, brandId: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <option value="">Sélectionner</option>
                    {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </Field>
                <Field label="Type">
                  <select value={modelForm.typeId} onChange={e => setModelForm(p => ({...p, typeId: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <option value="">Sélectionner</option>
                    {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </Field>
              </div>
            </>
          )}

          {drawerType === 'service' && (
            <>
              <Field label="Désignation du forfait">
                <input value={serviceForm.name} onChange={e => setServiceForm(p => ({...p, name: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3" placeholder="ex: Changement écran OLED" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Modèle concerné">
                  <select value={serviceForm.modelId} onChange={e => setServiceForm(p => ({...p, modelId: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <option value="">Universel</option>
                    {models.map(m => <option key={m.id} value={m.id}>{m.brand.name} {m.name}</option>)}
                  </select>
                </Field>
                <Field label="Durée (min)">
                  <input type="number" value={serviceForm.duration} onChange={e => setServiceForm(p => ({...p, duration: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3" />
                </Field>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Field label="Main d'œuvre (€)">
                  <input type="number" value={serviceForm.laborCost} onChange={e => setServiceForm(p => ({...p, laborCost: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3" />
                </Field>
                <Field label="Prix de vente TTC (€)">
                  <input type="number" value={serviceForm.suggestedPrice} onChange={e => setServiceForm(p => ({...p, suggestedPrice: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 font-black text-blue-600" />
                </Field>
              </div>

              <Field label="Pièce associée">
                <select value={serviceForm.partId} onChange={e => setServiceForm(p => ({...p, partId: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <option value="">Aucune</option>
                  {parts.map(p => <option key={p.id} value={p.id}>{p.name} ({p.sku}) — {formatCurrency(p.costPrice)}</option>)}
                </select>
              </Field>

              {serviceForm.suggestedPrice && (
                <div className="rounded-2xl bg-slate-900 p-4 text-white">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Marge Brute HT</p>
                    <p className="text-xl font-black">
                      {formatCurrency(
                        parseFloat(serviceForm.suggestedPrice) - 
                        (parts.find(p => p.id === serviceForm.partId)?.costPrice || 0)
                      )}
                    </p>
                  </div>
                </div>
              )}

              <Field label="Notes techniques">
                <textarea value={serviceForm.description} onChange={e => setServiceForm(p => ({...p, description: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3" rows={2} />
              </Field>
            </>
          )}

          {drawerType === 'part' && (
            <>
              <Field label="Désignation de la pièce">
                <input value={partForm.name} onChange={e => setPartForm(p => ({...p, name: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3" placeholder="ex: Batterie Premium 3100mAh" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Référence SKU">
                  <input value={partForm.sku} onChange={e => setPartForm(p => ({...p, sku: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3" />
                </Field>
                <Field label="Qualité">
                  <select value={partForm.quality} onChange={e => setPartForm(p => ({...p, quality: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 font-bold">
                    <option value="ORIGINAL">Origine (OEM)</option>
                    <option value="COMPATIBLE">Compatible</option>
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Prix d'achat HT (€)">
                  <input type="number" value={partForm.costPrice} onChange={e => setPartForm(p => ({...p, costPrice: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3" />
                </Field>
                <Field label="Stock actuel">
                  <input type="number" value={partForm.stock} onChange={e => setPartForm(p => ({...p, stock: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Seuil d'alerte stock">
                  <input type="number" value={partForm.minStock} onChange={e => setPartForm(p => ({...p, minStock: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-red-600 font-bold" />
                </Field>
                <Field label="Modèle spécifique">
                  <select value={partForm.modelId} onChange={e => setPartForm(p => ({...p, modelId: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <option value="">Générique</option>
                    {models.map(m => <option key={m.id} value={m.id}>{m.brand.name} {m.name}</option>)}
                  </select>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Fournisseur">
                  <input value={partForm.supplier} onChange={e => setPartForm(p => ({...p, supplier: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3" placeholder="ex: MobileParts" />
                </Field>
                <Field label="Emplacement (Rayon)">
                  <input value={partForm.location} onChange={e => setPartForm(p => ({...p, location: e.target.value}))} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3" placeholder="ex: B1-C4" />
                </Field>
              </div>

              {!editingId && (
                <div className="flex items-center gap-3 rounded-2xl bg-blue-50/50 p-4 ring-1 ring-inset ring-blue-100">
                  <input 
                    type="checkbox" 
                    id="createLinkedService" 
                    checked={partForm.createLinkedService} 
                    onChange={e => setPartForm(p => ({ ...p, createLinkedService: e.target.checked }))}
                    className="h-5 w-5 rounded-lg accent-blue-600"
                  />
                  <label htmlFor="createLinkedService" className="text-sm font-bold text-blue-900 cursor-pointer select-none">
                    Créer automatiquement un forfait de service lié
                  </label>
                </div>
              )}
            </>
          )}
        </div>
      </SideDrawer>
    </div>
  )
}

function TabButton({ active, onClick, icon, label, count }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, count: number }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-2 rounded-[1.75rem] py-3.5 text-sm font-black transition ${active ? 'bg-slate-950 text-white shadow-xl shadow-slate-900/20' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
    >
      {icon}
      {label}
      <span className={`ml-1 rounded-full px-2 py-0.5 text-[10px] ${active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{count}</span>
    </button>
  )
}

function Field({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-black uppercase tracking-widest text-slate-400">{label}</p>
      {children}
    </div>
  )
}
