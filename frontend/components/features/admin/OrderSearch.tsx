"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";

function buildOrdersUrl(search: string) {
  const params = new URLSearchParams();
  if (search) {
    params.set("search", search);
  }
  params.set("page", "1");
  return `/admin/orders?${params.toString()}`;
}

function getCurrentOrdersUrl(searchParams: URLSearchParams) {
  const params = new URLSearchParams();
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";

  if (search) {
    params.set("search", search);
  }
  params.set("page", page);

  return `/admin/orders?${params.toString()}`;
}

export default function OrderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [value, setValue] = useState(searchParams.get("search") || "");

  const ordersPage = pathname === "/admin/orders";
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (!ordersPage) return;

    const nextUrl = buildOrdersUrl(debouncedValue);
    const currentUrl = getCurrentOrdersUrl(searchParams);

    if (nextUrl === currentUrl) return;

    router.push(nextUrl);
  }, [debouncedValue, ordersPage, router, searchParams]);

  return (
    <div className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by customer name..."
        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2 pl-10 pr-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
