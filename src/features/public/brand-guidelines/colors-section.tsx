const ColorsSection = () => {
  const colors = [
    // Light Theme Colors
    {
      name: 'Background',
      hsl: '30 30% 96%',
      hex: '#f6f1e9',
      context: 'Page background',
    },
    {
      name: 'Foreground',
      hsl: '30 30% 12%',
      hex: '#2c251c',
      context: 'Text on light backgrounds',
    },
    {
      name: 'Card',
      hsl: '30 30% 98%',
      hex: '#fbf8f3',
      context: 'Card backgrounds',
    },
    {
      name: 'Card Foreground',
      hsl: '30 30% 10%',
      hex: '#251f18',
      context: 'Text on cards',
    },
    {
      name: 'Primary',
      hsl: '38 80% 50%',
      hex: '#f0b324',
      context: 'Buttons, key actions',
    },
    {
      name: 'Primary Foreground',
      hsl: '30 30% 10%',
      hex: '#251f18',
      context: 'Text on primary',
    },
    {
      name: 'Secondary',
      hsl: '30 20% 88%',
      hex: '#e9e3d8',
      context: 'Subtle surfaces',
    },
    {
      name: 'Accent',
      hsl: '38 50% 85%',
      hex: '#f5edd7',
      context: 'Highlights, badges',
    },
    {
      name: 'Accent Foreground',
      hsl: '31 100% 38%',
      hex: '#815700',
      context: 'Text on accents',
    },
    {
      name: 'Muted',
      hsl: '30 20% 90%',
      hex: '#ece7dc',
      context: 'Muted areas, inputs',
    },
    {
      name: 'Muted Foreground',
      hsl: '30 15% 35%',
      hex: '#5d5346',
      context: 'Text on muted',
    },
    {
      name: 'Destructive',
      hsl: '0 70% 45%',
      hex: '#cc2f2f',
      context: 'Errors, deletions',
    },
    {
      name: 'Destructive Foreground',
      hsl: '0 0% 100%',
      hex: '#ffffff',
      context: 'Text on destructive',
    },
  ]

  return (
    <section className='my-16 px-6'>
      <h2 className='text-accent-foreground mb-2 text-3xl font-semibold'>
        Colors
      </h2>
      <p className='text-muted-foreground mb-8 text-lg'>
        A refined and elegant palette rooted in warm browns and golden tones.
      </p>

      <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {colors.map((color, idx) => (
          <div
            key={idx}
            className='bg-card flex items-start gap-5 rounded-lg border p-4 shadow-xs'
          >
            <div
              className='h-16 w-16 rounded-full border shadow-md'
              style={{ backgroundColor: color.hex }}
            ></div>
            <div>
              <h3 className='text-foreground text-lg font-bold'>
                {color.name}
              </h3>
              <p className='text-muted-foreground text-sm'>{color.context}</p>
              <p className='mt-1 text-xs'>
                <span className='font-semibold'>HSL:</span> {color.hsl}
              </p>
              <p className='text-xs'>
                <span className='font-semibold'>HEX:</span> {color.hex}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ColorsSection
