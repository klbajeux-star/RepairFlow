'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import {
  BarChart3,
  CalendarClock,
  FileText,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Wrench,
  Settings,
} from 'lucide-react'

const navItems = [
  { name: 'Tableau de bord', href: '/', icon: LayoutDashboard },
  { name: 'Réparations', href: '/repairs', icon: Wrench },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Catalogue', href: '/catalog', icon: Package },
  { name: 'Boutique', href: '/boutique', icon: ShoppingBag },
  { name: 'Facturation', href: '/billing', icon: FileText },
  { name: 'Stats', href: '/stats', icon: BarChart3 },
  { name: 'Paramètres', href: '/settings', icon: Settings },
]

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  '/': {
    title: 'Tableau de bord atelier',
    subtitle: 'Pilotez les tickets, les priorités et les actions du jour depuis un seul écran.',
  },
  '/stats': {
    title: 'Statistiques & Performance',
    subtitle: 'Analysez l’activité de votre atelier, suivez votre chiffre d’affaires et votre rentabilité.',
  },
  '/repairs': {
    title: 'Gestion des réparations',
    subtitle: 'Ouvrez, suivez et faites avancer les tickets atelier sans perdre le fil.',
  },
  '/catalog': {
    title: 'Catalogue atelier',
    subtitle: 'Gérez les pièces et les forfaits avec une lecture plus homogène et opérationnelle.',
  },
  '/boutique': {
    title: 'Gestion Boutique',
    subtitle: 'Suivez vos stocks de produits finis, accessoires et smartphones reconditionnés.',
  },
  '/inventory': {
    title: 'Catalogue atelier',
    subtitle: 'Vue stock et achats pour garder les pièces utiles sous contrôle.',
  },
  '/services': {
    title: 'Catalogue atelier',
    subtitle: 'Vue services pour structurer vos forfaits, vos prix et vos interventions.',
  },
  '/clients': {
    title: 'Base clients',
    subtitle: 'Retrouvez rapidement les coordonnées et l’historique de chaque dossier.',
  },
  '/billing': {
    title: 'Devis et facturation',
    subtitle: 'Préparez vos documents commerciaux à partir des dossiers atelier.',
  },
  '/settings': {
    title: 'Paramètres Atelier',
    subtitle: 'Configurez vos informations légales, coordonnées et préférences de facturation.',
  },
}

function isNavItemActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/'
  }

  if (href === '/catalog') {
    return pathname === '/catalog' || pathname === '/inventory' || pathname === '/services'
  }

  return pathname.startsWith(href)
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const currentPage = useMemo(() => {
    return pageMeta[pathname] ?? pageMeta['/']
  }, [pathname])

  const currentDate = useMemo(() => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date())
  }, [])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.11),_transparent_34%),linear-gradient(180deg,_#f8fbff_0%,_#eef4fb_100%)] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/40 backdrop-blur-md shadow-[0_4px_20px_rgb(0,0,0,0.02)] print:hidden">
        <div className="mx-auto flex w-full max-w-[1600px] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-fit items-center gap-3">
            <div className="rounded-2xl bg-blue-600 p-3 text-white shadow-lg shadow-blue-600/10">
              <Wrench className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-blue-600">
                Atelier
              </p>
              <p className="text-lg font-black tracking-tight text-slate-950">RepairFlow</p>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-2 lg:flex">
            {navItems.map((item) => {
              const isActive = isNavItemActive(pathname, item.href)
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto hidden items-center gap-3 xl:flex">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/40 px-4 py-2 ring-1 ring-white/60 backdrop-blur-sm">
              <div className="rounded-xl bg-white/60 p-2 text-slate-500 shadow-sm ring-1 ring-white/60">
                <CalendarClock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Aujourd’hui
                </p>
                <p className="text-sm font-semibold capitalize text-slate-700">{currentDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100/80 lg:hidden">
          <div className="mx-auto flex max-w-[1600px] gap-2 overflow-x-auto px-4 py-3 sm:px-6">
            {navItems.map((item) => {
              const isActive = isNavItemActive(pathname, item.href)
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-slate-950 text-white'
                      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-slate-950'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[1600px] flex-col px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-6 rounded-[2rem] border border-white/70 bg-white/40 px-5 py-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md border border-white/60 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.32em] text-blue-600">
                Vue courante
              </p>
              <h1 className="text-2xl font-black tracking-tight text-slate-950 sm:text-[2rem]">
                {currentPage.title}
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                {currentPage.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/"
                className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              >
                Vue atelier
              </Link>
              <Link
                href="/repairs"
                className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              >
                Tickets
              </Link>
              <Link
                href="/billing"
                className="inline-flex items-center rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-700"
              >
                Devis & factures
              </Link>
            </div>
          </div>
        </section>

        {children}
      </main>
    </div>
  )
}
