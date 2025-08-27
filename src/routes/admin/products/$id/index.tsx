import ViewProducts from '@/features/admin/products/view'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/products/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ViewProducts />
}
 