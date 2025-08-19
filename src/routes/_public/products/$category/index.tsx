import ProductCategory from '@/features/public/products/product_category'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/products/$category/')({
  component: ProductCategory,
})

