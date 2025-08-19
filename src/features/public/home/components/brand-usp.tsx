import { ShieldCheck, Truck, BadgeCheck, HandPlatter } from 'lucide-react'

const brandUsp = [
  {
    icon: <ShieldCheck size={40} className='text-primary' />,
    title: 'Trusted Quality',
    subtitle: 'Certified materials used',
  },
  {
    icon: <Truck size={40} className='text-primary' />,
    title: 'Free Shipping',
    subtitle: 'On ₹999+ orders',
  },
  {
    icon: <BadgeCheck size={40} className='text-primary' />,
    title: '5-Year Warranty',
    subtitle: 'Built to last long',
  },
  {
    icon: <HandPlatter size={40} className='text-primary' />,
    title: 'Custom Support',
    subtitle: 'Tailored assistance always',
  },
]

export const BrandUsp = () => {
  return (
    <section
      id='brand-usp'
      className='from-primary/25 dark:from-primary/10 to-primary/15 dark:to-primary/5 bg-linear-to-br via-transparent dark:via-transparent'
    >
      <div className='container py-20'>
        <div className='mb-12 space-y-2 text-center'>
          <h2 className='text-3xl font-bold md:text-center lg:text-4xl'>
            Why Choose{' '}
            <span className='from-accent-foreground to-primary bg-linear-to-r bg-clip-text text-transparent'>
              Kumthekar Furniture?
            </span>
          </h2>
          <p className='text-muted-foreground mx-auto max-w-3xl text-lg'>
            Our commitment to excellence, craftsmanship, and customer
            satisfaction sets us apart.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {brandUsp.map(({ icon, title, subtitle }) => (
            <div key={title} className='flex items-center gap-4 p-4'>
              <div className='shrink-0'>{icon}</div>
              <div className='space-y-1'>
                <h3 className='text-xl font-semibold'>{title}</h3>
                <p className='text-muted-foreground text-sm'>{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
