'use client'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SideDrawerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

export function SideDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
}: SideDrawerProps) {
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

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`relative flex h-full w-full max-w-lg flex-col border-l border-white/20 bg-white shadow-2xl transition-transform duration-300 ease-out sm:rounded-l-[2rem] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6">
          <div>
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-blue-600">
              {subtitle || 'Workflow rapide'}
            </p>
            <h3 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-400 transition hover:border-slate-200 hover:bg-white hover:text-slate-950"
          >
            <X className="h-5 w-5 transition group-hover:rotate-90" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-slate-100 bg-slate-50/50 p-6 backdrop-blur-md sm:rounded-bl-[2rem]">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
