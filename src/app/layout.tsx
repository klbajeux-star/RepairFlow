import './globals.css'
import type { Metadata } from 'next'
import { AppShell } from '@/components/app-shell'
import { NextAuthProvider } from '@/components/session-provider'

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
        <NextAuthProvider>
          <AppShell>
            {children}
          </AppShell>
        </NextAuthProvider>
      </body>
    </html>
  )
}
