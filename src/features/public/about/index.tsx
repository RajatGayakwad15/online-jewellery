// import { Link } from '@tanstack/react-router'
// import sideImg from '@/assets/img-10.png'
// import { buttonVariants } from '@/components/ui/button'
// import Image from '@/components/image'
// import { BrandUsp } from '../home/components/brand-usp'
import Mainjwellary from './mainjwellary'
import Clientreview from './clientview'
import CTA from './cta'

const About = () => {
  return (
    <>
      <section id='about' className=''>
        {/* Header */}
        {/* <div className='space-y-2 text-center'>
          <h2 className='text-3xl font-bold lg:text-4xl'>
            About{' '}
            <span className='from-accent-foreground to-primary bg-linear-to-r bg-clip-text text-transparent'>
              Kumthekar
            </span>{' '}
            Furniture
          </h2>
          <p className='text-muted-foreground mx-auto max-w-xl text-lg'>
            Discover Us
          </p>
        </div> */}

        {/* About Section */}
        {/* <div className='mt-12 flex flex-col-reverse items-center gap-8 px-6 md:flex-row md:gap-12'>
          <div className='w-[400px] shrink-0'>
            <Image
              src={sideImg}
              alt='About Kumthekar Furniture'
              className='w-full rounded-lg object-contain'
            />
            <div className='-mt-16 rounded-[100%] bg-black/25 p-8 blur-xl dark:bg-white/5'></div>
          </div>

          <div className='flex flex-col justify-between'>
            <div className='pb-6'>
              <p className='text-muted-foreground mt-4 text-lg'>
                For over two decades, Kumthekar Furniture has been blending
                tradition with innovation, offering a diverse range of home and
                office furniture.
              </p>
              <p className='text-muted-foreground mt-4 text-lg'>
                Our designs reflect timeless Indian craftsmanship infused with
                modern sensibilities. Every piece is handcrafted by skilled
                artisans who pay attention to detail, ensuring both durability
                and elegance.
              </p>
              <p className='text-muted-foreground mt-4 text-lg'>
                We take pride in our personalized customer service, quick
                delivery, and furniture that becomes a part of your story.
              </p>

              <div className='mt-6 flex flex-wrap gap-4'>
                <Link to='/contact' className={`${buttonVariants()}`}>
                  Contact Us
                </Link>
                <Link
                  to='/products'
                  className={`${buttonVariants({ variant: 'outline' })}`}
                >
                  See Our Products
                </Link>
              </div>
            </div>
          </div>
        </div> */}
          <Mainjwellary />
        {/* Mission Section */}
      </section>

      {/* Why Choose Us Section */}
      {/* <BrandUsp /> */}
      <Clientreview />
<CTA />
      {/* <section id='about' className='container py-20 text-center'>
        <h3 className='text-accent-foreground mb-4 text-3xl font-semibold'>
          Our Mission
        </h3>

        <p className='text-muted-foreground mx-auto max-w-3xl text-lg'>
          At Kumthekar Furniture, our mission is to create timeless spaces with
          furniture that blends seamlessly with your lifestyle. We are committed
          to using sustainably sourced materials and ensuring the highest levels
          of craftsmanship in every product.
        </p>
      </section> */}
    </>
  )
}

export default About
