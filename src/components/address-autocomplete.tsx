'use client'

import { MapPin, Search } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface AddressSuggestion {
  label: string
  name: string
  postcode: string
  city: string
  context: string
  id: string
}

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onSelect: (address: { street: string; zipCode: string; city: string }) => void
  placeholder?: string
  className?: string
}

export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "Saisissez une adresse...",
  className = ""
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (value.length > 3 && showSuggestions) {
        setIsLoading(true)
        try {
          const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(value)}&limit=5`)
          const data = await response.json()
          if (data.features) {
            setSuggestions(data.features.map((f: any) => ({
              label: f.properties.label,
              name: f.properties.name,
              postcode: f.properties.postcode,
              city: f.properties.city,
              context: f.properties.context,
              id: f.properties.id
            })))
          }
        } catch (err) {
          console.error('Error fetching address:', err)
        } finally {
          setIsLoading(false)
        }
      } else {
        setSuggestions([])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [value, showSuggestions])

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <div className="relative">
        <input
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-300 focus:bg-white"
          placeholder={placeholder}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search className={`h-4 w-4 ${isLoading ? 'animate-spin text-emerald-500' : 'text-slate-400'}`} />
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-3xl border border-white bg-white/80 p-2 shadow-[0_16px_32px_-8px_rgba(0,0,0,0.12)] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              type="button"
              onClick={() => {
                onSelect({
                  street: suggestion.name,
                  zipCode: suggestion.postcode,
                  city: suggestion.city
                })
                setShowSuggestions(false)
              }}
              className="flex w-full items-start gap-3 rounded-2xl p-3 text-left transition hover:bg-emerald-50 group"
            >
              <div className="mt-0.5 rounded-lg bg-emerald-100 p-1.5 text-emerald-600 transition group-hover:bg-white group-hover:shadow-sm">
                <MapPin className="h-3.5 w-3.5" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-slate-900 leading-tight">
                  {suggestion.label}
                </div>
                <div className="text-[11px] font-medium text-slate-400 mt-0.5">
                  {suggestion.context}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
