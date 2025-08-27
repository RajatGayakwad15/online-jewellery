// pages/UsersPage.tsx
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

// Define User type
export interface User {
  id: number
  produactname: string
  actualprice: number
  disprice: number
  email: string
  phoneNumber: string
  status: 'active' | 'inactive'
  role: 'admin' | 'user'
}

// Sample data
const data: User[] = [
  {
    id: 1,
    produactname: 'Rings',
    actualprice: 5000,
    disprice: 4000,
    email: 'rajat@example.com',
    phoneNumber: '9999999999',
    status: 'active',
    role: 'admin',
  },
  {
    id: 2,
    produactname: 'Necklase',
    actualprice: 6000,
    disprice: 4000,
    email: 'john@example.com',
    phoneNumber: '8888888888',
    status: 'inactive',
    role: 'user',
  },
]

export default function ProductPage() {
  const navigate = useNavigate() // ✅ moved inside component

  // Define columns inside the component so they can access navigate
  const columns: ColumnDef<User>[] = [
    {
      id: 'id',
      header: 'ID',
      cell: ({ row }) => <span>{row.index + 1}</span>, // row.index starts at 0, so +1
    },
    {
      id: 'produactname',
      header: 'Product Name',
      cell: ({ row }) => {
        const { produactname } = row.original
        return <span>{`${produactname}`}</span>
      },
    },
    {
      accessorKey: 'actualprice',
      header: 'Actual Price',
      cell: ({ row }) => <span>{row.getValue('actualprice')}</span>,
    },
    {
      accessorKey: 'disprice',
      header: 'Discount Price',
      cell: ({ row }) => <span>{row.getValue('disprice')}</span>,
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
                    Delete User
                  </h2>
                  <p>
                    Are you sure you want to delete this user? This action
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
                      // handleDeleteProduct(row.original.id);
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

  return <DataTable columns={columns} data={data || []} />
}
