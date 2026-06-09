import { Order as OrderType } from "@/app/types/types";
import { getOrders } from "@/services/orders.service";
import PaginationComponent from "@/components/features/admin/pagination";
import OrderSearch from "@/components/features/admin/OrderSearch";

function statusClassName(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-emerald-950 text-emerald-300";
    case "pending":
      return "bg-yellow-950 text-yellow-300";
    case "cancelled":
      return "bg-red-950 text-red-300";
    default:
      return "bg-zinc-800 text-zinc-300";
  }
}

export default async function OrdersPage({ searchParams }: any) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const search = params.search || "";
  const limit = 10;

  const { data, pagination } = await getOrders({ page, limit, search });

  const paginationHref = search
    ? `/admin/orders?search=${encodeURIComponent(search)}&page=`
    : "/admin/orders?page=";

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        {/* <h1 className="text-2xl font-bold text-zinc-100">Orders</h1> */}
        <OrderSearch />
        {/* <OrderFilter /> */}
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-lg shadow-black/20">
        <div className="grid grid-cols-4 bg-zinc-800/80 p-4 font-semibold text-zinc-300">
          <div>Order ID</div>
          <div>Customer</div>
          <div>Order Date</div>
          <div>Status</div>
        </div>

        {data.length === 0 ? (
          <div className="p-6 text-center text-sm text-zinc-500">
            No orders found.
          </div>
        ) : (
          data.map((order: OrderType) => (
            <div
              key={order.order_id}
              className="grid grid-cols-4 border-b border-zinc-800 p-4 transition hover:bg-zinc-800/40"
            >
              <div className="font-medium text-zinc-100">#{order.order_id}</div>
              <div className="text-zinc-400">
                {order.username ?? order.customer_id}
              </div>
              <div className="text-zinc-400">
                {new Date(order.order_date).toLocaleDateString()}
              </div>
              <div>
                <span
                  className={`rounded-full px-2 py-1 text-xs capitalize ${statusClassName(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <PaginationComponent
          page={page}
          totalPages={pagination.totalPages}
          href={paginationHref}
        />
      </div>
    </div>
  );
}
