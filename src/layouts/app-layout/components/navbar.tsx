import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import {  buttonVariants } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
// import Image from '@/components/image'
import { ThemeSwitch } from '@/components/theme-switch'
// import Logo from '/images/logo.png'

interface RouteProps {
  href: string
  label: string
}

const routeList: RouteProps[] = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <header className='dark:bg-background/50 sticky top-0 z-40 w-full border-b-[1px] border-black/10 bg-white/50 backdrop-blur-md dark:border-white/10'>
      <NavigationMenu className='mx-auto'>
        <NavigationMenuList className='container flex h-14 w-screen items-center justify-between px-4'>
          {/* Brand Logo */}
          <NavigationMenuItem>
            <Link to='/' className='ml-2 flex items-center text-xl font-bold'>
              {/* <Image src={Logo} alt='logo' className='w-52 dark:invert' /> */}
              Glossary
            </Link>
          </NavigationMenuItem>

          {/* Mobile */}
          <span className='flex items-center gap-2 md:hidden'>
            <ThemeSwitch />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className='px-2'>
                <Menu className='h-5 w-5' />
              </SheetTrigger>
              <SheetContent side='left'>
                <SheetTitle className=''>
                  <Link
                    to='/'
                    className='ml-2 flex items-center text-xl font-bold'
                  >
                    {/* <Image src={Logo} alt='logo' className='w-40 dark:invert' /> */}
                    Glossary
                  </Link>
                </SheetTitle>
                <SheetHeader></SheetHeader>
                <nav className='mt-4 flex flex-col items-start gap-3'>
                  {routeList.map(({ href, label }) => (
                    <Link
                      key={label}
                      to={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          <nav className='hidden gap-2 md:flex'>
            {routeList.map(({ href, label }) => (
              <Link
                key={label}
                to={href}
                className='hover:text-accent-foreground hover:bg-primary/5 relative rounded-lg px-5 py-2 text-sm font-medium transition-all'
                activeProps={{
                  className: 'text-accent-foreground',
                }}
              >
                {({ isActive }) => (
                  <>
                    {label}
                    <span
                      className={`from-accent-foreground to-primary absolute bottom-0 left-0 block h-0.5 w-full rounded bg-gradient-to-r transition-transform duration-300 ${isActive ? 'scale-x-75' : 'scale-x-0'} `}
                    />
                  </>
                )}
              </Link>
            ))}
          </nav>

          {/* Right-side actions */}
          <div className='hidden items-center gap-3 md:flex'>
            {/* <Button variant={'outline'}>
              <ShoppingCart className='mr-1 h-5 w-5' />
              Cart
            </Button> */}
            <ThemeSwitch />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
