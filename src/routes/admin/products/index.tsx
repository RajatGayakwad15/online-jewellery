import { createFileRoute } from '@tanstack/react-router'
import products from '@/features/admin/products'

export const Route = createFileRoute('/admin/products/')({
  component: products,
})
