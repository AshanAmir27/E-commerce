"use client";

import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

export default function AdminTopbar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [value, setValue] = useState(
        searchParams.get("search") || ""
    );

    const debouncedValue = useDebounce(value, 500);

    const customerPage = pathname === "/admin/customers";

    useEffect(() => {
        if (!customerPage) return;

        const params = new URLSearchParams(searchParams.toString());

        if (debouncedValue) {
            params.set("search", debouncedValue);
        } else {
            params.delete("search");
        }

        params.set("page", "1");

        router.push(`/admin/customers?${params.toString()}`);
    }, [debouncedValue]);

    return (
        <div className="border-b border-zinc-800 bg-zinc-900 px-6 py-4">
            <div className="flex items-center">

                {customerPage && (
                    <div className="relative w-full max-w-md">
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Search name, email, city..."
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-2 pl-10 pr-3 text-zinc-100"
                        />
                    </div>
                )}

                <div className="ml-auto h-10 w-10 overflow-hidden rounded-full bg-white relative">
                    <Image
                        src="/download.png"
                        alt="profile"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}