"use client";

import { CircleUser, Bell } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminTopbar() {

    const pathname = usePathname();
    const customerPage = pathname === "/admin/customers";
    const homePage = pathname === "/admin";
    const ordersPage = pathname === "/admin/orders";
    const productsPage = pathname === "/admin/products";

    return (
        <div className="border-b border-zinc-800 bg-zinc-900 px-6 py-4">
            <div className="flex items-center">

                {homePage && (
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-bold text-zinc-100">Welcome Back!</h1>
                        <p className="text-zinc-400">Here is what's happening with your store today.</p>
                    </div>
                )}
                {customerPage && (
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-bold text-zinc-100">Customers</h1>
                        <p className="text-zinc-400">Here is what's happening with your customers today.</p>
                    </div>
                )}
                {ordersPage && (
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-bold text-zinc-100">Orders</h1>
                        <p className="text-zinc-400">Here is what's happening with your orders today.</p>
                    </div>
                )}
                {productsPage && (
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-bold text-zinc-100">Products</h1>
                        <p className="text-zinc-400">Here is what's happening with your products today.</p>
                    </div>
                )}

                <div className="flex items-center gap-4 ml-auto">
                    <div className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full ">
                        <Bell className="size-7 text-zinc-300" />
                    </div>
                    <div className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800">
                        <CircleUser className="size-10 text-zinc-300" />
                    </div>
                </div>
            </div>
        </div>
    );
}