import UpdateProduct from '@/features/admin/products/update/$id'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/products/update/$id/')({
  component: UpdateProduct,
})


