import { Link } from '@tanstack/react-router'
import sideImg from '@/assets/img-10.png'
import { buttonVariants } from '@/components/ui/button'
import Image from '@/components/image'
import { Statistics } from './statistics'

export const About = () => {
  return (
    <section id='about' className='container py-20'>
      <div className='bg-muted/50 rounded-lg border py-12'>
        <div className='flex flex-col-reverse items-center gap-8 px-6 md:flex-row md:gap-12'>
          <div className='shrink-0 sm:w-[400px]'>
            <Image
              src={sideImg}
              alt='About Kumthekar Furniture'
              className='w-full rounded-lg object-contain'
            />
            <div className='-mt-16 rounded-[100%] bg-black/25 p-8 blur-xl dark:bg-white/5'></div>
          </div>
          <div className='flex flex-col justify-between'>
            <div className='pb-6'>
              <h2 className='text-3xl font-bold md:text-4xl'>
                <span className='from-accent-foreground to-primary bg-linear-to-r bg-clip-text text-transparent'>
                  About{' '}
                </span>
                Kumthekar Furniture
              </h2>
              <p className='text-muted-foreground mt-4 text-xl'>
                For over two decades, Kumthekar Furniture has been at the
                forefront of quality craftsmanship and elegant design.
              </p>

              <p className='text-muted-foreground mt-4 text-xl'>
                Our team of designers and carpenters bring functionality and
                aesthetics together in every project - ensuring customer delight
                through personalized service, timely delivery, and timeless
                designs.
              </p>

              <div className='mt-6 flex flex-wrap gap-4'>
                <Link to='/about' className={`${buttonVariants()}`}>
                  Learn More About Us
                </Link>
                <Link
                  to='/about'
                  className={`${buttonVariants({ variant: 'outline' })}`}
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  )
}
