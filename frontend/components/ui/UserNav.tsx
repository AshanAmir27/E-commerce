'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserNav() {
    const pathname = usePathname();

    return (
        <nav>
            <Link
                href="/products"
                style={{ color: pathname === "/products" ? "red" : "white" }}
            >
                Products
            </Link> {" "}
            | {" "}
            <Link href="/customers"
                style={{ color: pathname === "/customers" ? "red" : "white" }}
            >
                Customers
            </Link> {" "}
            | {" "}
            <Link href="/admin"
                style={{ color: pathname === '/admin' ? "red" : "white" }}>
                Admin
            </Link>
        </nav>
    )
}