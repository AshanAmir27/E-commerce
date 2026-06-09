import type { KpiCardProps } from "@/app/types/types";

export default function KpiCard({
  label,
  value,
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
        <p className="mt-1 text-3xl font-bold tabular-nums text-zinc-100">
          {value}
        </p>
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      </div>
    </div>
  );
}
