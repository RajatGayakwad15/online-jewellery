export const Statistics = () => {
  interface statsProps {
    quantity: string
    description: string
  }

  const stats: statsProps[] = [
    {
      quantity: '5,000+',
      description: 'Happy Customers',
    },
    {
      quantity: '250+',
      description: 'Premium Products',
    },
    {
      quantity: '10+',
      description: 'Years of Excellence',
    },
    {
      quantity: '500+',
      description: 'Cities Served',
    },
  ]

  return (
    <section id='statistics'>
      <div className='grid grid-cols-2 gap-8 lg:grid-cols-4'>
        {stats.map(({ quantity, description }: statsProps) => (
          <div key={description} className='space-y-2 text-center'>
            <h2 className='text-3xl font-bold sm:text-4xl'>{quantity}</h2>
            <p className='text-muted-foreground text-xl'>{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
