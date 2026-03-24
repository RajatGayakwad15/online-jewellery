import { useEffect, useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Contact, MessageCircle, LoaderCircle, Trash2, FileText } from 'lucide-react'

import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { apiClient } from '@/lib/apiClient'

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
import { Skeleton } from '@/components/ui/skeleton'

type ContactRow = {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ViewContact() {
  const navigate = useNavigate()
  const { id } = useParams({ strict: false }) as { id: string }

  const [contact, setContact] = useState<ContactRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function load() {
      if (!id) {
        if (isMounted) setLoading(false)
        return
      }
      if (isMounted) setLoading(true)
      try {
        const res = await apiClient.get(`/contacts/${id}`)
        if (!isMounted) return
        setContact(res.data?.data ?? null)
      } catch {
        if (!isMounted) return
        setContact(null)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load().catch(() => {})

    return () => {
      isMounted = false
    }
  }, [id])

  async function handleDelete() {
    try {
      setIsDeleting(true)
      await apiClient.delete(`/contacts/${id}`)
      toast.success('Contact deleted')
      navigate({ to: '/admin/contact' })
    } catch {
      toast.error('Failed to delete contact')
    } finally {
      setIsDeleting(false)
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(id)
      toast.success('Copied')
    } catch {
      toast.error('Failed to copy')
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

  if (!contact) {
    return (
      <>
        <Header fixed>
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <div className='mt-20 p-6 text-center text-lg font-semibold'>
          Contact not found.
        </div>
      </>
    )
  }

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
                  This action cannot be undone. This will permanently delete your
                  contact.
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
                <Contact className='text-yellow-700' />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-1 gap-1 lg:grid-cols-2'>
              <div className='mt-1'>
                <span className='font-medium'>Name:</span> {contact.name}
              </div>
              <div className='mt-1'>
                <span className='font-medium'>Phone:</span> {contact.phone}
              </div>
              <div className='mt-1'>
                <span className='font-medium'>Email:</span> {contact.email}
              </div>
              <div className='mt-1'>
                <span className='mr-2 font-medium'>Subject:</span>{' '}
                {contact.subject}
              </div>
            </CardContent>
          </Card>

          <Card className='border shadow-sm'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2 text-lg font-bold'>
                <MessageCircle className='text-yellow-700' />
                Message
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <p className='font-medium'>
                <span className='text-muted-foreground'>{contact.message}</span>
              </p>
              <Button variant='outline' onClick={handleCopy} className='w-full'>
                <FileText className='mr-2' size={16} /> Copy ID
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

