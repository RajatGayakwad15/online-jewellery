import { Outlet } from '@tanstack/react-router'
import { Footer } from './components/footer'
import { Navbar } from './components/navbar'
import { ScrollToTop } from './components/scroll-to-top'

const AppLayout = () => {
  return (
    <div className='flex min-h-screen flex-col justify-between'>
      {/* top */}
      <div>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>

      {/* bottom */}
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default AppLayout
