const TypographySection = () => {
  return (
    <section className='my-16 px-6'>
      {/* Section Title */}
      <h2 className='text-accent-foreground mb-2 text-3xl font-semibold'>
        Typography Guidelines
      </h2>
      <p className='text-muted-foreground mb-8 text-lg'>
        Our typography reflects the timeless sophistication of Kumthekar
        Furniture. It is warm, elegant, and legible – designed to match the
        harmony of wood, gold, and craftsmanship.
      </p>

      {/* Font Family */}
      <div className='bg-card mt-10 rounded-xl border p-6 shadow-xs'>
        <h3 className='text-foreground mb-2 text-xl font-semibold'>
          Primary Typeface
        </h3>
        <p className='text-foreground text-3xl font-bold tracking-tight sm:text-4xl'>
          System UI
        </p>
        <p className='text-muted-foreground mt-2'>
          A modern and minimal sans-serif typeface with a luxurious character,
          perfect for refined branding and user interfaces.
        </p>
      </div>

      {/* Typography Samples */}
      <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[
          {
            name: 'Heading',
            example: (
              <h2 className='text-3xl font-bold lg:text-4xl'>
                About{' '}
                <span className='from-accent-foreground to-primary bg-linear-to-r bg-clip-text text-transparent'>
                  Kumthekar
                </span>{' '}
                Furniture
              </h2>
            ),
          },
          {
            name: 'Section Heading',
            example: (
              <p className='text-accent-foreground text-3xl font-semibold'>
                Typography Guidelines
              </p>
            ),
          },
          {
            name: 'Subheading',
            example: (
              <p className='text-muted-foreground'>
                We take pride in our personalized customer service.
              </p>
            ),
          },
          {
            name: 'Paragraph',
            example: (
              <p className='text-muted-foreground text-lg'>
                Kumthekar Furniture has delivered timeless designs with
                unmatched craftsmanship.
              </p>
            ),
          },
          {
            name: 'Body Text',
            example: (
              <p>
                Our carpenters and designers combine form and function to create
                long-lasting comfort and style.
              </p>
            ),
          },
          {
            name: 'Caption',
            example: (
              <p className='text-muted-foreground text-sm'>
                Handcrafted with care. Delivered with pride.
              </p>
            ),
          },
        ].map((typo, i) => (
          <div
            key={i}
            className='bg-card flex flex-col gap-2 rounded-lg border p-4 shadow-xs'
          >
            <h4 className='text-foreground text-lg font-medium'>{typo.name}</h4>
            {typo.example}
          </div>
        ))}
      </div>
    </section>
  )
}

export default TypographySection
