import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import { Skeleton } from '@/components/ui/skeleton'
import { Overview, type OverviewDatum } from './components/overview'
import { RecentSales, type RecentOrderRow } from './components/recent-sales'
import { apiClient } from '@/lib/apiClient'
import { useAuthStore } from '@/stores/authStore'

type AdminStatsPayload = {
  counts: {
    products: number
    categories: number
    orders: number
    users: number
    contacts: number
  }
  totalRevenue: number
  chartData: OverviewDatum[]
  recentOrders: RecentOrderRow[]
}

function formatInr(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

export default function Dashboard() {
  const token = useAuthStore((s) => s.auth.accessToken)
  const [stats, setStats] = useState<AdminStatsPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [errorDetail, setErrorDetail] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      if (!token) {
        setLoading(false)
        setLoadError(true)
        setErrorDetail('Not signed in.')
        return
      }
      setLoading(true)
      setLoadError(false)
      setErrorDetail(null)
      try {
        const res = await apiClient.get('/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!mounted) return
        setStats(res.data?.data ?? null)
      } catch (err: unknown) {
        if (!mounted) return
        setStats(null)
        setLoadError(true)
        const ax = err as {
          response?: { status?: number; data?: { title?: string; message?: string } }
        }
        const status = ax.response?.status
        const title = ax.response?.data?.title
        const msg = ax.response?.data?.message
        if (status === 403 || title === 'Forbidden') {
          setErrorDetail(
            msg ||
              'This dashboard data is only available to admin accounts. Sign in with an admin user.'
          )
        } else if (status === 401) {
          setErrorDetail('Session expired or invalid. Please sign in again.')
        } else {
          setErrorDetail(
            'Could not reach the API. Confirm the backend is running and VITE_APP_API_URL ends with /api (e.g. http://localhost:4000/api).'
          )
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load().catch(() => {})
    return () => {
      mounted = false
    }
  }, [token])

  const c = stats?.counts
  const revenue = stats?.totalRevenue ?? 0
  const chartData = stats?.chartData ?? []
  const recent = stats?.recentOrders ?? []

  return (
    <>
      <Header>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          {loadError && !loading ? (
            <p className='text-destructive max-w-xl text-sm'>
              {errorDetail ??
                'Could not load stats. Check that the API is running and you are signed in as admin.'}
            </p>
          ) : null}
        </div>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total revenue
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='text-muted-foreground h-4 w-4'
                  >
                    <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                  </svg>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className='h-8 w-32' />
                  ) : (
                    <div className='text-2xl font-bold'>{formatInr(revenue)}</div>
                  )}
                  <p className='text-muted-foreground text-xs'>
                    {loading
                      ? '…'
                      : `${c?.orders ?? 0} orders (all time)`}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Orders</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='text-muted-foreground h-4 w-4'
                  >
                    <rect width='20' height='14' x='2' y='5' rx='2' />
                    <path d='M2 10h20' />
                  </svg>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className='h-8 w-16' />
                  ) : (
                    <div className='text-2xl font-bold'>{c?.orders ?? 0}</div>
                  )}
                  <p className='text-muted-foreground text-xs'>
                    From your store database
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Products</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='text-muted-foreground h-4 w-4'
                  >
                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                    <circle cx='9' cy='7' r='4' />
                    <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                  </svg>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className='h-8 w-16' />
                  ) : (
                    <div className='text-2xl font-bold'>{c?.products ?? 0}</div>
                  )}
                  <p className='text-muted-foreground text-xs'>
                    {loading ? '…' : `${c?.categories ?? 0} categories`}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>Users</CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='text-muted-foreground h-4 w-4'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className='h-8 w-16' />
                  ) : (
                    <div className='text-2xl font-bold'>{c?.users ?? 0}</div>
                  )}
                  <p className='text-muted-foreground text-xs'>
                    {loading ? '…' : `${c?.contacts ?? 0} contact messages`}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Revenue by month</CardTitle>
                  <CardDescription>
                    Last 12 months (order totals, ₹)
                  </CardDescription>
                </CardHeader>
                <CardContent className='pl-2'>
                  {loading ? (
                    <Skeleton className='h-[350px] w-full' />
                  ) : (
                    <Overview data={chartData} />
                  )}
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Recent orders</CardTitle>
                  <CardDescription>
                    {loading
                      ? 'Loading…'
                      : `${recent.length} latest from ${c?.orders ?? 0} total orders`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className='space-y-4'>
                      <Skeleton className='h-14 w-full' />
                      <Skeleton className='h-14 w-full' />
                      <Skeleton className='h-14 w-full' />
                    </div>
                  ) : (
                    <RecentSales orders={recent} />
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
