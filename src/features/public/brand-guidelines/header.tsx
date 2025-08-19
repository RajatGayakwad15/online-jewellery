import { Link } from '@tanstack/react-router'
import branding from '@/assets/branding/branding.png'
import { buttonVariants } from '@/components/ui/button'

const Header = () => {
  return (
    <>
      {/* Header Section */}
      <header className='mb-16 space-y-4 text-center'>
        <h2 className='text-3xl font-bold lg:text-4xl'>
          Kumthekar{' '}
          <span className='from-accent-foreground to-primary bg-linear-to-r bg-clip-text text-transparent'>
            Furniture
          </span>{' '}
          Brand Guidelines
        </h2>
        <p className='text-muted-foreground mx-auto max-w-xl text-lg'>
          A timeless expression of craftsmanship, comfort, and elegance.
        </p>
      </header>

      <div className='mx-[4vw] mb-20 flex flex-col items-center justify-between gap-10 sm:flex-row'>
        {/* Branding Image */}
        <div className='relative mx-auto w-[90%] max-w-4xl overflow-hidden rounded-xl shadow-md sm:w-[45%]'>
          <div className='relative w-full pb-[50%]'>
            <div
              className='animate-scroll absolute inset-0 bg-cover bg-center'
              style={{ backgroundImage: `url(${branding})` }}
            />
          </div>
        </div>

        {/* Description */}
        <section className='w-[90%] space-y-6 sm:w-[50%]'>
          <p className='text-muted-foreground text-lg'>
            The{' '}
            <span className='from-accent-foreground to-primary bg-linear-to-r bg-clip-text font-semibold text-transparent'>
              Kumthekar Furniture
            </span>{' '}
            identity is rooted in timeless design, quality materials, and a deep
            commitment to the art of furniture-making. Our visual brand evokes
            warmth, tradition, and contemporary luxury—crafted to elevate every
            home.
          </p>
          <p className='text-muted-foreground text-lg'>
            Our signature earthy tones and premium textures reflect natural
            elegance. To preserve the brand's integrity, our logo, colors, and
            typography should always align with these core values.
          </p>

          <div className='pt-4 text-right'>
            <Link to='/about' className={buttonVariants()}>
              Learn More About Us
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

export default Header
