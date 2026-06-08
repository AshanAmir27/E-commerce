import { fetchCustomers, fetchTotalCutomers, fetchTotalProducts } from "../lib/api/customer.api";

export const getCustomers = async (
    { page = 1, limit = 10, search = "" }: { page?: number, limit?: number, search?: string }
) => {
    const response = await fetchCustomers({ page, limit, search });
    return {
        data: response.data,
        pagination: response.pagination
    }
}

export const fetchtotalCustomer = async () => {
    const response = await fetchTotalCutomers();
    return {
        totalCustomers: response.result.totalCustomer,
    };
}

export const fetchTotalProduct = async () => {
    const response = await fetchTotalProducts();
    return {
        totalProducts: response.result.totalProducts
    }
}