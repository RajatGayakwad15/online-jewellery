import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export type RecentOrderRow = {
  id: string
  name: string
  email: string
  amount: number
}

function initials(name: string, email: string) {
  const n = name.trim()
  if (n) {
    const parts = n.split(/\s+/).filter(Boolean)
    if (parts.length >= 2)
      return `${parts[0][0] ?? ''}${parts[1][0] ?? ''}`.toUpperCase().slice(0, 2)
    return (parts[0][0] ?? '?').toUpperCase()
  }
  const e = email.trim()
  return e ? e.charAt(0).toUpperCase() : '?'
}

function formatInr(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

type RecentSalesProps = {
  orders: RecentOrderRow[]
}

export function RecentSales({ orders }: RecentSalesProps) {
  if (!orders.length) {
    return (
      <p className='text-muted-foreground text-sm'>No orders yet.</p>
    )
  }

  return (
    <div className='space-y-8'>
      {orders.map((row) => (
        <div key={row.id} className='flex items-center gap-4'>
          <Avatar className='h-9 w-9 border'>
            <AvatarFallback className='text-xs font-semibold'>
              {initials(row.name, row.email)}
            </AvatarFallback>
          </Avatar>
          <div className='flex min-w-0 flex-1 flex-wrap items-center justify-between gap-2'>
            <div className='min-w-0 space-y-1'>
              <p className='truncate text-sm leading-none font-medium'>
                {row.name}
              </p>
              <p className='text-muted-foreground truncate text-sm'>
                {row.email}
              </p>
            </div>
            <div className='shrink-0 font-medium'>{formatInr(row.amount)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
