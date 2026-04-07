import './globals.css'
import type { Metadata } from 'next'
import { AppShell } from '@/components/app-shell'

export const metadata: Metadata = {
  title: 'RepairFlow Atelier',
  description:
    'Logiciel de gestion pour atelier de réparation smartphone et carte électronique.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen antialiased" style={{ zoom: '0.93' }}>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  )
}
