"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";

function buildCustomersUrl(search: string) {
  const params = new URLSearchParams();
  if (search) {
    params.set("search", search);
  }
  params.set("page", "1");
  return `/admin/customers?${params.toString()}`;
}

function getCurrentCustomersUrl(searchParams: URLSearchParams) {
  const params = new URLSearchParams();
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";

  if (search) {
    params.set("search", search);
  }
  params.set("page", page);

  return `/admin/customers?${params.toString()}`;
}

export default function CustomerSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [value, setValue] = useState(searchParams.get("search") || "");

  const customerPage = pathname === "/admin/customers";
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (!customerPage) return;

    const nextUrl = buildCustomersUrl(debouncedValue);
    const currentUrl = getCurrentCustomersUrl(searchParams);

    if (nextUrl === currentUrl) return;

    router.push(nextUrl);
  }, [debouncedValue, customerPage, router, searchParams]);

  return (
    <div className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search name, email, city..."
        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2 pl-10 pr-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
