"use client"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { formatCurrency } from "@/lib/utils"
import { CATEGORY_COLORS } from "@/lib/utils"

interface CategoryChartProps {
  data: Array<{ category: string; totalEur: number }>
}

export function CategoryChart({ data }: CategoryChartProps) {
  if (!data.length) return null

  return (
    <div className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-5 select-none" style={{ WebkitTapHighlightColor: "transparent" }}>
      <h3 className="mb-4 font-semibold text-white">By category</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="totalEur"
            nameKey="category"
          >
            {data.map((entry) => (
              <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category] ?? "#7C5CFC"} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [formatCurrency(Number(value)), "Monthly"]}
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
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
