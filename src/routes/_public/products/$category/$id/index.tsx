import { createFileRoute } from '@tanstack/react-router'
import ProductView from '@/features/public/products/product_category/product_view'

export const Route = createFileRoute('/_public/products/$category/$id/')({
  component: ProductView,
})
