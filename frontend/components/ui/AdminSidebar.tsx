"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, House, Users, ShoppingCart, Package, ChevronRight, ShieldUser } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col p-4">
      <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-zinc-100">
        <LayoutDashboard className="w-5 h-5" />
        Dashboard
      </h3>
      <nav className="flex flex-col gap-1">
          <Link
            href="/admin"
            className={`rounded-lg px-3 py-2 transition flex items-center gap-2 ${pathname === "/admin"
              ? "bg-[#12131A] text-gray-300 font-bold"
              : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              }`}
          >
            <House className="w-5 h-5" />
            Home
          </Link>
          <Link
            href="/admin/customers"
            className={`rounded-lg px-3 py-2 transition flex items-center gap-2 ${pathname === "/admin/customers"
              ? "bg-zinc-800 text-gray-300 font-semibold"
              : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              }`}
          ><Users className="w-5 h-5" />
            Customers
          </Link>

          <Link
            href="/admin/orders"
            className={`rounded-lg px-3 py-2 transition flex items-center gap-2 ${pathname === "/admin/orders"
              ? "bg-zinc-800 text-gray-300 font-semibold"
              : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              }`}
          >
            <ShoppingCart className="w-5 h-5" />
            Orders
          </Link>

          <Link
            href="/admin/products"
            className={`rounded-lg px-3 py-2 transition flex items-center gap-2 ${pathname === "/admin/products"
              ? "bg-zinc-800 text-gray-300 font-semibold"
              : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
              }`}
          >
            <Package className="w-5 h-5" />
            Products
          </Link>
      </nav>

      <div className="mt-auto pt-4 border-t border-zinc-800">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-400 transition hover:bg-zinc-800/50 hover:text-zinc-200 w-full"
        >
          {/* <LogOut className="w-5 h-5" /> */}
          <div className="flex items-center gap-2 w-full">

          <ShieldUser className="w-5 h-5" />
          <span className="text-zinc-400">Admin</span>

          </div>
          <ChevronRight  className="w-5 h-5 text-zinc-400"   />

        </Link>
      </div>
    </div>
  );
}