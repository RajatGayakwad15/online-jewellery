'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  MapPinHouse,
  ShoppingCart,
  User,
  FileText,
  Trash2,
  LoaderCircle,
} from 'lucide-react'
import toast from 'react-hot-toast'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { apiClient } from '@/lib/apiClient'
import { Skeleton } from '@/components/ui/skeleton'

type OrderItem = {
  product_id: string
  name: string
  brand?: string
  quantity: number
  actual_price: number
  discount_price: number | null
  images?: string[]
}

type OrderDoc = {
  id: string
  user?: { username?: string }
  shipping: {
    name: string
    pincode: string
    address: string
    addressType: string
  }
  paymentMethod: string
  items: OrderItem[]
  createdAt?: string
}

const ViewOrder = () => {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [order, setOrder] = useState<OrderDoc | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!id) {
        setLoading(false)
        return
      }
      setLoading(true)
      try {
        const res = await apiClient.get(`/orders/${id}`)
        if (!mounted) return
        setOrder(res.data?.data ?? null)
      } catch {
        if (!mounted) return
        setOrder(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load().catch(() => {})
    return () => {
      mounted = false
    }
  }, [id])

  const totalAmount =
    order?.items?.reduce(
      (s, i) =>
        s + Number(i.discount_price ?? i.actual_price) * Number(i.quantity || 1),
      0
    ) ?? 0

  const handleDelete = async () => {
    if (!id) return
    try {
      setIsDeleting(true)
      await apiClient.delete(`/orders/${id}`)
      toast.success('Order deleted successfully!', {
        style: { background: 'black', color: 'white', border: '1px solid #333' },
      })
      router.push('/admin/order')
    } catch {
      toast.error('Failed to delete order')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCopy = () => {
    if (order?.id) {
      navigator.clipboard
        .writeText(order.id)
        .then(() => toast.success('Copied to clipboard'))
        .catch(() => toast.error('Failed to copy'))
    }
  }

  if (loading) {
    return (
      <>
        <Header fixed>
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <div className='mt-20 space-y-4 p-4'>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-40 w-full' />
        </div>
      </>
    )
  }

  if (!order) {
    return (
      <>
        <Header fixed>
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <div className='mt-20 p-6 text-center text-lg font-semibold'>
          Order not found.
        </div>
      </>
    )
  }

  const displayEmail = order.user?.username || '—'
  const addressLine = `${order.shipping.address} (${order.shipping.addressType}) — ${order.shipping.pincode}`

  return (
    <>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <div className='mt-20 space-y-6 p-4'>
        <div className='flex justify-end'>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='outline'>
                <Trash2 size={16} /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this
                  order.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className='flex items-center gap-1'
                >
                  <Trash2 size={16} />
                  {isDeleting ? (
                    <>
                      Deleting...
                      <LoaderCircle className='animate-spin' size={16} />
                    </>
                  ) : (
                    'Delete'
                  )}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className='grid grid-cols-1 gap-4 lg:grid-cols-[60%_39%]'>
          <Card className='border shadow-sm'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-lg font-bold'>
                <User className='text-yellow-700' /> Client information
              </CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-1 lg:grid-cols-2'>
              <div>
                <span className='font-medium'>Shipping name:</span>{' '}
                {order.shipping.name}
              </div>
              <div>
                <span className='font-medium'>Account / email:</span>{' '}
                {displayEmail}
              </div>
              <div>
                <span className='font-medium'>Payment:</span>{' '}
                <span className='uppercase'>{order.paymentMethod}</span>
              </div>
              {order.createdAt && (
                <div>
                  <span className='font-medium'>Placed:</span>{' '}
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className='border shadow-sm'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-lg font-bold'>
                <MapPinHouse className='text-yellow-700' /> Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{addressLine}</p>
            </CardContent>
          </Card>
        </div>

        <div className='grid grid-cols-1 gap-4 lg:grid-cols-[39%_60%]'>
          <Card className='border shadow-sm'>
            <CardContent className='space-y-4'>
              <div
                className='mt-4 flex cursor-pointer items-center gap-2'
                onClick={handleCopy}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleCopy()
                }}
                role='button'
                tabIndex={0}
              >
                <FileText /> <span>Order ID:</span>
                <span className='font-semibold'>{order.id}</span>
              </div>
            </CardContent>
          </Card>

          <Card className='border shadow-sm'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-lg font-bold'>
                <ShoppingCart className='text-yellow-700' /> Order items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <table className='w-full table-auto text-sm'>
                <thead>
                  <tr>
                    <th className='p-2 text-left'>Product</th>
                    <th className='p-2 text-center'>Qty</th>
                    <th className='p-2 text-right'>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {(order.items || []).map((item, i) => {
                    const img = item.images?.[0] || ''
                    const unit = Number(item.discount_price ?? item.actual_price)
                    return (
                      <tr key={`${item.product_id}-${i}`} className='border-b border-gray-700'>
                        <td className='flex items-center gap-2 p-2'>
                          {img ? (
                            <img
                              src={img}
                              alt={item.name}
                              className='h-10 w-10 rounded-full object-cover'
                            />
                          ) : (
                            <span className='flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs'>
                              —
                            </span>
                          )}
                          {item.name}
                        </td>
                        <td className='p-2 text-center'>{item.quantity}</td>
                        <td className='p-2 text-right'>₹{unit}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className='mt-4 text-right font-semibold'>
                Total: ₹{totalAmount.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default ViewOrder
