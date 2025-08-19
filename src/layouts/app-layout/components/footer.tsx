import { Link } from '@tanstack/react-router'
// import Image from '@/components/image'
// import Logo from '/images/logo.png'

export const Footer = () => {
  return (
    <footer id='footer'>
      <hr className='mx-auto w-11/12' />

      <section className='container flex flex-wrap justify-between gap-12 pt-8 pb-14'>
        {/* Branding & Tagline */}
        <div className='space-y-4'>
          <a href='/' className='flex items-center gap-2 text-2xl font-bold'>
            {/* <Image src={Logo} alt='logo' className='w-52 dark:invert' /> */}
            Glossary
          </a>
          <p className='text-muted-foreground max-w-xs text-sm leading-relaxed'>
            Jewellery that celebrates your beauty with elegance, purity, and
            style.
          </p>
        </div>

        <div className='flex flex-wrap gap-12'>
          {/* Quick Links */}
          <div className='space-y-3 text-sm'>
            <h3 className='text-lg font-semibold'>Quick Links</h3>
            <ul className='text-muted-foreground flex flex-col gap-2'>
              <li>
                <Link
                  to='/'
                  className='hover:text-accent-foreground transition'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/products'
                  className='hover:text-accent-foreground transition'
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to='/about'
                  className='hover:text-accent-foreground transition'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to='/contact'
                  className='hover:text-accent-foreground transition'
                >
                  Contact
                </Link>
              </li>
              {/* <li>
                <Link
                  to='/brand-guidelines'
                  className='hover:text-accent-foreground transition'
                >
                  Brand Guidelines
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Address */}
          <div className='space-y-3 text-sm'>
            <h3 className='text-lg font-semibold'>Visit Our Store</h3>
            <p className='text-muted-foreground'>
              {/* Kumthekar Furniture, Main Road, Kolhapur 416001 <br />
              Maharashtra, India */}
              Shreesha Jewellers MG Road, Near Brigade Road, <br />
              Bengaluru – 560001, Karnataka, India
            </p>
            <p className='text-muted-foreground'>
              <strong>Phone:</strong> +91 88888 88888 <br />
              <strong>Email:</strong> shreesha.com
            </p>
          </div>
        </div>
      </section>

      {/* Footer bottom */}
      <hr className='mx-auto w-11/12' />
      <section className='container flex flex-col items-center justify-between gap-2 pt-4 pb-6 lg:flex-row'>
        <p className='text-muted-foreground text-sm'>
          &copy; {new Date().getFullYear()} Shreesha. All rights reserved.
        </p>
        {/* <p className='flex items-center gap-2 text-sm'>
          <Link to='/privacy-policy'>Privacy Policy</Link>|
          <Link to='/terms'>Terms & Conditions</Link>
        </p> */}
        <p className='text-muted-foreground text-sm'>
          Designed and Developed by{' '}
          <a
            href='https://rajat-portfolio-react.vercel.app/'
            target='_blank'
            className='text-accent-foreground transition hover:underline'
          >
            Rajat Gayakwad
          </a>
        </p>
      </section>
    </footer>
  )
}
