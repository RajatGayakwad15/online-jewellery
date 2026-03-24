'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Trash } from 'lucide-react'

import { DataTable } from './DataTable.tsx'
import { apiClient } from '@/lib/apiClient'
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

type ContactRow = {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactPage() {
  const router = useRouter()
  const [contacts, setContacts] = useState<ContactRow[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchContacts() {
    setLoading(true)
    try {
      const res = await apiClient.get('/contacts')
      setContacts(res.data?.data ?? [])
    } catch {
      setContacts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts().catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns: ColumnDef<ContactRow>[] = useMemo(() => {
    return [
      {
        id: 'id',
        header: 'ID',
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
        cell: ({ row }) => <span>{row.getValue('phone')}</span>,
      },
      {
        accessorKey: 'subject',
        header: 'Subject',
        cell: ({ row }) => <span>{row.getValue('subject')}</span>,
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <div className='flex space-x-2 justify-center'>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  onClick={(e) => e.stopPropagation()}
                  variant='ghost'
                  className='h-8 w-8 p-0 cursor-pointer'
                >
                  <Trash size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                  <h2 className='text-lg font-semibold text-red-500'>
                    Delete Contact
                  </h2>
                  <p>Are you sure you want to delete this contact?</p>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className='cursor-pointer'
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async (e) => {
                      e.stopPropagation()
                      try {
                        await apiClient.delete(`/contacts/${row.original.id}`)
                        toast.success('Contact deleted')
                        await fetchContacts()
                      } catch {
                        toast.error('Failed to delete contact')
                      }
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
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onRowClick = useCallback(
    (row: ContactRow) => {
      router.push(`/admin/contact/${row.id}`)
    },
    [router]
  )

  return (
    <DataTable
      columns={columns}
      data={loading ? [] : contacts}
      onRowClick={onRowClick}
    />
  )
}

