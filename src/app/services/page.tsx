import { CatalogWorkspace } from '@/components/catalog-workspace'
import { Suspense } from 'react'

export default function ServicesPage() {
  return (
    <Suspense fallback={null}>
      <CatalogWorkspace />
    </Suspense>
  )
}
