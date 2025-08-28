import ViewContact from '@/features/admin/contact/viewcontact'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/contact/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ViewContact />
}
