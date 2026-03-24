'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { Edit, Trash } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.tsx'
import { Button } from '@/components/ui/button.tsx'
import { DataTable } from './DataTable.tsx'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { apiClient } from '@/lib/apiClient'

type OrderApi = {
  id: string
  user?: { username?: string }
  shipping?: {
    name?: string
    pincode?: string
    address?: string
    addressType?: string
  }
  paymentMethod?: string
  items?: Array<{
    product_id: string
    name: string
    brand?: string
    quantity: number
    actual_price: number
    discount_price: number | null
    images?: string[]
  }>
  createdAt?: string
}

type OrderRow = {
  id: string
  username: string
  shippingName: string
  paymentMethod: string
  itemsSummary: string
  itemCount: number
  total: number
  createdAt: string
}

function mapOrderToRow(o: OrderApi): OrderRow {
  const items = Array.isArray(o.items) ? o.items : []
  const total = items.reduce(
    (s, i) =>
      s + Number(i.discount_price ?? i.actual_price) * Number(i.quantity || 1),
    0
  )
  const names = items.map((i) => i.name).filter(Boolean).join(', ')
  const summary =
    names.length > 60 ? `${names.slice(0, 60)}…` : names || '—'
  const username =
    (o.user?.username || o.shipping?.name || '').trim() || '—'

  return {
    id: o.id,
    username,
    shippingName: o.shipping?.name || '—',
    paymentMethod: o.paymentMethod || '—',
    itemsSummary: summary,
    itemCount: items.length,
    total,
    createdAt: o.createdAt
      ? new Date(o.createdAt).toLocaleString()
      : '—',
  }
}

export default function OrderPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<OrderRow[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const res = await apiClient.get('/orders')
      const raw = (res.data?.data ?? []) as OrderApi[]
      setOrders(raw.map(mapOrderToRow))
    } catch {
      setOrders([])
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders().catch(() => {})
  }, [fetchOrders])

  const handleRowNavigate = useCallback(
    (row: OrderRow) => {
      router.push(`/admin/order/${row.id}`)
    },
    [router]
  )

  const columns: ColumnDef<OrderRow>[] = useMemo(
    () => [
      {
        id: 'id',
        header: '#',
        cell: ({ row }) => <span>{row.index + 1}</span>,
      },
      {
        accessorKey: 'username',
        header: 'Customer',
        cell: ({ row }) => <span>{row.getValue('username')}</span>,
      },
      {
        accessorKey: 'itemsSummary',
        header: 'Items',
        cell: ({ row }) => (
          <span className='max-w-[220px] truncate' title={row.original.itemsSummary}>
            {row.getValue('itemsSummary')}
          </span>
        ),
      },
      {
        accessorKey: 'itemCount',
        header: 'Qty lines',
        cell: ({ row }) => <span>{row.getValue('itemCount')}</span>,
      },
      {
        accessorKey: 'total',
        header: 'Total (₹)',
        cell: ({ row }) => (
          <span>₹{Number(row.getValue('total')).toFixed(2)}</span>
        ),
      },
      {
        accessorKey: 'paymentMethod',
        header: 'Payment',
        cell: ({ row }) => (
          <span className='uppercase'>{String(row.getValue('paymentMethod'))}</span>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Placed',
        cell: ({ row }) => (
          <span className='whitespace-nowrap text-sm text-muted-foreground'>
            {row.getValue('createdAt')}
          </span>
        ),
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <div className='flex justify-center space-x-2'>
            <div className='group relative'>
              <Button
                variant='ghost'
                className='h-8 w-8 cursor-pointer p-0'
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/admin/order/update/${row.original.id}`)
                }}
              >
                <Edit size={16} />
              </Button>
              <span className='absolute bottom-full left-1/2 mt-2 hidden -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs text-white group-hover:block'>
                Edit
              </span>
            </div>

            <div className='group relative'>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    onClick={(e) => e.stopPropagation()}
                    variant='ghost'
                    className='h-8 w-8 cursor-pointer p-0'
                  >
                    <Trash size={16} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                  <AlertDialogHeader>
                    <h2 className='text-lg font-semibold text-red-500'>
                      Delete order
                    </h2>
                    <p>
                      Are you sure you want to delete this order? This cannot be
                      undone.
                    </p>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className='cursor-pointer'>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.stopPropagation()
                        apiClient
                          .delete(`/orders/${row.original.id}`)
                          .then(() => {
                            toast.success('Order deleted')
                            return fetchOrders()
                          })
                          .catch(() => {
                            toast.error('Failed to delete order')
                          })
                      }}
                      className='cursor-pointer'
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <span className='absolute bottom-full left-1/2 mt-2 hidden -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs text-white group-hover:block'>
                Delete
              </span>
            </div>
          </div>
        ),
      },
    ],
    [fetchOrders, router]
  )

  return (
    <DataTable
      columns={columns}
      data={loading ? [] : orders}
      onRowClick={handleRowNavigate}
    />
  )
}
