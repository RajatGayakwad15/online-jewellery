import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useNavigate } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import { apiClient } from '@/lib/apiClient'
import { useAuthStore } from '@/stores/authStore'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  const navigate = useNavigate()
  const token = useAuthStore((s) => s.auth.accessToken)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function checkAdmin() {
      if (!token) {
        navigate({ to: '/sign-in' })
        return
      }

      try {
        const res = await apiClient.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const role = res.data?.data?.role
        if (role !== 'admin') {
          navigate({ to: '/401' })
          return
        }
        if (isMounted) setChecking(false)
      } catch {
        useAuthStore.getState().auth.reset()
        navigate({ to: '/sign-in' })
      }
    }

    checkAdmin().catch(() => {})

    return () => {
      isMounted = false
    }
  }, [navigate, token])

  if (checking) {
    return <div className='flex h-svh items-center justify-center'>Loading...</div>
  }

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'sm:transition-[width] sm:duration-200 sm:ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
