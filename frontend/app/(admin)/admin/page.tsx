import { fetchTotalCustomer, fetchTotalProduct, fetchTotalOrders, fetchRevenueTrend } from "@/services/analytics.service";
import KpiCard from "@/components/ui/KpiCard";
import { Package, ShoppingCart, Users, LineChart } from "lucide-react";
import RevenueChart from "@/components/charts/RevenueChart";

export default async function Admin() {
  const { totalCustomers } = await fetchTotalCustomer();
  const { totalProducts } = await fetchTotalProduct();
  const { totalOrders } = await fetchTotalOrders();
  const { revenue } = await fetchRevenueTrend();
  return (
    <>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Total Customers"
          value={totalCustomers}
          description="Registered customers in the system"
          icon={Users}
          iconClassName="bg-blue-500/15 text-blue-400"
        />
        <KpiCard
          label="Total Products"
          value={totalProducts}
          description="Products in the catalog"
          icon={Package}
          iconClassName="bg-emerald-500/15 text-emerald-400"
        />
        <KpiCard
          label="Total Orders"
          value={totalOrders}
          description="Orders in the system"
          icon={ShoppingCart}
          iconClassName="bg-yellow-500/15 text-yellow-400"
        />
        <KpiCard
          label="Revenue"
          value={`$${Number(revenue ?? 0).toLocaleString()}`}
          description="Revenue in the system"
          icon={LineChart}
          iconClassName="bg-green-500/15 text-green-400"
        />
      </div>
      <RevenueChart />
    </>
  );
}
