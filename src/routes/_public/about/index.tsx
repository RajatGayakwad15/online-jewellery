import { createFileRoute } from '@tanstack/react-router'
import About from '@/features/public/about'

export const Route = createFileRoute('/_public/about/')({
  component: About,
})
