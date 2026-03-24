import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
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

function initialsFromProfile(name: string | undefined, email: string | undefined) {
  const n = (name || '').trim()
  if (n.length > 0) return n.charAt(0).toUpperCase()
  const e = (email || '').trim()
  if (e.length > 0) return e.charAt(0).toUpperCase()
  return '?'
}

export function ProfileDropdown() {
  const navigate = useNavigate()
  const token = useAuthStore((s) => s.auth.accessToken)
  const reset = useAuthStore((s) => s.auth.reset)

  const [displayName, setDisplayName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  useEffect(() => {
    if (!token) {
      setDisplayName('')
      setEmail('')
      return
    }

    let mounted = true
    apiClient
      .get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (!mounted) return
        const me = res.data?.data
        setDisplayName(typeof me?.name === 'string' ? me.name : '')
        setEmail(typeof me?.email === 'string' ? me.email : '')
      })
      .catch(() => {
        if (!mounted) return
        setDisplayName('')
        setEmail('')
      })

    return () => {
      mounted = false
    }
  }, [token])

  const letter = useMemo(
    () => initialsFromProfile(displayName, email),
    [displayName, email]
  )

  const handleLogout = () => {
    reset()
    navigate({ to: '/sign-in' })
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-9 w-9 rounded-full p-0'>
          <Avatar className='h-9 w-9 border border-border'>
            <AvatarImage src={undefined} alt='' />
            <AvatarFallback className='text-sm font-semibold'>
              {token ? letter : '?'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        {token ? (
          <>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm leading-none font-medium'>
                  {displayName || email || 'Signed in'}
                </p>
                {email ? (
                  <p className='text-muted-foreground text-xs leading-none'>
                    {email}
                  </p>
                ) : null}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        ) : null}
        <DropdownMenuItem
          className='cursor-pointer'
          onSelect={(e) => {
            e.preventDefault()
            if (token) handleLogout()
            else navigate({ to: '/sign-in' })
          }}
        >
          {token ? 'Log out' : 'Sign in'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
