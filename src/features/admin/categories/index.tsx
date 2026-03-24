'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Tag } from 'lucide-react'
import { apiClient } from '@/lib/apiClient'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Category = {
  id: string
  name: string
  slug: string
}

export default function CategoriesPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  async function fetchCategories() {
    setLoading(true)
    try {
      const res = await apiClient.get('/categories')
      setCategories(res.data?.data ?? [])
    } catch {
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories().catch(() => {})
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return categories
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q)
    )
  }, [categories, query])

  async function handleDelete(id: string) {
    await apiClient.delete(`/categories/${id}`)
    toast.success('Category deleted')
    await fetchCategories()
  }

  return (
    <>
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight flex items-center gap-2'>
              <Tag className='h-5 w-5' />
              Categories
            </h2>
            <p className='text-muted-foreground'>Add and manage product categories</p>
          </div>
          <div className='flex items-center gap-2'>
            <Button onClick={() => router.push('/admin/categories/add')}>
              Add Category
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className='p-0'>
            <div className='p-4'>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search by name or slug...'
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3}>Loading...</TableCell>
                  </TableRow>
                ) : filtered.length ? (
                  filtered.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell className='font-medium'>{cat.name}</TableCell>
                      <TableCell>{cat.slug}</TableCell>
                      <TableCell className='text-right'>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant='destructive'>Delete</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <h3 className='text-lg font-semibold text-red-500'>
                                Delete category
                              </h3>
                              <p>
                                Are you sure you want to delete{' '}
                                <span className='font-semibold'>{cat.name}</span>? This
                                cannot be undone.
                              </p>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => {
                                  handleDelete(cat.id).catch(() => {})
                                }}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>No categories found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Main>
    </>
  )
}

