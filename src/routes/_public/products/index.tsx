import { createFileRoute } from '@tanstack/react-router'
import Products from '@/features/public/products'

export const Route = createFileRoute('/_public/products/')({
  component: Products,
})
