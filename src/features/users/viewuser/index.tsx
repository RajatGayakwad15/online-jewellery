import { useEffect, useState } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { LoaderCircle, Trash2, User } from 'lucide-react'
import { toast } from 'sonner'
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
import { Skeleton } from '@/components/ui/skeleton'
import { apiClient } from '@/lib/apiClient'

type UserDoc = {
  id: string
  name: string
  email: string
  phone: string
  role: string
  createdAt?: string
}

const ViewUser = () => {
  const navigate = useNavigate()
  const { id } = useParams({ strict: false }) as { id: string }

  const [user, setUser] = useState<UserDoc | null>(null)
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
        const res = await apiClient.get(`/users/${id}`)
        if (!mounted) return
        setUser(res.data?.data ?? null)
      } catch {
        if (!mounted) return
        setUser(null)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load().catch(() => {})
    return () => {
      mounted = false
    }
  }, [id])

  const handleDelete = async () => {
    if (!id) return
    try {
      setIsDeleting(true)
      await apiClient.delete(`/users/${id}`)
      toast.success('User deleted')
      navigate({ to: '/admin/users' })
    } catch {
      toast.error('Failed to delete user')
    } finally {
      setIsDeleting(false)
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

  if (!user) {
    return (
      <>
        <Header fixed>
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <div className='mt-20 p-6 text-center text-lg font-semibold'>
          User not found.
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

      <div className='mt-15 flex justify-end space-x-2 p-4'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant='outline'>
              <Trash2 size={16} />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                user account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                className='flex items-center gap-1'
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 size={16} />
                {isDeleting ? (
                  <>
                    Deleting...
                    <LoaderCircle className='h-4 w-4 animate-spin' />
                  </>
                ) : (
                  'Delete'
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className='grid grid-cols-1 gap-4 p-4'>
        <Card className='border shadow-sm'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-lg font-bold'>
              <User className='text-yellow-700' />
              User information
            </CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1 gap-1 lg:grid-cols-2'>
            <div>
              <span className='font-medium'>Name:</span> {user.name}
            </div>
            <div className='mt-1'>
              <span className='font-medium'>Phone:</span> {user.phone || '—'}
            </div>
            <div className='mt-1'>
              <span className='font-medium'>Email:</span> {user.email}
            </div>
            <div className='mt-1'>
              <span className='mr-2 font-medium'>Role:</span>
              <span className='capitalize'>{user.role}</span>
            </div>
            {user.createdAt && (
              <div className='mt-1'>
                <span className='font-medium'>Joined:</span>{' '}
                {new Date(user.createdAt).toLocaleString()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default ViewUser
