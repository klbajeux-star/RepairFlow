'use client'

import { ShoppingCart, CheckCircle2, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface OrderAlertProps {
  missingCount: number
  onAction: () => void
}

export function OrderAlert({ missingCount, onAction }: OrderAlertProps) {
  const hasOrders = missingCount > 0

  if (!hasOrders) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-50/50 border border-slate-100 rounded-full">
        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Logistique à jour</span>
      </div>
    )
  }

  return (
    <div className="group relative flex items-center justify-between gap-6 px-6 py-4 bg-amber-50/40 backdrop-blur-md border border-amber-200/50 rounded-[2rem] shadow-sm hover:shadow-md hover:border-amber-300/50 transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
          <ShoppingCart className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-900 leading-tight">
            {missingCount} pièces à commander pour demain
          </h4>
          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-0.5">
            Cut-off fournisseur • Action requise avant 18h
          </p>
        </div>
      </div>
      
      <button 
        onClick={onAction}
        className="flex items-center gap-2 bg-slate-950 hover:bg-black text-white px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all hover:gap-3 active:scale-95 shadow-xl shadow-slate-950/20"
      >
        Générer la liste
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
