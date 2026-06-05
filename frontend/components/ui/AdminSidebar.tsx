"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{ width: "220px", marginTop: '-20px' }} className="bg-white p-4 rounded-md py-10">
      <h3 className="text-xl font-bold text-black mb-4">Dashoard </h3>
      <ul>
        <li>
          <Link
            href="/admin/customers"
            style={{
              color: pathname === "/admin/customers" ? "blue" : "black",
            }}
          >
            Customers
          </Link>
        </li>

        <li>
          <Link
            href="/admin/orders"
            style={{
              color: pathname === "/admin/orders" ? "blue" : "black",
            }}
          >
            Orders
          </Link>
        </li>

        <li>
          <Link
            href="/admin/products"
            style={{
              color: pathname === "/admin/products" ? "blue" : "black",
            }}
          >
            Products
          </Link>
        </li>
      </ul>
    </aside>
  );
}