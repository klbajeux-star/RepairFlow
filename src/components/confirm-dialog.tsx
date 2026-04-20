'use client'

import { AlertCircle, CheckCircle2, X, HelpCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export type ConfirmDialogType = 'danger' | 'warning' | 'info' | 'success'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  type?: ConfirmDialogType
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirmer',
  cancelLabel = 'Annuler',
  type = 'warning'
}: ConfirmDialogProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      document.body.style.overflow = 'hidden'
    } else {
      const timer = setTimeout(() => setMounted(false), 300)
      document.body.style.overflow = 'unset'
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!mounted && !isOpen) return null

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <AlertCircle className="w-8 h-8 text-rose-500" />
      case 'success':
        return <CheckCircle2 className="w-8 h-8 text-emerald-500" />
      case 'info':
        return <HelpCircle className="w-8 h-8 text-blue-500" />
      default:
        return <AlertCircle className="w-8 h-8 text-amber-500" />
    }
  }

  const getConfirmButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
      case 'success':
        return 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
      case 'info':
        return 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
      default:
        return 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Dialog Panel */}
      <div
        className={`relative w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-white p-8 transition-all duration-300 ease-out ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div className={`p-4 rounded-3xl mb-6 ${
            type === 'danger' ? 'bg-rose-50' : 
            type === 'success' ? 'bg-emerald-50' :
            type === 'info' ? 'bg-blue-50' : 'bg-amber-50'
          }`}>
            {getIcon()}
          </div>
          
          <h3 className="text-2xl font-black tracking-tight text-slate-950 mb-3">
            {title}
          </h3>
          
          <p className="text-slate-500 font-medium leading-relaxed mb-8">
            {message}
          </p>

          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              onClick={onClose}
              className="h-14 rounded-2xl bg-slate-100 text-slate-600 font-black text-sm transition-all hover:bg-slate-200 active:scale-95"
            >
              {cancelLabel}
            </button>
            <button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className={`h-14 rounded-2xl text-white font-black text-sm shadow-xl transition-all active:scale-95 ${getConfirmButtonClass()}`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>

        {/* Close button (top right) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-950 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
