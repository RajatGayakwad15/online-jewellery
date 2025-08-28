// pages/UsersPage.tsx
import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from './DataTable.tsx'
// import { Checkbox } from '@/components/ui/checkbox'
// import { Badge } from '@/components/ui/badge'
// import { cn } from '@/lib/utils'
// import { DataTableRowActions } from './DataTableRowActions.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Trash } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from '@/components/ui/alert-dialog.tsx'

// Define User type
export interface User {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  status: 'active' | 'inactive'
  role: 'admin' | 'user'
}

// Define columns
const columns: ColumnDef<User>[] = [
//   {
//     id: 'select',
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && 'indeterminate')
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//     meta: { className: cn('sticky left-0 bg-background z-10') },
//   },
{
  id: 'id',
  header: 'ID',
  cell: ({ row }) => <span>{row.index + 1}</span>, // row.index starts at 0, so +1
},
//   {
//     accessorKey: 'username',
//     header: 'Username',
//     cell: ({ row }) => <span>{row.getValue('username')}</span>,
//   },
  {
    id: 'fullName',
    header: 'Name',
    cell: ({ row }) => {
      const { firstName, lastName } = row.original
      return <span>{`${firstName} ${lastName}`}</span>
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <span>{row.getValue('email')}</span>,
  },
  {
    accessorKey: 'phoneNumber',
    header: 'Phone Number',
    cell: ({ row }) => <span>{row.getValue('phoneNumber')}</span>,
  },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//     cell: ({ row }) => (
//       <Badge
//         variant="outline"
//         className={cn(
//           'capitalize',
//           row.getValue('status') === 'active'
//             ? 'text-green-600 border-green-600'
//             : 'text-red-600 border-red-600'
//         )}
//       >
//         {row.getValue('status')}
//       </Badge>
//     ),
//   },
//   {
//     accessorKey: 'role',
//     header: 'Role',
//     cell: ({ row }) => <span className="capitalize">{row.getValue('role')}</span>,
//   },
//     {
//     id: 'actions',
//     cell: DataTableRowActions,
//   },
 {
      id: "actions",
    //   header: "Actions",
      cell: () => (
        <div className="flex space-x-2 justify-center">
          {/* <div className="relative group">
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick(row.original.id);
              }}
            >
              <Edit size={16} />
            </Button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded-md">
              Edit
            </span>
          </div> */}

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
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="cursor-pointer"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.stopPropagation();
                    //   handleDeleteProduct(row.original.id);
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
    //   enableSorting: false,
    //   meta: { headClassName: "justify-center" },
    },
]

// Sample data
const data: User[] = [
  {
    id: 1,
    username: 'rajat',
    firstName: 'Rajat',
    lastName: 'Gayakwad',
    email: 'rajat@example.com',
    phoneNumber: '9999999999',
    status: 'active',
    role: 'admin',
  },
  {
    id: 2,
    username: 'john',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '8888888888',
    status: 'inactive',
    role: 'user',
  },
]

export default function UsersPage() {
  return <DataTable columns={columns} data={data || []} />
}
