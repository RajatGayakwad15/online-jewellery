// import { About } from './components/about'
// import { BrandUsp } from './components/brand-usp'
// import { Cta } from './components/cta'
// import { FAQ } from './components/faq'
import { Hero } from './components/hero'
import NewArrival from './components/newarrival'
import { Products } from './components/products'
import { Service } from './components/service'
// import { Services } from './components/services'
// import { Testimonials } from './components/testimonials'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

const Home = () => {
  return (
    <>
      <Hero />
      {/* <BrandUsp /> */}
      <div className='max-w-[1300px] mx-auto'>
      <Service />
      <Products />
      <div className='mb-10 lg:mt-10 text-center'>
        <Link to='/products' className={`px-8 ${buttonVariants()}`}>
          See All Products
        </Link>
      </div>
      <NewArrival />
      </div>
      {/* <Services /> */}
      {/* <About /> */}
      {/* <Testimonials /> */}
      {/* <Cta /> */}
      {/* <FAQ /> */}
    </>
  )
}

export default Home
