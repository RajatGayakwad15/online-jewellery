import { createFileRoute } from '@tanstack/react-router'
import BrandGuidelines from '@/features/public/brand-guidelines'

export const Route = createFileRoute('/_public/brand-guidelines/')({
  component: BrandGuidelines,
})
