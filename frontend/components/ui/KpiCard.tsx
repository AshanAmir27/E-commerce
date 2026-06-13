import type { KpiCardProps } from "@/app/types/types";
import { ArrowUp, ArrowDown } from "lucide-react";


export default function KpiCard({
  label,
  value,
  growthPercentage,
  description,
  icon: Icon,
  iconClassName = "bg-blue-500/15 text-blue-400",
}: KpiCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg shadow-black/20">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
      >
        <Icon className="size-6" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p className="mt-1 text-3xl font-bold tabular-nums text-zinc-100">
            {value}
          </p>
          <div className="mt-1 text-sm flex items-center gap-1 flex flex-col">
            <div className={`flex items-center gap-1 rounded-full px-2 py-1 ${growthPercentage > 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>

              {growthPercentage > 0 ? <ArrowUp className="size-4 text-green-500" /> : <ArrowDown className="size-4 text-red-500" />}
              {growthPercentage > 0 ? <p className="text-green-500">{growthPercentage}%</p> : <p className="text-red-500">{growthPercentage}%</p>}

            </div>
            <span className="text-xs text-zinc-500">vs last month</span>
          </div>
        </div>
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>
    </div>
  );
}
