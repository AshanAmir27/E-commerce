import type { LucideIcon } from "lucide-react";

export type Customer = {
    customer_id: number,
    username: string,
    email: string,
    city: string
};

export type Pagination = {
    searchParams: Promise<{page?:string}>
}

export type KpiCardProps = {
    label: string;
    value: number | string;
    description: string;
    icon: LucideIcon;
    iconClassName?: string;
  };

export type Order = {
    order_id: number,
    customer_id: number,
    username?: string,
    order_date: string,
    status: string
}