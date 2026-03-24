// import { Header } from '@/components/layout/header'
// import { Main } from '@/components/layout/main'
// // import { TopNav } from '@/components/layout/top-nav'
// import { ProfileDropdown } from '@/components/profile-dropdown'
// // import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'

// const UpdateProduct = () => {
//   return (
//     <>
//       <Header>
//         {/* <TopNav links={topNav} /> */}
//         <div className='ml-auto flex items-center space-x-4'>
//           {/* <Search /> */}
//           <ThemeSwitch />
//           <ProfileDropdown />
//         </div>
//       </Header>
//       <Main>
//         <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
//           <div>
//             <h2 className='text-2xl font-bold tracking-tight'>Add Product</h2>
//             <p className='text-muted-foreground'>Add Product Here.</p>
//           </div>
//         </div>
//       </Main>
//     </>
//   )
// }

// export default UpdateProduct

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Formik,
  FieldArray,
  Form,
  Field,
  useFormikContext,
  useField,
} from 'formik'
import {  Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
// import { GetProductcategory } from '@/api/admin/category/categoryapi.jsx'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
// import { Skeleton } from '@/components/ui/skeleton'
import { Header } from '@/components/layout/header'
// import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
// import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { apiClient } from '@/lib/apiClient'
import { isAxiosError } from 'axios'
// import { UpdateProduct } from '../../../../api/admin/products.jsx'

// const furnitureCategories = [
//   { id: 1, slug: 'sofas', name: 'Sofas' },
//   { id: 2, slug: 'beds', name: 'Beds' },
//   { id: 3, slug: 'chairs', name: 'Chairs' },
//   { id: 4, slug: 'dining-tables', name: 'Dining Tables' },
//   { id: 5, slug: 'dressing-table', name: 'Dressing Tables' },
//   { id: 6, slug: 'office-chair', name: 'Office Chair' },
//   { id: 7, slug: 'office-table', name: 'Office Table' },
//   { id: 8, slug: 'recliner-chair', name: 'Recliner Chair' },
//   { id: 9, slug: 'study-tables', name: 'Study Tables' },
//   { id: 10, slug: 'tv-cabinet', name: 'TV Cabinet' },
//   { id: 11, slug: 'wardrobes', name: 'Wardrobes' },
// ]

interface ProductFormValues {
  images: File[];
  name: string;
  brand: string;
  actualPrice: number | string;
  discountPrice: number | string;
  information: string;
  categorySlug: string;
  commonFields: { title: string; info: string }[];
  productDetails: { title: string; info: string }[];
  dimensions: { title: string; info: string }[];
  warranty: { title: string; info: string }[];
}

const tabs = [
  'General',
  'Common Fields',
  'Product Details',
  'Dimensions Details',
  'Warranty',
]

const initialValues = {
  images: [],
  name: '',
  brand: '',
  actualPrice: '',
  discountPrice: '',
  information: '',
  categorySlug: '',
  commonFields: [{ title: '', info: '' }],
  productDetails: [{ title: '', info: '' }],
  dimensions: [{ title: '', info: '' }],
  warranty: [{ title: '', info: '' }],
}

// const validationSchema = Yup.object().shape({
//   images: Yup.array()
//     .min(1, 'At least one image is required')
//     .required('Product images are required'),
//   name: Yup.string().required('Product name is required'),
//   brand: Yup.string().required('Brand is required'),
//   actualPrice: Yup.string().required('Actual price is required'),
// })

const validationSchema = Yup.object().shape({
  // Images are optional on update; you can keep existing images.
  images: Yup.array(),
  name: Yup.string().required('Product name is required'),
  brand: Yup.string().required('Brand is required'),
  actualPrice: Yup.number()
    .typeError('Actual price must be a number')
    .required('Actual price is required')
    .moreThan(0, 'Actual price must be greater than 0'),
  discountPrice: Yup.number()
    .typeError('Discount price must be a number')
    .max(Yup.ref('actualPrice'), 'Discount price cannot exceed actual price'),
})

// const TextInput = ({ name, placeholder, label }) => {
//   const [field, meta] = useField(name)
//   return (
//     <div className='flex flex-col'>
//       <label className='mb-1 font-medium'>{label}</label>
//       <Field
//         {...field}
//         placeholder={placeholder}
//         className='w-full rounded border p-2'
//       />
//       {meta.touched && meta.error && (
//         <div className='mt-1 text-sm text-red-500'>{meta.error}</div>
//       )}
//     </div>
//   )
// }

interface TextInputProps {
  name: string;
  placeholder?: string;
  label: string;
  type?: string;
}


const TextInput: React.FC<TextInputProps> = ({ name, placeholder, label, type = 'text' }) => {
  const [field, meta] = useField(name)
  return (
    <div className='flex flex-col'>
      <label className='mb-1 font-medium'>{label}</label>
      <Field
        {...field}
        type={type}
        placeholder={placeholder}
        className='w-full rounded border p-2'
      />
      {meta.touched && meta.error && (
        <div className='mt-1 text-sm text-red-500'>{meta.error}</div>
      )}
    </div>
  )
}

const MultipleImageDropField = () => {
  const { setFieldValue, values, errors, touched } = useFormikContext<ProductFormValues>()

  const handleFileChange = (e:any) => {
    if (e.currentTarget.files) {
      const filesArray = Array.from(e.currentTarget.files)
      setFieldValue('images', [...(values.images || []), ...filesArray])
    }
  }

  const handleRemoveImage = (index:any) => {
    const updated = [...values.images]
    updated.splice(index, 1)
    setFieldValue('images', updated)
  }

  return (
    <div className='col-span-2 flex flex-col'>
      <label className='mb-2 font-medium'>Product Images</label>
      <div className='flex flex-col gap-4 md:flex-row'>
        <div className='grid w-full grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3'>
          <div className='flex w-full flex-col justify-center rounded-xl border-2 border-dashed p-4 text-center'>
            <input
              type='file'
              accept='image/*'
              multiple
              onChange={handleFileChange}
              className='h-28 w-full text-sm'
            />
          </div>
          {values.images &&
            values.images.map((img, index) => (
              <div key={index} className='relative'>
                <img
                  src={URL.createObjectURL(img)}
                  alt={`preview-${index}`}
                  className='h-36 w-full rounded border object-cover'
                />
                <button
                  type='button'
                  onClick={() => handleRemoveImage(index)}
                  className='absolute top-0 right-0 rounded bg-red-500 px-1 text-xs text-white'
                >
                  ×
                </button>
              </div>
            ))}
        </div>
      </div>
     {touched.images && errors.images && (
  <div className="mt-2 text-sm text-red-500">
    {typeof errors.images === "string"
      ? errors.images
      : Array.isArray(errors.images)
      ? errors.images.join(", ")
      : null}
  </div>
)}

    </div>
  )
}

const UpdateProduct = () => {
  const [activeTab, setActiveTab] = useState('General')
  const currentIndex = tabs.indexOf(activeTab)
  const isLastTab = currentIndex === tabs.length - 1
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  type Category = {
    id: string
    slug: string
    name: string
  }

  const [categories, setCategories] = useState<Category[]>([])
  const [formInitialValues, setFormInitialValues] =
    useState<ProductFormValues>(initialValues)

  useEffect(() => {
    let isMounted = true

    async function load() {
      const [catRes, prodRes] = await Promise.allSettled([
        apiClient.get('/categories'),
        apiClient.get(`/products/${id}`),
      ])

      if (!isMounted) return

      setCategories(
        catRes.status === 'fulfilled' ? catRes.value.data?.data ?? [] : []
      )

      if (prodRes.status === 'fulfilled') {
        const p = prodRes.value.data?.data
        if (p) {
          setFormInitialValues({
            images: [],
            name: p.name ?? '',
            brand: p.brand ?? '',
            actualPrice: p.actual_price ?? '',
            discountPrice: p.discount_price ?? '',
            information: p.information ?? '',
            categorySlug: p.categorySlug ?? '',
            commonFields: p.common_fields ?? [{ title: '', info: '' }],
            productDetails: p.product_details ?? [{ title: '', info: '' }],
            dimensions: p.dimensions_details ?? [{ title: '', info: '' }],
            warranty: p.warranty ?? [{ title: '', info: '' }],
          })
        }
      }
    }

    load().catch(() => {})

    return () => {
      isMounted = false
    }
  }, [id])

  // const { mutate: product, isPending } = useMutation({
  //   mutationKey: ['add-product'],
  //   mutationFn: UpdateProduct,
  //   onSuccess: (data) => {
  //     if (data?.status) {
  //       toast.success('Product Added successfully!', {
  //         duration: 8000,
  //         style: {
  //           background: '#111',
  //           color: '#fff',
  //           border: '1px solid #333',
  //         },
  //       })
  //       navigate({ to: '/admin/products' })
  //     } else {
  //       toast.error(data?.message || 'Something went wrong!', {
  //         style: {
  //           background: '#111',
  //           color: '#fff',
  //           border: '1px solid #333',
  //         },
  //       })
  //     }
  //   },
  //   onError: (error) => {
  //     console.error('Error adding product:', error)
  //     toast.error('An unexpected error occurred.', {
  //       style: { background: '#111', color: '#fff', border: '1px solid #333' },
  //     })
  //   },
  // })
  // const { data: getProduct, isPending: isProductsDataPending } = useQuery({
  //   queryKey: ['get-category'],
  //   queryFn: () => GetProductcategory(),
  //   // enabled: !!id,
  // })
  // console.log('getProduct123?.data?.data', getProduct?.data?.Category)
  // console.log('getProduct', getProduct)

  const renderFields = (values: any) => {
    const renderArrayField = (name: any, label: any) => (
      <FieldArray name={name}>
        {({ push, remove }) => (
          <div className='space-y-3'>
            {values[name].map((_:any, index:any) => (
              <div key={index} className='flex w-full items-end gap-3'>
                <div className='w-full'>
                  <label className='mb-1 block font-medium'>Title</label>
                  <Field
                    name={`${name}.${index}.title`}
                    placeholder='Title'
                    className='w-full rounded border p-2'
                  />
                </div>
                <div className='w-full'>
                  <label className='mb-1 block font-medium'>Info</label>
                  <Field
                    name={`${name}.${index}.info`}
                    placeholder='Info'
                    className='w-full rounded border p-2'
                  />
                </div>
                <Button
                  type='button'
                  variant='destructive'
                  className='h-10'
                  onClick={() => remove(index)}
                >
                  <Trash />
                </Button>
              </div>
            ))}
            <Button
              type='button'
              variant='outline'
              onClick={() => push({ title: '', info: '' })}
            >
              Update {label}
            </Button>
          </div>
        )}
      </FieldArray>
    )

    switch (activeTab) {
      case 'General':
        return (
          <div className='grid grid-cols-2 gap-4'>
            <MultipleImageDropField />
            <TextInput
              name='name'
              placeholder='Product Name'
              label='Product Name'
            />
            <TextInput name='brand' placeholder='Brand' label='Brand' />
            {/* <TextInput name='actualPrice' placeholder='Actual Price' label='Actual Price' />
            <TextInput name='discountPrice' placeholder='Discount Price' label='Discount Price' /> */}
            <TextInput
              name='actualPrice'
              placeholder='Actual Price'
              label='Actual Price'
              type='number'
            />
            <TextInput
              name='discountPrice'
              placeholder='Discount Price'
              label='Discount Price'
              type='number'
            />

            <div className='col-span-1 flex flex-col'>
              <label className='mb-1 font-medium'>Category</label>
              <Field
                as='select'
                name='categorySlug'
                className='w-full rounded border p-2'
              >
                <option value='' className='bg-accent'>-- Choose Category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.slug} className='bg-accent'>
                    {cat.name}
                  </option>
                ))}
              </Field>
            </div>
            <div className='col-span-2'>
              <label className='mb-1 font-medium'>Product Information</label>
              <Field
                name='information'
                as='textarea'
                placeholder='Product Information'
                className='w-full rounded border p-2'
                rows={4}
              />
            </div>
          </div>
        )
      case 'Common Fields':
        return renderArrayField('commonFields', 'Common Field')
      case 'Product Details':
        return renderArrayField('productDetails', 'Product Detail')
      case 'Dimensions Details':
        return renderArrayField('dimensions', 'Dimension Detail')
      case 'Warranty':
        return renderArrayField('warranty', 'Warranty')
    }
  }

  return (
    <>
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <div className='p-6'>
        <Card>
          <CardContent className='p-6'>
            <h1 className='mb-4 text-2xl font-bold'>Update Product</h1>
            <Formik
              initialValues={formInitialValues}
              validationSchema={validationSchema}
              enableReinitialize
              onSubmit={async (values) => {
                try {
                  const formData = new FormData()

                  ;(values.images || []).forEach((file) => {
                    formData.append('images', file)
                  })

                  formData.append('categorySlug', values.categorySlug)
                  formData.append('name', values.name)
                  formData.append('brand', values.brand)
                  formData.append('actualPrice', String(values.actualPrice))
                  formData.append(
                    'discountPrice',
                    values.discountPrice === '' ? '' : String(values.discountPrice)
                  )
                  formData.append('information', values.information || '')

                  formData.append('commonFields', JSON.stringify(values.commonFields))
                  formData.append(
                    'productDetails',
                    JSON.stringify(values.productDetails)
                  )
                  formData.append('dimensions', JSON.stringify(values.dimensions))
                  formData.append('warranty', JSON.stringify(values.warranty))

                  await apiClient.put(`/products/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                  })

                  toast.success('Product updated successfully!')
                  router.push('/admin/products')
                } catch (err) {
                  const msg =
                    isAxiosError(err) && err.response?.data?.title
                      ? String(err.response.data.title)
                      : 'Failed to update product. Please try again.'
                  toast.error(msg)
                }
              }}
            >
              {({ values, validateForm, errors, touched }) => (
                <Form className='space-y-6'>
                  <div className='mb-6 flex flex-wrap gap-2'>
                    {tabs.map((tab, idx) => (
                      <Button
                        key={tab}
                        type='button'
                        variant={activeTab === tab ? 'default' : 'outline'}
                        onClick={async () => {
                          if (
                            idx === 0 ||
                            Object.keys(await validateForm()).length === 0
                          ) {
                            setActiveTab(tab)
                          } else if (activeTab === 'General') {
                            toast.error(
                              'Please complete the General tab first.',
                              {
                                style: { background: '#111', color: '#fff' },
                              }
                            )
                          }
                        }}
                        disabled={
                          idx > 0 &&
                          (Object.keys(errors).length > 0 || !touched.name)
                        }
                      >
                        {tab}
                      </Button>
                    ))}
                  </div>

                  {renderFields(values)}

                  <div className='text-right'>
                    {!isLastTab ? (
                      <Button
                        type='button'
                        onClick={async (e) => {
                          e.preventDefault()
                          const errs = await validateForm()
                          if (Object.keys(errs).length === 0) {
                            setActiveTab(tabs[currentIndex + 1])
                          } else {
                            toast.error(
                              'Please complete required fields in this tab.',
                              {
                                style: { background: '#111', color: '#fff' },
                              }
                            )
                          }
                        }}
                      >
                        Next
                      </Button>
                    ) : (
                      // <Button type='submit' disabled={isPending}>
                      <Button type='submit'>
                        Update 
                        {/* {isPending && <LoaderCircle className='animate-spin' />} */}
                      </Button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default UpdateProduct
