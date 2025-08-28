import Term from '@/features/public/term'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/terms/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Term />
}
