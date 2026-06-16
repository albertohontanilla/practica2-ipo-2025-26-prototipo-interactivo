"use client"

import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip, TooltipProps } from "recharts"

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "white", padding: "10px", borderRadius: 8, fontSize: 11, boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
        <p style={{ margin: 0, marginBottom: 4, color: "oklch(0.5 0 0)" }}>{label}</p>
        <p style={{ margin: 0, color: payload[0].stroke || "oklch(0.62 0.18 40)" }}>
          {payload[0].value}%
        </p>
      </div>
    )
  }
  return null
}

const trendData = [
  { month: "Ene", value: -1.2 },
  { month: "Feb", value: -1.8 },
  { month: "Mar", value: -2.1 },
  { month: "Abr", value: -1.9 },
  { month: "May", value: -2.4 },
  { month: "Jun", value: -2.4 },
]

export default function TrendChart() {
  return (
    <ResponsiveContainer width="100%" height={72}>
      <AreaChart data={trendData} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="oklch(0.62 0.18 40)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="oklch(0.62 0.18 40)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: "oklch(0.5 0 0)" }} axisLine={false} tickLine={false} />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: 'oklch(0.62 0.18 40)', strokeWidth: 1, strokeDasharray: '3 3' }}
        />
        <Area type="monotone" dataKey="value" stroke="oklch(0.62 0.18 40)" strokeWidth={2.5} fill="url(#trendGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
