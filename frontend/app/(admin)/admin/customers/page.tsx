import { Customer } from "@/app/types/types";
import { getCustomers } from "@/services/customer.service";
import CreateCustomerModal from "@/components/features/admin/CreateCustomerModal";
import PaginationComponent from "@/components/features/admin/pagination";
import CustomerSearch from "@/components/features/admin/customerSearch";

export default async function CustomersPage({ searchParams }: any) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const search = params.search || "";
  const limit = 10;

  const { data, pagination } = await getCustomers({ page, limit, search });

  const paginationHref = search
    ? `/admin/customers?search=${encodeURIComponent(search)}&page=`
    : "/admin/customers?page=";

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between">
        <CustomerSearch />
        <CreateCustomerModal />
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-lg shadow-black/20">
        <div className="grid grid-cols-3 bg-zinc-800/80 p-4 font-semibold text-zinc-300">
          <div>Username</div>
          <div>Email</div>
          <div>City</div>
        </div>

        {data.map((customer: Customer) => (
          <div
            key={customer.customer_id}
            className="grid grid-cols-3 border-b border-zinc-800 p-4 transition hover:bg-zinc-800/40"
          >
            <div className="font-medium text-zinc-100">{customer.username}</div>
            <div className="text-zinc-400">{customer.email}</div>
            <div>
              <span className="rounded-full bg-blue-950 px-2 py-1 text-xs text-blue-300">
                {customer.city}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
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