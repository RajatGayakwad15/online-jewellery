import { useMemo, useState } from 'react'
import type React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from '@tanstack/react-router'
import { Formik, Form, Field } from 'formik'

import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { apiClient } from '@/lib/apiClient'

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export default function AddCategoryPage() {
  const navigate = useNavigate()
  const [autoSlug, setAutoSlug] = useState(true)

  const initialValues = useMemo(
    () => ({
      name: '',
      slug: '',
    }),
    []
  )

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
            <h2 className='text-2xl font-bold tracking-tight'>Add Category</h2>
            <p className='text-muted-foreground'>Create category for product listing</p>
          </div>
          <Button variant='outline' onClick={() => navigate({ to: '/admin/categories' })}>
            Back
          </Button>
        </div>

        <Card>
          <CardContent className='p-6'>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  if (!values.name.trim() || !values.slug.trim()) {
                    toast.error('Name and slug are required.')
                    return
                  }

                  await apiClient.post('/categories', {
                    name: values.name,
                    slug: values.slug,
                  })
                  toast.success('Category added')
                  navigate({ to: '/admin/categories' })
                } catch {
                  toast.error('Failed to add category. Try again.')
                } finally {
                  setSubmitting(false)
                }
              }}
            >
              {({ values, isSubmitting, setFieldValue }) => (
                <Form className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='name'>Category Name</Label>
                    <Field
                      as={Input}
                      id='name'
                      name='name'
                      placeholder='e.g. Rings'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const nameVal = e.target.value
                        setFieldValue('name', nameVal)
                        if (autoSlug) setFieldValue('slug', slugify(nameVal))
                      }}
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='slug'>Slug</Label>
                    <Field
                      as={Input}
                      id='slug'
                      name='slug'
                      placeholder='e.g. rings'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setAutoSlug(false)
                        setFieldValue('slug', e.target.value)
                      }}
                    />
                  </div>

                  <div className='flex items-center gap-3 pt-2'>
                    <Button type='submit' disabled={isSubmitting}>
                      {isSubmitting ? 'Saving...' : 'Add Category'}
                    </Button>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => {
                        setAutoSlug(true)
                        setFieldValue('slug', slugify(values.name))
                        toast.success('Slug auto-filled from name')
                      }}
                      disabled={!values.name.trim()}
                    >
                      Auto slug
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Main>
    </>
  )
}

