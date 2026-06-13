// import { fetchMetrics, fetchCustomersByCity } from "@/services/analytics.service";
// import KpiCard from "@/components/ui/KpiCard";
// import { Package, ShoppingCart, Users, LineChart } from "lucide-react";
// import RevenueChart from "@/components/charts/RevenueChart";
// import CustomerChart from "@/components/charts/customerChart";

export default async function Admin() {
  // const { totalCustomers, customerGrowthPercentage, totalProducts, productGrowthPercentage, totalOrders, orderGrowthPercentage, totalRevenue, revenueGrowthPercentage } = await fetchMetrics();
  // const { data } = await fetchCustomersByCity();
  return (
    <>
    <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
     {/*   <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
       <KpiCard
          label="Total Customers"
          value={totalCustomers}
          description="Registered customers in the system"
          growthPercentage={customerGrowthPercentage}
          icon={Users}
          iconClassName="bg-blue-500/15 text-blue-400"
        />
        <KpiCard
          label="Total Products"
          value={totalProducts}
          description="Products in the catalog"
          growthPercentage={productGrowthPercentage}
          icon={Package}
          iconClassName="bg-emerald-500/15 text-emerald-400"
        />
        <KpiCard
          label="Total Orders"
          value={totalOrders}
          description="Orders in the system"
          growthPercentage={orderGrowthPercentage}
          icon={ShoppingCart}
          iconClassName="bg-yellow-500/15 text-yellow-400"
        />
        <KpiCard
          label="Revenue"
          value={`$${Number(totalRevenue ?? 0).toLocaleString()}`}
          description="Revenue in the system"
          growthPercentage={revenueGrowthPercentage}
          icon={LineChart}
          iconClassName="bg-green-500/15 text-green-400"
        />
      </div>
      <div className="mt-6 flex flex-wrap gap-6">
        <RevenueChart />
        <CustomerChart data={data} />
      </div> */}
    </>
  );
}
