// ProductCategory.tsx
import { useEffect, useState } from 'react'
import { Link, useParams } from '@tanstack/react-router'
// import { X } from 'lucide-react'
// import ReactSlider from 'react-slider'
import Img1 from '@/assets/extra imges/product-front-image.webp'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from '@/components/image'
import rings1 from '@/assets/extra imges/rings1.jpg'
import rings2 from '@/assets/extra imges/rings2.webp'
import necklace1 from '@/assets/extra imges/neklase.jpg'
import necklace2 from '@/assets/extra imges/neklase2.jpg'
import bracelets1 from '@/assets/extra imges/bracelets1.jpeg'
import bracelets2 from '@/assets/extra imges/bracelets2.jpg'
import earrings1 from '@/assets/extra imges/earrings1.jpg'
import earrings2 from '@/assets/extra imges/earrings2.webp'


// ----------------- Dummy Jewelry Data -----------------
const mockCategories = [
  { id: 1, slug: 'rings', name: 'Rings' },
  { id: 2, slug: 'necklace', name: 'Necklace' },
  { id: 3, slug: 'bracelets', name: 'Bracelets' },
  { id: 4, slug: 'earrings', name: 'Earrings' },
]

const mockProducts: Record<string, any[]> = {
  rings: [
    {
      id: 1,
      name: 'Diamond Ring',
      title: '18K Gold Diamond Ring',
      actual_price: 75000,
      discount_price: 69999,
      images: rings1,
    },
    {
      id: 2,
      name: 'Ruby Ring',
      title: 'Ruby Studded Gold Ring',
      actual_price: 55000,
      discount_price: 49999,
      images: rings2,
    },
  ],
  necklace: [
    {
      id: 3,
      name: 'Gold Necklace',
      title: '22K Traditional Gold Necklace',
      actual_price: 150000,
      discount_price: 139999,
      images: necklace1,
    },
    {
      id: 4,
      name: 'Pearl Necklace',
      title: 'Elegant Pearl Necklace',
      actual_price: 90000,
      discount_price: 84999,
      images: necklace2,
    },
  ],
  bracelets: [
    {
      id: 5,
      name: 'Diamond Bracelet',
      title: 'Diamond Studded Bracelet',
      actual_price: 120000,
      discount_price: 115000,
      images: bracelets1,
    },
    {
      id: 6,
      name: 'Gold Kada',
      title: 'Heavy Gold Kada',
      actual_price: 65000,
      discount_price: 60000,
      images: bracelets2,
    },
  ],
  earrings: [
    {
      id: 7,
      name: 'Stud Earrings',
      title: 'Diamond Stud Earrings',
      actual_price: 45000,
      discount_price: 42000,
      images: earrings1,
    },
    {
      id: 8,
      name: 'Jhumkas',
      title: 'Traditional Gold Jhumkas',
      actual_price: 70000,
      discount_price: 65000,
      images: earrings2,
    },
  ],
}
// --------------------------------------------------

export default function ProductCategory() {
  const { category } = useParams({ strict: false }) as { category: string }
  const [modalOpen, setModalOpen] = useState(false)
  const [minVal, setMinVal] = useState(0)
  const [maxVal, setMaxVal] = useState(0)
  const [highest, setHighest] = useState(0)

  const productDetails =
    mockProducts[category as keyof typeof mockProducts] || []

  useEffect(() => {
    if (productDetails.length > 0 && maxVal === 0) {
      const maxPrice = Math.max(...productDetails.map((p) => p.actual_price))
      setMaxVal(maxPrice)
      setHighest(maxPrice)
    }
  }, [productDetails, maxVal])

  const filteredProducts = productDetails.filter(
    (p) => p.actual_price >= minVal && p.actual_price <= maxVal
  )

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
              getProduct={mockCategories}
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
            getProduct={mockCategories}
          />
        </div>

        {/* Products */}
        <div className='flex-1 overflow-auto'>
          <div className='container mx-auto flex flex-wrap justify-center gap-10 p-5'>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  // to={`/products/${category}/${product.id}`}
                  to={`/products/${category}/${product.id}` as any}
                >
                  <Card className='bg-destructive-foreground w-64 rounded-2xl p-3 shadow-md transition'>
                    <div className='relative overflow-hidden rounded-xl'>
                      <Image
                        src={product.images}
                        alt={product.title}
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
