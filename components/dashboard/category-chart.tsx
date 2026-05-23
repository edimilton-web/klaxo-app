"use client"
import { useState, useCallback, useRef } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from "recharts"
import { formatCurrency, resolveSubscriptionColors } from "@/lib/utils"

interface CategoryChartProps {
  data: Array<{ name: string; totalEur: number }>
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

export function CategoryChart({ data }: CategoryChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | undefined>(undefined)
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(undefined)

  const colors = resolveSubscriptionColors(data.map((d) => d.name))

  // selected takes priority over hovered for activeShape
  const activeIndex = selectedIndex !== undefined ? selectedIndex : hoveredIndex

  // Stable ref so activeShape function identity never changes (prevents Recharts remounting)
  const selectedRef = useRef(selectedIndex)
  selectedRef.current = selectedIndex

  const activeShape = useCallback((props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props
    const isSel = selectedRef.current !== undefined
    const glow = isSel
      ? `drop-shadow(0 0 10px ${hexToRgba(fill, 0.7)})`
      : `drop-shadow(0 0 6px ${hexToRgba(fill, 0.4)})`
    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={isSel ? outerRadius + 5 : outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke="#fff"
        strokeWidth={1}
        style={{ filter: glow }}
      />
    )
  }, [])

  if (!data.length) return null

  return (
    <div className="rounded-2xl border border-white/[0.12] bg-[#16161F] p-5 select-none" style={{ WebkitTapHighlightColor: "transparent" }}>
      <h3 className="mb-4 font-semibold text-white">By subscription</h3>

      <div className="relative">
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
              {...({ activeIndex, activeShape } as any)}
              onMouseEnter={(_: any, i: number) => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(undefined)}
              onClick={(_: any, i: number) => setSelectedIndex(selectedIndex === i ? undefined : i)}
            >
              {data.map((entry, i) => (
                <Cell
                  key={entry.name}
                  fill={colors[i]}
                  style={{
                    cursor: "pointer",
                    opacity: activeIndex === undefined || activeIndex === i ? 1 : 0.4,
                    filter: "none",
                    transition: "opacity 0.2s",
                  }}
                />
              ))}
            </Pie>
            {/* Hide tooltip when a segment is selected — center label takes over */}
            {selectedIndex === undefined && (
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
            )}
          </PieChart>
        </ResponsiveContainer>

        {selectedIndex !== undefined && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>
                {data[selectedIndex].name}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
                {formatCurrency(data[selectedIndex].totalEur)}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {data.map((entry, i) => (
          <div
            key={entry.name}
            className="flex items-center gap-1.5 cursor-pointer"
            style={{ opacity: activeIndex === undefined || activeIndex === i ? 1 : 0.4, transition: "opacity 0.2s" }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(undefined)}
            onClick={() => setSelectedIndex(selectedIndex === i ? undefined : i)}
          >
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: colors[i] }} />
            <span className="text-xs text-white/50 truncate max-w-[120px]">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
