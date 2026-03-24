import AddCategoryPage from '@/features/admin/categories/add'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/categories/add/')({
  component: AddCategoryPage,
})

