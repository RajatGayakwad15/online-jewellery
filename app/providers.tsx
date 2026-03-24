'use client'

import { useState } from 'react'
import { AxiosError } from 'axios'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { handleServerError } from '@/utils/handle-server-error'
import { FontProvider } from '@/context/font-context'
import { ThemeProvider } from '@/context/theme-context'
import { Toaster } from '@/components/ui/sonner'

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error) => {
              if (failureCount >= 0 && process.env.NODE_ENV === 'development')
                return false
              if (failureCount > 3 && process.env.NODE_ENV === 'production')
                return false
              return !(
                error instanceof AxiosError &&
                [401, 403].includes(error.response?.status ?? 0)
              )
            },
            refetchOnWindowFocus: process.env.NODE_ENV === 'production',
            staleTime: 10 * 1000,
          },
          mutations: {
            onError: (error) => {
              handleServerError(error)
              if (error instanceof AxiosError) {
                if (error.response?.status === 304) {
                  toast.error('Content not modified!')
                }
              }
            },
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof AxiosError) {
              if (error.response?.status === 401) {
                toast.error('Session expired!')
                useAuthStore.getState().auth.reset()
                router.push('/sign-in')
              }
              if (error.response?.status === 500) {
                toast.error('Internal Server Error!')
                router.push('/500')
              }
            }
          },
        }),
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <FontProvider>
          {children}
          <Toaster duration={50000} />
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools buttonPosition='bottom-left' />
          )}
        </FontProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
