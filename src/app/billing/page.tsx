'use client'

import { useSearchParams } from 'next/navigation'
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
} from 'lucide-react'
import {
  formatCurrency,
  formatDate,
  getRepairStatusLabel,
  getRepairStatusStyle,
} from '@/lib/repair'

interface Client {
  id: string
  name: string
  phone: string
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

function BillingContent() {
  const searchParams = useSearchParams()
  const [repairs, setRepairs] = useState<Repair[]>([])
  const [selectedRepairId, setSelectedRepairId] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<'devis' | 'facture'>('devis')
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  // Draft state for editability
  const [draftLines, setDraftLines] = useState<DraftLine[]>([])
  const [draftNotes, setDraftNotes] = useState('')

  useEffect(() => {
    void fetchRepairs()
  }, [])

  useEffect(() => {
    const repairId = searchParams.get('repairId')
    const mode = searchParams.get('mode')

    if (repairId) {
      setSelectedRepairId(repairId)
    }

    if (mode === 'facture' || mode === 'devis') {
      setActiveView(mode)
    }
  }, [searchParams])

  async function fetchRepairs() {
    try {
      setIsLoading(true)
      const response = await fetch('/api/repairs')
      const data = await response.json()
      if (response.ok) {
        setRepairs(Array.isArray(data) ? data : [])
      }
    } catch (err) {
      console.error('Failed to fetch repairs:', err)
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
      name: 'Nouvelle prestation', 
      price: 0, 
      quantity: 1 
    }])
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

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      {/* Header - Hidden on print */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 shrink-0 print:hidden">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Facturation & Devis</h1>
          <p className="text-sm text-slate-500 font-medium">Édition professionnelle au format A4</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl mr-4">
            <button 
              onClick={() => setActiveView('devis')}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeView === 'devis' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
            >
              Devis
            </button>
            <button 
              onClick={() => setActiveView('facture')}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeView === 'facture' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
            >
              Facture
            </button>
          </div>
          <button 
            onClick={resetDraft}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            title="Réinitialiser"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all"
          >
            <Printer className="w-5 h-5" />
            Imprimer
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Tickets List - Hidden on print */}
        <aside className="w-80 bg-white border-r border-slate-200 flex flex-col shrink-0 print:hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="p-8 text-center text-slate-400 animate-pulse">Chargement...</div>
            ) : filteredRepairs.map((repair) => (
              <div 
                key={repair.id}
                onClick={() => setSelectedRepairId(repair.id)}
                className={`p-5 cursor-pointer border-b border-slate-50 transition-all group ${selectedRepairId === repair.id ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-black text-base truncate ${selectedRepairId === repair.id ? 'text-blue-700' : 'text-slate-900'}`}>
                    {repair.client.name}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selectedRepairId === repair.id ? 'text-blue-500 translate-x-1' : 'text-slate-300'}`} />
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  <span>#{repair.id.slice(-6).toUpperCase()}</span>
                  <span>{formatDate(repair.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Preview Area */}
        <main className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-200/50 print:p-0 print:bg-white custom-scrollbar">
          {selectedRepair ? (
            <div className="flex flex-col gap-8 print:gap-0">
              {/* Document Paper A4 */}
              <div 
                className="bg-white shadow-2xl print:shadow-none w-[210mm] min-h-[297mm] p-[20mm] flex flex-col relative overflow-hidden text-slate-900"
                id="printable-a4"
              >
                {/* Watermark */}
                {activeView === 'devis' && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-[180px] font-black text-slate-50/50 pointer-events-none select-none z-0">
                    DEVIS
                  </div>
                )}

                <div className="relative z-10 flex flex-col h-full flex-1">
                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-16">
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg">
                          <Wrench className="w-8 h-8" />
                        </div>
                        <span className="text-3xl font-black tracking-tighter uppercase italic">RepairFlow</span>
                      </div>
                      <div className="text-sm font-bold text-slate-500 space-y-1">
                        <p>123 Avenue de la Réparation</p>
                        <p>75001 Paris, France</p>
                        <p>SIRET: 123 456 789 00012</p>
                        <p>Tél: 01 23 45 67 89</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <h2 className="text-6xl font-black text-slate-900 mb-4">{activeView.toUpperCase()}</h2>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Référence document</p>
                        <p className="text-2xl font-black text-slate-900">
                          {activeView === 'devis' ? 'D' : 'F'}-{new Date().getFullYear()}-{selectedRepair.id.slice(-6).toUpperCase()}
                        </p>
                        <p className="text-sm font-bold text-slate-500">{formatDate(new Date())}</p>
                      </div>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="grid grid-cols-2 gap-12 mb-16 bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                    <div>
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Client</h3>
                      <p className="text-2xl font-black text-slate-900 mb-1">{selectedRepair.client.name}</p>
                      <p className="font-bold text-slate-500">{selectedRepair.client.phone}</p>
                    </div>
                    <div className="text-right flex flex-col justify-end">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Dossier Atelier</p>
                      <p className="font-black text-slate-900 underline decoration-blue-500 decoration-2 underline-offset-4 italic">
                        #{selectedRepair.id.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Lines Table */}
                  <div className="flex-1">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-4 border-slate-950 text-left">
                          <th className="py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description des prestations</th>
                          <th className="py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-24">Quantité</th>
                          <th className="py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right w-32">Prix Unit. HT</th>
                          <th className="py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right w-32">Total HT</th>
                          <th className="py-6 w-10 print:hidden"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {draftLines.map((line, idx) => (
                          <tr key={line.id} className="group">
                            <td className="py-6 pr-4">
                              <input 
                                type="text"
                                className="w-full bg-transparent font-black text-slate-900 border-none p-0 focus:ring-0 placeholder:text-slate-200"
                                value={line.name}
                                onChange={(e) => updateLine(idx, 'name', e.target.value)}
                                placeholder="Nom de la prestation..."
                              />
                              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Intervention technique certifiée</p>
                            </td>
                            <td className="py-6 px-2 text-center">
                              <input 
                                type="number"
                                className="w-full bg-transparent text-center font-bold text-slate-900 border-none p-0 focus:ring-0"
                                value={line.quantity}
                                onChange={(e) => updateLine(idx, 'quantity', parseInt(e.target.value) || 0)}
                              />
                            </td>
                            <td className="py-6 px-2 text-right">
                              <input 
                                type="number"
                                className="w-full bg-transparent text-right font-bold text-slate-900 border-none p-0 focus:ring-0"
                                value={(line.price / 1.2).toFixed(2)}
                                onChange={(e) => updateLine(idx, 'price', parseFloat(e.target.value) * 1.2 || 0)}
                              />
                            </td>
                            <td className="py-6 pl-4 text-right font-black text-slate-900 text-lg">
                              {((line.price * line.quantity) / 1.2).toFixed(2)} €
                            </td>
                            <td className="py-6 text-right print:hidden">
                              <button 
                                onClick={() => removeLine(idx)}
                                className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
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
                      className="mt-6 flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:bg-blue-50 px-4 py-2 rounded-xl transition-all print:hidden"
                    >
                      <Plus className="w-4 h-4" />
                      Ajouter une ligne
                    </button>
                  </div>

                  {/* Summary */}
                  <div className="mt-16 flex justify-end border-t-2 border-slate-100 pt-12">
                    <div className="w-80 space-y-4">
                      <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                        <span className="uppercase tracking-widest">Total HT</span>
                        <span className="text-slate-950">{formatCurrency(totals.totalHT)}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-bold text-slate-400">
                        <span className="uppercase tracking-widest">TVA (20%)</span>
                        <span className="text-slate-950">{formatCurrency(totals.tva)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-6 border-t-4 border-slate-950">
                        <span className="text-xl font-black uppercase tracking-tighter italic">Total TTC</span>
                        <span className="text-4xl font-black text-slate-950 tracking-tighter">{formatCurrency(totals.totalTTC)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-16 grid grid-cols-2 gap-12 border-t border-slate-100">
                    <div className="text-[9px] font-bold text-slate-400 leading-relaxed space-y-2 uppercase tracking-wider">
                      <p>Conditions de règlement : Paiement comptant à réception.</p>
                      <p>Garantie : 6 mois sur les pièces et la main d'œuvre hors casse et oxydation.</p>
                      <p>Devis valable 30 jours à compter de la date d'émission.</p>
                    </div>
                    <div className="text-[8px] font-black text-slate-300 text-right uppercase tracking-[0.2em] self-end">
                      RepairFlow v1.0 • Logiciel certifié gestion atelier électronique
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Optional Notes Section (Non-Printable or Separate Page if needed) */}
              <div className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] print:hidden">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 block">Notes complémentaires (Apparaissent sur le document)</label>
                <textarea 
                  className="w-full bg-slate-50 border-none rounded-2xl p-6 text-sm font-medium focus:ring-2 focus:ring-blue-500 transition-all min-h-[120px]"
                  value={draftNotes}
                  onChange={(e) => setDraftNotes(e.target.value)}
                  placeholder="Informations spécifiques sur la panne, délai estimé..."
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center max-w-sm mt-20">
              <div className="w-24 h-24 bg-white/60 backdrop-blur-md rounded-[2.5rem] shadow-xl flex items-center justify-center mb-8 ring-1 ring-white/60">
                <FileText className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-4">Prêt à facturer ?</h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                Sélectionnez un ticket dans la liste de gauche pour générer instantanément un devis ou une facture au format A4.
              </p>
            </div>
          )}
        </main>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background: white !important;
          }
          header, aside, .print\\:hidden {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
            display: block !important;
            overflow: visible !important;
            background: white !important;
          }
          #printable-a4 {
            box-shadow: none !important;
            border: none !important;
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 auto !important;
          }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
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
