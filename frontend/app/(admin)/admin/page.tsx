import { fetchtotalCustomer,fetchTotalProduct } from "@/services/customer.service";

export default async function Admin() {
    const { totalCustomers } = await fetchtotalCustomer();
    const { totalProducts } = await fetchTotalProduct();

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="w-72 rounded-2xl bg-white p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Total Customers
                    </p>

                    <div className="mt-3 flex items-end gap-2">
                        <h1 className="text-4xl font-bold text-gray-900">
                            {totalCustomers}
                        </h1>
                    </div>

                    <p className="mt-2 text-sm text-gray-400">
                        Registered customers in the system
                    </p>
                </div>
                <div className="w-72 rounded-2xl bg-white p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Total Products
                    </p>

                    <div className="mt-3 flex items-end gap-2">
                        <h1 className="text-4xl font-bold text-gray-900">
                            {totalProducts}
                        </h1>
                    </div>

                    <p className="mt-2 text-sm text-gray-400">
                        Registered products in the system
                    </p>
                </div>
            </div>
        </div>
    );
}