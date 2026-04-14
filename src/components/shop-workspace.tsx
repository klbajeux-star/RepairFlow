'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  AlertCircle,
  ChevronRight,
  Loader2,
  Plus,
  Search,
  ShoppingBag,
  Tag,
  X,
  Package,
  Barcode,
  ArrowRight
} from 'lucide-react'
import { formatCurrency } from '@/lib/repair'
import { SideDrawer } from '@/components/side-drawer'

interface ShopProduct {
  id: string
  name: string
  category: string
  sku?: string | null
  barcode?: string | null
  purchasePrice: number
  sellingPrice: number
  stock: number
  minStock: number
  supplier?: string | null
  description?: string | null
  createdAt: string
}

const categories = [
  'Chargeur',
  'Protection Hydrogel',
  'Coque',
  'Smartphone Reconditionné',
  'Câble',
  'Audio / Écouteurs',
  'Support / Fixation',
  'Autre'
]

const initialProductForm = {
  name: '',
  category: 'Chargeur',
  sku: '',
  barcode: '',
  purchasePrice: '0',
  sellingPrice: '0',
  stock: '0',
  minStock: '2',
  supplier: '',
  description: '',
}

export function ShopWorkspace() {
  const [products, setProducts] = useState<ShopProduct[]>([])
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [productForm, setProductForm] = useState(initialProductForm)
  const [drawerError, setDrawerError] = useState<string | null>(null)

  useEffect(() => {
    void loadProducts()
  }, [])

  async function loadProducts() {
    try {
      setIsLoading(true)
      const res = await fetch('/api/shop')
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Erreur chargement boutique:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.sku?.toLowerCase().includes(search.toLowerCase()) ||
                          p.barcode?.toLowerCase().includes(search.toLowerCase())
      const matchCategory = !selectedCategory || p.category === selectedCategory
      return matchSearch && matchCategory
    })
  }, [products, search, selectedCategory])

  function openDrawer(product?: ShopProduct) {
    setEditingId(product?.id || null)
    setDrawerError(null)
    setProductForm(product ? {
      name: product.name,
      category: product.category,
      sku: product.sku || '',
      barcode: product.barcode || '',
      purchasePrice: product.purchasePrice.toString(),
      sellingPrice: product.sellingPrice.toString(),
      stock: product.stock.toString(),
      minStock: product.minStock.toString(),
      supplier: product.supplier || '',
      description: product.description || '',
    } : initialProductForm)
    setDrawerOpen(true)
  }

  async function handleSave() {
    try {
      setDrawerError(null)
      setIsSaving(true)
      const url = editingId ? `/api/shop/${editingId}` : '/api/shop'
      const method = editingId ? 'PATCH' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          purchasePrice: parseFloat(productForm.purchasePrice) || 0,
          sellingPrice: parseFloat(productForm.sellingPrice) || 0,
          stock: parseInt(productForm.stock) || 0,
          minStock: parseInt(productForm.minStock) || 0,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Erreur lors de l’enregistrement.')
      }

      await loadProducts()
      setDrawerOpen(false)
    } catch (err) {
      setDrawerError(err instanceof Error ? err.message : 'Une erreur est survenue.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    if (!editingId || !confirm('Supprimer ce produit de la boutique ?')) return
    try {
      setIsSaving(true)
      const res = await fetch(`/api/shop/${editingId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Erreur suppression')
      await loadProducts()
      setDrawerOpen(false)
    } catch (err) {
      setDrawerError('Impossible de supprimer le produit.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen space-y-8 pb-12">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-emerald-600">Espace Vente</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Gestion Boutique</h1>
        </div>
        
        <button 
          onClick={() => openDrawer()}
          className="flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl transition hover:bg-emerald-600 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Nouveau produit boutique
        </button>
      </header>

      <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-white/60 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all hover:bg-white/50">
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Recherche</p>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Nom, SKU, Code-barres..."
                className="w-full rounded-xl border border-slate-100 bg-white/60 py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-50/50"
              />
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/60 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all hover:bg-white/50">
            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Rayons</p>
            <div className="mt-4 space-y-1">
              <button 
                onClick={() => setSelectedCategory(null)}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all ${!selectedCategory ? 'bg-slate-950 text-white shadow-lg' : 'text-slate-600 hover:bg-white shadow-sm'}`}
              >
                Tous les rayons
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all ${selectedCategory === cat ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main>
          {isLoading ? (
            <div className="flex h-64 items-center justify-center rounded-[2.5rem] border border-white/60 bg-white/40 backdrop-blur-md">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
          ) : (
            <div className="overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
              <table className="w-full text-left">
                <thead className="bg-white/50 backdrop-blur-sm">
                  <tr className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    <th className="px-8 py-5">Produit & Rayon</th>
                    <th className="px-8 py-5">Stock & Alertes</th>
                    <th className="px-8 py-5">Prix Vente TTC</th>
                    <th className="px-8 py-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="group hover:bg-white/40 transition-colors">
                      <td className="px-8 py-5">
                        <div>
                          <p className="font-black text-slate-950">{p.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-black uppercase text-emerald-600 ring-1 ring-inset ring-emerald-100">{p.category}</span>
                            {p.sku && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">SKU: {p.sku}</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-xl font-black ${p.stock <= p.minStock ? 'bg-rose-100 text-rose-600 ring-1 ring-rose-200' : 'bg-slate-100 text-slate-600'}`}>
                            {p.stock}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">En stock</p>
                            <p className={`text-xs font-bold ${p.stock <= p.minStock ? 'text-rose-600' : 'text-slate-500'}`}>
                              {p.stock <= p.minStock ? 'Réappro nécessaire' : 'Niveau correct'}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-lg font-black text-emerald-600">{formatCurrency(p.sellingPrice)}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Achat HT: {formatCurrency(p.purchasePrice)}</p>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button onClick={() => openDrawer(p)} className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-white hover:border-emerald-300 hover:text-emerald-600 transition-all active:scale-95">Modifier</button>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-8 py-12 text-center text-sm text-slate-400">Aucun produit trouvé dans ce rayon.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </section>

      <SideDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editingId ? 'Modifier Produit' : 'Nouveau Produit'}
        subtitle="Boutique & Vente"
        footer={
          <div className="flex items-center justify-between gap-3">
             {editingId ? (
               <button onClick={handleDelete} className="text-sm font-bold text-rose-500 hover:text-rose-700 hover:underline">Supprimer</button>
             ) : <div />}
             <div className="flex items-center gap-3">
               <button onClick={() => setDrawerOpen(false)} className="text-sm font-bold text-slate-400">Annuler</button>
               <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:bg-emerald-600 disabled:opacity-50"
               >
                 {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enregistrer le produit'}
               </button>
             </div>
          </div>
        }
      >
        <div className="space-y-6">
          {drawerError && (
            <div className="rounded-2xl bg-rose-50 p-4 text-rose-600 ring-1 ring-inset ring-rose-200 text-sm font-bold">
              {drawerError}
            </div>
          )}
          
          <Field label="Désignation du produit">
            <input 
              value={productForm.name} 
              onChange={e => setProductForm({...productForm, name: e.target.value})} 
              className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none transition focus:bg-white focus:border-emerald-300" 
              placeholder="ex: Coque Silicone iPhone 15 - Noir" 
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Rayon / Catégorie">
              <select 
                value={productForm.category} 
                onChange={e => setProductForm({...productForm, category: e.target.value})}
                className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none transition focus:bg-white focus:border-emerald-300 appearance-none"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Fournisseur">
              <input value={productForm.supplier} onChange={e => setProductForm({...productForm, supplier: e.target.value})} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none transition focus:bg-white focus:border-emerald-300" placeholder="Nom du fournisseur" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="SKU (Référence)">
              <input value={productForm.sku} onChange={e => setProductForm({...productForm, sku: e.target.value})} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none transition focus:bg-white focus:border-emerald-300" placeholder="BOUT-001" />
            </Field>
            <Field label="Code-barres (EAN)">
              <div className="relative">
                <Barcode className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={productForm.barcode} onChange={e => setProductForm({...productForm, barcode: e.target.value})} className="w-full rounded-xl border border-slate-100 bg-slate-50 pl-10 pr-4 py-3 outline-none transition focus:bg-white focus:border-emerald-300" placeholder="3660..." />
              </div>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Prix d'achat HT (€)">
              <input type="number" value={productForm.purchasePrice} onChange={e => setProductForm({...productForm, purchasePrice: e.target.value})} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none transition focus:bg-white focus:border-emerald-300" />
            </Field>
            <Field label="Prix de vente TTC (€)">
              <input type="number" value={productForm.sellingPrice} onChange={e => setProductForm({...productForm, sellingPrice: e.target.value})} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none transition focus:bg-white focus:border-emerald-300 font-black text-emerald-600" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Stock actuel">
              <input type="number" value={productForm.stock} onChange={e => setProductForm({...productForm, stock: e.target.value})} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none transition focus:bg-white focus:border-emerald-300" />
            </Field>
            <Field label="Seuil d'alerte">
              <input type="number" value={productForm.minStock} onChange={e => setProductForm({...productForm, minStock: e.target.value})} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none transition focus:bg-white focus:border-emerald-300 text-rose-500 font-bold" />
            </Field>
          </div>

          <Field label="Description / Détails">
            <textarea value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} rows={3} className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 outline-none transition focus:bg-white focus:border-emerald-300" />
          </Field>
        </div>
      </SideDrawer>
    </div>
  )
}

function Field({ label, children }: { label: string, children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
      {children}
    </div>
  )
}
