import AddProduct from '@/features/admin/products/add'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/products/add/')({
  component: AddProduct,
})