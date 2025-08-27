
import BuyNow from '@/features/public/products/product_category/product_view/BuyNowModal'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/products/$category/$id/order/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BuyNow isCart={false} />
}
