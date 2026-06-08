"use client";

import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";


export default function AdminTopbar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [value, setValue] = useState(searchParams.get("search") || "");


    useEffect(() => {
        if (pathname !== "/admin/customers") return;
        const handler = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set("search", value);
            }
            else {
                params.delete("search");
            }
            params.set("page", "1");

            router.push(`/admin/customers?${params.toString()}`);

        }, 500);
        return () => clearTimeout(handler);
    }, [value, pathname])

    return (
        <div className="border-b border-zinc-800 bg-zinc-900 px-6 py-4">
            <div className="flex justify-between items-center">
                <div className="relative w-full max-w-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Search name, email, city..."
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2 pl-10 pr-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="ml-4 flex h-10 w-10 shrink-0 items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800">
                    <Image src="/download.png" alt="profile" width={30} height={30} className="h-full w-full rounded-full object-cover" />
                </div>
            </div>
        </div>
    );
}