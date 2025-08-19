import { useParams, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import Image from '@/components/image'
import p1 from '@/assets/products/rings-cat.jpg'
import p2 from '@/assets/extra imges/neklase3.webp'
import p3 from '@/assets/products/anklet.webp'
import p4 from '@/assets/products/earrings.avif'
import p5 from '@/assets/products/noserings.webp'
import p6 from '@/assets/products/boring.webp'
import frontimage from '@/assets/extra imges/product-front-image.webp'

const allProducts = [
  { id: 1, title: 'Gold Ring', image: p1, category: 'rings', material: 'gold', price: 200 },
  { id: 2, title: 'Diamond Ring', image: p2, category: 'rings', material: 'diamond', price: 500 },
  { id: 3, title: 'Pearl Necklace', image: p3, category: 'necklace', material: 'pearl', price: 300 },
  { id: 4, title: 'Silver Anklet', image: p4, category: 'anklet', material: 'silver', price: 150 },
  { id: 5, title: 'Stud Earrings', image: p5, category: 'earrings', material: 'gold', price: 120 },
  { id: 6, title: 'Nose Pin', image: p6, category: 'nosering', material: 'silver', price: 80 },
  { id: 7, title: 'Classic Bangle', image: p6, category: 'bangles', material: 'gold', price: 250 }
]

const materialOptions = [
  { label: 'Gold', value: 'gold' },
  { label: 'Diamond', value: 'diamond' },
  { label: 'Pearl', value: 'pearl' },
  { label: 'Silver', value: 'silver' }
]

const priceOptions = [
  { label: 'Below $150', value: 'below150' },
  { label: '$150 - $300', value: '150to300' },
  { label: 'Above $300', value: 'above300' }
]

function filterProducts(
  products: typeof allProducts,
  filters: { material: string[]; price: string[] }
) {
  let filtered = [...products]
  if (filters.material.length > 0) {
    filtered = filtered.filter(p => filters.material.includes(p.material))
  }
  if (filters.price.length > 0) {
    filtered = filtered.filter(p => {
      return filters.price.some((priceRange: string) => {
        if (priceRange === 'below150') return p.price < 150
        if (priceRange === '150to300') return p.price >= 150 && p.price <= 300
        if (priceRange === 'above300') return p.price > 300
        return true
      })
    })
  }
  return filtered
}

const FilterBar = ({
  filters,
  setFilters,
  showMaterial = false
}: {
  filters: { material: string[]; price: string[] }
  setFilters: React.Dispatch<React.SetStateAction<{ material: string[]; price: string[] }>>
  showMaterial?: boolean
}) => (
  <div className="space-y-6">
    {showMaterial && (
      <div>
        <h3 className="font-semibold mb-2">Material</h3>
        <div className="flex flex-col gap-2">
          {materialOptions.map(opt => (
            <label key={opt.value} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.material.includes(opt.value)}
                onChange={e => {
                  setFilters(prev => ({
                    ...prev,
                    material: e.target.checked
                      ? [...prev.material, opt.value]
                      : prev.material.filter(m => m !== opt.value)
                  }))
                }}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    )}
    <div>
      <h3 className="font-semibold mb-2">Price</h3>
      <div className="flex flex-col gap-2">
        {priceOptions.map(opt => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.price.includes(opt.value)}
              onChange={e => {
                setFilters(prev => ({
                  ...prev,
                  price: e.target.checked
                    ? [...prev.price, opt.value]
                    : prev.price.filter(p => p !== opt.value)
                }))
              }}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  </div>
)

const categories = [
  { label: 'Rings', value: 'rings' },
  { label: 'Necklace', value: 'necklace' },
  { label: 'Anklet', value: 'anklet' },
  { label: 'Ear Rings', value: 'earrings' },
  { label: 'Nose Ring', value: 'nosering' },
  { label: 'Borings', value: 'borings' },
  { label: 'Bangles', value: 'bangles' }
]

const productslug = () => {
  const params = useParams({ strict: false }) as { slug?: string }
  const navigate = useNavigate()
  const slug = params.slug

  // For filter modal on mobile
  const [showFilter, setShowFilter] = useState(false)

  // Filter state
  const [filters, setFilters] = useState<{ material: string[]; price: string[] }>({
    material: [],
    price: []
  })

  // Filter products by category (slug)
  const products = allProducts.filter(p => p.category === slug)
  const filteredProducts = filterProducts(products, filters)

  // Handle category change (slug change)
  const handleCategoryClick = (cat: string) => {
    // Change route to /products/:slug
    navigate({ to: `/products/${cat}` })
    // Optionally reset filters
    setFilters({ material: [], price: [] })
    setShowFilter(false)
  }

 

  return (
    <>
      <div>
        <img
          src={frontimage}
          alt="Banner"
          className="h-30 lg:h-80 w-full object-contain md:object-cover transition-all duration-500 ease-out"
        />
      </div>

      <div className="">

        {/* Top left: category filter and filter button (mobile) */}
        <div className="flex items-center justify-between mt-4 mb-4 px-4">
          {/* Category selector */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.value}
                className={`px-3 py-1 rounded-lg border text-sm font-medium capitalize transition ${
                  slug === cat.value
                    ? 'bg-primary text-white '
                    : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                }`}
                onClick={() => handleCategoryClick(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          {/* Filter button for mobile (below md) */}
          <button
            className="md:hidden px-4 py-2 rounded-lg bg-black text-white font-semibold shadow"
            onClick={() => setShowFilter(true)}
          >
            Filter
          </button>
        </div>

        {/* Filter Modal for mobile */}
        {showFilter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="bg-background rounded-xl shadow-lg p-6 w-11/12 max-w-xs relative border border-gray-200">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
                onClick={() => setShowFilter(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-lg font-bold mb-4">Filter</h2>
              <FilterBar filters={filters} setFilters={setFilters} showMaterial={true} />
              <button
                className="mt-4 w-full py-2 rounded-lg bg-black text-white font-semibold"
                onClick={() => setShowFilter(false)}
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Section */}
        <div className="flex h-[calc(100vh-11rem)] gap-8 px-4 py-3">
          {/* Filter sidebar for md+ */}
          <aside className="hidden md:block md:w-64 shrink-0 border rounded-xl shadow overflow-y-auto p-2">
            <FilterBar filters={filters} setFilters={setFilters} showMaterial={true} />
          </aside>

          {/* Products List with Scroll */}
          <div className="flex-1 pr-2">
            <h1 className="text-4xl font-bold text-center capitalize mt-6 mb-10">
              Products in "{slug}"
            </h1>
            <div className="overflow-y-auto">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-0 text-center">
                  <span className="text-red-600 text-xl font-semibold mb-4">
                    No products found with selected filters.
                  </span>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-md"
                    onClick={() => navigate({ to: '/contact' })}
                  >
                    Contact Us
                  </button>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      className="rounded-2xl shadow-lg overflow-hidden bg-card hover:shadow-xl transition-shadow duration-300"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        className="h-56 w-full object-cover"
                      />
                      <div className="p-4 space-y-1">
                        <h2 className="text-lg font-semibold">{product.title}</h2>
                        <p className="text-sm text-gray-500">Material: {product.material}</p>
                        <p className="text-sm text-gray-500">Price: ${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default productslug
