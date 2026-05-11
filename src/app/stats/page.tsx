'use client'

import { useEffect, useState } from 'react'
import {
  TrendingUp,
  DollarSign,
  Wrench,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  Package,
  Calendar,
  ArrowUpRight,
  BarChart,
  Percent,
} from 'lucide-react'

interface StatsData {
  summary: {
    totalRepairs: number
    totalInvoices: number
    totalClients: number
    totalRevenue: number
    totalCost: number
    totalMargin: number
    marginPercent: number
  }
  activityStats: Array<{ label: string; revenue: number; count: number }>
  isMonthlyView: boolean
  statusDistribution: Array<{ status: string; count: number }>
  typeDistribution: Array<{ name: string; count: number }>
  topServices: Array<{ name: string; count: number }>
  topClients: Array<{ name: string; count: number }>
}

interface AccountingData {
  summary: {
    invoiceCount: number
    draftCount: number
    draftValue: number
    totalRevenueHT: number
    totalRevenueTTC: number
    totalVAT: number
  }
  vatDistribution: Array<{ rate: number; baseHT: number; vatAmount: number }>
  paymentDistribution: Array<{ method: string; total: number }>
}

const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
]

export default function StatsPage() {
  const [data, setData] = useState<StatsData | null>(null)
  const [accountingData, setAccountingData] = useState<AccountingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState<number | 'all'>('all')
  const [activeTab, setActiveTab] = useState<'activity' | 'accounting'>('activity')

  useEffect(() => {
    async function fetchStats() {
      setLoading(true)
      try {
        const query = `year=${year}${month !== 'all' ? `&month=${month}` : ''}`
        const [statsRes, accountingRes] = await Promise.all([
          fetch(`/api/stats?${query}`),
          fetch(`/api/stats/accounting?${query}`)
        ])
        
        const [statsJson, accountingJson] = await Promise.all([
          statsRes.json(),
          accountingRes.json()
        ])
        
        setData(statsJson)
        setAccountingData(accountingJson)
      } catch (err) {
        console.error('Failed to fetch stats:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [year, month])

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(val)
  }

  const handleExportCompta = () => {
    const query = `year=${year}${month !== 'all' ? `&month=${month}` : ''}`
    window.open(`/api/stats/accounting/export?${query}`, '_blank')
  }

  if (loading || !data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm font-bold text-slate-500">Calcul des indicateurs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Filters Header */}
      <div className="flex flex-col gap-6 rounded-[2.5rem] border border-white/60 bg-white/40 p-6 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vue</p>
            <div className="flex items-center gap-1 rounded-2xl bg-white/60 p-1 shadow-sm ring-1 ring-white/60 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab('activity')}
                className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === 'activity'
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Activité
              </button>
              <button
                onClick={() => setActiveTab('accounting')}
                className={`rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === 'accounting'
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Comptabilité
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Année</p>
            <div className="flex items-center gap-2 rounded-2xl bg-white/60 p-1 shadow-sm ring-1 ring-white/60 backdrop-blur-sm">
              <button onClick={() => setYear(year - 1)} className="rounded-xl p-2 transition hover:bg-slate-50 text-slate-400 hover:text-slate-900">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="min-w-[60px] text-center text-sm font-black text-slate-950">{year}</span>
              <button onClick={() => setYear(year + 1)} className="rounded-xl p-2 transition hover:bg-slate-50 text-slate-400 hover:text-slate-900">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mois</p>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="h-[46px] rounded-2xl border-none bg-white/60 px-4 text-sm font-black text-slate-950 shadow-sm ring-1 ring-white/60 backdrop-blur-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous les mois</option>
              {MONTHS.map((name, i) => (
                <option key={i} value={i}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {activeTab === 'accounting' && (
            <button
              onClick={handleExportCompta}
              className="flex h-[46px] items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100"
            >
              <ArrowUpRight className="h-4 w-4" />
              Export Excel
            </button>
          )}
          <button 
            onClick={() => {
              setYear(new Date().getFullYear())
              setMonth(new Date().getMonth())
            }}
            className="flex h-[46px] items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <Calendar className="h-4 w-4" />
            Aujourd'hui
          </button>
        </div>
      </div>

      {activeTab === 'activity' ? (
        <ActivityView data={data} formatCurrency={formatCurrency} year={year} month={month} />
      ) : (
        <AccountingView data={accountingData!} formatCurrency={formatCurrency} />
      )}
    </div>
  )
}

function ActivityView({ data, formatCurrency, year, month }: { data: StatsData, formatCurrency: (v: number) => string, year: number, month: number | 'all' }) {
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Interventions"
          value={data.summary.totalRepairs}
          subtitle={month === 'all' ? `Total sur l'année ${year}` : `Total en ${MONTHS[month]}`}
          icon={<Wrench className="h-5 w-5" />}
          color="blue"
        />
        <MetricCard
          title="Factures émises"
          value={data.summary.totalInvoices}
          subtitle="Tickets clôturés"
          icon={<FileText className="h-5 w-5" />}
          color="emerald"
        />
        <MetricCard
          title="Clients actifs"
          value={data.topClients.length}
          subtitle="Sur cette période"
          icon={<Users className="h-5 w-5" />}
          color="indigo"
        />
        <MetricCard
          title="Chiffre d'affaires"
          value={formatCurrency(data.summary.totalRevenue)}
          subtitle="Ventes HT"
          icon={<DollarSign className="h-5 w-5" />}
          color="slate"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="h-full rounded-[2.5rem] border border-white/70 bg-white/60 p-8 shadow-xl backdrop-blur-md">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-black tracking-tight text-slate-950">Rentabilité</h2>
              <div className="rounded-2xl bg-emerald-50 p-2.5 text-emerald-600">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Chiffre d'affaires</p>
                <p className="text-3xl font-black text-slate-950">{formatCurrency(data.summary.totalRevenue)}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Coût des pièces</p>
                <p className="text-xl font-bold text-rose-600">-{formatCurrency(data.summary.totalCost)}</p>
              </div>
              <div className="pt-4">
                <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">Marge brute</p>
                      <p className="text-2xl font-black tracking-tight text-emerald-400">
                        {formatCurrency(data.summary.totalMargin)}
                      </p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-xl font-black text-white ring-1 ring-white/20">
                      {Math.round(data.summary.marginPercent)}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center pt-8">
                <div className="relative h-40 w-40">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="12"
                      strokeDasharray={`${data.summary.marginPercent * 2.51} 251`}
                      strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 50 50)" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Marge</p>
                    <p className="text-2xl font-black text-slate-950">{Math.round(data.summary.marginPercent)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="h-full rounded-[2.5rem] border border-white/70 bg-white/60 p-8 shadow-xl backdrop-blur-md">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-950">Activité {month === 'all' ? year : MONTHS[month]}</h2>
                <p className="text-sm font-medium text-slate-500">Volume d'interventions {month === 'all' ? 'par mois' : 'par jour'}</p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-2.5 text-blue-600">
                <BarChart className="h-5 w-5" />
              </div>
            </div>
            <div className="flex h-[300px] items-end justify-between gap-1 pt-8 overflow-x-auto">
              {data.activityStats.map((stat, i) => {
                const maxCount = Math.max(...data.activityStats.map(s => s.count), 1)
                const height = (stat.count / maxCount) * 100
                const MONTHS_SHORT = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
                const label = data.isMonthlyView ? stat.label : MONTHS_SHORT[parseInt(stat.label)]
                return (
                  <div key={i} className="group relative flex flex-1 flex-col items-center gap-4 min-w-[20px]">
                    <div className="relative w-full">
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 rounded-xl bg-slate-900 px-3 py-1.5 text-[10px] font-bold text-white transition-all group-hover:scale-100 whitespace-nowrap z-10">
                        {data.isMonthlyView ? `Jour ${stat.label}` : MONTHS[parseInt(stat.label)]}<br />
                        {stat.count} tickets<br />
                        {formatCurrency(stat.revenue)}
                      </div>
                      <div className="w-full rounded-full bg-blue-100 transition-all group-hover:bg-blue-600"
                        style={{ height: `${height}%`, minHeight: stat.count > 0 ? '4px' : '0px' }} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-[2.5rem] border border-white/70 bg-white/60 p-8 shadow-xl backdrop-blur-md">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tight text-slate-950">Top 5 Services</h2>
            <div className="rounded-2xl bg-amber-50 p-2.5 text-amber-600">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-4">
            {data.topServices.length > 0 ? data.topServices.map((service, i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl bg-white/60 p-4 ring-1 ring-white/60 backdrop-blur-sm transition-all hover:bg-white/80">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 font-black text-slate-400">{i + 1}</div>
                  <p className="font-bold text-slate-900">{service.name}</p>
                </div>
                <div className="rounded-full bg-blue-50 px-4 py-1.5 text-xs font-black text-blue-600">{service.count} ventes</div>
              </div>
            )) : <p className="text-center text-sm font-bold text-slate-400 py-12">Aucune donnée sur cette période</p>}
          </div>
        </div>
        <div className="rounded-[2.5rem] border border-white/70 bg-white/60 p-8 shadow-xl backdrop-blur-md">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tight text-slate-950">Top 5 Clients</h2>
            <div className="rounded-2xl bg-indigo-50 p-2.5 text-indigo-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="space-y-4">
            {data.topClients.length > 0 ? data.topClients.map((client, i) => (
              <div key={i} className="flex items-center justify-between rounded-2xl bg-white/60 p-4 ring-1 ring-white/60 backdrop-blur-sm transition-all hover:bg-white/80">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 font-black text-indigo-400">{i + 1}</div>
                  <p className="font-bold text-slate-900">{client.name}</p>
                </div>
                <div className="rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-black text-indigo-600">{client.count} tickets</div>
              </div>
            )) : <p className="text-center text-sm font-bold text-slate-400 py-12">Aucun client sur cette période</p>}
          </div>
        </div>
      </div>
    </>
  )
}

function AccountingView({ data, formatCurrency }: { data: AccountingData, formatCurrency: (v: number) => string }) {
  if (!data) return null;
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {data.summary.draftCount > 0 && (
        <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shadow-sm">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-black text-amber-900">{data.summary.draftCount} facture{data.summary.draftCount > 1 ? 's' : ''} en brouillon ({formatCurrency(data.summary.draftValue)} TTC)</p>
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Non incluses dans les statistiques réelles</p>
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 hidden sm:block">Action requise : Émettre les factures</p>
          </div>
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Factures Émises" value={data.summary.invoiceCount} subtitle="Documents certifiés" icon={<FileText className="h-5 w-5" />} color="blue" />
        <MetricCard title="Total HT" value={formatCurrency(data.summary.totalRevenueHT)} subtitle="Base taxable" icon={<DollarSign className="h-5 w-5" />} color="slate" />
        <MetricCard title="TVA Collectée" value={formatCurrency(data.summary.totalVAT)} subtitle="À déclarer" icon={<Percent className="h-5 w-5" />} color="amber" />
        <MetricCard title="Total TTC" value={formatCurrency(data.summary.totalRevenueTTC)} subtitle="Volume financier" icon={<DollarSign className="h-5 w-5" />} color="emerald" />
      </div>
      <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
        <div className="lg:col-span-2">
          <div className="rounded-[2.5rem] border border-white/70 bg-white/60 p-8 shadow-xl backdrop-blur-md">
            <h2 className="mb-6 text-xl font-black tracking-tight text-slate-950">Ventilation de la TVA</h2>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/50 ring-1 ring-white/60">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Taux</th>
                    <th className="px-6 py-4">Base HT</th>
                    <th className="px-6 py-4 text-right">Montant TVA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-bold text-slate-700">
                  {data.vatDistribution.map((vat, i) => (
                    <tr key={i} className="transition hover:bg-white/80">
                      <td className="px-6 py-4">
                        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-black text-slate-600">{vat.rate}%</span>
                        {vat.rate === 0 && <span className="ml-2 text-[10px] text-slate-400">(Art. 293B)</span>}
                      </td>
                      <td className="px-6 py-4">{formatCurrency(vat.baseHT)}</td>
                      <td className="px-6 py-4 text-right text-emerald-600">{formatCurrency(vat.vatAmount)}</td>
                    </tr>
                  ))}
                  {data.vatDistribution.length === 0 && (
                    <tr><td colSpan={3} className="px-6 py-12 text-center text-slate-400">Aucune facture émise sur cette période</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="rounded-[2.5rem] border border-white/70 bg-white/60 p-8 shadow-xl backdrop-blur-md">
            <h2 className="mb-6 text-xl font-black tracking-tight text-slate-950">Paiements</h2>
            <div className="space-y-3">
              {data.paymentDistribution.map((pay, i) => (
                <div key={i} className="flex items-center justify-between rounded-2xl bg-white/60 p-4 ring-1 ring-white/60 backdrop-blur-sm transition-all hover:bg-white/80">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{pay.method}</p>
                    <p className="text-lg font-black text-slate-900">{formatCurrency(pay.total)}</p>
                  </div>
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-400"><DollarSign className="h-5 w-5" /></div>
                </div>
              ))}
              {data.paymentDistribution.length === 0 && <p className="py-12 text-center text-sm font-bold text-slate-400">Aucun encaissement</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, subtitle, icon, color }: { title: string, value: string | number, subtitle: string, icon: React.ReactNode, color: 'blue' | 'emerald' | 'indigo' | 'slate' | 'amber' }) {
  const colorClasses = { blue: 'bg-blue-50 text-blue-600', emerald: 'bg-emerald-50 text-emerald-600', indigo: 'bg-indigo-50 text-indigo-600', slate: 'bg-slate-100 text-slate-900', amber: 'bg-amber-50 text-amber-600' }
  return (
    <div className="rounded-[2.5rem] border border-white/60 bg-white/40 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all hover:bg-white/50">
      <div className={`inline-flex rounded-2xl p-3 ${colorClasses[color]}`}>{icon}</div>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">{value}</p>
      <p className="mt-2 text-sm font-medium text-slate-500">{subtitle}</p>
    </div>
  )
}
