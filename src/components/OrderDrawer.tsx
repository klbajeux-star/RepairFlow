'use client'

import { useState, useEffect } from 'react'
import { 
  ShoppingCart, 
  Truck, 
  Package, 
  Loader2, 
  CheckCircle2, 
  ChevronRight, 
  Clock,
  ExternalLink,
  AlertTriangle
} from 'lucide-react'
import { SideDrawer } from '@/components/side-drawer'
import { formatCurrency, formatDate } from '@/lib/repair'

interface OrderItem {
  id: string
  name: string
  sku: string | null
  supplier: string
  supplierRef: string | null
  quantity: number
  tickets: Array<{
    id: string
    client: string
    createdAt: string
  }>
}

interface OrderDrawerProps {
  isOpen: boolean
  onClose: () => void
  onOrderConfirmed: () => void
}

export default function OrderDrawer({ isOpen, onClose, onOrderConfirmed }: OrderDrawerProps) {
  const [items, setItems] = useState<OrderItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadOrderList()
    }
  }, [isOpen])

  async function loadOrderList() {
    setIsLoading(true)
    try {
      const response = await fetch('/api/orders/cut-off')
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error('Failed to load order list', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleConfirm() {
    const repairIds = Array.from(new Set(items.flatMap(item => item.tickets.map(t => t.id))))
    if (repairIds.length === 0) return

    setIsConfirming(true)
    try {
      const response = await fetch('/api/orders/cut-off', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repairIds })
      })
      if (response.ok) {
        onOrderConfirmed()
        onClose()
      }
    } catch (error) {
      console.error('Failed to confirm order', error)
    } finally {
      setIsConfirming(false)
    }
  }

  return (
    <SideDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Logistique J+1"
      subtitle="Commandes fournisseurs du jour"
    >
      <div className="flex flex-col h-full bg-slate-50/50">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p className="text-sm font-medium">Analyse des besoins...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-10">
            <div className="h-16 w-16 bg-emerald-100/50 text-emerald-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h4 className="text-lg font-black text-slate-900">Inventaire complet</h4>
            <p className="text-sm text-slate-500 mt-2">
              Toutes les pièces pour vos tickets actifs sont déjà réservées en stock.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-5 shadow-sm">
              <div className="flex items-center gap-3 text-amber-600 mb-2">
                <AlertTriangle className="h-5 w-5" />
                <p className="text-sm font-black">Action requise avant 18h</p>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Il y a <strong>{items.length} références</strong> à commander pour honorer <strong>{Array.from(new Set(items.flatMap(i => i.tickets.map(t => t.id)))).length} interventions</strong> dès demain.
              </p>
            </div>

            <div className="space-y-4 pb-20">
              {items.map((item) => (
                <div key={item.id} className="group bg-white border border-slate-200 rounded-[2rem] p-5 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h5 className="font-black text-slate-900 text-lg leading-tight">{item.name}</h5>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">SKU: {item.sku || 'N/A'}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">{item.supplier}</span>
                      </div>
                    </div>
                    <div className="bg-slate-950 h-12 w-12 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg shadow-slate-950/20">
                      {item.quantity}
                    </div>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-2">
                      {item.tickets.map(ticket => (
                        <div key={ticket.id} className="bg-slate-100 px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-700 flex items-center gap-2">
                          <span className="text-blue-600">#{ticket.id.slice(-4).toUpperCase()}</span>
                          <span className="truncate max-w-[100px]">{ticket.client}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-slate-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
            <button
              disabled={isConfirming}
              onClick={handleConfirm}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98]"
            >
              {isConfirming ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Passer les commandes fournisseur
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </SideDrawer>
  )
}
