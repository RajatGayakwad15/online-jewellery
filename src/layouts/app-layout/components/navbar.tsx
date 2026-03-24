import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ThemeSwitch } from '@/components/theme-switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { apiClient } from '@/lib/apiClient'
import { useAuthStore } from '@/stores/authStore'

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

function initialsFromProfile(name: string | undefined, email: string | undefined) {
  const n = (name || '').trim()
  if (n.length > 0) {
    const parts = n.split(/\s+/).filter(Boolean)
    if (parts.length >= 2)
      return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase().slice(0, 2)
    return (parts[0][0] ?? '?').toUpperCase()
  }
  const e = (email || '').trim()
  if (e.length > 0) return e.charAt(0).toUpperCase()
  return '?'
}

function AuthMenu({ variant }: { variant: 'desktop' | 'mobile' }) {
  const navigate = useNavigate()
  const token = useAuthStore((s) => s.auth.accessToken)
  const reset = useAuthStore((s) => s.auth.reset)
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<string | undefined>()

  useEffect(() => {
    if (!token) {
      setDisplayName('')
      setEmail('')
      setRole(undefined)
      return
    }
    let mounted = true
    apiClient
      .get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (!mounted) return
        const me = res.data?.data
        setDisplayName(typeof me?.name === 'string' ? me.name : '')
        setEmail(typeof me?.email === 'string' ? me.email : '')
        setRole(typeof me?.role === 'string' ? me.role : undefined)
      })
      .catch(() => {
        if (!mounted) return
        setDisplayName('')
        setEmail('')
        setRole(undefined)
      })
    return () => {
      mounted = false
    }
  }, [token])

  const letter = useMemo(
    () => initialsFromProfile(displayName, email),
    [displayName, email]
  )

  const logout = () => {
    reset()
    navigate({ to: '/sign-in' })
  }

  if (!token) {
    return (
      <Link to='/sign-in' className={buttonVariants()}>
        Login
      </Link>
    )
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          type='button'
          className={
            variant === 'mobile'
              ? 'mt-2 h-10 w-10 shrink-0 rounded-full p-0'
              : 'relative h-9 w-9 rounded-full p-0'
          }
          aria-label='Account menu'
        >
          <Avatar className='h-9 w-9 border border-border'>
            <AvatarImage src={undefined} alt='' />
            <AvatarFallback className='text-sm font-semibold'>{letter}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end'>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>
              {displayName || email || 'Account'}
            </p>
            {email ? (
              <p className='text-muted-foreground text-xs leading-none'>{email}</p>
            ) : null}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {role === 'admin' ? (
          <DropdownMenuItem asChild className='cursor-pointer'>
            <Link to='/admin'>Admin dashboard</Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem className='cursor-pointer' onSelect={logout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <header className='dark:bg-background/50 sticky top-0 z-40 w-full border-b-[1px] border-black/10 bg-white/50 backdrop-blur-md dark:border-white/10'>
      <NavigationMenu className='mx-auto'>
        <NavigationMenuList className='container flex h-14 w-screen items-center justify-between px-4'>
          <NavigationMenuItem>
            <Link to='/' className='ml-2 flex items-center text-xl font-bold'>
              Glossary
            </Link>
          </NavigationMenuItem>

          <span className='flex items-center gap-2 md:hidden'>
            <ThemeSwitch />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className='px-2'>
                <Menu className='h-5 w-5' />
              </SheetTrigger>

              <SheetContent
                side='left'
                className='fixed top-4 z-50 ml-4 h-[350px] w-[85%] max-w-xs rounded-md border border-gray-200 bg-white px-4 shadow-lg dark:border-gray-800 dark:bg-gray-900'
              >
                <SheetTitle>
                  <Link
                    to='/'
                    className='mt-4 ml-2 flex items-center text-xl font-bold'
                    onClick={() => setIsOpen(false)}
                  >
                    Glossary
                  </Link>
                </SheetTitle>

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
                <div
                  className='mt-4 flex justify-center'
                  onClick={(e) => e.stopPropagation()}
                >
                  <AuthMenu variant='mobile' />
                </div>
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

          <div className='hidden items-center gap-3 md:flex'>
            <ThemeSwitch />
            <AuthMenu variant='desktop' />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
