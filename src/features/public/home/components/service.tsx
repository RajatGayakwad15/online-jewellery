import { TruckIcon, RulerIcon, HandshakeIcon } from 'lucide-react'
import serviceImg from '@/assets/jwellaryset-removebg-preview.png'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// import Image from '../assets/removebackgrondimage.png'

const serviceList = [
  {
    title: 'Free Shipping & Secure Delivery',
    description:
      'Enjoy free shipping on all jewelry orders with secure and insured delivery right to your doorstep.',
    icon: <TruckIcon className='text-primary h-6 w-6' />,
  },
  {
    title: 'Custom Jewelry Design',
    description:
      'Create one-of-a-kind pieces tailored to your style—choose metal, gemstone, engraving, and more.',
    icon: <RulerIcon className='text-primary h-6 w-6' />,
  },
  {
    title: 'Expert Style Consultation',
    description:
      'Our jewelry experts are here to help you find the perfect piece for any occasion or outfit.',
    icon: <HandshakeIcon className='text-primary h-6 w-6' />,
  },
];


export const Service = () => {
  return (
    <>
      <section className='relative container py-20'>
        <div className='grid place-items-center gap-8 lg:grid-cols-[1fr_1fr] p-5'>
          <div>
            {/* <h2 className='text-3xl font-bold md:text-4xl text-white'>
              <span className='from-[#F7C46B] to-[#F29F05] bg-linear-to-r bg-clip-text text-transparent'>
                Customer-First{' '}
              </span>
              Services
            </h2>

            <p className='text-white  mt-4 mb-8 text-xl'>
              We make your jewelry shopping experience effortless and personalized—from browsing to delivery and beyond.
            </p> */}
             <h2 className='text-3xl font-bold md:text-4xl'>
            <span className='from-accent-foreground to-primary bg-linear-to-r bg-clip-text text-transparent'>
              Customer-First{' '}
            </span>
            Services
          </h2>

          <p className='text-muted-foreground mt-4 mb-8 text-xl'>
            We make your furniture shopping experience effortless and
            personalized—before and after purchase.
          </p>

<div className="flex flex-col gap-6 ">
  {serviceList.map(({ icon, title, description }) => (
    <Card key={title}>
      <CardHeader className='flex items-start justify-start gap-4 space-y-1 md:flex-row'>
        <div className='bg-primary/20 mt-1 rounded-2xl p-2'>
          {icon}
        </div>
        <div>
          <CardTitle className='text-xl'>{title}</CardTitle>
          <CardDescription className='text-md mt-2'>
            {description}
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  ))}
</div>

          </div>

          <div className='relative'>
            <img
              src={serviceImg}
              className='z-10 w-[300px] object-contain md:w-[500px] lg:w-[600px]'
              alt='Kumthekar Furniture Services'
            />
            <div className='-mt-8 rounded-[100%] bg-black/25 p-8 blur-xl dark:bg-white/5'></div>
            {/* Light effect */}
            <div className='light-effect'></div>
          </div>
        </div>
      </section>
    </>
  )
}
