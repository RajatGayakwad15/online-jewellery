import React, { useEffect, useState } from 'react'
// import Cookies from 'js-cookie'
import { useNavigate, useParams } from '@tanstack/react-router'
import { Formik, Form, Field } from 'formik'
// import { jwtDecode } from 'jwt-decode'
import { EyeIcon } from 'lucide-react'
import { toast } from 'sonner'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { apiClient } from '@/lib/apiClient'
import { useAuthStore } from '@/stores/authStore'

interface BuyNowProps {
  product?: {
    name: string
    brand: string
    category: string
    discountPrice: number
  }
  isCart: boolean
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  pincode: Yup.string().required('Pincode is required'),
  address: Yup.string().required('Address is required'),
  addressType: Yup.string().required('Select address type'),
  paymentMethod: Yup.string().required('Select payment method'),
})

const BuyNow: React.FC<BuyNowProps> = ({ isCart }) => {
//   const [quantity, setQuantity] = useState(1)
const quantity = 1

  const navigate = useNavigate()
  const token = useAuthStore((s) => s.auth.accessToken)
//   const authTokenChk = Cookies.get('authToken')
//   const [step, setStep] = useState(authTokenChk ? 2 : 1)
const [step, setStep] = useState(token ? 2 : 1)


  const { category, id } = useParams({ strict: false })
  console.log('slug', id, category)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

//   let name
//   if (authTokenChk) {
//     const decodedToken: any = jwtDecode(authTokenChk)
//     name = decodedToken?.username
//   }

  const [productDetails, setProductDetails] = useState<any | null>(null)

  const [cartItems, setCartItems] = useState<any[]>([])
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    if (!id) return
    apiClient
      .get(`/products/${id}`)
      .then((res) => setProductDetails(res.data?.data ?? null))
      .catch(() => setProductDetails(null))
  }, [id])

  // If user is already logged in, skip step 1 and load user name from JWT.
  useEffect(() => {
    if (!token) {
      setStep(1)
      return
    }

    let isMounted = true
    apiClient
      .get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (!isMounted) return
        const me = res.data?.data
        const name = me?.name || me?.email || ''
        setUsername(String(name))
        setStep(2)
      })
      .catch(() => {
        if (!isMounted) return
        setStep(1)
      })

    return () => {
      isMounted = false
    }
  }, [token])

  useEffect(() => {
    if (productDetails) {
      setCartItems([
        {
          ...productDetails,
          product_id: productDetails.id,
        },
      ])
    }
  }, [productDetails])

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const initialQuantities = cartItems.reduce(
        (acc, item) => ({ ...acc, [item.product_id]: 1 }),
        {}
      )
      setQuantities(initialQuantities)
    }
  }, [cartItems])

  const handleQuantityChange = (id: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }))
  }

  const totalActual = cartItems
    ? cartItems.reduce(
        (sum, item) =>
          sum +
          Number(item.actual_price) * (quantities[item.product_id] || 1),
        0
      )
    : 0

  const totalDiscount = cartItems
    ? cartItems.reduce(
        (sum, item) =>
          sum +
          Number(item.discount_price ?? item.actual_price) *
            (quantities[item.product_id] || 1),
        0
      )
    : 0

  const totalSavings = totalActual - totalDiscount

  const handleRegisterClick = () => {
    if (!token) {
      navigate({ to: '/sign-in' })
      return
    }
    setStep(2)
  }

  const handlePlaceOrder = async (values: any) => {
    if (!token) {
      navigate({ to: '/sign-in' })
      return
    }

    const payload = {
      user: { username },
      shipping: {
        name: values.name,
        pincode: values.pincode,
        address: values.address,
        addressType: values.addressType,
      },
      paymentMethod: values.paymentMethod,
      items: cartItems.map((item: any) => ({
        product_id: String(item.product_id),
        name: item.name,
        brand: item.brand,
        quantity: quantities[item.product_id] || 1,
        actual_price: Number(item.actual_price),
        discount_price:
          item.discount_price === null || item.discount_price === undefined
            ? null
            : Number(item.discount_price),
        images: Array.isArray(item.images) ? item.images : [],
      })),
    }

    try {
      await apiClient.post('/orders', payload)
      toast.success('🎉 Order placed successfully!')
      navigate({ to: '/' })
    } catch {
      toast.error('Failed to place order. Please try again.')
    }
  }

  return (
    <div className='mx-auto mt-10 max-w-6xl p-6'>
      <div className='grid gap-6 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <Formik
            initialValues={{
              name: '',
              mobile: '',
              pincode: '',
              address: '',
              city: '',
              state: '',
              landmark: '',
              alternatePhone: '',
              addressType: '',
              paymentMethod: '',
              username1: '',
              password1: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handlePlaceOrder(values)}
          >
            {({ errors, touched, validateForm }) => (
              <Form>
                {/* Step 1: Login or Signup */}
                <div className='mb-4 overflow-hidden rounded border'>
                  <div className='flex items-center gap-2 px-4 py-2'>
                    <span className='rounded px-2 py-1 text-sm font-bold'>
                      1
                    </span>
                    <h2 className='text-lg font-semibold'>
                      Login / Signup
                    </h2>
                  </div>
                  {step === 1 && (
                    <div className='p-6'>
                      <div className='grid gap-4 sm:grid-cols-2'>
                        <div>
                          <Label htmlFor='identifier' className='mb-1'>
                            Username
                          </Label>
                          <Input
                            placeholder='Enter email or username'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>

                        <div className='relative'>
                          <Label htmlFor='password' className='mb-1'>
                            Password*
                          </Label>
                          <Input
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter password'
                          />
                          <EyeIcon
                            className='absolute top-7 right-3 h-5 w-5 cursor-pointer text-gray-400'
                            onClick={() => setShowPassword(!showPassword)}
                          />
                        </div>
                      </div>
                      <p className='mt-2 text-xs text-gray-500'>
                        By continuing, you agree to Terms & Privacy Policy.
                      </p>
                      <Button
                        type='button'
                        className='mt-4 rounded-lg bg-orange-500 p-2 text-white hover:bg-orange-500'
                        onClick={handleRegisterClick}
                      >
                        CONTINUE
                      </Button>
                    </div>
                  )}
                </div>

                {/* Step 2: Delivery Address */}
                <div className='mb-4 overflow-hidden rounded border'>
                  <div className='flex items-center gap-2 px-4 py-2'>
                    <span className='rounded px-2 py-1 text-sm font-bold'>
                      2
                    </span>
                    <h2 className='text-lg font-semibold'>DELIVERY ADDRESS</h2>
                    {username ? (
                      <p className='text-sm font-medium text-muted-foreground ml-auto'>
                        Hi, {username}
                      </p>
                    ) : null}
                  </div>
                  {step === 2 && (
                    <div className='space-y-4 p-4'>
                      <div className='grid gap-4 sm:grid-cols-2'>
                        <div>
                          <label>Name</label>
                          <Field
                            name='name'
                            placeholder='Name'
                            className='w-full rounded border p-2'
                          />
                          {touched.name && errors.name && (
                            <div className='text-sm text-red-500'>
                              {errors.name}
                            </div>
                          )}
                        </div>
                        <div>
                          <label>Pincode</label>
                          <Field
                            name='pincode'
                            placeholder='Pincode'
                            className='w-full rounded border p-2'
                          />
                          {touched.pincode && errors.pincode && (
                            <div className='text-sm text-red-500'>
                              {errors.pincode}
                            </div>
                          )}
                        </div>
                        <div className='sm:col-span-2'>
                          <label>Address</label>
                          <Field
                            name='address'
                            placeholder='Address'
                            as='textarea'
                            className='w-full rounded border p-2'
                          />
                          {touched.address && errors.address && (
                            <div className='text-sm text-red-500'>
                              {errors.address}
                            </div>
                          )}
                        </div>
                        <div>
                          <label>City</label>
                          <Field
                            name='city'
                            placeholder='City'
                            className='w-full rounded border p-2'
                          />
                        </div>
                      </div>
                      <div>
                        <label className='mb-1 block'>Address Type</label>
                        <div className='flex gap-4'>
                          <label className='flex items-center gap-2'>
                            <Field
                              type='radio'
                              name='addressType'
                              value='home'
                            />{' '}
                            Home
                          </label>
                          <label className='flex items-center gap-2'>
                            <Field
                              type='radio'
                              name='addressType'
                              value='work'
                            />{' '}
                            Work
                          </label>
                        </div>
                        {touched.addressType && errors.addressType && (
                          <div className='text-sm text-red-500'>
                            {errors.addressType}
                          </div>
                        )}
                      </div>
                      <div className='flex justify-between'>
                        {/* {authTokenChk ? (
                          <div></div>
                        ) : ( */}
                          <Button
                            type='button'
                            variant='outline'
                            onClick={() => setStep(1)}
                          >
                            Back
                          </Button>
                        {/* )} */}
                        <button
                          type='button'
                          className='rounded-lg bg-orange-500 px-4 py-2 text-white'
                          onClick={() => {
                            validateForm().then((errs) => {
                              if (
                                !errs.name &&
                                !errs.pincode &&
                                !errs.address &&
                                !errs.addressType
                              ) {
                                setStep(3)
                              } else {
                                toast.error(
                                  'Please fill in all required address fields.'
                                )
                              }
                            })
                          }}
                        >
                          SAVE AND DELIVER HERE
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 3: Product Summary & Payment */}
                <div className='mb-4 overflow-hidden rounded border'>
                  <div className='flex items-center gap-2 px-4 py-2'>
                    <span className='rounded px-2 py-1 text-sm font-bold'>
                      3
                    </span>
                    <h2 className='text-lg font-semibold'>
                      PRODUCT SUMMARY & PAYMENT
                    </h2>
                  </div>
                  {step === 3 && (
                    <CartSummary
                      cartItems={cartItems}
                      setStep={setStep}
                      quantities={quantities}
                      handleQuantityChange={handleQuantityChange}
                      totalItems={quantity}
                      totalActual={totalActual}
                      totalSavings={totalSavings}
                      totalDiscount={totalDiscount}
                      errors={errors}
                      touched={touched}
                    />
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {step >= 2 && (
          <div className='space-y-4'>
            <CartPriceSummary
              totalItems={cartItems?.length || 0}
              totalActual={totalActual}
              totalSavings={totalSavings}
              totalDiscount={totalDiscount}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default BuyNow

const CartPriceSummary = ({
  totalItems,
  totalActual,
  totalSavings,
  totalDiscount,
}: any) => {
  return (
    <div className='rounded border text-sm shadow'>
      <h2 className='border-b px-4 pt-4 pb-2 font-semibold'>PRICE DETAILS</h2>
      <div className='space-y-2 px-4 py-2'>
        <div className='flex justify-between'>
          <span>Price ({totalItems} items)</span>
          <span>₹{totalActual}</span>
        </div>
        <div className='flex justify-between'>
          <span>Discount</span>
          <span className='text-green-600'>− ₹{totalSavings}</span>
        </div>
        <hr />
        <div className='flex justify-between font-semibold'>
          <span>Total Payable</span>
          <span>₹{totalDiscount}</span>
        </div>
        {totalSavings > 0 && (
          <div className='pt-2 text-sm font-medium text-green-600'>
            Your Total Savings on this order ₹{totalSavings}
          </div>
        )}
      </div>
    </div>
  )
}

const CartSummary = ({
  cartItems,
  setStep,
  quantities,
  handleQuantityChange,
  totalActual,
  totalSavings,
  totalDiscount,
  errors,
  touched,
}: any) => {
  return (
    <div className='space-y-4 p-4'>
      {cartItems.map((product: any, i: number) => (
        <div key={i} className='rounded border p-4'>
          <div className='flex flex-col gap-4 md:flex-row'>
            <div className='w-full md:w-2/5'>
              <img
                src={product.images[0]}
                alt={product.name}
                className='aspect-square w-full rounded border object-contain shadow'
              />
            </div>
            <div className='w-full space-y-2'>
              <h3 className='text-lg font-semibold'>{product.name}</h3>
              <p>Brand: {product.brand}</p>
              <p>Category: {product.category}</p>

              <div className='my-2 flex items-center gap-3'>
                <span className='font-semibold'>Quantity:</span>
                <button
                  type='button'
                  onClick={() => handleQuantityChange(product.product_id, -1)}
                  className='rounded border px-2 py-1 text-lg'
                >
                  −
                </button>
                <span className='font-medium'>
                  {quantities[product.product_id] || 1}
                </span>
                <button
                  type='button'
                  onClick={() => handleQuantityChange(product.product_id, 1)}
                  className='rounded border px-2 py-1 text-lg'
                >
                  +
                </button>
              </div>
            </div>
            <div className='w-full space-y-1 text-right md:w-2/5'>
              <p>
                Price: ₹{product.discount_price || product.actual_price} ×{' '}
                {quantities[product.product_id]}
              </p>
              <p className='mt-2 font-bold'>
                Total: ₹
                {(
                  parseInt(product.discount_price || product.actual_price) *
                  (quantities[product.product_id] || 1)
                ).toLocaleString()}
              </p>
              {product.discount_price && (
                <p className='text-sm text-green-600'>
                  You will save ₹
                  {(parseInt(product.actual_price) -
                    parseInt(product.discount_price)) *
                    (quantities[product.product_id] || 1)}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className='rounded border p-4 text-sm'>
        <h3 className='mb-2 text-base font-semibold'>Total Summary</h3>
        <div className='flex justify-between'>
          <span>Total MRP:</span>
          <span>₹{totalActual}</span>
        </div>
        <div className='flex justify-between'>
          <span>Total Discount:</span>
          <span className='text-green-600'>− ₹{totalSavings}</span>
        </div>
        <div className='mt-2 flex justify-between font-semibold'>
          <span>Payable Amount:</span>
          <span>₹{totalDiscount}</span>
        </div>
      </div>

      <div>
        <label className='mb-1 block font-medium'>Select Payment Method</label>
        <div className='flex gap-4'>
          <label className='flex cursor-pointer items-center gap-2'>
            <Field
              type='radio'
              name='paymentMethod'
              value='cod'
              className='cursor-pointer'
            />
            Cash on Delivery
          </label>
          <label className='flex cursor-not-allowed items-center gap-2 text-gray-400'>
            <Field
              type='radio'
              name='paymentMethod'
              value='online'
              disabled
              className='cursor-not-allowed'
            />
            Online Payment
          </label>
        </div>
        {touched.paymentMethod && errors.paymentMethod && (
          <div className='text-sm text-red-500'>{errors.paymentMethod}</div>
        )}
      </div>

      <div className='flex justify-between'>
        <Button type='button' variant='outline' onClick={() => setStep(2)}>
          Back
        </Button>
        <Button
          type='submit'
          className='rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-500'
        >
          PLACE ORDER
        </Button>
      </div>
      </div>
  )
}