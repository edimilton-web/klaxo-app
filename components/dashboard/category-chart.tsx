"use client"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { formatCurrency, resolveSubscriptionColors } from "@/lib/utils"

interface CategoryChartProps {
  data: Array<{ name: string; totalEur: number }>
}

export function CategoryChart({ data }: CategoryChartProps) {
  if (!data.length) return null

  const colors = resolveSubscriptionColors(data.map((d) => d.name))

  return (
    <div className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-5 select-none" style={{ WebkitTapHighlightColor: "transparent" }}>
      <h3 className="mb-4 font-semibold text-white">By subscription</h3>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={78}
            paddingAngle={3}
            dataKey="totalEur"
            nameKey="name"
          >
            {data.map((entry, i) => (
              <Cell key={entry.name} fill={colors[i]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [formatCurrency(Number(value)), name]}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "#1A1A24",
              fontSize: "13px",
              color: "#fff",
            }}
            itemStyle={{ color: "rgba(255,255,255,0.7)" }}
            labelStyle={{ color: "rgba(255,255,255,0.5)" }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {data.map((entry, i) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: colors[i] }} />
            <span className="text-xs text-white/50 truncate max-w-[120px]">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
