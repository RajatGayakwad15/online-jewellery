import { useEffect, useState } from 'react'
// import * as React from 'react'
// import toast from 'react-hot-toast'
// import ReactImageMagnify from 'react-image-magnify'
// Icons & Images
import support from '@/assets/icons/customer-support.png'
import Warranty from '@/assets/icons/guarantee.png'
import trophy from '@/assets/icons/trophy 1.png'
import { apiClient } from '@/lib/apiClient'
import { useNavigate, useParams } from '@tanstack/react-router'
// UI components
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import MainImage from './components/main-image'

const features = [
  {
    icon: trophy, // use an icon that fits
    title: "Premium Quality",
    description: "Crafted with genuine diamonds & gold",
  },
  {
    icon: Warranty,
    title: "Authenticity Guarantee",
    description: "Certified by leading gem labs",
  },
  {
    icon: support,
    title: "Lifetime Service",
    description: "Free cleaning & polishing",
  },
];


const ProductView = () => {
  const { category, id } = useParams({ strict: false }) as {
    category?: string
    id: string
  }

  type FieldItem = {
    title: string
    info: string
  }

  type Product = {
    id: string
    name: string
    brand: string
    actual_price: number
    discount_price: number | null
    information: string
    images: string[]
    common_fields: FieldItem[]
    product_details: FieldItem[]
    dimensions_details: FieldItem[]
    warranty: FieldItem[]
  }

  const [productDetails, setProductDetails] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    async function loadProduct() {
      setLoading(true)
      try {
        const res = await apiClient.get(`/products/${id}`)
        const product = res.data?.data as Product | undefined
        if (!isMounted) return
        setProductDetails(product ?? null)
        setSelectedImage(product?.images?.[0] ?? null)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    if (id) loadProduct().catch(() => {})

    return () => {
      isMounted = false
    }
  }, [id])
  // const [productDetails, setProductDetails] = useState(null)
  // const [selectedImage, setSelectedImage] = useState(null)
  // const [loading, setLoading] = useState(true)

  // // Simulate API fetch with dummy data
  // useEffect(() => {
  //   setTimeout(() => {
  //     setProductDetails(dummyProduct)
  //     setSelectedImage(dummyProduct.images[0])
  //     setLoading(false)
  //   }, 1000)
  // }, [])

  // const handleAddCart = () => {
  //   toast.success('Product added to cart!', {
  //     style: { background: '#111', color: '#fff' },
  //   })
  // }

  // const handleRemoveCart = () => {
  //   toast.success('Product removed from cart!', {
  //     style: { background: '#111', color: '#fff' },
  //   })
  // }

  if (loading) {
    return (
      <div className='container mt-12 flex min-h-screen flex-col gap-2 p-5 lg:flex-row lg:ps-4'>
        <Skeleton className='h-[400px] w-full' />
      </div>
    )
  }

  if (!productDetails) {
    return <div className='mt-20 text-center text-xl'>Product Not Found</div>
  }

const handleBuyNow = (product: Product) => {
  navigate({
    to: '/products/$category/$id/order',
    params: {
      category: category ?? '',
      id: String(product.id),
    },
  })
}

  return (
    <>
      <div className='container mt-12 flex min-h-screen flex-col gap-2 p-5 lg:flex-row lg:ps-4'>
        {/* Left: Images */}
        <div className='flex flex-col gap-4 lg:w-[600px] lg:flex-row'>
          <div className='flex gap-3 overflow-auto lg:flex-col'>
            {productDetails.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumb ${i}`}
                className={`h-16 w-16 cursor-pointer rounded border-2 object-cover ${selectedImage === img ? 'border-primary' : 'border-gray-300'
                  }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          <div className='w-full'>
            {/* <img
            src={selectedImage}
            alt="Main"
            className="w-full rounded shadow-md"
          /> */}
            {/* <MainImage
            src={selectedImage}
            className='aspect-square w-full rounded shadow-md'
          /> */}
            {selectedImage && (
              <MainImage
                src={selectedImage}
                className="aspect-square w-full rounded shadow-md"
              />
            )}

                <div className='mt-5 flex gap-3'>
                  <Button className='flex-1'    onClick={() => handleBuyNow(productDetails)}>Buy Now</Button>
              {/* <Link
                key={productDetails?.id}
                to={`/products/${productDetails?.brand}/${productDetails?.id}/order`}
              >
                <Button className='flex-1'>Buy Now</Button>
              </Link> */}
              {/* {!productDetails.cart_status ? (
              <Button variant="outline" className="flex-1" onClick={handleAddCart}>
                Add to Cart
              </Button>
            ) : (
              <Button variant="outline" className="flex-1" onClick={handleRemoveCart}>
                Remove from Cart
              </Button>
            )} */}
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className='px-4 lg:w-[800px]'>
          <h2 className='text-3xl font-bold'>{productDetails.name}</h2>
          <p>
            <strong>Brand:</strong> {productDetails.brand}
          </p>

          <div className='text-2xl font-bold'>
            ₹{productDetails.discount_price ?? productDetails.actual_price}
            {productDetails.discount_price !== null &&
              productDetails.discount_price !== undefined &&
              productDetails.discount_price !== productDetails.actual_price && (
              <span className='ml-2 text-gray-500 line-through'>
                ₹{productDetails.actual_price}
              </span>
            )}
          </div>

          <p className='my-4'>{productDetails.information}</p>

          {/* Features */}
          <div className='grid gap-6 py-6 md:grid-cols-2'>
            {features.map((feature, i) => (
              <div key={i} className='flex items-center gap-4'>
                <img src={feature.icon} alt={feature.title} className='h-8 w-8' />
                <div>
                  <p className='font-bold'>{feature.title}</p>
                  <p className='text-sm'>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Extra Info */}
          <div className='mt-6'>
            <h3 className='text-xl font-semibold'>General</h3>
            <ul>
              {productDetails.common_fields.map((d: FieldItem, idx) => (
                <li key={idx} className='flex justify-between border-b py-1'>
                  <span>{d.title}</span>
                  <span className='font-medium'>{d.info}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </>
  )
}

export default ProductView
