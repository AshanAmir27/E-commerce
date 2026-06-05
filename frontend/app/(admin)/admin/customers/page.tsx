import { Customer } from "@/app/types/types";
import { getCustomers } from "@/services/customer.service";
import CreateCustomerModal from "@/components/features/admin/CreateCustomerModal";
import PaginationComponent from "@/components/features/admin/pagination";

export default async function CustomersPage({ searchParams }: any) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = 10;

  const { data, pagination } = await getCustomers({ page, limit });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Customers
        </h1>

        <CreateCustomerModal />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-3 bg-gray-100 text-gray-700 font-semibold p-4">
          <div>Username</div>
          <div>Email</div>
          <div>City</div>
        </div>

        {/* Table Body */}
        {data.map((customer: Customer) => (
          <div
            key={customer.customer_id}
            className="grid grid-cols-3 p-4 border-b hover:bg-gray-50 transition"
          >
            <div className="text-gray-900 font-medium">
              {customer.username}
            </div>

            <div className="text-gray-600">
              {customer.email}
            </div>

            <div>
              <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
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
          href="/admin/customers"
        />
      </div>
    </div>
  );
}