"use client";

import { useMemo } from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";
import type { PieSectorShapeProps } from "recharts/types/polar/Pie";

type CustomerSegment = {
  city: string;
  value: number;
};

const SEGMENT_COLORS = [
  "#60a5fa",
  "#34d399",
  "#fbbf24",
  "#4ade80",
  "#a78bfa",
  "#22d3ee",
  "#fb7185",
  "#fb923c",
];

const chartTheme = {
  tooltipBg: "#18181b",
  tooltipBorder: "#3f3f46",
  tooltipLabel: "#f4f4f5",
};

function renderPieSector(props: PieSectorShapeProps) {
  return <Sector {...props} stroke="#09090b" strokeWidth={1} />;
}

export default function CustomerChart({ data }: { data: CustomerSegment[] }) {
  const chartData = useMemo(
    () =>
      [...data]
        .map((item, index) => ({
          city: item.city,
          value: Number(item.value) || 0,
          fill: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
        }))
        .sort((a, b) => b.value - a.value),
    [data],
  );

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="mt-4 flex h-[420px] min-w-[280px] flex-1 flex-col rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg shadow-black/20">
      <div className="mb-4 shrink-0">
        <h3 className="text-lg font-semibold text-zinc-300">Customers by City</h3>
        <p className="text-sm text-zinc-500">
          {total.toLocaleString()} total signups across {chartData.length} cities
        </p>
      </div>

      <div className="flex min-h-0 flex-1 gap-4">
        <div className="min-w-0 flex-1">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="city"
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="85%"
                paddingAngle={2}
                minAngle={3}
                shape={renderPieSector}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartTheme.tooltipBg,
                  borderRadius: "8px",
                  borderColor: chartTheme.tooltipBorder,
                  borderWidth: 1,
                }}
                labelStyle={{ color: chartTheme.tooltipLabel }}
                formatter={(value, name) => [
                  `${Number(value).toLocaleString()} (${total > 0 ? ((Number(value) / total) * 100).toFixed(1) : "0.0"}%)`,
                  name,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <ul className="flex w-36 shrink-0 flex-col gap-2 overflow-y-auto pr-1 text-sm">
          {chartData.map((item) => (
            <li key={item.city} className="flex items-start gap-2">
              <span
                className="mt-1 size-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <div className="min-w-0">
                <p className="truncate text-zinc-300">{item.city}</p>
                <p className="text-xs text-zinc-500">
                  {item.value.toLocaleString()}
                  {total > 0 && ` · ${((item.value / total) * 100).toFixed(1)}%`}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
