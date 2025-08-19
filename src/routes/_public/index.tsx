import { createFileRoute } from '@tanstack/react-router'
import Home from '@/features/public/home'

export const Route = createFileRoute('/_public/')({
  component: Home,
})
