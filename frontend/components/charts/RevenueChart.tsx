"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Dropdown, { type DropdownOption } from "../ui/Dropdown";
import { fetchRevenueByTime } from "@/services/analytics.service";

type RevenuePoint = {
  timestamp: string;
  value: number;
};

const periodOptions: DropdownOption[] = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const chartTheme = {
  grid: "#3f3f46",
  axis: "#71717a",
  tick: "#a1a1aa",
  tooltipBg: "#18181b",
  tooltipBorder: "#3f3f46",
  tooltipLabel: "#f4f4f5",
  legend: "#a1a1aa",
  line: "#60a5fa",
  activeDot: "#3b82f6",
};

function formatXAxisTick(tick: string, period: string) {
  if (period !== "daily") {
    return tick;
  }

  const date = new Date(tick);
  if (Number.isNaN(date.getTime())) {
    return tick;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatTooltipLabel(label: string, period: string) {
  if (period !== "daily") {
    return label;
  }

  const date = new Date(label);
  if (Number.isNaN(date.getTime())) {
    return label;
  }

  return date.toLocaleDateString("en-US", { dateStyle: "long" });
}

export default function RevenueChart() {
  const [period, setPeriod] = useState("monthly");
  const [timeSeriesData, setTimeSeriesData] = useState<RevenuePoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const loadRevenue = async () => {
      setIsLoading(true);

      try {
        const data = await fetchRevenueByTime(period);
        if (!isCancelled) {
          setTimeSeriesData(data.revenueByTime);
        }
      } catch (error) {
        console.error("Failed to load revenue chart:", error);
        if (!isCancelled) {
          setTimeSeriesData([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadRevenue();

    return () => {
      isCancelled = true;
    };
  }, [period]);

  return (
    <div className="mt-4 h-[400px] w-[60%] rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg shadow-black/20">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-zinc-300">Sales Overview</h3>
        <Dropdown
          value={period}
          onChange={setPeriod}
          options={periodOptions}
        />
      </div>

      {isLoading ? (
        <div className="flex h-[88%] items-center justify-center text-sm text-zinc-500">
          Loading chart...
        </div>
      ) : timeSeriesData.length === 0 ? (
        <div className="flex h-[88%] items-center justify-center text-sm text-zinc-500">
          No revenue data for this period.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="88%">
          <LineChart
            data={timeSeriesData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(tick) => formatXAxisTick(tick, period)}
              stroke={chartTheme.axis}
              tick={{ fill: chartTheme.tick, fontSize: 12 }}
            />
            <YAxis
              stroke={chartTheme.axis}
              tick={{ fill: chartTheme.tick, fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: chartTheme.tooltipBg,
                borderRadius: "8px",
                borderColor: chartTheme.tooltipBorder,
                borderWidth: 1,
              }}
              labelStyle={{ color: chartTheme.tooltipLabel }}
              itemStyle={{ color: chartTheme.line }}
              labelFormatter={(label) => formatTooltipLabel(String(label), period)}
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Revenue",
              ]}
            />
            <Legend wrapperStyle={{ color: chartTheme.legend }} />
            <Line
              name="Revenue"
              type="monotone"
              dataKey="value"
              stroke={chartTheme.line}
              strokeWidth={2.5}
              activeDot={{ r: 6, fill: chartTheme.activeDot }}
              dot={{ r: 4, fill: chartTheme.line, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
