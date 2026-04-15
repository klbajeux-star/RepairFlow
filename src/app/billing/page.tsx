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

      const data = await res.json().catch(() => ({ error: 'Impossible de lire la réponse du serveur.' }))
      
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l’enregistrement.')
      }
      
      const saved = data
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
      const margin = 15
      let y = margin

      // Background Title (Stylized)
      doc.setFontSize(55)
      doc.setTextColor(248, 250, 252)
      doc.setFont('helvetica', 'bold')
      doc.text(editorMode === 'quote' ? 'DEVIS' : 'FACTURE', 210 - margin, y + 15, { align: 'right' })

      // Header Brand
      doc.setFillColor(15, 23, 42)
      doc.roundedRect(margin, y, 12, 12, 3, 3, 'F')
      doc.setFontSize(20)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(15, 23, 42)
      doc.text('RepairFlow', margin + 16, y + 8)
      
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(59, 130, 246)
      doc.text('EXPERTISE & RÉPARATION MOBILE', margin + 17, y + 12)

      y += 22
      
      // Top Bar Info (Number & Date)
      doc.setFillColor(15, 23, 42)
      doc.roundedRect(135, y - 22, 60, 15, 2, 2, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(draftNumber, 165, y - 14, { align: 'center' })
      doc.setFontSize(6)
      doc.setFont('helvetica', 'normal')
      doc.text(`ÉMIS LE ${new Date().toLocaleDateString('fr-FR')}`, 165, y - 10, { align: 'center' })

      doc.setDrawColor(241, 245, 249)
      doc.setLineWidth(0.5)
      doc.line(margin, y, 210 - margin, y)

      y += 10

      // Two Columns: Company vs Client
      const colWidth = (210 - (margin * 3)) / 2
      
      // Left: Company Info
      doc.setFontSize(7)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(148, 163, 184)
      doc.text('ÉMETTEUR', margin, y)
      y += 5
      doc.setFontSize(9)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(15, 23, 42)
      doc.text('MOMUY&TECH SAS', margin, y)
      y += 4
      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100)
      doc.text('123 Avenue de la Réparation, 75001 Paris', margin, y)
      y += 3.5
      doc.text('Tél: 01 23 45 67 89 — Email: contact@repairflow.fr', margin, y)
      y += 3.5
      doc.text('SIRET: 123 456 789 00012 — TVA: FR 12 123 456 789', margin, y)

      // Right: Client Info (Same Y level)
      let clientY = y - 16
      doc.setFillColor(248, 250, 252)
      doc.roundedRect(margin + colWidth + margin, clientY - 5, colWidth, 32, 3, 3, 'F')
      
      doc.setFontSize(7)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(59, 130, 246)
      doc.text('DESTINATAIRE', margin + colWidth + margin + 6, clientY)
      clientY += 6
      doc.setFontSize(11)
      doc.setTextColor(15, 23, 42)
      doc.text(draftClient.name.toUpperCase(), margin + colWidth + margin + 6, clientY)
      clientY += 5
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(71, 85, 105)
      if (draftClient.address) {
        doc.text(draftClient.address, margin + colWidth + margin + 6, clientY)
        clientY += 4
      }
      if (draftClient.zipCode || draftClient.city) {
        doc.text(`${draftClient.zipCode || ''} ${draftClient.city || ''}`, margin + colWidth + margin + 6, clientY)
        clientY += 4
      }
      doc.text(draftClient.phone, margin + colWidth + margin + 6, clientY)
      
      y += 18

      // Table Header
      doc.setFillColor(248, 250, 252)
      doc.rect(margin, y, 210 - (margin * 2), 8, 'F')
      doc.setFontSize(7)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(148, 163, 184)
      doc.text('DESCRIPTION DES PRESTATIONS', margin + 4, y + 5.5)
      doc.text('QTÉ', 125, y + 5.5, { align: 'center' })
      doc.text('P.U. HT', 155, y + 5.5, { align: 'right' })
      doc.text('TOTAL HT', 190, y + 5.5, { align: 'right' })
      
      y += 12
      doc.setFontSize(8)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(15, 23, 42)
      
      draftLines.forEach((line) => {
        doc.setFont('helvetica', 'bold')
        doc.text(line.name, margin + 4, y)
        doc.setFont('helvetica', 'normal')
        doc.text(line.quantity.toString(), 125, y, { align: 'center' })
        doc.text(`${(line.price / 1.2).toFixed(2)} €`, 155, y, { align: 'right' })
        doc.text(`${((line.price * line.quantity) / 1.2).toFixed(2)} €`, 190, y, { align: 'right' })
        y += 8
        doc.setDrawColor(248, 250, 252)
        doc.setLineWidth(0.1)
        doc.line(margin, y - 4, 210 - margin, y - 4)
      })

      y += 5
      // Totals Box (Compact)
      const totalWidth = 65
      const totalBoxX = 210 - margin - totalWidth
      doc.setFillColor(15, 23, 42)
      doc.roundedRect(totalBoxX, y, totalWidth, 25, 2, 2, 'F')
      
      y += 7
      doc.setFontSize(7)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(148, 163, 184)
      doc.text('TOTAL HT', totalBoxX + 6, y)
      doc.setTextColor(255, 255, 255)
      doc.text(`${totals.totalHT.toFixed(2)} €`, 210 - margin - 6, y, { align: 'right' })
      
      y += 5
      doc.setTextColor(148, 163, 184)
      doc.text('TVA (20%)', totalBoxX + 6, y)
      doc.setTextColor(255, 255, 255)
      doc.text(`${totals.tva.toFixed(2)} €`, 210 - margin - 6, y, { align: 'right' })
      
      y += 7
      doc.setFontSize(9)
      doc.setTextColor(59, 130, 246)
      doc.text('TOTAL TTC À PAYER', totalBoxX + 6, y)
      doc.setFontSize(12)
      doc.setTextColor(255, 255, 255)
      doc.text(`${totals.totalTTC.toFixed(2)} €`, 210 - margin - 6, y, { align: 'right' })

      // Notes & Signature
      y += 15
      doc.setFontSize(7)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(148, 163, 184)
      doc.text('INFORMATIONS COMPLÉMENTAIRES', margin, y)
      y += 5
      doc.setFontSize(7)
      doc.setFont('helvetica', 'italic')
      doc.setTextColor(100)
      const splitNotes = doc.splitTextToSize(draftNotes || 'Aucune note spécifique.', 100)
      doc.text(splitNotes, margin, y)
      
      const signatureY = y + 15
      doc.setDrawColor(241, 245, 249)
      doc.setLineWidth(0.5)
      doc.line(margin, signatureY, margin + 70, signatureY)
      doc.setFontSize(6)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(203, 213, 225)
      doc.text('CACHET & SIGNATURE DE L\'ENTREPRISE', margin, signatureY + 4)

      // Legal Footer (Fixed at the bottom)
      doc.setDrawColor(241, 245, 249)
      doc.line(margin, 280, 210 - margin, 280)
      doc.setFontSize(6)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(180)
      doc.text('RepairFlow — SAS au capital de 1000€ — SIRET 12345678900012 — RCS PARIS — TVA Intra: FR 12 123 456 789', 105, 285, { align: 'center' })
      doc.text('En cas de retard de paiement, une indemnité forfaitaire de 40€ pour frais de recouvrement sera appliquée.', 105, 288, { align: 'center' })

      doc.save(`${editorMode === 'quote' ? 'DEVIS' : 'FACTURE'}_${draftNumber}.pdf`)
    } catch (err) {
      console.error(err)
      alert('Erreur lors de la génération du PDF.')
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
                             <div className="p-4 bg-slate-950 rounded-[1.5rem] text-white shadow-xl shadow-slate-950/20"><Wrench className="w-8 h-8" /></div>
                              <div>
                                <span className="text-4xl font-black uppercase tracking-tighter block leading-none">RepairFlow</span>
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1 block">Expertise & Réparation</span>
                              </div>
                          </div>
                          <div className="text-[10px] font-bold text-slate-500 space-y-1 uppercase leading-relaxed">
                              <p className="text-slate-900 font-black text-xs mb-1">MOMUY&TECH SAS</p>
                              <p>123 Avenue de la Réparation, 75001 Paris</p>
                              <p>Tél: 01 23 45 67 89 — Email: contact@repairflow.fr</p>
                              <p>SIRET: 123 456 789 00012 — TVA: FR 12 123 456 789</p>
                           </div>
                       </div>
                       <div className="text-right">
                          <h2 className="text-8xl font-black text-slate-100 tracking-tighter uppercase leading-none" style={{ WebkitTextStroke: '2px #f1f5f9' }}>
                             {editorMode === 'quote' ? 'Devis' : 'Facture'}
                           </h2>
                          <p className="text-2xl font-black text-slate-950 mt-2">{draftNumber}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase mt-1">{formatDate(new Date())}</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-24 mb-16">
                        <div className="relative">
                           <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-slate-100 rounded-tl-2xl -z-10" />
                           <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">À l'attention de</p>
                           {draftClient ? (
                             <div className="space-y-1">
                               <p className="text-2xl font-black text-slate-950 tracking-tight">{draftClient.name.toUpperCase()}</p>
                               {draftClient.address && <p className="text-sm font-bold text-slate-600">{draftClient.address}</p>}
                               {(draftClient.zipCode || draftClient.city) && (
                                 <p className="text-sm font-bold text-slate-600">{draftClient.zipCode} {draftClient.city}</p>
                               )}
                               <p className="text-sm font-bold text-slate-500 pt-2">{draftClient.phone}</p>
                               <p className="text-xs text-slate-400 italic">{draftClient.email || 'Pas d\'email'}</p>
                             </div>
                           ) : (
                             <div className="py-8 border-2 border-dashed border-slate-100 rounded-[2rem] text-center text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-50/50">Aucun client sélectionné</div>
                           )}
                        </div>
                        <div className="text-right flex flex-col justify-end">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Conditions de règlement</p>
                           <p className="text-xs font-bold text-slate-700">Paiement à réception de facture</p>
                           {editorMode === 'quote' && (
                             <p className="text-xs font-bold text-slate-700 mt-1">Devis valable 30 jours</p>
                           )}
                        </div>
                     </div>

                    <div className="flex-1">
                       <table className="w-full">
                          <thead>
                              <tr className="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b-2 border-slate-100">
                                 <th className="py-6 px-4">Description de la prestation</th>
                                 <th className="py-6 px-4 text-center w-24">Quantité</th>
                                 <th className="py-6 px-4 text-right w-32">P.U. HT</th>
                                 <th className="py-6 px-4 text-right w-32">Total HT</th>
                                 <th className="py-6 px-4 text-right w-12 print:hidden"></th>
                              </tr>
                           </thead>
                          <tbody className="divide-y divide-slate-50">
                              {draftLines.map((line, idx) => (
                                <tr key={line.id} className="group hover:bg-slate-50/50 transition-colors">
                                   <td className="py-6 px-4">
                                      <input 
                                        className="w-full font-black text-slate-900 bg-transparent outline-none focus:text-blue-600 transition-colors" 
                                        value={line.name} 
                                        onChange={e => updateLine(idx, 'name', e.target.value)} 
                                      />
                                   </td>
                                   <td className="py-6 px-4 text-center">
                                      <input 
                                        className="w-full text-center font-bold bg-transparent outline-none" 
                                        type="number" 
                                        value={line.quantity} 
                                        onChange={e => updateLine(idx, 'quantity', parseInt(e.target.value) || 0)} 
                                      />
                                   </td>
                                   <td className="py-6 px-4 text-right">
                                      <input 
                                        className="w-full text-right font-bold text-slate-600 bg-transparent outline-none" 
                                        type="number" 
                                        value={(line.price / 1.2).toFixed(2)} 
                                        onChange={e => updateLine(idx, 'price', parseFloat(e.target.value) * 1.2 || 0)} 
                                      />
                                   </td>
                                   <td className="py-6 px-4 text-right font-black text-slate-950">
                                      {((line.price * line.quantity) / 1.2).toFixed(2)} €
                                   </td>
                                   <td className="py-6 px-4 text-right print:hidden">
                                      <button 
                                        onClick={() => removeLine(idx)}
                                        className="text-slate-200 hover:text-red-500 transition-colors"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                   </td>
                                </tr>
                              ))}
                           </tbody>
                       </table>
                       <button 
                          onClick={addLine} 
                          className="mt-6 flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-dashed border-slate-100 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 hover:border-blue-200 transition-all print:hidden"
                        >
                          <Plus className="w-4 h-4" /> 
                          Ajouter une ligne personnalisée
                        </button>
                    </div>

                    <div className="mt-24 pt-12 border-t border-slate-100 flex justify-between items-start">
                        <div className="max-w-md">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Informations complémentaires</p>
                           <p className="text-xs text-slate-500 font-medium leading-relaxed italic">{draftNotes || 'Aucune note spécifique sur ce document.'}</p>
                           <div className="mt-8 pt-8 border-t border-slate-50">
                              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Cachet & Signature de l'entreprise</p>
                           </div>
                        </div>

                        <div className="w-80 space-y-4">
                           <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100 space-y-4">
                              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                 <span>Total HT</span>
                                 <span className="text-slate-900">{formatCurrency(totals.totalHT)}</span>
                              </div>
                              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest pb-4 border-b border-slate-200">
                                 <span>TVA (20%)</span>
                                 <span className="text-slate-900">{formatCurrency(totals.tva)}</span>
                              </div>
                              <div className="flex justify-between items-center pt-2">
                                 <span className="text-sm font-black text-blue-600 uppercase tracking-tighter">Total à payer</span>
                                 <span className="text-4xl font-black text-slate-950 tracking-tighter">{formatCurrency(totals.totalTTC)}</span>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className="mt-auto pt-16 text-center">
                        <div className="inline-block px-8 py-4 border-t border-slate-100">
                           <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.2em] leading-loose">
                              RepairFlow — Logiciel de Gestion d'Atelier de Réparation<br/>
                              En cas de retard de paiement, une indemnité forfaitaire de 40€ pour frais de recouvrement sera appliquée.<br/>
                              Aucun escompte pour paiement anticipé.
                           </p>
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
