// pages/UsersPage.tsx
import { useEffect, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './DataTable.tsx'
// import { Checkbox } from '@/components/ui/checkbox'
// import { Badge } from '@/components/ui/badge'
// import { cn } from '@/lib/utils'
// import { DataTableRowActions } from './DataTableRowActions.tsx'
import { Button } from '@/components/ui/button.tsx'
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
import { useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'
import { apiClient } from '@/lib/apiClient'

type ProductRow = {
  id: string
  name: string
  brand: string
  actual_price: number
  discount_price: number | null
}

export default function ProductPage() {
  const navigate = useNavigate() // ✅ moved inside component

  const [products, setProducts] = useState<ProductRow[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchProducts() {
    setLoading(true)
    const res = await apiClient.get('/products')
    setProducts(res.data?.data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts().catch(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleDeleteProduct(productId: string) {
    await apiClient.delete(`/products/${productId}`)
    toast.success('Product deleted')
    await fetchProducts()
  }

  // Define columns inside the component so they can access navigate
  const columns: ColumnDef<ProductRow>[] = [
    {
      id: 'id',
      header: 'ID',
      cell: ({ row }) => <span>{row.index + 1}</span>, // row.index starts at 0, so +1
    },
    {
      accessorKey: 'name',
      header: 'Product Name',
      cell: ({ row }) => <span>{row.getValue('name')}</span>,
    },
    {
      accessorKey: 'actual_price',
      header: 'Actual Price',
      cell: ({ row }) => <span>{row.getValue('actual_price')}</span>,
    },
    {
      accessorKey: 'discount_price',
      header: 'Discount Price',
      cell: ({ row }) => (
        <span>
          {row.original.discount_price ?? row.original.actual_price}
        </span>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex space-x-2 justify-center">
          <div className="relative group">
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation()
                navigate({ to: `/admin/products/update/${row.original.id}` })
              }}
            >
              <Edit size={16} />
            </Button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md">
              Edit
            </span>
          </div>

          <div className="relative group">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  onClick={(e) => e.stopPropagation()}
                  variant="ghost"
                  className="h-8 w-8 p-0 cursor-pointer"
                >
                  <Trash size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                  <h2 className="text-lg font-semibold text-red-500">
                    Delete Product
                  </h2>
                  <p>
                    Are you sure you want to delete this product? This action
                    cannot be reverted.
                  </p>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={(e) => e.stopPropagation()}
                    className="cursor-pointer"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteProduct(String(row.original.id)).catch(() => {})
                    }}
                    className="cursor-pointer"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md">
              Delete
            </span>
          </div>
        </div>
      ),
    },
  ]

  return <DataTable columns={columns} data={loading ? [] : products} />
}
