'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from 'react'
import {
  ChevronRight,
  Download,
  FileText,
  Printer,
  Search,
  Wrench,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  ShoppingBag,
  FileCheck,
  AlertCircle,
  Package,
  ArrowRight,
  History,
  CheckCircle2,
  Clock,
  X,
  Loader2,
  StickyNote,
} from 'lucide-react'
import {
  formatCurrency,
  formatDate,
  getRepairStatusLabel,
  getRepairStatusStyle,
  getRepairTotal,
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

interface Quote {
  id: string
  number: string
  status: 'BROUILLON' | 'EN_ATTENTE' | 'SIGNE' | 'REFUSE' | 'CONVERTI'
  clientId: string
  client: Client
  repairId?: string | null
  items: string // JSON
  totalHT: number
  totalTTC: number
  notes?: string | null
  validUntil?: string | null
  invoiceId?: string | null
  createdAt: string
}

interface Invoice {
  id: string
  number: string
  clientId: string
  client: Client
  repairId?: string | null
  quoteId?: string | null
  items: string // JSON
  totalHT: number
  totalTTC: number
  notes?: string | null
  paid: boolean
  createdAt: string
}

interface ShopProduct {
  id: string
  name: string
  sellingPrice: number
  category: string
  stock: number
}

interface Repair {
  id: string
  client: Client
  status: string
  services: {
    id: string
    priceAtTime: number
    quantity: number
    service: { name: string }
  }[]
  notes?: string | null
  createdAt: string
}

// --- Status Styles ---

function getQuoteStatusBadge(status: string) {
  switch (status) {
    case 'BROUILLON':
      return <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">Brouillon</span>
    case 'EN_ATTENTE':
      return <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-blue-600">En attente</span>
    case 'SIGNE':
      return <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">Signé</span>
    case 'REFUSE':
      return <span className="rounded-full bg-rose-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-rose-600">Refusé</span>
    case 'CONVERTI':
      return <span className="rounded-full bg-violet-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-violet-600">Converti</span>
    default:
      return <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-500">{status}</span>
  }
}

function getInvoiceStatusBadge(paid: boolean) {
  if (paid) {
    return <span className="rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-600">Payée</span>
  }
  return <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-600">Non payée</span>
}

// --- Main Component ---

function BillingContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Tabs: quotes, invoices, repairs
  const [activeTab, setActiveTab] = useState<'quotes' | 'invoices' | 'repairs'>('repairs')
  const [showEditor, setShowEditor] = useState(false)
  const [editorMode, setEditorMode] = useState<'quote' | 'invoice'>('quote')
  
  // Data States
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [repairs, setRepairs] = useState<Repair[]>([])
  const [shopProducts, setShopProducts] = useState<ShopProduct[]>([])
  
  // Selected Data
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null)
  const [selectedDocType, setSelectedDocType] = useState<'quote' | 'invoice' | null>(null)
  
  // Editor States
  const [draftLines, setDraftLines] = useState<DraftLine[]>([])
  const [draftNotes, setDraftNotes] = useState('')
  const [draftClient, setDraftClient] = useState<Client | null>(null)
  const [draftRepairId, setDraftRepairId] = useState<string | null>(null)
  const [draftNumber, setDraftNumber] = useState('')
  const [draftStatus, setDraftStatus] = useState<string>('BROUILLON')
  const [draftPaid, setDraftPaid] = useState(false)
  
  // Search & Filter
  const [search, setSearch] = useState('')
  const [shopSearch, setShopSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    void loadInitialData()
  }, [])

  async function loadInitialData() {
    try {
      setIsLoading(true)
      const [quotesRes, invoicesRes, clientsRes, shopRes, repairsRes] = await Promise.all([
        fetch('/api/quotes'),
        fetch('/api/invoices'),
        fetch('/api/clients'),
        fetch('/api/shop'),
        fetch('/api/repairs')
      ])
      
      const [qData, iData, cData, sData, rData] = await Promise.all([
        quotesRes.json(),
        invoicesRes.json(),
        clientsRes.json(),
        shopRes.json(),
        repairsRes.json()
      ])

      setQuotes(Array.isArray(qData) ? qData : [])
      setInvoices(Array.isArray(iData) ? iData : [])
      setClients(Array.isArray(cData) ? cData : [])
      setShopProducts(Array.isArray(sData) ? sData : [])
      setRepairs(Array.isArray(rData) ? rData : [])
    } catch (err) {
      console.error('Failed to load data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle URL params for direct opening
  useEffect(() => {
    const repairId = searchParams?.get('repairId')
    if (repairId && repairs.length > 0) {
      const repair = repairs.find(r => r.id === repairId)
      if (repair) {
        createNewFromRepair(repair, (searchParams?.get('mode') as any) === 'devis' ? 'quote' : 'invoice')
      }
    }
  }, [searchParams, repairs])

  function createNewFromRepair(repair: Repair, mode: 'quote' | 'invoice' = 'quote') {
    setEditorMode(mode)
    setDraftClient(repair.client)
    setDraftRepairId(repair.id)
    setDraftLines(repair.services.map(s => ({
      id: s.id,
      name: s.service.name,
      price: s.priceAtTime,
      quantity: s.quantity
    })))
    setDraftNotes(repair.notes || '')
    setDraftNumber('NOUVEAU')
    setDraftStatus('BROUILLON')
    setDraftPaid(false)
    setSelectedDocId(null)
    setSelectedDocType(null)
    setShowEditor(true)
  }

  function openEditor(doc: Quote | Invoice, type: 'quote' | 'invoice') {
    setEditorMode(type)
    setDraftClient(doc.client)
    setDraftRepairId(doc.repairId || null)
    setDraftLines(JSON.parse(doc.items))
    setDraftNotes(doc.notes || '')
    setDraftNumber(doc.number)
    if (type === 'quote') {
      setDraftStatus((doc as Quote).status)
    } else {
      setDraftPaid((doc as Invoice).paid)
    }
    setSelectedDocId(doc.id)
    setSelectedDocType(type)
    setShowEditor(true)
  }

  async function handleSaveDoc() {
    try {
      setIsSaving(true)
      const isUpdate = !!selectedDocId
      const url = isUpdate 
        ? `/api/${editorMode === 'quote' ? 'quotes' : 'invoices'}/${selectedDocId}`
        : `/api/${editorMode === 'quote' ? 'quotes' : 'invoices'}`
      
      const payload = {
        clientId: draftClient?.id,
        repairId: draftRepairId,
        items: draftLines,
        totalHT: totals.totalHT,
        totalTTC: totals.totalTTC,
        notes: draftNotes,
        status: editorMode === 'quote' ? draftStatus : undefined,
        paid: editorMode === 'invoice' ? draftPaid : undefined,
      }

      const res = await fetch(url, {
        method: isUpdate ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Erreur lors de l’enregistrement.')
      
      const saved = await res.json()
      setDraftNumber(saved.number)
      setSelectedDocId(saved.id)
      setSelectedDocType(editorMode)
      
      await loadInitialData()
      // Optional: show toast
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setIsSaving(false)
    }
  }

  async function convertQuoteToInvoice() {
    if (editorMode !== 'quote' || !selectedDocId) return
    try {
      setIsSaving(true)
      const res = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteId: selectedDocId,
          clientId: draftClient?.id,
          repairId: draftRepairId,
          items: draftLines,
          totalHT: totals.totalHT,
          totalTTC: totals.totalTTC,
          notes: draftNotes,
          paid: false
        })
      })

      if (!res.ok) throw new Error('Conversion échouée.')
      
      const invoice = await res.json()
      await loadInitialData()
      openEditor(invoice, 'invoice')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setIsSaving(false)
    }
  }

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
      name: 'Prestation / Produit', 
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

  const filteredShop = useMemo(() => {
    const query = shopSearch.trim().toLowerCase()
    if (!query) return []
    return shopProducts.filter((p) =>
      p.name.toLowerCase().includes(query)
    ).slice(0, 5)
  }, [shopProducts, shopSearch])

  const filteredQuotes = useMemo(() => {
    const q = search.trim().toLowerCase()
    return quotes.filter(doc => 
      doc.number.toLowerCase().includes(q) || doc.client.name.toLowerCase().includes(q)
    )
  }, [quotes, search])

  const filteredInvoices = useMemo(() => {
    const q = search.trim().toLowerCase()
    return invoices.filter(doc => 
      doc.number.toLowerCase().includes(q) || doc.client.name.toLowerCase().includes(q)
    )
  }, [invoices, search])

  const filteredRepairs = useMemo(() => {
    const q = search.trim().toLowerCase()
    return repairs
      .filter(repair => 
        repair.id.toLowerCase().includes(q) || repair.client.name.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        if (a.status === 'PENDING' && b.status !== 'PENDING') return -1
        if (a.status !== 'PENDING' && b.status === 'PENDING') return 1
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
  }, [repairs, search])

  const handleDownload = async () => {
    if (!draftClient) return
    setIsDownloading(true)
    try {
      const doc = new jsPDF()
      const margin = 20
      let y = margin

      // Simplified PDF Generation Logic (matching previous premium design)
      doc.setFontSize(26)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(15, 23, 42)
      doc.text(editorMode === 'quote' ? 'DEVIS' : 'FACTURE', margin, y + 10)
      
      doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(100)
      doc.text(`N°: ${draftNumber}`, 210 - margin, y + 2, { align: 'right' })
      doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 210 - margin, y + 8, { align: 'right' })
      y += 30

      doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.setTextColor(15, 23, 42)
      doc.text('MOMUY&TECH - REPARATION ET ELECTRONIQUE', margin, y)
      y += 6; doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(100)
      doc.text('123 Avenue de la Réparation, 75001 Paris', margin, y)
      y += 15

      // Client Info
      doc.setFillColor(248, 250, 252); doc.rect(margin, y, 170, 35, 'F')
      y += 8; doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(148, 163, 184); doc.text('DESTINATAIRE', margin + 8, y)
      y += 8; doc.setFontSize(14); doc.setTextColor(15, 23, 42); doc.text(draftClient.name.toUpperCase(), margin + 8, y)
      y += 6; doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(71, 85, 105); doc.text(draftClient.phone, margin + 8, y)
      y += 20

      // Items Table
      doc.setFillColor(15, 23, 42); doc.rect(margin, y, 170, 10, 'F')
      doc.setFontSize(8); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255)
      doc.text('DESCRIPTION', margin + 5, y + 6.5); doc.text('QTÉ', 135, y + 6.5, { align: 'center' }); doc.text('P.U. HT', 155, y + 6.5, { align: 'right' }); doc.text('TOTAL HT', 185, y + 6.5, { align: 'right' })
      y += 10

      doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(15, 23, 42)
      draftLines.forEach((line, i) => {
        const rowY = y + 10 + (i * 10)
        doc.text(line.name, margin + 5, rowY)
        doc.text(line.quantity.toString(), 135, rowY, { align: 'center' })
        doc.text(`${(line.price / 1.2).toFixed(2)} €`, 155, rowY, { align: 'right' })
        doc.text(`${((line.price * line.quantity) / 1.2).toFixed(2)} €`, 185, rowY, { align: 'right' })
        doc.setDrawColor(241, 245, 249); doc.line(margin, rowY + 3, 190, rowY + 3)
      })

      y += 20 + (draftLines.length * 10)
      doc.text('TOTAL HT', 150, y, { align: 'right' }); doc.text(`${totals.totalHT.toFixed(2)} €`, 185, y, { align: 'right' })
      y += 7; doc.text('TVA (20%)', 150, y, { align: 'right' }); doc.text(`${totals.tva.toFixed(2)} €`, 185, y, { align: 'right' })
      y += 12; doc.setFillColor(15, 23, 42); doc.rect(130, y - 6, 60, 12, 'F')
      doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255); doc.text('TOTAL TTC', 140, y + 1.5); doc.setFontSize(14); doc.text(`${totals.totalTTC.toFixed(2)} €`, 185, y + 1.5, { align: 'right' })

      doc.save(`${draftNumber}.pdf`)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header Bar */}
      {!showEditor && (
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.7rem] font-black uppercase tracking-[0.3em] text-blue-600">Finance & Documents</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
              {activeTab === 'quotes' ? 'Gestion des Devis' : 'Gestion des Factures'}
            </h1>
          </div>
          
          <button 
            onClick={() => {
              setEditorMode('quote')
              setDraftLines([])
              setDraftNotes('')
              setDraftClient(null)
              setDraftNumber('NOUVEAU')
              setSelectedDocId(null)
              setShowEditor(true)
            }}
            className="flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-bold text-white shadow-xl transition hover:bg-blue-600 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Nouveau Devis
          </button>
        </header>
      )}

      {!showEditor ? (
        <>
          {/* Tabs Listing */}
          <section className="flex flex-col gap-6">
            <div className="flex bg-white/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/60 shadow-sm ring-1 ring-white/60 w-fit">
              <button 
                onClick={() => setActiveTab('quotes')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'quotes' ? 'bg-slate-950 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <FileText className="w-4 h-4" />
                Devis
              </button>
              <button 
                onClick={() => setActiveTab('invoices')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'invoices' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <FileCheck className="w-4 h-4" />
                Factures
              </button>
              <button 
                onClick={() => setActiveTab('repairs')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'repairs' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <Wrench className="w-4 h-4" />
                Tickets Atelier
              </button>
            </div>

            {/* Filter Bar */}
            <div className="rounded-[2.5rem] border border-white/60 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
              <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Numéro, client..."
                  className="w-full rounded-2xl border border-slate-100 bg-white/60 py-4 pl-12 pr-4 text-sm font-bold outline-none transition focus:border-blue-300 focus:bg-white"
                />
              </div>
            </div>

            {/* Listing Table */}
            <div className="overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md">
              <table className="w-full text-left">
                <thead className="bg-white/50 backdrop-blur-sm">
                  <tr className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    <th className="px-8 py-5">Numéro</th>
                    <th className="px-8 py-5">Client</th>
                    <th className="px-8 py-5">Date</th>
                    <th className="px-8 py-5">Statut</th>
                    <th className="px-8 py-5 text-right">Montant TTC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {isLoading ? (
                    <tr><td colSpan={5} className="px-8 py-20 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" /></td></tr>
                  ) : activeTab === 'repairs' ? (
                    filteredRepairs.map((repair) => (
                      <tr 
                        key={repair.id} 
                        onClick={() => createNewFromRepair(repair, 'quote')}
                        className="group cursor-pointer hover:bg-white/40 transition-colors"
                      >
                        <td className="px-8 py-5">
                          <p className="font-black text-slate-950">#{repair.id.slice(-6).toUpperCase()}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">TICKET ATELIER</p>
                        </td>
                        <td className="px-8 py-5">
                          <p className="font-bold text-slate-800">{repair.client.name}</p>
                          <p className="text-xs text-slate-400">{repair.client.phone}</p>
                        </td>
                        <td className="px-8 py-5">
                          <p className="text-sm font-bold text-slate-600">{formatDate(repair.createdAt)}</p>
                        </td>
                        <td className="px-8 py-5">
                           <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${getRepairStatusStyle(repair.status)}`}>
                             {getRepairStatusLabel(repair.status)}
                           </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <p className="text-lg font-black text-blue-600">{formatCurrency(getRepairTotal(repair))}</p>
                        </td>
                      </tr>
                    ))
                  ) : (activeTab === 'quotes' ? filteredQuotes : filteredInvoices).map((doc) => (
                    <tr 
                      key={doc.id} 
                      onClick={() => openEditor(doc as any, activeTab === 'quotes' ? 'quote' : 'invoice')}
                      className="group cursor-pointer hover:bg-white/40 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <p className="font-black text-slate-950">{doc.number}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">REF: {doc.id.slice(-6).toUpperCase()}</p>
                      </td>
                      <td className="px-8 py-5">
                        <p className="font-bold text-slate-800">{doc.client.name}</p>
                        <p className="text-xs text-slate-400">{doc.client.phone}</p>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm font-bold text-slate-600">{formatDate(doc.createdAt)}</p>
                      </td>
                      <td className="px-8 py-5">
                        {activeTab === 'quotes' ? getQuoteStatusBadge((doc as Quote).status) : getInvoiceStatusBadge((doc as Invoice).paid)}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <p className={`text-lg font-black ${activeTab === 'quotes' ? 'text-blue-600' : 'text-emerald-600'}`}>{formatCurrency(doc.totalTTC)}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : (
        /* Editor View */
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <button 
              onClick={() => setShowEditor(false)}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold"
            >
              <X className="w-5 h-5" />
              Fermer l'éditeur
            </button>
            
            <div className="flex items-center gap-3">
              {editorMode === 'quote' && selectedDocId && (draftStatus === 'SIGNE' || draftStatus === 'EN_ATTENTE') && (
                 <button 
                  onClick={convertQuoteToInvoice}
                  disabled={isSaving}
                  className="flex h-14 items-center gap-3 rounded-2xl bg-violet-600 px-6 text-sm font-black text-white shadow-xl shadow-violet-600/20 transition-all hover:bg-violet-700 active:scale-95"
                >
                  <ArrowRight className="w-5 h-5" />
                  Générer Facture
                </button>
              )}
              
              <button 
                onClick={handleSaveDoc}
                disabled={isSaving || !draftClient}
                className="flex h-14 items-center gap-3 rounded-2xl bg-emerald-600 px-6 text-sm font-black text-white shadow-xl shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-95"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {selectedDocId ? 'Mettre à jour' : 'Enregistrer'}
              </button>
              
              <button 
                onClick={handleDownload}
                disabled={!draftClient || isDownloading}
                className="flex h-14 items-center gap-2 rounded-2xl bg-white/40 border border-white/60 px-6 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-white/60 active:scale-95"
              >
                {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                PDF
              </button>

              <button 
                onClick={() => window.print()}
                disabled={!draftClient}
                className="flex h-14 items-center gap-3 rounded-2xl bg-slate-950 px-8 text-sm font-black text-white shadow-xl shadow-slate-950/20 transition-all hover:bg-slate-800 active:scale-95"
              >
                <Printer className="w-5 h-5" />
                Imprimer
              </button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            {/* Editor Area */}
            <div className="space-y-8">
              {/* Document Preview (A4 styled) */}
              <div className="bg-slate-100/50 rounded-[3rem] p-12 shadow-inner border border-slate-200/50 overflow-x-auto print:bg-white print:p-0 print:border-none">
                 <div className="bg-white shadow-2xl w-[210mm] min-h-[297mm] p-[20mm] mx-auto flex flex-col relative print:shadow-none print:m-0">
                    <div className="flex justify-between items-start mb-16">
                       <div>
                          <div className="flex items-center gap-4 mb-6">
                             <div className="p-3 bg-slate-950 rounded-xl text-white"><Wrench className="w-6 h-6" /></div>
                             <span className="text-2xl font-black uppercase tracking-tighter">RepairFlow</span>
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 space-y-0.5 uppercase">
                             <p className="text-slate-600 font-black">MOMUY&TECH</p>
                             <p>123 Avenue de la Réparation, 75001 Paris</p>
                             <p>Tél: 01 23 45 67 89</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <h2 className="text-6xl font-black text-slate-100 tracking-tighter uppercase" style={{ WebkitTextStroke: '1px #e2e8f0' }}>{editorMode === 'quote' ? 'Devis' : 'Facture'}</h2>
                          <p className="text-2xl font-black text-slate-950 mt-2">{draftNumber}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase mt-1">{formatDate(new Date())}</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12 mb-12">
                       <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-3">Client</p>
                          {draftClient ? (
                            <>
                              <p className="text-xl font-black text-slate-950">{draftClient.name.toUpperCase()}</p>
                              <p className="text-sm font-bold text-slate-500">{draftClient.phone}</p>
                              <p className="text-xs text-slate-400 mt-2">{draftClient.email || 'Pas d\'email'}</p>
                            </>
                          ) : (
                            <div className="py-4 border-2 border-dashed border-slate-200 rounded-xl text-center text-[10px] font-black text-slate-400">Aucun client sélectionné</div>
                          )}
                       </div>
                    </div>

                    <div className="flex-1">
                       <table className="w-full">
                          <thead className="border-b-2 border-slate-950">
                             <tr className="text-left text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                <th className="py-4">Description</th>
                                <th className="py-4 text-center w-20">Qté</th>
                                <th className="py-4 text-right w-28">P.U. HT</th>
                                <th className="py-4 text-right w-28">Total HT</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                             {draftLines.map((line, idx) => (
                               <tr key={line.id}>
                                  <td className="py-4 pr-4">
                                     <input className="w-full font-bold text-slate-900 outline-none" value={line.name} onChange={e => updateLine(idx, 'name', e.target.value)} />
                                  </td>
                                  <td className="py-4 px-2 text-center font-bold">
                                     <input className="w-full text-center outline-none" type="number" value={line.quantity} onChange={e => updateLine(idx, 'quantity', parseInt(e.target.value) || 0)} />
                                  </td>
                                  <td className="py-4 px-2 text-right font-bold text-slate-600">
                                     <input className="w-full text-right outline-none" type="number" value={(line.price / 1.2).toFixed(2)} onChange={e => updateLine(idx, 'price', parseFloat(e.target.value) * 1.2 || 0)} />
                                  </td>
                                  <td className="py-4 pl-4 text-right font-black text-slate-950">
                                     {((line.price * line.quantity) / 1.2).toFixed(2)} €
                                  </td>
                               </tr>
                             ))}
                          </tbody>
                       </table>
                       <button onClick={addLine} className="mt-4 flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline print:hidden"><Plus className="w-3 h-3" /> Ajouter une ligne</button>
                    </div>

                    <div className="mt-12 flex justify-end">
                       <div className="w-72 bg-slate-50 p-6 rounded-[2rem] space-y-3">
                          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase"><span>Total HT</span><span>{formatCurrency(totals.totalHT)}</span></div>
                          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase pb-3 border-b border-slate-200"><span>TVA (20%)</span><span>{formatCurrency(totals.tva)}</span></div>
                          <div className="flex justify-between items-center pt-2">
                             <span className="text-[10px] font-black text-blue-600 uppercase">Total TTC</span>
                             <span className="text-2xl font-black text-slate-950 tracking-tighter">{formatCurrency(totals.totalTTC)}</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Config Panel */}
            <aside className="space-y-6">
               <div className="rounded-[2rem] border border-white/60 bg-white/40 p-6 shadow-sm backdrop-blur-md">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Configuration</p>
                  
                  <div className="space-y-4">
                     <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase mb-2">Destinataire</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                          <select 
                            className="w-full rounded-xl border border-slate-100 bg-white p-3 pl-10 text-xs font-bold outline-none"
                            value={draftClient?.id || ''}
                            onChange={(e) => setDraftClient(clients.find(c => c.id === e.target.value) || null)}
                          >
                            <option value="">Sélectionner un client</option>
                            {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                          </select>
                        </div>
                     </div>

                     {editorMode === 'quote' ? (
                       <>
                         <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase mb-2">Statut du Devis</label>
                            <select 
                              className="w-full rounded-xl border border-slate-100 bg-white p-3 text-xs font-bold outline-none"
                              value={draftStatus}
                              onChange={(e) => setDraftStatus(e.target.value)}
                            >
                              <option value="BROUILLON">Brouillon</option>
                              <option value="EN_ATTENTE">En attente (Envoyé)</option>
                              <option value="SIGNE">Signé / Accepté</option>
                              <option value="REFUSE">Refusé</option>
                            </select>
                         </div>
                         <div>
                            <label className="block text-[9px] font-black text-slate-400 uppercase mb-2">Validité (jours)</label>
                            <input 
                              type="number"
                              className="w-full rounded-xl border border-slate-100 bg-white p-3 text-xs font-bold outline-none"
                              placeholder="30"
                              defaultValue={30}
                            />
                         </div>
                       </>
                     ) : (
                       <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-600">Facture payée ?</span>
                          <button 
                            onClick={() => setDraftPaid(!draftPaid)}
                            className={`w-12 h-6 rounded-full transition-all relative ${draftPaid ? 'bg-emerald-500' : 'bg-slate-200'}`}
                          >
                             <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${draftPaid ? 'left-7' : 'left-1'}`} />
                          </button>
                       </div>
                     )}

                     <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase mb-2">Notes document</label>
                        <textarea 
                           className="w-full rounded-xl border border-slate-100 bg-white p-3 text-xs font-medium outline-none"
                           rows={4}
                           value={draftNotes}
                           onChange={e => setDraftNotes(e.target.value)}
                           placeholder="Apparait en bas du document..."
                        />
                     </div>
                  </div>
               </div>

               <div className="rounded-[2rem] border border-white/60 bg-white/40 p-6 shadow-sm backdrop-blur-md">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Produits Boutique</p>
                  <div className="relative">
                    <ShoppingBag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      value={shopSearch}
                      onChange={e => setShopSearch(e.target.value)}
                      placeholder="Ajouter un accessoire..."
                      className="w-full rounded-xl border border-slate-100 bg-white p-3 pl-10 text-xs font-bold outline-none"
                    />
                    {filteredShop.length > 0 && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl border border-slate-100 shadow-2xl z-20 p-2 space-y-1">
                        {filteredShop.map(p => (
                          <button key={p.id} onClick={() => addShopProduct(p)} className="flex w-full items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left">
                            <span className="text-[10px] font-bold">{p.name}</span>
                            <span className="text-[10px] font-black text-emerald-600">{formatCurrency(p.sellingPrice)}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
               </div>
            </aside>
          </div>
        </div>
      )}

      <style jsx global>{`
        @media print {
          body { background: white !important; }
          header, nav, aside, section, .print\\:hidden, button { display: none !important; }
          main { padding: 0 !important; margin: 0 !important; display: block !important; }
        }
      `}</style>
    </div>
  )
}

function User({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
  )
}

export default function BillingPage() {
  return (
    <Suspense fallback={null}>
      <BillingContent />
    </Suspense>
  )
}
