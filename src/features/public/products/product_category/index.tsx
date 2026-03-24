// ProductCategory.tsx
import { useEffect, useState } from 'react'
import { Link, useParams } from '@tanstack/react-router'
// import { X } from 'lucide-react'
// import ReactSlider from 'react-slider'
import Img1 from '@/assets/extra imges/product-front-image.webp'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from '@/components/image'
import { apiClient } from '@/lib/apiClient'

type Category = {
  id: string
  slug: string
  name: string
}

type Product = {
  id: string
  name: string
  brand: string
  actual_price: number
  discount_price: number | null
  images: string[]
  title?: string
}

export default function ProductCategory() {
  const { category } = useParams({ strict: false }) as { category: string }
  const [modalOpen, setModalOpen] = useState(false)
  const [minVal, setMinVal] = useState(0)
  const [maxVal, setMaxVal] = useState(0)
  const [highest, setHighest] = useState(0)

  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    async function loadCategories() {
      const res = await apiClient.get('/categories')
      if (!isMounted) return
      setCategories(res.data?.data ?? [])
    }

    loadCategories().catch(() => {
      // Keep UI stable even if API fails.
    })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    async function loadProducts() {
      setLoading(true)
      setMinVal(0)
      setMaxVal(0)
      setHighest(0)

      const res = await apiClient.get('/products', {
        params: { categorySlug: category },
      })
      if (!isMounted) return
      setProducts(res.data?.data ?? [])
      setLoading(false)
    }

    if (category) {
      loadProducts().catch(() => {
        if (isMounted) setLoading(false)
      })
    }

    return () => {
      isMounted = false
    }
  }, [category])

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => Number(p.actual_price || 0))
      const maxPrice = Math.max(...prices)
      setMaxVal(maxPrice)
      setHighest(maxPrice)
    }
  }, [products])

  const filteredProducts = products.filter((p) => {
    const price = Number(p.actual_price || 0)
    if (maxVal === 0) return price >= minVal
    return price >= minVal && price <= maxVal
  })

  return (
    <div>
      {/* <Image
        src={Img1}
        alt='Jewelry Showcase'
        className='h-30 lg:h-80 w-full object-contain md:object-cover transition-all duration-500 ease-out group-hover:scale-110'
      /> */}
       <img
          src={Img1}
          alt="Modern Jewellery Showcase"
          className="h-30 lg:h-80 w-full object-contain md:object-cover transition-all duration-500 ease-out"
        />

      {/* Mobile Filter Button */}
      <div className='p-4 lg:hidden'>
        <button
          className='bg-accent rounded-full px-4 py-2 text-sm'
          onClick={() => setModalOpen(true)}
        >
          Filters
        </button>
      </div>

      {/* Modal Filter (Mobile) */}
      {modalOpen && (
        <div className='fixed inset-0 z-40 flex'>
          <div className='bg-background animate-slide-in-left h-full w-64 overflow-auto shadow-lg'>
            <FilterComponent
              highest={highest}
              minVal={minVal}
              maxVal={maxVal}
              setMinVal={setMinVal}
              setMaxVal={setMaxVal}
              getProduct={categories}
              setModalOpen={setModalOpen}
            />
          </div>
          <div
            className='flex-1 bg-black/30'
            onClick={() => setModalOpen(false)}
          />
        </div>
      )}

      <div className='flex'>
        {/* Sidebar Filter (Desktop) */}
        <div className='sticky top-13 hidden w-64 lg:block'>
          <FilterComponent
            highest={highest}
            minVal={minVal}
            maxVal={maxVal}
            setMinVal={setMinVal}
            setMaxVal={setMaxVal}
            getProduct={categories}
          />
        </div>

        {/* Products */}
        <div className='flex-1 overflow-auto'>
          <div className='container mx-auto flex flex-wrap justify-center gap-10 p-5'>
            {loading ? (
              <div className='flex h-full items-center justify-center'>
                <div className='font-semibold'>Loading products...</div>
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  // to={`/products/${category}/${product.id}`}
                  to={`/products/${category}/${product.id}` as any}
                >
                  <Card className='bg-destructive-foreground w-64 rounded-2xl p-3 shadow-md transition'>
                    <div className='relative overflow-hidden rounded-xl'>
                      <Image
                        src={product.images?.[0]}
                        alt={product.title ?? product.name}
                        className='h-48 w-full rounded-xl object-cover'
                      />
                    </div>
                    <div className='mt-4 text-center'>
                      <h3 className='text-md font-semibold'>{product.name}</h3>
                      <p className='text-accent-foreground mt-1 font-semibold'>
                        ₹
                        {product.discount_price
                          ? product.discount_price
                          : product.actual_price}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))
            ) : (
              <div className='flex h-full items-center justify-center'>
                <div className='space-y-4 text-center'>
                  <div className='font-semibold'>
                    No jewelry found in this price range
                  </div>
                  <div>
                    <Link to='/contact' className={buttonVariants()}>
                      Please Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <style jsx>{`
        @keyframes slide-in-left {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease-out forwards;
        }
      `}</style> */}
      <div className="animate-slide-in-left">
 
  <style>
    {`
      @keyframes slide-in-left {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(0);
        }
      }
      .animate-slide-in-left {
        animation: slide-in-left 0.3s ease-out forwards;
      }
    `}
  </style>
</div>
    </div>
  )
}

// ---------------- Filter Component ----------------
const FilterComponent = ({
  // highest,
  getProduct,
  // minVal,
  // maxVal,
  // setMinVal,
  // setMaxVal,
  // setModalOpen,
}: any) => (
  <div className='h-full'>
    <div className='bg-background h-full overflow-auto p-4 shadow-md'>
      <div className='flex justify-between'>
        {/* <h2 className='mb-4 text-xl font-semibold'>Filter:</h2>
        {setModalOpen && (
          <div
            className='cursor-pointer lg:hidden'
            onClick={() => setModalOpen(false)}
          >
            <X />
          </div>
        )} */}
      </div>

      {/* <PriceRangeSelector
        initialMin={minVal}
        initialMax={maxVal}
        min={0}
        max={highest}
        onChange={(min, max) => {
          setMinVal(min)
          setMaxVal(max)
        }}
      /> */}

      <h3 className='mt-6 mb-2 font-medium'>Categories</h3>
      <div className='max-h-64 overflow-y-auto pr-1'>
        <ul className='space-y-2'>
          {getProduct?.length > 0 ? (
            getProduct.map((item: any) => (
              <li key={item.id}>
                <Link
                  to={`/products/${item.slug}` as any}
                  className='hover:bg-muted block rounded-md px-3 py-2 text-sm transition-colors'
                >
                  {item.name}
                </Link>
              </li>
            ))
          ) : (
            <li className='text-muted-foreground text-sm'>
              No categories found.
            </li>
          )}
        </ul>
      </div>
    </div>
  </div>
)

// ---------------- Price Range Selector ----------------
// interface PriceRangeSelectorProps {
//   initialMin: number
//   initialMax: number
//   min?: number
//   max?: number
//   onChange?: (min: number, max: number) => void
// }

// const PriceRangeSelector: React.FC<PriceRangeSelectorProps> = ({
//   initialMin,
//   initialMax,
//   min = 0,
//   max = 100000,
//   onChange,
// }) => {
//   const [minVal, setMinVal] = useState(initialMin)
//   const [maxVal, setMaxVal] = useState(initialMax)

//   const MIN_DISTANCE = 1000

//   const handleSliderChange = ([newMin, newMax]: [number, number]) => {
//     setMinVal(newMin)
//     setMaxVal(newMax)
//     onChange?.(newMin, newMax)
//   }

//   const handleInputChange = (type: 'min' | 'max', value: number) => {
//     if (isNaN(value)) return

//     if (type === 'min') {
//       const validated = Math.min(value, maxVal - MIN_DISTANCE)
//       if (validated >= min) {
//         setMinVal(validated)
//         onChange?.(validated, maxVal)
//       }
//     } else {
//       const validated = Math.max(value, minVal + MIN_DISTANCE)
//       if (validated <= max) {
//         setMaxVal(validated)
//         onChange?.(minVal, validated)
//       }
//     }
//   }

//   useEffect(() => {
//     setMinVal(initialMin)
//     setMaxVal(initialMax)
//   }, [initialMin, initialMax])

//   return (
//     <div className='mx-auto w-full max-w-md'>
//       <label className='mb-3 block text-sm font-semibold'>
//         Price Range (₹)
//       </label>

//       <ReactSlider
//         className='relative my-6 h-2 rounded-full'
//         thumbClassName='bg-white border-2 border-primary -translate-y-1.5 rounded-full h-5 w-5 shadow-md cursor-pointer transition-all duration-200 ease-in-out'
//         trackClassName='bg-primary h-2 rounded-full'
//         min={min}
//         max={max}
//         value={[minVal, maxVal]}
//         onChange={handleSliderChange}
//         pearling
//         minDistance={MIN_DISTANCE}
//       />

//       <div className='mt-4 flex items-end justify-between gap-2'>
//         <div className='flex w-full flex-col'>
//           <label className='mb-1 text-xs'>Min</label>
//           <input
//             type='number'
//             value={minVal}
//             onChange={(e) => handleInputChange('min', parseInt(e.target.value))}
//             className='w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
//             min={min}
//             max={maxVal - MIN_DISTANCE}
//           />
//         </div>
//         <span className='mb-1.5'>-</span>
//         <div className='flex w-full flex-col'>
//           <label className='mb-1 text-xs'>Max</label>
//           <input
//             type='number'
//             value={maxVal}
//             onChange={(e) => handleInputChange('max', parseInt(e.target.value))}
//             className='w-full rounded-md border border-gray-300 px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none'
//             min={minVal + MIN_DISTANCE}
//             max={max}
//           />
//         </div>
//       </div>

//       <div className='mt-3 text-center text-sm'>
//         Showing results from <br />₹{minVal.toLocaleString()} to ₹
//         {maxVal.toLocaleString()}
//       </div>
//     </div>
//   )
// }
