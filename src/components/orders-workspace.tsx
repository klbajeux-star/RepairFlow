'use client'

import { useState, useEffect } from 'react'
import { 
  Package, 
  ShoppingCart, 
  Truck, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  AlertCircle,
  Calendar,
  User,
  ExternalLink,
  ChevronLeft,
  RefreshCw,
  Loader2
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/repair'

interface Order {
  id: string
  number: string
  status: string
  supplier: string | null
  totalHT: number
  createdAt: string
  lines?: OrderLine[]
  _count?: {
    lines: number
  }
}

interface OrderLine {
  id: string
  partId: string
  quantityOrdered: number
  quantityReceived: number
  costPrice: number
  status: string
  repairId?: string | null
  part: {
    name: string
    sku: string
  }
  repair?: {
    id: string
    client: {
      name: string
    }
  } | null
}

export function OrdersWorkspace() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<string | null>(null)

  useEffect(() => {
    loadOrders()
  }, [])

  useEffect(() => {
    if (selectedOrderId) {
      loadOrderDetail(selectedOrderId)
    } else {
      setSelectedOrder(null)
      setError(null)
    }
  }, [selectedOrderId])

  async function loadOrders() {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/orders')
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
      } else {
        setError('Impossible de charger la liste des commandes.')
      }
    } catch (error) {
      console.error('Failed to load orders', error)
      setError('Erreur réseau lors du chargement des commandes.')
    } finally {
      setIsLoading(false)
    }
  }

  async function loadOrderDetail(id: string) {
    setIsRefreshing(true)
    setError(null)
    try {
      const res = await fetch(`/api/orders/${id}`)
      const data = await res.json()
      
      if (res.ok) {
        setSelectedOrder(data)
      } else {
        setError(data.message || 'Impossible de récupérer les détails de cette commande.')
        setSelectedOrderDetails(data.details || null)
      }
    } catch (error: any) {
      console.error('Failed to load order detail', error)
      setError('Erreur réseau lors de la récupération des détails.')
      setSelectedOrderDetails(error.message)
    } finally {
      setIsRefreshing(false)
    }
  }

  async function receiveLine(lineId: string, qty: number) {
    if (!selectedOrder) return
    try {
      const res = await fetch(`/api/orders/${selectedOrder.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'RECEIVE_LINE',
          lineId,
          quantityReceived: qty
        })
      })
      if (res.ok) {
        loadOrderDetail(selectedOrder.id)
        loadOrders()
      }
    } catch (error) {
      console.error('Failed to receive line', error)
    }
  }

  function getStatusStyle(status: string) {
    switch (status) {
      case 'COMMANDÉE': return 'bg-blue-50 text-blue-600 ring-blue-100'
      case 'PARTIELLEMENT_REÇUE': return 'bg-amber-50 text-amber-600 ring-amber-100'
      case 'RÉCEPTIONNÉE': return 'bg-emerald-50 text-emerald-600 ring-emerald-100'
      case 'ANNULÉE': return 'bg-rose-50 text-rose-600 ring-rose-100'
      default: return 'bg-slate-50 text-slate-600 ring-slate-100'
    }
  }

  if (selectedOrderId && !selectedOrder) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-slate-400">
        {error ? (
          <>
            <div className="h-16 w-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6 border border-rose-100">
              <AlertCircle className="h-8 w-8" />
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-rose-600 mb-2">{error}</p>
            {selectedOrderDetails && (
              <p className="text-[10px] font-mono text-rose-400 mb-4 bg-rose-50 p-2 rounded max-w-md text-center">
                {selectedOrderDetails}
              </p>
            )}
            <button 
              onClick={() => setSelectedOrderId(null)}
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-black text-white transition hover:scale-105"
            >
              <ChevronLeft className="h-4 w-4" />
              RETOUR À LA LISTE
            </button>
          </>
        ) : (
          <>
            <Loader2 className="h-10 w-10 animate-spin mb-4" />
            <p className="text-sm font-bold uppercase tracking-widest">Récupération des détails...</p>
          </>
        )}
      </div>
    )
  }

  if (selectedOrder) {
    return (
      <div className="flex flex-1 flex-col gap-8 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedOrderId(null)}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 shadow-sm transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-black tracking-tight text-slate-950">Commande {selectedOrder.number}</h2>
                <span className={`rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-widest ring-1 ring-inset ${getStatusStyle(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-500">
                {selectedOrder.supplier} • Créée le {formatDate(selectedOrder.createdAt)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="text-right mr-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Estimé</p>
                <p className="text-xl font-black text-slate-950">{formatCurrency(selectedOrder.totalHT)} <span className="text-xs font-bold text-slate-400">HT</span></p>
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {selectedOrder.lines?.map((line) => {
            const isFullyReceived = line.quantityReceived >= line.quantityOrdered
            return (
              <div key={line.id} className={`group relative rounded-[2rem] border p-6 transition-all duration-300 ${isFullyReceived ? 'bg-slate-50/50 border-slate-100' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}`}>
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-5 min-w-0 flex-1">
                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 ${isFullyReceived ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                      {isFullyReceived ? <CheckCircle2 className="h-7 w-7" /> : <Package className="h-7 w-7" />}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-black text-slate-950 text-lg leading-tight truncate">{line.part.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">SKU: {line.part.sku}</span>
                        {line.repair && (
                          <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-lg">
                            <User className="h-3 w-3 text-blue-500" />
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">
                              #{line.repair.id.slice(-4).toUpperCase()} • {line.repair.client.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Quantité</p>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-slate-950">{line.quantityReceived}</span>
                        <span className="text-sm font-bold text-slate-300">/</span>
                        <span className="text-lg font-black text-slate-400">{line.quantityOrdered}</span>
                      </div>
                    </div>

                    {!isFullyReceived && selectedOrder.status !== 'ANNULÉE' && (
                      <button 
                        onClick={() => receiveLine(line.id, line.quantityOrdered - line.quantityReceived)}
                        className="h-12 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-2"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Réceptionner
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-8 overflow-hidden animate-in fade-in duration-300">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-950">Commandes Fournisseurs</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">Suivi des approvisionnements et réceptions de pièces</p>
        </div>
        <button 
          onClick={loadOrders}
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 shadow-sm transition-all"
        >
          <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </header>

      {isLoading ? (
        <div className="flex flex-1 flex-col items-center justify-center text-slate-400">
          <Loader2 className="h-10 w-10 animate-spin mb-4" />
          <p className="text-sm font-bold uppercase tracking-widest">Chargement des commandes...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center px-10">
          <div className="h-24 w-24 bg-slate-50 text-slate-300 rounded-[2.5rem] flex items-center justify-center mb-8 border border-dashed border-slate-200">
            <ShoppingCart className="h-10 w-10" />
          </div>
          <h3 className="text-xl font-black text-slate-900">Aucune commande</h3>
          <p className="mt-2 text-slate-500 max-w-sm text-sm">
            Vos commandes fournisseurs apparaîtront ici dès que vous validerez vos besoins en flux tendu.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-1 gap-4">
            {orders.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrderId(order.id)}
                className="group relative flex items-center justify-between gap-6 rounded-[2rem] border border-white/60 bg-white/70 p-6 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white/90 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-6 min-w-0">
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${getStatusStyle(order.status)}`}>
                    <Truck className="h-7 w-7" />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-black text-slate-950 tracking-tight">{order.number}</h4>
                      <span className={`rounded-xl px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest ring-1 ring-inset ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-sm font-bold text-slate-600 truncate">{order.supplier}</p>
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      <p className="text-xs font-medium text-slate-400">
                        {order._count?.lines || 0} références
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 text-right shrink-0">
                   <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date</p>
                      <p className="text-sm font-black text-slate-900">{formatDate(order.createdAt)}</p>
                   </div>
                   <div className="w-24">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Montant HT</p>
                      <p className="text-sm font-black text-slate-950">{formatCurrency(order.totalHT)}</p>
                   </div>
                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-300 group-hover:bg-slate-950 group-hover:text-white transition-all">
                      <ChevronRight className="h-5 w-5" />
                   </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
