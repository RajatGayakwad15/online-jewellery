import UpdateOrder from '@/features/admin/order/updateorder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/order/update/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UpdateOrder />
}
