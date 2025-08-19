import { Link } from '@tanstack/react-router'
import {
  BicepsFlexed,
  CircleCheck,
  CircleCheckBig,
  ClockArrowUp,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { LightBulbIcon } from '@/components/icons'
import Image from '@/components/image'
import Img1 from '/src/assets/img-1.avif'
import Img3 from '/src/assets/img-3.avif'
import Img5 from '/src/assets/img-5.webp'

export const HeroCards = () => {
  return (
    <div className='relative hidden h-[500px] w-[700px] flex-row flex-wrap gap-8 lg:flex'>
      <a href='#products'>
        <Card className='group absolute -top-[5px] h-[160px] w-[340px] overflow-hidden shadow-black/10 drop-shadow-xl dark:shadow-white/10'>
          <Image
            src={Img1}
            alt='Modern Furniture Showcase'
            className='absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-110'
          />
          <div className='via-primary/20 absolute inset-0 flex flex-col justify-end bg-linear-to-b from-transparent to-black/60 p-4'>
            <CardContent className='p-0'>
              <div className='text-xl font-bold text-white'>New Arrivals</div>
            </CardContent>
          </div>
        </Card>
      </a>

      <a href='#brand-usp'>
        <Card className='group absolute top-12 right-[20px] flex w-80 flex-col items-center justify-center shadow-black/10 drop-shadow-xl dark:shadow-white/10'>
          <div className='from-primary/10 dark:from-primary/0 to-primary/30 dark:to-primary/5 pointer-events-none absolute inset-0 bg-linear-to-br via-transparent' />

          <CardHeader className='mt-10 flex items-center justify-center'>
            <div className='shadow-primary/50 absolute -top-20 h-40 w-40 overflow-hidden rounded-full drop-shadow-xl grayscale-[0%]'>
              <div className='from-primary/30 to-primary/30 absolute inset-0 z-10 flex flex-col justify-end bg-linear-to-tr via-transparent p-4' />
              <Image
                src={Img5} // Keep your image source
                alt='Furniture Quality Showcase'
                className='aspect-square h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-110'
              />
            </div>
          </CardHeader>

          <div className='text-center'>
            <CardTitle className='text-center text-xl font-semibold'>
              Crafted Quality
            </CardTitle>
            <CardDescription className='text-primary font-normal'>
              Modern Durability
            </CardDescription>
          </div>

          <CardFooter>
            <div className='flex w-full justify-around gap-4'>
              <div className='flex flex-col items-center'>
                <BicepsFlexed className='text-primary transition-all delay-100 duration-500 ease-in-out group-hover:-translate-y-1' />
                <span className='mt-1 text-xs'>Sturdy</span>
              </div>
              <div className='flex flex-col items-center'>
                <ClockArrowUp className='text-primary transition-all delay-200 duration-500 ease-in-out group-hover:-translate-y-1' />
                <span className='mt-1 text-xs'>Reliable</span>
              </div>
              <div className='flex flex-col items-center'>
                <CircleCheckBig className='text-primary transition-all delay-300 duration-500 ease-in-out group-hover:-translate-y-1' />
                <span className='mt-1 text-xs'>Assured</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </a>

      <Card className='absolute top-[180px] left-[50px] w-72 shadow-black/10 drop-shadow-xl dark:shadow-white/10'>
        <div className='from-primary/10 dark:from-primary/0 to-primary/30 dark:to-primary/5 pointer-events-none absolute inset-0 flex flex-col justify-end bg-linear-to-br via-transparent p-4' />
        <CardHeader>
          <CardTitle className='item-center flex justify-end'>
            <Badge variant='secondary' className='text-sm'>
              Selling Fast
            </Badge>
          </CardTitle>
          <CardDescription className='flex flex-col gap-2'>
            <span className='text-3xl font-bold'>Chair Collection</span>
            <span className='text-muted-foreground'>
              Discover Your Perfect Chair
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Link to='/products' className={`w-full ${buttonVariants()}`}>
            View Chairs
          </Link>
        </CardContent>

        <hr className='m-auto mb-4 w-4/5' />

        <CardFooter className='flex'>
          <div className='space-y-3'>
            {['Ergonomic Office', 'Stylish Lounge', 'Durable Dining'].map(
              (category: string) => (
                <span key={category} className='flex'>
                  <CircleCheck className='text-green-500' />
                  <h3 className='ml-2'>{category}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>

      <Link to={'/'}>
        <Card className='group absolute -right-[10px] bottom-[15px] h-[180px] w-[350px] overflow-hidden shadow-black/10 drop-shadow-xl dark:shadow-white/10'>
          <Image
            src={Img3}
            className='absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-110'
          />

          <div className='via-primary/20 absolute inset-0 bg-linear-to-b from-transparent to-black/60'>
            <CardHeader className='mt-6 flex flex-row items-center gap-4'>
              <div className='bg-primary/20 rounded-2xl p-1'>
                <LightBulbIcon />
              </div>
              <div>
                <div className='mb-1 text-xl font-bold text-white'>
                  Style Guide
                </div>
              </div>
            </CardHeader>
          </div>
        </Card>
      </Link>
    </div>
  )
}
