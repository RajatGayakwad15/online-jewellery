import { Link } from '@tanstack/react-router'
import p2 from '@/assets/extra imges/neklase3.webp'
import p3 from '@/assets/products/anklet.webp'
import p7 from '@/assets/products/bangles.webp'
import p6 from '@/assets/products/boring.webp'
import p4 from '@/assets/products/earrings.avif'
import p5 from '@/assets/products/noserings.webp'
// import p8 from '@/assets/products/p(8).png'
// import p9 from '@/assets/products/p(9).png'
// import p10 from '@/assets/products/p(10).png'
// import p11 from '@/assets/products/p(11).png'
import p1 from '@/assets/products/rings-cat.jpg'
// import { buttonVariants } from '@/components/ui/button'
import Image from '@/components/image'

export const products = [
  { title: 'Rings', image: p1, category: 'rings' },
  { title: 'Necklace', image: p2, category: 'necklace' },
  { title: 'Anklet', image: p3, category: 'anklet' },
  { title: 'Ear Rings', image: p4, category: 'earrings' },
  { title: 'Nose Ring', image: p5, category: 'nosering' },
  { title: 'Borings', image: p6, category: 'borings' },
  { title: 'Bangles', image: p7, category: 'bangles' },
]

export const Products = () => {
  return (
    <section
      id='products'
      className='container space-y-10 pb-20 md:py-20 lg:pb-0'
    >
      <div className='space-y-2 text-center'>
        <h2 className='text-4xl font-bold tracking-tight lg:text-5xl'>
          Explore Our{' '}
          <span className='from-accent-foreground to-primary bg-gradient-to-r bg-clip-text text-transparent'>
            Products
          </span>
        </h2>
        <p className='text-muted-foreground mx-auto max-w-xl text-lg'>
          Carefully crafted pieces for every corner of your home.
        </p>
      </div>

      <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
        {products.map(({ title, image, category }) => (
          <Link to={`/products/${category}` as any} key={title}>
            <div className='group relative flex h-60 cursor-pointer items-end justify-center overflow-hidden rounded-3xl bg-gradient-to-t from-black/60 to-transparent shadow-lg'>
              <Image
                src={image}
                alt={title}
                className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
              />
              <span className='absolute top-4 left-4 rounded-xl bg-black/60 px-4 py-2 text-lg font-semibold text-white shadow-lg backdrop-blur-md'>
                {title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
