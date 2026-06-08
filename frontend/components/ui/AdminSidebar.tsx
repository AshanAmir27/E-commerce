"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-6 text-zinc-100">
        Dashboard
      </h3>

      <nav className="flex flex-col gap-1">
      <Link
          href="/admin"
          className={`rounded-lg px-3 py-2 transition ${
            pathname === "/admin"
              ? "bg-[#12131A] text-gray-300 font-bold"
              : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
          }`}
        >
          Home
        </Link>
        <Link
          href="/admin/customers"
          className={`rounded-lg px-3 py-2 transition ${
            pathname === "/admin/customers"
              ? "bg-zinc-800 text-gray-300 font-semibold"
              : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
          }`}
        >
          Customers
        </Link>

        <Link
          href="/admin/orders"
          className={`rounded-lg px-3 py-2 transition ${
            pathname === "/admin/orders"
              ? "bg-zinc-800 text-gray-300 font-semibold"
              : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
          }`}
        >
          Orders
        </Link>

        <Link
          href="/admin/products"
          className={`rounded-lg px-3 py-2 transition ${
            pathname === "/admin/products"
              ? "bg-zinc-800 text-gray-300 font-semibold"
              : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
          }`}
        >
          Products
        </Link>
      </nav>
    </div>
  );
}