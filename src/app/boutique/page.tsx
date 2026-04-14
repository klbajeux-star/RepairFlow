import { ShopWorkspace } from '@/components/shop-workspace'
import { Suspense } from 'react'

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopWorkspace />
    </Suspense>
  )
}
