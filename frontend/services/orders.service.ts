import { fetchOrders } from "../lib/api/orders.api";

export const getOrders = async (
    { page = 1, limit = 10, search = "" }: { page?: number, limit?: number, search?: string }
) => {
    const response = await fetchOrders({ page, limit, search });
    return {
        data: response.data,
        pagination: response.pagination
    }
}
