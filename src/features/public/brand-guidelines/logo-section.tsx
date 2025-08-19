import { Download, Check, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from '@/components/image'
import logo_space from '/images/logo-icon.png'
import logo_size from '/images/logo-icon.png'
import greenBg from '/images/logo-icon.png'
import logo from '/images/logo-icon.png'
import logoDark from '/images/logo.png'
import logoLight from '/images/logo.png'

const LogoSection = () => {
  const handleDownload = (imageSrc: string, label: string) => {
    const link = document.createElement('a')
    link.href = imageSrc
    link.download = `${label}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const variants = [
    {
      label: 'Default',
      src: logo,
      imgClass: 'h-20 sm:h-24',
      containerClass: 'bg-background px-6 py-4',
    },
    {
      label: 'Profile',
      src: greenBg,
      imgClass: 'h-20 sm:h-24',
      containerClass: 'bg-muted px-6 py-4',
    },
    {
      label: 'Dark Mode',
      src: logoDark,
      imgClass: 'w-56 h-20 sm:h-24 invert',
      containerClass: 'bg-black px-6 py-4',
    },
    {
      label: 'Light Mode',
      src: logoLight,
      imgClass: 'w-56 h-20 sm:h-24',
      containerClass: 'bg-white px-6 py-4',
    },
  ]

  return (
    <section className='my-12 space-y-10'>
      <div className='px-6'>
        <h2 className='text-accent-foreground mb-2 text-3xl font-semibold'>
          Logo Usage
        </h2>
        <p className='text-muted-foreground mb-8 text-lg'>
          Out logo ensures strong brand recognition & identity.
        </p>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {variants.map((variant, i) => (
            <div className='group cursor-pointer'>
              <Card
                key={i}
                className={`transition-shadow group-hover:shadow-lg ${variant.containerClass}`}
                onClick={() => handleDownload(variant.src, variant.label)}
              >
                <CardContent className='flex items-center justify-center p-4'>
                  <Image
                    className={variant.imgClass}
                    fit='contain'
                    src={variant.src}
                    alt={variant.label}
                  />
                </CardContent>
              </Card>
              <div className='text-muted-foreground group-hover:text-accent-foreground flex items-center justify-between p-2 text-base transition-colors'>
                <span>{variant.label}</span>
                <Download size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='grid grid-cols-1 gap-8 px-6 lg:grid-cols-2'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Clear Space</CardTitle>
          </CardHeader>
          <CardContent className='text-muted-foreground space-y-4'>
            <p>
              Maintain a minimum clearance of <strong>20px</strong> around the
              logo to ensure it stands out.
            </p>
            <div className='flex justify-center'>
              <Image src={logo_space} alt='Clear Space' className='h-40 w-40' />
            </div>
          </CardContent>
        </Card>

        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Minimum Size</CardTitle>
          </CardHeader>
          <CardContent className='text-muted-foreground space-y-4'>
            <p>
              Minimum print size <strong>.75”</strong> wide.
              <br />
              Minimum digital size <strong>60px</strong> wide.
            </p>
            <div className='flex justify-center'>
              <img
                src={logo_size}
                alt='Minimum Size'
                className='h-40 w-40 rounded-md'
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-6 px-6'>
        <Card>
          <CardHeader>
            <CardTitle>Visibility</CardTitle>
          </CardHeader>
          <CardContent className='text-muted-foreground space-y-6'>
            <p>
              When placing a logo on a background, aim for a contrast ratio of{' '}
              <strong>2.25:1</strong> or higher to ensure visibility. If the
              contrast is too low, adjust the background.
            </p>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
              {[
                {
                  text: 'Perfect Contrast',
                  ratio: '4.8:1',
                  check: true,
                  bgColor: 'bg-white',
                  textColor: 'text-black',
                },
                {
                  text: 'Strong Clarity',
                  ratio: '4.2:1',
                  check: true,
                  bgColor: 'bg-zinc-100',
                  textColor: 'text-black',
                },
                {
                  text: 'Good Visibility',
                  ratio: '3.8:1',
                  check: true,
                  bgColor: 'bg-zinc-200',
                  textColor: 'text-black',
                },
                {
                  text: 'Low Readability',
                  ratio: '1.7:1',
                  check: false,
                  bgColor: 'bg-zinc-500',
                  textColor: 'text-gray-200',
                },
                {
                  text: 'Barely Visible',
                  ratio: '1.5:1',
                  check: false,
                  bgColor: 'bg-zinc-600',
                  textColor: 'text-gray-300',
                },
                {
                  text: 'Very Poor',
                  ratio: '1.2:1',
                  check: false,
                  bgColor: 'bg-zinc-700',
                  textColor: 'text-gray-300',
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className={`${item.bgColor} ${item.textColor} text-center`}
                >
                  <CardContent className='flex flex-col items-center py-6'>
                    <img
                      src={logoDark}
                      alt='logo'
                      className='mb-3 w-32 sm:w-40'
                    />
                    <p className='font-medium'>{item.text}</p>
                    <p className='text-sm'>Contrast ratio = {item.ratio}</p>
                    <span
                      className={`text-lg ${
                        item.check ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {item.check ? <Check /> : <X />}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='space-y-6 px-6'>
        <Card>
          <CardHeader>
            <CardTitle>Incorrect Usage & Things to Avoid</CardTitle>
          </CardHeader>
          <CardContent className='text-muted-foreground space-y-6'>
            <p>
              Using our logo consistently ensures brand recognition and allows
              for creativity elsewhere. Avoid these common mistakes to maintain
              the integrity of our brand identity.
            </p>

            <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4'>
              {[
                {
                  text: "Don't stretch or distort the logo",
                  imgClass: 'w-full h-full scale-x-75',
                  containerClass: 'overflow-hidden',
                },
                {
                  text: 'Avoid placing the logo on cluttered backgrounds',
                  imgClass: 'w-24 opacity-75',
                  containerClass:
                    ' bg-linear-to-br from-purple-800 via-green-800 to-pink-800 flex items-center justify-center',
                },
                {
                  text: "Don't crop or cut off the logo",
                  imgClass: 'object-cover scale-150',
                  containerClass: 'overflow-hidden',
                },
                {
                  text: "Don't use on low contrast backgrounds",
                  imgClass: 'w-20 sm:w-24 opacity-50',
                  containerClass:
                    'bg-gray-200 flex items-center justify-center',
                },
                {
                  text: 'Don’t rotate',
                  imgClass: 'object-cover w-20 sm:w-24 h-auto rotate-45',
                  containerClass: '',
                },
                {
                  text: 'Don’t change the color',
                  imgClass:
                    'object-cover w-20 sm:w-24 h-auto filter sepia hue-rotate-[190deg] saturate-[500%]',
                  containerClass: '',
                },
                {
                  text: 'Don’t add effects',
                  imgClass: 'object-cover opacity-80',
                  containerClass:
                    'shadow-3xl shadow-inner shadow-blue-500 bg-linear-to-tr from-transparent via-blue-800 to-transparent',
                },
                {
                  text: 'Don’t use as a pattern',
                  imgClass: 'opacity-30',
                  containerClass: 'bg-repeat relative overflow-hidden',
                  customStyle: {
                    backgroundImage: `url(${logo})`,
                    backgroundSize: '50px',
                  },
                  badge: 'New',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center text-center'
                >
                  <div
                    className={`${item.containerClass} relative mx-auto w-24 rounded-md p-4 sm:w-28`}
                    style={item.customStyle}
                  >
                    {item.badge && (
                      <div className='absolute top-2 -left-8 rotate-[-45deg] bg-red-500 px-8 py-1 text-xs font-bold text-white shadow-lg'>
                        {item.badge}
                      </div>
                    )}
                    <img src={logo} alt={item.text} className={item.imgClass} />
                  </div>
                  <p className='mt-2 text-sm'>{item.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default LogoSection
