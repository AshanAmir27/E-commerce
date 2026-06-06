'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserNav() {
    const pathname = usePathname();

    return (
        <nav className="bg-white p-4 py-5 text-center flex justify-center items-center gap-2">
            <Link
                href="/products"
                style={{ color: pathname === "/products" ? "blue" : "black" }}
            >
                Products
            </Link> {" "}
            <span>|</span> {" "}
            <Link href="/admin"
                style={{ color: pathname === '/admin' ? "blue" : "black" }}>
                Admin
            </Link>
        </nav>
    )
}