import { Footer } from './components/footer'
import { Navbar } from './components/navbar'
import { ScrollToTop } from './components/scroll-to-top'

const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen flex-col justify-between'>
      <div>
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default AppLayout
