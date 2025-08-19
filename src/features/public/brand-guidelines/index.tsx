import ColorsSection from './colors-section'
import Header from './header'
import LogoSection from './logo-section'
import TypographySection from './typography-section'

const BrandGuidelines = () => {
  return (
    <div className='container py-20'>
      <Header />
      <LogoSection />
      <ColorsSection />
      <TypographySection />
    </div>
  )
}

export default BrandGuidelines
