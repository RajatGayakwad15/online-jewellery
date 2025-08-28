import ViewOrder from '@/features/admin/order/vieworder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/order/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ViewOrder />
}
