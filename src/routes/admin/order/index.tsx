import order from '@/features/admin/order'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/order/')({
  component: order,
})

