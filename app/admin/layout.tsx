'use client'

import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'
import { apiClient } from '@/lib/apiClient'
import { useAuthStore } from '@/stores/authStore'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const defaultOpen = Cookies.get('sidebar_state') !== 'false'
  const router = useRouter()
  const token = useAuthStore((s) => s.auth.accessToken)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function checkAdmin() {
      if (!token) {
        router.push('/sign-in')
        return
      }

      try {
        const res = await apiClient.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        const role = res.data?.data?.role
        if (role !== 'admin') {
          router.push('/401')
          return
        }
        if (isMounted) setChecking(false)
      } catch {
        useAuthStore.getState().auth.reset()
        router.push('/sign-in')
      }
    }

    checkAdmin().catch(() => {})

    return () => {
      isMounted = false
    }
  }, [router, token])

  if (checking) {
    return (
      <div className='flex h-svh items-center justify-center'>Loading...</div>
    )
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
          {children}
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
