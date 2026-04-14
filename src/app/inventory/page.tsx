import { CatalogWorkspace } from '@/components/catalog-workspace'
import { Suspense } from 'react'

export default function InventoryPage() {
  return (
    <Suspense fallback={null}>
      <CatalogWorkspace />
    </Suspense>
  )
}
