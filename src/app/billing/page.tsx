'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from 'react'
import {
  AlertCircle,
  ChevronRight,
  Download,
  FileCheck,
  FileText,
  Loader2,
  Printer,
  RotateCcw,
  Save,
  Search,
  ShoppingBag,
  StickyNote,
  Trash2,
  Wrench,
  Plus,
} from 'lucide-react'
import {
  formatCurrency,
  formatDate,
} from '@/lib/repair'
import jsPDF from 'jspdf'

// --- Types ---

interface Client {
  id: string
  name: string
  phone: string
  email?: string | null
  address?: string | null
  zipCode?: string | null
  city?: string | null
}

interface DraftLine {
  id: string
  name: string
  price: number
  quantity: number
}

interface RepairService {
  id: string
  priceAtTime: number
  quantity: number
  service: {
    name: string
  }
}

interface Repair {
  id: string
  status: string
  createdAt: string
  notes?: string | null
  client: Client
  services: RepairService[]
}

interface ShopProduct {
  id: string
  name: string
  sellingPrice: number
  category: string
  stock: number
}

// --- Main Component ---

function BillingContent() {
  const searchParams = useSearchParams()
  const [repairs, setRepairs] = useState<Repair[]>([])
  const [shopProducts, setShopProducts] = useState<ShopProduct[]>([])
  const [selectedRepairId, setSelectedRepairId] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<'devis' | 'facture'>('devis')
  const [search, setSearch] = useState('')
  const [shopSearch, setShopSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  
  // Draft state for editability
  const [draftLines, setDraftLines] = useState<DraftLine[]>([])
  const [draftNotes, setDraftNotes] = useState('')

  useEffect(() => {
    void loadData()
  }, [])

  useEffect(() => {
    const repairId = searchParams?.get('repairId')
    const mode = searchParams?.get('mode')

    if (repairId) {
      setSelectedRepairId(repairId)
    }

    if (mode === 'facture' || mode === 'devis') {
      setActiveView(mode)
    }
  }, [searchParams])

  async function loadData() {
    try {
      setIsLoading(true)
      const [repairsRes, shopRes] = await Promise.all([
        fetch('/api/repairs'),
        fetch('/api/shop')
      ])
      
      const repairsData = await repairsRes.json()
      const shopData = await shopRes.json()

      if (repairsRes.ok) setRepairs(Array.isArray(repairsData) ? repairsData : [])
      if (shopRes.ok) setShopProducts(Array.isArray(shopData) ? shopData : [])
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedRepair = useMemo(() => 
    repairs.find((r) => r.id === selectedRepairId) || null
  , [repairs, selectedRepairId])

  // Initialize draft when selecting a repair
  useEffect(() => {
    if (selectedRepair) {
      const initialLines = selectedRepair.services.map(s => ({
        id: s.id,
        name: s.service.name,
        price: s.priceAtTime,
        quantity: s.quantity || 1
      }))
      setDraftLines(initialLines)
      setDraftNotes(selectedRepair.notes || '')
    } else {
      setDraftLines([])
      setDraftNotes('')
    }
  }, [selectedRepair])

  const filteredRepairs = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return repairs
    return repairs.filter((r) =>
      [r.client.name, r.client.phone, r.id].join(' ').toLowerCase().includes(query)
    )
  }, [repairs, search])

  const filteredShop = useMemo(() => {
    const query = shopSearch.trim().toLowerCase()
    if (!query) return []
    return shopProducts.filter((p) =>
      p.name.toLowerCase().includes(query)
    ).slice(0, 5)
  }, [shopProducts, shopSearch])

  const totals = useMemo(() => {
    const totalTTC = draftLines.reduce((acc, line) => acc + (line.price * line.quantity), 0)
    const totalHT = totalTTC / 1.2
    const tva = totalTTC - totalHT
    return { totalTTC, totalHT, tva }
  }, [draftLines])

  const updateLine = (index: number, field: keyof DraftLine, value: string | number) => {
    const newLines = [...draftLines]
    newLines[index] = { ...newLines[index], [field]: value }
    setDraftLines(newLines)
  }

  const removeLine = (index: number) => {
    setDraftLines(draftLines.filter((_, i) => i !== index))
  }

  const addLine = () => {
    setDraftLines([...draftLines, { 
      id: Math.random().toString(36).substr(2, 9), 
      name: 'Nouvelle prestation / Produit', 
      price: 0, 
      quantity: 1 
    }])
  }

  const addShopProduct = (p: ShopProduct) => {
    setDraftLines([...draftLines, {
      id: Math.random().toString(36).substr(2, 9),
      name: p.name,
      price: p.sellingPrice,
      quantity: 1
    }])
    setShopSearch('')
  }

  const resetDraft = () => {
    if (selectedRepair) {
      const initialLines = selectedRepair.services.map(s => ({
        id: s.id,
        name: s.service.name,
        price: s.priceAtTime,
        quantity: s.quantity || 1
      }))
      setDraftLines(initialLines)
      setDraftNotes(selectedRepair.notes || '')
    }
  }

  const handleDownload = async () => {
    if (!selectedRepair) return
    setIsDownloading(true)
    
    try {
      const doc = new jsPDF()
      const margin = 20
      let y = margin

      // Header
      doc.setFontSize(26)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(15, 23, 42) // Slate-900
      doc.text(activeView.toUpperCase(), margin, y + 10)
      
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100)
      const ref = `${activeView === 'devis' ? 'D' : 'F'}-${new Date().getFullYear()}-${selectedRepair.id.slice(-6).toUpperCase()}`
      doc.text(`Référence: ${ref}`, 210 - margin, y + 2, { align: 'right' })
      doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 210 - margin, y + 8, { align: 'right' })
      y += 30

      // Shop Info
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(15, 23, 42)
      doc.text('MOMUY&TECH - REPARATION ET ELECTRONIQUE', margin, y)
      y += 6
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100)
      doc.text('123 Avenue de la Réparation, 75001 Paris', margin, y)
      y += 5
      doc.text('SIRET: 123 456 789 00012 | Tél: 01 23 45 67 89', margin, y)
      y += 15

      // Client Info Block
      doc.setFillColor(248, 250, 252) // Slate-50
      doc.rect(margin, y, 170, 35, 'F')
      y += 8
      doc.setFontSize(9)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(148, 163, 184) // Slate-400
      doc.text('DESTINATAIRE', margin + 8, y)
      y += 8
      doc.setFontSize(14)
      doc.setTextColor(15, 23, 42)
      doc.text(selectedRepair.client.name.toUpperCase(), margin + 8, y)
      y += 6
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(71, 85, 105) // Slate-600
      doc.text(selectedRepair.client.phone, margin + 8, y)
      if (selectedRepair.client.address) {
        y += 5
        doc.text(`${selectedRepair.client.address}, ${selectedRepair.client.zipCode} ${selectedRepair.client.city}`, margin + 8, y)
      }
      y += 20

      // Table Header
      doc.setFillColor(15, 23, 42)
      doc.rect(margin, y, 170, 10, 'F')
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.text('DESCRIPTION DES PRESTATIONS', margin + 5, y + 6.5)
      doc.text('QTÉ', 135, y + 6.5, { align: 'center' })
      doc.text('P.U. HT', 155, y + 6.5, { align: 'right' })
      doc.text('TOTAL HT', 185, y + 6.5, { align: 'right' })
      y += 10

      // Table Rows
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(15, 23, 42)
      
      draftLines.forEach((line, i) => {
        const rowY = y + 10 + (i * 10)
        doc.text(line.name, margin + 5, rowY)
        doc.text(line.quantity.toString(), 135, rowY, { align: 'center' })
        doc.text(`${(line.price / 1.2).toFixed(2)} €`, 155, rowY, { align: 'right' })
        doc.text(`${((line.price * line.quantity) / 1.2).toFixed(2)} €`, 185, rowY, { align: 'right' })
        doc.setDrawColor(241, 245, 249)
        doc.line(margin, rowY + 3, 210 - margin, rowY + 3)
      })

      y += 20 + (draftLines.length * 10)

      // Totals
      const totalX = 210 - margin
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100)
      doc.text('TOTAL HT', 150, y, { align: 'right' })
      doc.setTextColor(15, 23, 42)
      doc.text(`${totals.totalHT.toFixed(2)} €`, totalX, y, { align: 'right' })
      y += 7
      
      doc.setTextColor(100)
      doc.text('TVA (20%)', 150, y, { align: 'right' })
      doc.setTextColor(15, 23, 42)
      doc.text(`${totals.tva.toFixed(2)} €`, totalX, y, { align: 'right' })
      y += 12

      doc.setFillColor(15, 23, 42)
      doc.rect(130, y - 6, 60, 12, 'F')
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(255, 255, 255)
      doc.text('TOTAL TTC', 140, y + 1.5)
      doc.setFontSize(14)
      doc.text(`${totals.totalTTC.toFixed(2)} €`, totalX - 5, y + 1.5, { align: 'right' })
      
      y += 30

      // Notes
      if (draftNotes) {
        doc.setFontSize(8)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(100)
        doc.text('NOTES COMPLÉMENTAIRES', margin, y)
        y += 5
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(71, 85, 105)
        const splitNotes = doc.splitTextToSize(draftNotes, 170)
        doc.text(splitNotes, margin, y)
        y += splitNotes.length * 4 + 10
      }

      // Footer
      doc.setFontSize(8)
      doc.setFont('helvetica', 'italic')
      doc.setTextColor(148, 163, 184)
      doc.text('Conditions de règlement : Paiement comptant à réception.', margin, 275)
      doc.text('Garantie : 6 mois sur les pièces et la main d’œuvre hors casse et oxydation.', margin, 280)
      doc.text('RepairFlow v1.0 • Logiciel certifié gestion atelier électronique', 105, 290, { align: 'center' })

      doc.save(`${activeView}-${selectedRepair.id.slice(-6).toUpperCase()}.pdf`)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="min-h-0 flex flex-col gap-8 pb-12">
      {/* Action Bar */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div className="flex bg-white/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/60 shadow-sm ring-1 ring-white/60">
          <button 
            onClick={() => setActiveView('devis')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeView === 'devis' ? 'bg-slate-950 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <FileText className="w-4 h-4" />
            Devis
          </button>
          <button 
            onClick={() => setActiveView('facture')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeView === 'facture' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <FileCheck className="w-4 h-4" />
            Facture
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={resetDraft}
            className="group flex h-14 w-14 items-center justify-center rounded-2xl bg-white/40 border border-white/60 shadow-sm transition-all hover:bg-white/60 active:scale-95"
            title="Réinitialiser"
          >
            <RotateCcw className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
          </button>
          <button 
            onClick={handleDownload}
            disabled={!selectedRepair || isDownloading}
            className="flex h-14 items-center gap-2 rounded-2xl bg-white/40 border border-white/60 px-6 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-white/60 disabled:opacity-30 active:scale-95"
          >
            {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
            PDF
          </button>
          <button 
            onClick={() => window.print()}
            disabled={!selectedRepair}
            className="flex h-14 items-center gap-3 rounded-2xl bg-slate-950 px-8 text-sm font-black text-white shadow-xl shadow-slate-950/20 transition-all hover:bg-slate-800 disabled:opacity-30 active:scale-95"
          >
            <Printer className="w-5 h-5" />
            Imprimer A4
          </button>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[340px_1fr]">
        {/* Selection Sidebar */}
        <aside className="space-y-6 print:hidden">
          <div className="rounded-[2.5rem] border border-white/60 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-400">Rechercher un ticket</p>
            <div className="relative mt-4">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Client, N° de ticket..."
                className="w-full rounded-2xl border border-slate-100 bg-white/60 py-4 pl-11 pr-4 text-sm font-bold outline-none transition focus:border-blue-300 focus:bg-white"
              />
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/60 bg-white/40 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md overflow-hidden">
             <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
               {filteredRepairs.map((repair) => (
                 <button
                   key={repair.id}
                   onClick={() => setSelectedRepairId(repair.id)}
                   className={`flex w-full flex-col gap-3 rounded-[2rem] p-5 text-left transition-all ${selectedRepairId === repair.id ? 'bg-slate-950 text-white shadow-xl' : 'hover:bg-white/60'}`}
                 >
                   <div className="flex items-center justify-between">
                     <span className={`text-[10px] font-black uppercase tracking-widest ${selectedRepairId === repair.id ? 'text-blue-400' : 'text-slate-400'}`}>
                       #{repair.id.slice(-6).toUpperCase()}
                     </span>
                     <span className={`text-[10px] font-bold ${selectedRepairId === repair.id ? 'text-slate-400' : 'text-slate-400'}`}>
                       {formatDate(repair.createdAt)}
                     </span>
                   </div>
                   <p className="text-lg font-black tracking-tight">{repair.client.name}</p>
                   <div className="flex items-center gap-2">
                     <Wrench className={`h-3 w-3 ${selectedRepairId === repair.id ? 'text-blue-400' : 'text-slate-400'}`} />
                     <span className={`text-xs font-bold ${selectedRepairId === repair.id ? 'text-slate-300' : 'text-slate-500'}`}>
                        {repair.services.length} prestation(s)
                     </span>
                   </div>
                 </button>
               ))}
               {filteredRepairs.length === 0 && (
                 <div className="p-8 text-center text-sm font-bold text-slate-400">
                   Aucun ticket trouvé.
                 </div>
               )}
             </div>
          </div>
        </aside>

        {/* Editor / Preview Area */}
        <main className="flex justify-center min-h-[1000px]">
          {selectedRepair ? (
            <div className="w-full flex flex-col gap-8">
              {/* Toolbar Editor */}
              <div className="grid gap-6 sm:grid-cols-2 print:hidden">
                <div className="rounded-[2.5rem] border border-white/60 bg-white/40 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
                   <SectionTitle icon={<Plus className="w-5 h-5" />} label="Lignes" title="Ajouter des éléments" />
                   <div className="mt-6 space-y-4">
                     <div className="relative">
                       <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                       <input 
                         value={shopSearch}
                         onChange={e => setShopSearch(e.target.value)}
                         placeholder="Rechercher un produit boutique..."
                         className="w-full rounded-2xl border border-slate-100 bg-white/60 py-4 pl-11 pr-4 text-sm font-bold outline-none transition focus:border-emerald-300"
                       />
                       {filteredShop.length > 0 && (
                         <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl border border-slate-100 shadow-2xl z-20 p-2 space-y-1">
                           {filteredShop.map(p => (
                             <button 
                               key={p.id}
                               onClick={() => addShopProduct(p)}
                               className="flex w-full items-center justify-between p-3 rounded-xl hover:bg-emerald-50 text-left transition-all"
                             >
                               <div>
                                 <p className="text-sm font-bold text-slate-900">{p.name}</p>
                                 <p className="text-[10px] font-black uppercase text-emerald-600">{p.category}</p>
                               </div>
                               <div className="flex items-center gap-3">
                                 <span className="text-sm font-black text-slate-950">{formatCurrency(p.sellingPrice)}</span>
                                 <Plus className="w-4 h-4 text-emerald-400" />
                               </div>
                             </button>
                           ))}
                         </div>
                       )}
                     </div>
                     <button 
                       onClick={addLine}
                       className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 py-4 text-sm font-bold text-slate-400 transition hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600"
                     >
                       <Plus className="h-5 w-5" />
                       Ligne personnalisée
                     </button>
                   </div>
                </div>

                <div className="rounded-[2.5rem] border border-white/60 bg-white/40 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
                   <SectionTitle icon={<StickyNote className="w-5 h-5" />} label="Notes" title="Notes du document" />
                   <div className="mt-6">
                     <textarea 
                        value={draftNotes}
                        onChange={e => setDraftNotes(e.target.value)}
                        placeholder="Ces notes apparaitront en bas du document..."
                        rows={4}
                        className="w-full rounded-2xl border border-slate-100 bg-white/60 p-4 text-sm font-medium outline-none transition focus:border-blue-300 focus:bg-white"
                     />
                   </div>
                </div>
              </div>

              {/* A4 Preview Container */}
              <div className="flex justify-center bg-slate-100/50 rounded-[3rem] p-12 shadow-inner border border-slate-200/50 print:bg-white print:p-0 print:rounded-none print:border-none print:shadow-none overflow-x-auto">
                <div 
                  id="printable-a4"
                  className="bg-white shadow-[0_20px_60px_rgb(0,0,0,0.1)] w-[210mm] min-h-[297mm] p-[20mm] flex flex-col relative overflow-hidden text-slate-900 print:shadow-none print:m-0"
                >
                  {/* Watermark */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-[200px] font-black text-slate-50 pointer-events-none select-none z-0 tracking-tighter uppercase">
                    {activeView}
                  </div>

                  <div className="relative z-10 flex flex-col h-full flex-1">
                    {/* Header Row */}
                    <div className="flex justify-between items-start mb-20">
                      <div>
                        <div className="flex items-center gap-4 mb-8">
                          <div className="p-4 bg-slate-950 rounded-2xl text-white shadow-xl">
                            <Wrench className="w-8 h-8" />
                          </div>
                          <div>
                            <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-blue-600">MOMUY&TECH</p>
                            <span className="text-3xl font-black tracking-tighter uppercase italic text-slate-950">RepairFlow</span>
                          </div>
                        </div>
                        <div className="text-[11px] font-bold text-slate-400 space-y-1 uppercase tracking-wider">
                          <p className="text-slate-600 font-black">Atelier de Réparation Électronique</p>
                          <p>123 Avenue de la Réparation, 75001 Paris</p>
                          <p>SIRET: 123 456 789 00012</p>
                          <p>Tél: 01 23 45 67 89 | contact@momuytech.fr</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <h2 className={`text-7xl font-black mb-6 tracking-tighter ${activeView === 'devis' ? 'text-slate-100' : 'text-slate-100'}`} style={{ WebkitTextStroke: '1px #e2e8f0' }}>{activeView.toUpperCase()}</h2>
                        <div className="space-y-2">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Document N°</p>
                          <p className="text-3xl font-black text-slate-950 tracking-tighter">
                            {activeView === 'devis' ? 'D' : 'F'}-{new Date().getFullYear()}-{selectedRepair.id.slice(-6).toUpperCase()}
                          </p>
                          <p className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full inline-block uppercase tracking-widest">{formatDate(new Date())}</p>
                        </div>
                      </div>
                    </div>

                    {/* Info Block */}
                    <div className="grid grid-cols-2 gap-12 mb-16">
                      <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Destinataire</h3>
                        <p className="text-2xl font-black text-slate-950 mb-1">{selectedRepair.client.name.toUpperCase()}</p>
                        <p className="text-sm font-bold text-slate-500 mb-4">{selectedRepair.client.phone}</p>
                        <div className="text-xs font-medium text-slate-500 space-y-1">
                          {selectedRepair.client.address && <p>{selectedRepair.client.address}</p>}
                          {selectedRepair.client.zipCode && <p>{selectedRepair.client.zipCode} {selectedRepair.client.city}</p>}
                        </div>
                      </div>
                      <div className="flex flex-col justify-end items-end pb-4">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">Dossier technique</p>
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl">
                          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                          <span className="text-sm font-black text-slate-950 uppercase">Réf #{selectedRepair.id.toUpperCase()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Lines Table */}
                    <div className="flex-1">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b-2 border-slate-950 text-left">
                            <th className="py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Prestations & Produits</th>
                            <th className="py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-24">Quantité</th>
                            <th className="py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right w-32">Prix U. HT</th>
                            <th className="py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right w-32">Total HT</th>
                            <th className="py-5 w-10 print:hidden"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {draftLines.map((line, idx) => (
                            <tr key={line.id} className="group transition-colors hover:bg-slate-50/50">
                              <td className="py-6 pr-4">
                                <input 
                                  className="w-full bg-transparent font-black text-slate-900 border-none p-0 focus:ring-0 outline-none placeholder:text-slate-200"
                                  value={line.name}
                                  onChange={(e) => updateLine(idx, 'name', e.target.value)}
                                />
                                <p className="text-[9px] font-black text-blue-600 mt-1 uppercase tracking-widest">Intervention Premium certifiée</p>
                              </td>
                              <td className="py-6 px-2 text-center">
                                <input 
                                  type="number"
                                  className="w-full bg-transparent text-center font-bold text-slate-900 border-none p-0 focus:ring-0 outline-none"
                                  value={line.quantity}
                                  onChange={(e) => updateLine(idx, 'quantity', parseInt(e.target.value) || 0)}
                                />
                              </td>
                              <td className="py-6 px-2 text-right">
                                <input 
                                  type="number"
                                  className="w-full bg-transparent text-right font-bold text-slate-900 border-none p-0 focus:ring-0 outline-none"
                                  value={(line.price / 1.2).toFixed(2)}
                                  onChange={(e) => updateLine(idx, 'price', parseFloat(e.target.value) * 1.2 || 0)}
                                />
                              </td>
                              <td className="py-6 pl-4 text-right font-black text-slate-950 text-base">
                                {((line.price * line.quantity) / 1.2).toFixed(2)} €
                              </td>
                              <td className="py-6 text-right print:hidden">
                                <button 
                                  onClick={() => removeLine(idx)}
                                  className="p-2 text-slate-200 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Summary Block */}
                    <div className="mt-16 flex justify-end">
                      <div className="w-80 p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <span>Total HT</span>
                          <span className="text-slate-900 text-sm">{formatCurrency(totals.totalHT)}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest pb-4 border-b border-slate-200">
                          <span>TVA (20%)</span>
                          <span className="text-slate-900 text-sm">{formatCurrency(totals.tva)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-xs font-black uppercase tracking-widest text-blue-600">Total TTC</span>
                          <span className="text-3xl font-black text-slate-950 tracking-tighter">{formatCurrency(totals.totalTTC)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer / Notes */}
                    <div className="mt-16 pt-12 border-t border-slate-100">
                      {draftNotes && (
                        <div className="mb-12">
                          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-3">Observations</p>
                          <p className="text-xs font-medium text-slate-600 leading-relaxed italic">{draftNotes}</p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-12">
                        <div className="text-[9px] font-bold text-slate-400 leading-relaxed space-y-1 uppercase tracking-wider">
                          <p className="text-slate-500 font-black mb-1">Informations légales</p>
                          <p>Conditions de règlement : Paiement comptant à réception.</p>
                          <p>Garantie : 6 mois sur les pièces et la main d’œuvre hors casse et oxydation.</p>
                          <p>Devis valable 30 jours à compter de la date d'émission.</p>
                        </div>
                        <div className="text-[8px] font-black text-slate-200 text-right uppercase tracking-[0.3em] self-end italic">
                          Document généré par RepairFlow Business v1.0
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center max-w-sm mt-20">
               <div className="w-24 h-24 bg-white/40 backdrop-blur-md rounded-[2.5rem] shadow-xl flex items-center justify-center mb-8 ring-1 ring-white/60">
                 <FileText className="w-10 h-10 text-blue-600" />
               </div>
               <h2 className="text-2xl font-black text-slate-950 mb-4">Espace Facturation</h2>
               <p className="text-slate-500 font-medium leading-relaxed">
                 Sélectionnez un ticket atelier dans la liste latérale pour éditer votre document commercial (Devis ou Facture).
               </p>
               <div className="mt-8 p-6 rounded-[2rem] bg-blue-50/50 border border-blue-100 text-blue-700 text-xs font-bold flex items-center gap-3">
                 <AlertCircle className="w-5 h-5 flex-shrink-0" />
                 Le format A4 est optimisé pour l'impression directe et l'export PDF.
               </div>
            </div>
          )}
        </main>
      </section>

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: white !important;
          }
          header, nav, aside, section, .print\\:hidden {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
            display: block !important;
            overflow: visible !important;
            background: white !important;
            max-width: none !important;
          }
          #printable-a4 {
            box-shadow: none !important;
            border: none !important;
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 auto !important;
            padding: 20mm !important;
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
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

export default function BillingPage() {
  return (
    <Suspense fallback={null}>
      <BillingContent />
    </Suspense>
  )
}
