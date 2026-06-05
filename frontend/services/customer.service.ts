import { fetchCustomers } from "../lib/api/customer.api";

export const getCustomers = async (
    {page = 1, limit = 10}: {page?: number, limit?: number}
) => {
    const response = await fetchCustomers({page, limit});
    return {
        data: response.data,
        pagination: response.pagination
    } 
}