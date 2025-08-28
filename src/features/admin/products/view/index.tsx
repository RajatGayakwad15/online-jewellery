import { useState, useEffect } from 'react'
// import * as React from 'react'
// import toast from 'react-hot-toast'
// import ReactImageMagnify from 'react-image-magnify'
// Icons & Images
import support from '@/assets/icons/customer-support.png'
import Warranty from '@/assets/icons/guarantee.png'
import trophy from '@/assets/icons/trophy 1.png'
// import Img1 from '@/assets/neklase2.jpg'
import p1 from '@/assets/neklase3.webp'
import p2 from '@/assets/products/anklet.webp'
import p3 from '@/assets/products/noserings.webp'
// import React from 'react'
import { Header } from '@/components/layout/header'
// import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
// import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
// import { useNavigate } from '@tanstack/react-router'
// UI components
// import { Button } from '@/components/ui/button'
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel'
import { Skeleton } from '@/components/ui/skeleton'
// import MainImage from './components/main-image'

// Dummy Data
const dummyProduct = {
  id: 1,
  name: "Diamond Necklace",
  brand: "SparkleJewel",
  actual_price: 120000,
  discount_price: 89999,
  information: "An exquisite diamond necklace crafted with precision and elegance.",
  cart_status: false,
  images: [p1, p2, p3], // replace with your jewelry images
  common_fields: [
    JSON.stringify([{ title: "Material", info: "18K Gold" }]),
    JSON.stringify([{ title: "Stone", info: "Natural Diamonds" }]),
  ],
  product_details: [
    JSON.stringify([{ title: "Occasion", info: "Wedding / Party Wear" }]),
  ],
  dimensions_details: [
    JSON.stringify([{ title: "Length", info: "18 inches" }]),
    JSON.stringify([{ title: "Weight", info: "22 grams" }]),
  ],
  warranty: [JSON.stringify([{ title: "Certification", info: "IGI Certified" }])],
};


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

// const similarProducts = [
//   { id: 2, title: "Gold Earrings", price: "₹45,000", image: Img1 },
//   { id: 3, title: "Diamond Ring", price: "₹65,000", image: p1 },
//   { id: 4, title: "Pearl Bracelet", price: "₹25,000", image: p2 },
// ];


const ViewProducts = () => {

  type Product = {
    id: number;
    name: string;
    brand: string;
    actual_price: number;
    discount_price: number;
    information: string;
    cart_status: boolean;
    images: string[];
    common_fields: string[];
    product_details: string[];
    dimensions_details: string[];
    warranty: string[];
  };

  type FieldItem = {
    title: string;
    info: string;
  };

  // 2. Initialize state with the correct type
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate()

  // 3. useEffect to simulate loading
  useEffect(() => {
    setTimeout(() => {
      setProductDetails(dummyProduct);
      setSelectedImage(dummyProduct.images[0]);
      setLoading(false);
    }, 1000);
  }, []);
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

// const handleBuyNow = (product:any) => {
//   navigate({
//     to: '/products/$category/$id/order',
//     params: {
//       category: product.brand ?? '',
//       id: String(product.id ?? ''),
//     },
//   })
// }

  return (
    <>
    <Header>
        {/* <TopNav links={topNav} /> */}
        <div className='ml-auto flex items-center space-x-4'>
          {/* <Search /> */}
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <div className='container mt-12 flex  flex-col gap-2 p-5 lg:flex-row lg:ps-4'>
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
              <img
                src={selectedImage}
                className="aspect-square w-full rounded shadow-md"
              />
            )}

                {/* <div className='mt-5 flex gap-3'> */}
                  {/* <Button className='flex-1'    onClick={() => handleBuyNow(productDetails)}>Buy Now</Button> */}
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
            {/* </div> */}
          </div>
        </div>

        {/* Right: Details */}
        <div className='px-4 lg:w-[800px]'>
          <h2 className='text-3xl font-bold'>{productDetails.name}</h2>
          <p>
            <strong>Brand:</strong> {productDetails.brand}
          </p>

          <div className='text-2xl font-bold'>
            ₹{productDetails.discount_price || productDetails.actual_price}
            {productDetails.discount_price && (
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
              {productDetails.common_fields.map((field, idx) => {
                let parsed = []
                try {
                  parsed = JSON.parse(field)
                } catch { }
                return parsed.map((d: FieldItem, i: number) => (
                  <li
                    key={`${idx}-${i}`}
                    className='flex justify-between border-b py-1'
                  >
                    <span>{d.title}</span>
                    <span className='font-medium'>{d.info}</span>
                  </li>
                ))
              })}
            </ul>
          </div>

          {/* Similar Products */}

        </div>

      </div>
      {/* <div className=' p-15 mx-auto lg:w-[1200px]'>
        <h3 className='mb-4 text-2xl font-bold'>Similar Products</h3>
        <Carousel>
          <CarouselContent>
            {similarProducts.map((p) => (
              <CarouselItem key={p.id} className='w-[250px] flex-none'>
                <div className='rounded-lg p-3 shadow-md'>
                  <img
                    src={p.image}
                    alt={p.title}
                    className='h-40 w-full rounded object-cover'
                  />
                  <p className='mt-2 font-semibold'>{p.title}</p>
                  <p className='text-gray-700'>{p.price}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div> */}
    </>
  )
}

export default ViewProducts
