'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  AlertCircle,
  ChevronRight,
  Database,
  Gamepad2,
  Layers,
  LayoutGrid,
  Loader2,
  Monitor,
  Package,
  PencilLine,
  Plus,
  Search,
  Smartphone,
  Tablet,
  Tag,
  Trash2,
  Wrench,
  X,
} from 'lucide-react'
import { formatCurrency } from '@/lib/repair'
import { SideDrawer } from '@/components/side-drawer'
import { ConfirmDialog } from './confirm-dialog'
import { useConfirm } from '@/hooks/use-confirm'

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
  modelReference?: string | null
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
  suggestedPrice: number
  duration: number
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

function TypeIcon({ type, className }: { type: string; className?: string }) {
  const t = type.toLowerCase()
  if (t.includes('phone') || t.includes('mobile')) return <Smartphone className={className} />
  if (t.includes('tablette') || t.includes('tablet')) return <Tablet className={className} />
  if (t.includes('console')) return <Gamepad2 className={className} />
  if (t.includes('ordinateur') || t.includes('pc') || t.includes('laptop')) return <Monitor className={className} />
  return <Smartphone className={className} />
}

function getTypeColor(type: string) {
  const t = type.toLowerCase()
  if (t.includes('phone') || t.includes('mobile')) return 'bg-blue-50 text-blue-600 ring-blue-100'
  if (t.includes('tablette') || t.includes('tablet')) return 'bg-purple-50 text-purple-600 ring-purple-100'
  if (t.includes('console')) return 'bg-rose-50 text-rose-600 ring-rose-100'
  if (t.includes('ordinateur') || t.includes('pc') || t.includes('laptop')) return 'bg-amber-50 text-amber-600 ring-amber-100'
  
  // Dynamic colors for new categories based on name hash
  const fallbacks = [
    'bg-emerald-50 text-emerald-600 ring-emerald-100',
    'bg-indigo-50 text-indigo-600 ring-indigo-100',
    'bg-orange-50 text-orange-600 ring-orange-100',
    'bg-pink-50 text-pink-600 ring-pink-100',
    'bg-cyan-50 text-cyan-600 ring-cyan-100'
  ]
  const hash = type.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return fallbacks[hash % fallbacks.length]
}

function getTypeActiveColor(type: string) {
  const t = type.toLowerCase()
  if (t.includes('phone') || t.includes('mobile')) return 'bg-blue-600 text-white shadow-blue-600/20'
  if (t.includes('tablette') || t.includes('tablet')) return 'bg-purple-600 text-white shadow-purple-600/20'
  if (t.includes('console')) return 'bg-rose-600 text-white shadow-rose-600/20'
  if (t.includes('ordinateur') || t.includes('pc') || t.includes('laptop')) return 'bg-amber-600 text-white shadow-amber-600/20'
  
  const fallbacks = [
    'bg-emerald-600 text-white shadow-emerald-600/20',
    'bg-indigo-600 text-white shadow-indigo-600/20',
    'bg-orange-600 text-white shadow-orange-600/20',
    'bg-pink-600 text-white shadow-pink-600/20',
    'bg-cyan-600 text-white shadow-cyan-600/20'
  ]
  const hash = type.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return fallbacks[hash % fallbacks.length]
}

export function CatalogWorkspace() {
  const confirmDialog = useConfirm()
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
  const [modelSearch, setModelSearch] = useState('')
  const [showModelSuggestions, setShowModelSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const filteredModelSuggestions = useMemo(() => {
    const q = modelSearch.trim().toLowerCase()
    if (!q) return []
    return models
      .filter((m) => m.name.toLowerCase().includes(q) || m.brand.name.toLowerCase().includes(q))
      .slice(0, 5)
  }, [models, modelSearch])
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [drawerError, setDrawerError] = useState<string | null>(null)

  // Drawer states
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerType, setDrawerType] = useState<'model' | 'service' | 'part' | 'brand' | 'type' | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form states
  const [modelForm, setModelForm] = useState(initialModelForm)
  const [serviceForm, setServiceForm] = useState(initialServiceForm)
  const [partForm, setPartForm] = useState(initialPartForm)
  const [brandForm, setBrandForm] = useState({ name: '' })
  const [typeForm, setTypeForm] = useState({ name: '' })

  // Filter states
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null)
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null)

  useEffect(() => {
    void loadAllData()
  }, [])

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
      const matchType = !selectedTypeId || m.typeId === selectedTypeId
      return matchSearch && matchBrand && matchType
    })
  }, [models, search, selectedBrandId, selectedTypeId])

  const filteredServices = useMemo(() => {
    return services.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.model?.name.toLowerCase().includes(search.toLowerCase())
      const matchBrand = !selectedBrandId || s.model?.brandId === selectedBrandId
      const matchType = !selectedTypeId || s.model?.typeId === selectedTypeId
      return matchSearch && matchBrand && matchType
    })
  }, [services, search, selectedBrandId, selectedTypeId])

  const filteredParts = useMemo(() => {
    return parts.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.sku.toLowerCase().includes(search.toLowerCase()) ||
                          p.model?.name.toLowerCase().includes(search.toLowerCase())
      const matchBrand = !selectedBrandId || p.model?.brandId === selectedBrandId
      const matchType = !selectedTypeId || p.model?.typeId === selectedTypeId
      return matchSearch && matchBrand && matchType
    })
  }, [parts, search, selectedBrandId, selectedTypeId])

  function openDrawer(type: 'model' | 'service' | 'part' | 'brand' | 'type', item?: any) {
    setDrawerType(type)
    setEditingId(item?.id || null)
    setDrawerError(null)
    setShowModelSuggestions(false)
    
    if (type === 'service' || type === 'part') {
      if (item?.model) {
        setModelSearch(`${item.model.brand.name} ${item.model.name}`)
      } else {
        setModelSearch('')
      }
    }
    
    if (type === 'model') setModelForm(item ? { name: item.name, modelReference: item.modelReference || '', brandId: item.brandId, typeId: item.typeId } : initialModelForm)
    if (type === 'service') setServiceForm(item ? { name: item.name, laborCost: item.laborCost.toString(), suggestedPrice: item.suggestedPrice?.toString() || '', duration: item.duration?.toString() || '30', partId: item.partId || '', modelId: item.modelId || '', description: item.description || '' } : initialServiceForm)
    if (type === 'part') setPartForm(item ? { name: item.name, sku: item.sku, costPrice: item.costPrice.toString(), stock: item.stock.toString(), minStock: item.minStock?.toString() || '0', quality: item.quality || 'ORIGINAL', supplier: item.supplier || '', supplierRef: item.supplierRef || '', location: item.location || '', modelId: item.modelId || '', description: item.description || '', createLinkedService: false } : initialPartForm)
    if (type === 'brand') setBrandForm(item ? { name: item.name } : { name: '' })
    if (type === 'type') setTypeForm(item ? { name: item.name } : { name: '' })
    
    setDrawerOpen(true)
  }

  async function handleDelete() {
    if (!editingId) return
    confirmDialog.confirm({
      title: "Supprimer l'élément",
      message: 'Voulez-vous vraiment supprimer cet élément ? Cette action est irréversible.',
      type: 'danger',
      confirmLabel: 'Supprimer',
      onConfirm: async () => {
        try {
          setDrawerError(null)
          setIsSaving(true)
          const baseUrl = drawerType === 'model' ? '/api/models' : drawerType === 'service' ? '/api/services' : drawerType === 'part' ? '/api/parts' : drawerType === 'brand' ? '/api/brands' : '/api/types'
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
    })
  }

  async function handleSave() {
    try {
      setDrawerError(null)
      setIsSaving(true)
      const baseUrl = drawerType === 'model' ? '/api/models' : drawerType === 'service' ? '/api/services' : drawerType === 'part' ? '/api/parts' : drawerType === 'brand' ? '/api/brands' : '/api/types'
      const url = editingId ? `${baseUrl}/${editingId}` : baseUrl
      const method = editingId ? 'PATCH' : 'POST'
      const body = drawerType === 'model' ? modelForm : drawerType === 'service' ? serviceForm : drawerType === 'part' ? partForm : drawerType === 'brand' ? brandForm : typeForm
      
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

  return (
    <div className="flex h-full gap-8 p-12 overflow-hidden">
      {/* Sidebar Filter */}
      <aside className="flex h-full w-[340px] flex-col gap-6 overflow-hidden">
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-white/60 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all hover:bg-white/50">
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Recherche</p>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Filtrer..."
                className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-300 focus:bg-white focus:ring-4 focus:ring-blue-50/50"
              />
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all hover:bg-white/50">
            <div className="flex items-center justify-between">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Catégories</p>
              <button 
                onClick={() => openDrawer('type')}
                className="rounded-lg bg-white/60 p-1.5 text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600 shadow-sm"
                title="Ajouter une catégorie"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <button 
                onClick={() => setSelectedTypeId(null)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all ${!selectedTypeId ? 'bg-slate-950 text-white shadow-lg' : 'bg-white/60 text-slate-600 hover:bg-white shadow-sm'}`}
              >
                Toutes les catégories
              </button>
              {types.map(t => (
                <div key={t.id} className="group relative">
                  <button 
                    onClick={() => setSelectedTypeId(t.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ring-1 ring-inset ${selectedTypeId === t.id ? getTypeActiveColor(t.name) : getTypeColor(t.name) + ' hover:opacity-80'}`}
                  >
                    <TypeIcon type={t.name} className="h-4 w-4" />
                    {t.name}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); openDrawer('type', t); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 text-slate-400 hover:bg-white hover:text-blue-600 shadow-sm border border-white/60"
                    title="Modifier la catégorie"
                  >
                    <PencilLine className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all hover:bg-white/50">
            <div className="flex items-center justify-between">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Marques</p>
              <button 
                onClick={() => openDrawer('brand')}
                className="rounded-lg bg-white/60 p-1.5 text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600 shadow-sm"
                title="Ajouter une marque"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-4 space-y-1">
              <button 
                onClick={() => setSelectedBrandId(null)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${!selectedBrandId ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-white/80'}`}
              >
                Toutes
              </button>
              {brands.map(b => (
                <div key={b.id} className="group relative">
                  <button 
                    onClick={() => setSelectedBrandId(b.id)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold transition-all ${selectedBrandId === b.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-white/80'}`}
                  >
                    {b.name}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); openDrawer('brand', b); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 text-slate-400 hover:bg-white hover:text-blue-600 shadow-sm border border-white/60"
                    title="Modifier la marque"
                  >
                    <PencilLine className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col gap-8 overflow-hidden">
        <header className="flex items-center justify-between">
          <nav className="flex items-center gap-2 rounded-[2rem] border border-white/60 bg-white/40 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
            <button 
              onClick={() => setActiveTab('models')}
              className={`flex items-center gap-2 rounded-[1.75rem] px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'models' ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/20' : 'text-slate-400 hover:bg-white/60 hover:text-slate-600'}`}
            >
              <LayoutGrid className="h-4 w-4" />
              Modèles
              <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${activeTab === 'models' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{models.length}</span>
            </button>
            <button 
              onClick={() => setActiveTab('services')}
              className={`flex items-center gap-2 rounded-[1.75rem] px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'services' ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/20' : 'text-slate-400 hover:bg-white/60 hover:text-slate-600'}`}
            >
              <Wrench className="h-4 w-4" />
              Services
              <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${activeTab === 'services' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{services.length}</span>
            </button>
            <button 
              onClick={() => setActiveTab('parts')}
              className={`flex items-center gap-2 rounded-[1.75rem] px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'parts' ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/20' : 'text-slate-400 hover:bg-white/60 hover:text-slate-600'}`}
            >
              <Package className="h-4 w-4" />
              Pièces
              <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${activeTab === 'parts' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{parts.length}</span>
            </button>
          </nav>

          <button 
            onClick={() => openDrawer(activeTab === 'models' ? 'model' : activeTab === 'services' ? 'service' : 'part')}
            className="flex items-center gap-3 rounded-[2rem] bg-slate-950 px-8 py-4 text-sm font-black text-white shadow-xl shadow-slate-950/20 transition hover:scale-105 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Nouveau {activeTab === 'models' ? 'modèle' : activeTab === 'services' ? 'forfait' : 'produit'}
          </button>
        </header>

        {/* List Content */}
        <main>
          {isLoading ? (
            <div className="flex h-64 items-center justify-center rounded-[2.5rem] border border-white/60 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
              <table className="w-full text-left">
                <thead className="bg-white/50 backdrop-blur-sm">
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
                <tbody className="divide-y divide-white/20">
                  {activeTab === 'models' && filteredModels.map(m => (
                    <tr key={m.id} className="group hover:bg-white/40 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex flex-col gap-2">
                          <span className="w-fit rounded-lg bg-slate-900 px-2.5 py-1 text-[10px] font-black text-white uppercase tracking-wider">{m.brand.name}</span>
                          <div className={`flex w-fit items-center gap-1.5 rounded-md px-2 py-1 text-[10px] font-black uppercase ring-1 ring-inset ${getTypeColor(m.type.name)}`}>
                            <TypeIcon type={m.type.name} className="h-3 w-3" />
                            {m.type.name}
                          </div>
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
                    <tr key={s.id} className="group hover:bg-white/40 transition-colors">
                      <td className="px-8 py-5">
                        <p className="font-black text-slate-950">{s.name}</p>
                        <p className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
                          <Tag className="h-3 w-3" /> {s.duration || 30} min
                        </p>
                      </td>
                      <td className="px-8 py-5">
                        {s.model ? (
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{s.model.brand.name}</span>
                              <span className="text-xs font-black text-slate-950">{s.model.name}</span>
                            </div>
                            <div className={`flex w-fit items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase ring-1 ring-inset ${getTypeColor(s.model.type.name)}`}>
                              <TypeIcon type={s.model.type.name} className="h-2.5 w-2.5" />
                              {s.model.type.name}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-300 uppercase">Service Générique</span>
                        )}
                      </td>
                      <td className="px-8 py-5">
                        <p className="font-black text-emerald-600">{formatCurrency(s.suggestedPrice)}</p>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button onClick={() => openDrawer('service', s)} className="text-blue-600 hover:underline text-sm font-bold">Détails</button>
                      </td>
                    </tr>
                  ))}

                  {activeTab === 'parts' && filteredParts.map(p => (
                    <tr key={p.id} className="group hover:bg-white/40 transition-colors">
                      <td className="px-8 py-5">
                        <p className="font-black text-slate-950">{p.name}</p>
                        <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[9px] font-black text-slate-500 uppercase">{p.quality || 'N/A'}</span>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{p.sku}</p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <div className={`h-1.5 w-1.5 rounded-full ${p.stock <= p.minStock ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                          <span className="text-xs font-bold text-slate-600">{p.stock} en stock</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-black text-slate-600">
                        {formatCurrency(p.costPrice)}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button onClick={() => openDrawer('part', p)} className="text-blue-600 hover:underline text-sm font-bold">Détails</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </main>

      {/* Side Drawer for forms */}
      <SideDrawer 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        title={editingId ? 'Modifier l’élément' : `Ajouter un ${drawerType === 'model' ? 'modèle' : drawerType === 'service' ? 'forfait' : drawerType === 'part' ? 'produit' : drawerType === 'brand' ? 'marque' : 'catégorie'}`}
        footer={
          <div className="flex items-center justify-between gap-4">
            {editingId && (
              <button
                onClick={handleDelete}
                disabled={isSaving}
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 transition hover:bg-rose-100 disabled:opacity-50"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
            <div className="flex flex-1 items-center gap-3">
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex-1 rounded-2xl border border-slate-200 py-3.5 text-sm font-bold text-slate-600 transition hover:bg-white"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex flex-[2] items-center justify-center gap-2 rounded-2xl bg-slate-950 py-3.5 text-sm font-black text-white shadow-xl shadow-slate-950/20 transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                Enregistrer
              </button>
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          {drawerError && (
            <div className="flex items-center gap-3 rounded-2xl bg-rose-50 p-4 text-sm font-bold text-rose-600 ring-1 ring-inset ring-rose-100">
              <AlertCircle className="h-5 w-5" />
              {drawerError}
            </div>
          )}

          {drawerType === 'brand' && (
            <Field label="Nom de la marque">
              <input 
                value={brandForm.name}
                onChange={e => setBrandForm({ name: e.target.value })}
                className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 px-4 text-sm outline-none transition-all focus:border-blue-300 focus:bg-white"
                placeholder="ex: Apple, Samsung..."
              />
            </Field>
          )}

          {drawerType === 'type' && (
            <Field label="Nom de la catégorie">
              <input 
                value={typeForm.name}
                onChange={e => setTypeForm({ name: e.target.value })}
                className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 px-4 text-sm outline-none transition-all focus:border-blue-300 focus:bg-white"
                placeholder="ex: Console, Tablette..."
              />
            </Field>
          )}

          {drawerType === 'model' && (
            <div className="space-y-4">
              <Field label="Nom du modèle">
                <input 
                  value={modelForm.name}
                  onChange={e => setModelForm({ ...modelForm, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 px-4 text-sm outline-none"
                  placeholder="ex: iPhone 13 Pro"
                />
              </Field>
              <Field label="Référence Modèle">
                <input 
                  value={modelForm.modelReference || ''}
                  onChange={e => setModelForm({ ...modelForm, modelReference: e.target.value })}
                  className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 px-4 text-sm outline-none"
                  placeholder="ex: A2638"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Marque">
                  <select 
                    value={modelForm.brandId}
                    onChange={e => setModelForm({ ...modelForm, brandId: e.target.value })}
                    className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 px-4 text-sm outline-none"
                  >
                    <option value="">Sélectionner</option>
                    {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </Field>
                <Field label="Type">
                  <select 
                    value={modelForm.typeId}
                    onChange={e => setModelForm({ ...modelForm, typeId: e.target.value })}
                    className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 px-4 text-sm outline-none"
                  >
                    <option value="">Sélectionner</option>
                    {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </Field>
              </div>
            </div>
          )}

          {drawerType === 'service' && (
            <div className="space-y-4">
              <Field label="Désignation Forfait">
                <input 
                  value={serviceForm.name}
                  onChange={e => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 px-4 text-sm outline-none"
                  placeholder="ex: Changement écran"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Main d'œuvre (HT)">
                  <input 
                    type="number"
                    value={serviceForm.laborCost}
                    onChange={e => setServiceForm({ ...serviceForm, laborCost: e.target.value })}
                    className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 px-4 text-sm outline-none"
                  />
                </Field>
                <Field label="Prix Vente (TTC)">
                  <input 
                    type="number"
                    value={serviceForm.suggestedPrice}
                    onChange={e => setServiceForm({ ...serviceForm, suggestedPrice: e.target.value })}
                    className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 px-4 text-sm outline-none"
                  />
                </Field>
              </div>
              <div className="relative">
                <Field label="Modèle concerné">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input 
                      value={modelSearch}
                      onChange={e => {
                        setModelSearch(e.target.value)
                        setShowModelSuggestions(true)
                      }}
                      onFocus={() => setShowModelSuggestions(true)}
                      className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-300 focus:bg-white"
                      placeholder="Lier à un modèle..."
                    />
                    {showModelSuggestions && filteredModelSuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-48 overflow-auto rounded-xl border border-slate-100 bg-white shadow-xl">
                        {filteredModelSuggestions.map(m => (
                          <button 
                            key={m.id}
                            onClick={() => {
                              setServiceForm({ ...serviceForm, modelId: m.id })
                              setModelSearch(`${m.brand.name} ${m.name}`)
                              setShowModelSuggestions(false)
                            }}
                            className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-slate-50"
                          >
                            <span className="text-sm font-bold text-slate-900">{m.brand.name} {m.name}</span>
                            <ChevronRight className="h-4 w-4 text-slate-300" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </Field>
              </div>
            </div>
          )}

          {drawerType === 'part' && (
            <div className="space-y-4">
              <Field label="Nom du produit">
                <input 
                  value={partForm.name}
                  onChange={e => setPartForm({ ...partForm, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 px-4 text-sm outline-none"
                  placeholder="ex: Écran iPhone 13 Original"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Stock Actuel">
                  <input 
                    type="number"
                    value={partForm.stock}
                    onChange={e => setPartForm({ ...partForm, stock: e.target.value })}
                    className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 px-4 text-sm outline-none"
                  />
                </Field>
                <Field label="Seuil Minimum">
                  <input 
                    type="number"
                    value={partForm.minStock}
                    onChange={e => setPartForm({ ...partForm, minStock: e.target.value })}
                    className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 px-4 text-sm outline-none"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Prix Achat (HT)">
                  <input 
                    type="number"
                    value={partForm.costPrice}
                    onChange={e => setPartForm({ ...partForm, costPrice: e.target.value })}
                    className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 px-4 text-sm outline-none"
                  />
                </Field>
                <Field label="SKU / Référence">
                  <input 
                    value={partForm.sku}
                    onChange={e => setPartForm({ ...partForm, sku: e.target.value })}
                    className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 px-4 text-sm outline-none"
                    placeholder="ex: SCR-IP13-ORI"
                  />
                </Field>
              </div>
              <div className="relative">
                <Field label="Modèle lié">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input 
                      value={modelSearch}
                      onChange={e => {
                        setModelSearch(e.target.value)
                        setShowModelSuggestions(true)
                      }}
                      onFocus={() => setShowModelSuggestions(true)}
                      className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-300 focus:bg-white"
                      placeholder="Lier à un modèle..."
                    />
                    {showModelSuggestions && filteredModelSuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full z-10 mt-2 max-h-48 overflow-auto rounded-xl border border-slate-100 bg-white shadow-xl">
                        {filteredModelSuggestions.map(m => (
                          <button 
                            key={m.id}
                            onClick={() => {
                              setPartForm({ ...partForm, modelId: m.id })
                              setModelSearch(`${m.brand.name} ${m.name}`)
                              setShowModelSuggestions(false)
                            }}
                            className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-slate-50"
                          >
                            <span className="text-sm font-bold text-slate-900">{m.brand.name} {m.name}</span>
                            <ChevronRight className="h-4 w-4 text-slate-300" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
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
            </div>
          )}
        </div>
      </SideDrawer>
      <ConfirmDialog isOpen={confirmDialog.isOpen} onClose={confirmDialog.close} onConfirm={confirmDialog.options?.onConfirm || (() => {})} title={confirmDialog.options?.title || ''} message={confirmDialog.options?.message || ''} type={confirmDialog.options?.type} confirmLabel={confirmDialog.options?.confirmLabel} cancelLabel={confirmDialog.options?.cancelLabel} />
    </div>
  )
}

function Field({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</p>
      {children}
    </div>
  )
}
