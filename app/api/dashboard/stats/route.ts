import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import Product from '@/lib/models/Product'
import Category from '@/lib/models/Category'
import Order from '@/lib/models/Order'
import User from '@/lib/models/User'
import Contact from '@/lib/models/Contact'

interface OrderItem {
  discount_price?: number | null
  actual_price?: number
  quantity?: number
}

interface OrderLean {
  _id: { toString(): string }
  items?: OrderItem[]
  createdAt?: Date
  user?: { username?: string }
  shipping?: { name?: string }
}

function orderLineTotal(item: OrderItem): number {
  const unit =
    item.discount_price != null ? Number(item.discount_price) : Number(item.actual_price || 0)
  return unit * Number(item.quantity || 1)
}

function orderTotal(order: { items?: OrderItem[] }): number {
  if (!order.items?.length) return 0
  return order.items.reduce((s, it) => s + orderLineTotal(it), 0)
}

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req)
  if (auth instanceof NextResponse) return auth

  try {
    await connectDB()

    const [productCount, categoryCount, userCount, contactCount, ordersLean] =
      await Promise.all([
        Product.countDocuments(),
        Category.countDocuments(),
        User.countDocuments(),
        Contact.countDocuments(),
        Order.find({})
          .select('items createdAt user shipping')
          .sort({ createdAt: -1 })
          .lean() as Promise<OrderLean[]>,
      ])

    const orderCount = ordersLean.length
    const totalRevenue = ordersLean.reduce((s, o) => s + orderTotal(o), 0)

    const now = new Date()
    const monthSlots: { key: string; label: string }[] = []
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      const mon = d.toLocaleString('en', { month: 'short' })
      const yy = String(d.getFullYear()).slice(-2)
      monthSlots.push({ key, label: `${mon} '${yy}` })
    }

    const byMonth = Object.fromEntries(
      monthSlots.map((m) => [m.key, { revenue: 0, count: 0 }])
    )

    for (const o of ordersLean) {
      if (!o.createdAt) continue
      const d = new Date(o.createdAt)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      if (byMonth[key]) {
        byMonth[key].revenue += orderTotal(o)
        byMonth[key].count += 1
      }
    }

    const chartData = monthSlots.map((m) => ({
      name: m.label,
      total: Math.round(byMonth[m.key].revenue),
      orders: byMonth[m.key].count,
    }))

    const recentOrders = ordersLean.slice(0, 8).map((o) => ({
      id: o._id.toString(),
      name: o.shipping?.name || 'Customer',
      email: o.user?.username || '—',
      amount: Math.round(orderTotal(o)),
      createdAt: o.createdAt,
    }))

    return NextResponse.json({
      data: {
        counts: {
          products: productCount,
          categories: categoryCount,
          orders: orderCount,
          users: userCount,
          contacts: contactCount,
        },
        totalRevenue: Math.round(totalRevenue),
        chartData,
        recentOrders,
      },
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ title: 'Internal Server Error' }, { status: 500 })
  }
}
