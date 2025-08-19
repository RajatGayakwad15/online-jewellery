import { TruckIcon, RulerIcon, HandshakeIcon } from 'lucide-react'
import serviceImg from '@/assets/img-8.png'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from '@/components/image'

const serviceList = [
  {
    title: 'Free Delivery & Installation',
    description:
      'We deliver and install your furniture right to your home, completely free of charge within select regions.',
    icon: <TruckIcon className='text-primary h-6 w-6' />,
  },
  {
    title: 'Custom Design Options',
    description:
      'Choose your preferred size, color, fabric, or finish. We build it the way you want it.',
    icon: <RulerIcon className='text-primary h-6 w-6' />,
  },
  {
    title: 'Personal Consultation',
    description:
      'Need help choosing? Our interior consultants help match the best furniture for your space and taste.',
    icon: <HandshakeIcon className='text-primary h-6 w-6' />,
  },
]

export const Services = () => {
  return (
    <section className='relative container py-20'>
      <div className='grid place-items-center gap-8 lg:grid-cols-[1fr_1fr]'>
        <div>
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

          <div className='flex flex-col gap-8'>
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
          <Image
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
  )
}
