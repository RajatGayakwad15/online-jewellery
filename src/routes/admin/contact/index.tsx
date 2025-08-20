import contact from '@/features/admin/contact'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/contact/')({
  component: contact,
})


