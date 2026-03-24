import { createFileRoute } from '@tanstack/react-router'
import categories from '@/features/admin/categories'

export const Route = createFileRoute('/admin/categories/')({
  component: categories,
})

