"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-6 text-black">
        Dashboard
      </h3>

      <nav className="flex flex-col gap-3">
        <Link
          href="/admin/customers"
          className={pathname === "/admin/customers" ? "text-blue-600 font-semibold" : "text-black"}
        >
          Customers
        </Link>

        <Link
          href="/admin/orders"
          className={pathname === "/admin/orders" ? "text-blue-600 font-semibold" : "text-black"}
        >
          Orders
        </Link>

        <Link
          href="/admin/products"
          className={pathname === "/admin/products" ? "text-blue-600 font-semibold" : "text-black"}
        >
          Products
        </Link>
      </nav>
    </div>
  );
}