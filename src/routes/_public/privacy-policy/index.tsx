import Privacy from '@/features/public/privacy-policy'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/privacy-policy/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Privacy />
}
