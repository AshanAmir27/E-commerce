import { fetchCustomers } from "../lib/api/customer.api";

export const getCustomers = async (
    {page = 1, limit = 10, search = ""}: {page?: number, limit?: number, search?: string}
) => {
    const response = await fetchCustomers({page, limit, search});
    return {
        data: response.data,
        pagination: response.pagination
    } 
}