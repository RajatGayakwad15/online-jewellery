// pages/UsersPage.tsx
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx"
import { Button } from "@/components/ui/button.tsx"
import { DataTable } from "./DataTable.tsx"
import { useNavigate } from "@tanstack/react-router"

// Define User type
export interface User {
  id: number
  produactname: string
  quantity: number
  price: number
  email: string
  phoneNumber: string
  status: "active" | "inactive"
  role: "admin" | "user"
}

export default function OrderPage() {
  const navigate = useNavigate()

  // Define columns
  const columns: ColumnDef<User>[] = [
    {
      id: "id",
      header: "ID",
      cell: ({ row }) => <span>{row.index + 1}</span>, // row.index starts at 0, so +1
    },
    {
      id: "produactname",
      header: "Product Name",
      cell: ({ row }) => {
        const { produactname } = row.original
        return <span>{`${produactname}`}</span>
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => <span>{row.getValue("quantity")}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>{row.getValue("price")}</span>,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-center space-x-2">
          {/* Edit Button */}
          <div className="group relative">
            <Button
              variant="ghost"
              className="h-8 w-8 cursor-pointer p-0"
              onClick={(e) => {
                e.stopPropagation()
                navigate({ to: `/admin/order/update/${row.original.id}` })
              }}
            >
              <Edit size={16} />
            </Button>
            <span className="absolute bottom-full left-1/2 mt-2 hidden -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs text-white group-hover:block">
              Edit
            </span>
          </div>

          {/* Delete Button */}
          <div className="group relative">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  onClick={(e) => e.stopPropagation()}
                  variant="ghost"
                  className="h-8 w-8 cursor-pointer p-0"
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
                      e.stopPropagation()
                    }}
                    className="cursor-pointer"
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={(e) => {
                      e.stopPropagation()
                      //   handleDeleteProduct(row.original.id);
                    }}
                    className="cursor-pointer"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <span className="absolute bottom-full left-1/2 mt-2 hidden -translate-x-1/2 rounded-md bg-black px-2 py-1 text-xs text-white group-hover:block">
              Delete
            </span>
          </div>
        </div>
      ),
    },
  ]

  // Sample data
  const data: User[] = [
    {
      id: 1,
      produactname: "Rings",
      quantity: 5,
      price: 4000,
      email: "rajat@example.com",
      phoneNumber: "9999999999",
      status: "active",
      role: "admin",
    },
    {
      id: 2,
      produactname: "Necklase",
      quantity: 6,
      price: 4000,
      email: "john@example.com",
      phoneNumber: "8888888888",
      status: "inactive",
      role: "user",
    },
  ]

  return <DataTable columns={columns} data={data || []} />
}
