import { createFileRoute } from '@tanstack/react-router'
import Contact from '@/features/public/contact'

export const Route = createFileRoute('/_public/contact/')({
  component: Contact,
})
