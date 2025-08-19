import { Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'

export const Cta = () => {
  return (
    <section
      id='cta'
      className='from-primary/25 dark:from-primary/10 to-primary/15 dark:to-primary/5 my-10 bg-linear-to-br via-transparent py-20 dark:via-transparent'
    >
      <div className='container place-items-center lg:grid lg:grid-cols-2'>
        <div className='lg:col-start-1'>
          <h2 className='text-3xl font-bold md:text-4xl'>
            Turn Your House Into a
            <span className='from-accent-foreground to-primary bg-linear-to-b bg-clip-text text-transparent'>
              {' '}
              Beautiful Home
            </span>
          </h2>
          <p className='text-muted-foreground mt-4 mb-8 text-xl lg:mb-0'>
            Discover premium, handcrafted furniture that fits your style and
            space. From luxurious sofas to smart storage solutions, we design
            with your comfort in mind.
          </p>
        </div>

        <div className='space-y-4 lg:col-start-2'>
          <Link
            to='/contact'
            className={`w-full md:mr-4 md:w-auto ${buttonVariants()}`}
          >
            Get a Custom Quote
          </Link>
          <Link
            to='/products'
            className={`w-full md:w-auto ${buttonVariants({
              variant: 'outline',
            })}`}
          >
            Browse Our Products
          </Link>
        </div>
      </div>
    </section>
  )
}
