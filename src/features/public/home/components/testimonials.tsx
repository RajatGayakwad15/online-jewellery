import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TestimonialProps {
  image: string
  name: string
  comment: string
}

const testimonials: TestimonialProps[] = [
  {
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Aarti Kumthekar',
    comment:
      'The sofa I bought was not just stylish, but incredibly comfortable. Delivery was quick and the team set it up perfectly!',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Ravi Sinha',
    comment:
      'Loved the craftsmanship! I got a custom wardrobe made and it blends beautifully with my bedroom decor.',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Sneha Patil',
    comment:
      'Their consultation service helped me redesign my entire living room. The center table is a show-stopper!',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/47.jpg',
    name: 'Amit Thakur',
    comment:
      'Exceptional quality and value. I ordered a dining set and it exceeded expectations. The polish, the wood, everything feels premium.',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/12.jpg',
    name: 'Nilesh Kadam',
    comment:
      'Fast delivery and perfect fit. The office chair I got is ergonomic and looks great in my workspace.',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/15.jpg',
    name: 'Meera Joshi',
    comment:
      "We bought a kids' bed and a study table — both look adorable and sturdy. Highly recommended for families.",
  },
]

export const Testimonials = () => {
  return (
    <section id='testimonials' className='container py-20'>
      <h2 className='text-3xl font-bold md:text-4xl'>
        Hear from Our
        <span className='from-accent-foreground to-primary bg-linear-to-b bg-clip-text text-transparent'>
          {' '}
          Happy Customers
        </span>
      </h2>

      <p className='text-muted-foreground pt-4 pb-8 text-xl'>
        Real stories from real people who furnished their spaces with
        Kumthekar’s elegant designs.
      </p>

      <div className='mx-auto grid columns-2 space-y-4 sm:block md:grid-cols-2 lg:columns-3 lg:grid-cols-4 lg:gap-6 lg:space-y-6'>
        {testimonials.map(({ image, name, comment }: TestimonialProps, i) => (
          <Card
            key={i}
            className='max-w-md gap-2 overflow-hidden md:break-inside-avoid'
          >
            <CardHeader className='flex flex-row items-center gap-4'>
              <Avatar className='size-10'>
                <AvatarImage alt={name} src={image} />
                <AvatarFallback>
                  {name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className='flex flex-col'>
                <CardTitle className='text-lg'>{name}</CardTitle>
              </div>
            </CardHeader>

            <CardContent className='text-muted-foreground text-sm'>
              {comment}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
