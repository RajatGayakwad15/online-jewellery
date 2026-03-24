'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Trash } from 'lucide-react'
import { DataTable } from './DataTable.tsx'
import { Button } from '@/components/ui/button.tsx'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.tsx'
import { apiClient } from '@/lib/apiClient'

type UserRow = {
  id: string
  name: string
  email: string
  phone: string
  role: string
}

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await apiClient.get('/users')
      const rows = (res.data?.data ?? []) as UserRow[]
      setUsers(rows)
    } catch {
      setUsers([])
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers().catch(() => {})
  }, [fetchUsers])

  const columns: ColumnDef<UserRow>[] = useMemo(
    () => [
      {
        id: 'id',
        header: '#',
        cell: ({ row }) => <span>{row.index + 1}</span>,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <span>{row.getValue('name')}</span>,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row }) => <span>{row.getValue('email')}</span>,
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        cell: ({ row }) => <span>{row.getValue('phone') || '—'}</span>,
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => (
          <span className='capitalize'>{String(row.getValue('role'))}</span>
        ),
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <div className='flex justify-center space-x-2'>
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
                    Delete user
                  </h2>
                  <p>
                    Are you sure you want to delete this user? This cannot be
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
                        .delete(`/users/${row.original.id}`)
                        .then(() => {
                          toast.success('User deleted')
                          return fetchUsers()
                        })
                        .catch(() => toast.error('Failed to delete user'))
                    }}
                    className='cursor-pointer'
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ),
      },
    ],
    [fetchUsers]
  )

  const handleRowClick = useCallback(
    (row: UserRow) => {
      router.push(`/admin/users/${row.id}`)
    },
    [router]
  )

  return (
    <DataTable
      columns={columns}
      data={loading ? [] : users}
      onRowClick={handleRowClick}
    />
  )
}
