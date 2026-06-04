"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside style={{ width: "200px", marginTop: '-20px'  }}>
      <h3>Admin Dashboard</h3>
      <ul>
        <li>
          <Link
            href="/admin/customers"
            style={{
              color: pathname === "/admin/customers" ? "red" : "white",
            }}
          >
            Customers
          </Link>
        </li>

        <li>
          <Link
            href="/admin/orders"
            style={{
              color: pathname === "/admin/orders" ? "red" : "white",
            }}
          >
            Orders
          </Link>
        </li>

        <li>
          <Link
            href="/admin/products"
            style={{
              color: pathname === "/admin/products" ? "red" : "white",
            }}
          >
            Products
          </Link>
        </li>
      </ul>
    </aside>
  );
}