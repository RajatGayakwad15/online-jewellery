import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/products/update/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/products/update/"!</div>
}
