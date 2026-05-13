"use client"
import { useState } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from "recharts"
import { formatCurrency, resolveSubscriptionColors } from "@/lib/utils"

interface CategoryChartProps {
  data: Array<{ name: string; totalEur: number }>
}

function ActiveShape(props: any) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 3}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={1}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 13}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.4}
      />
    </g>
  )
}

export function CategoryChart({ data }: CategoryChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)

  if (!data.length) return null

  const colors = resolveSubscriptionColors(data.map((d) => d.name))

  return (
    <div className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-5 select-none" style={{ WebkitTapHighlightColor: "transparent" }}>
      <h3 className="mb-4 font-semibold text-white">By subscription</h3>
      <ResponsiveContainer width="100%" height={190}>
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
            activeIndex={activeIndex}
            activeShape={<ActiveShape />}
            onMouseEnter={(_, i) => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(undefined)}
            onClick={(_, i) => setActiveIndex(activeIndex === i ? undefined : i)}
          >
            {data.map((entry, i) => (
              <Cell
                key={entry.name}
                fill={colors[i]}
                opacity={activeIndex === undefined || activeIndex === i ? 1 : 0.4}
                style={{ cursor: "pointer", transition: "opacity 0.2s" }}
              />
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
          <div
            key={entry.name}
            className="flex items-center gap-1.5 cursor-pointer"
            style={{ opacity: activeIndex === undefined || activeIndex === i ? 1 : 0.4, transition: "opacity 0.2s" }}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(undefined)}
            onClick={() => setActiveIndex(activeIndex === i ? undefined : i)}
          >
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: colors[i] }} />
            <span className="text-xs text-white/50 truncate max-w-[120px]">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
