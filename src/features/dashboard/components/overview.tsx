import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export type OverviewDatum = {
  name: string
  total: number
}

type OverviewProps = {
  data: OverviewDatum[]
}

export function Overview({ data }: OverviewProps) {
  const chartData = data.length ? data : [{ name: '—', total: 0 }]

  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            `₹${Number(value).toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
          }
        />
        <Bar
          dataKey='total'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
