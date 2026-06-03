import { fetchCustomers } from "../lib/api/customer.api";

export const getCustomers = async () => {
    const response = await fetchCustomers();
    return response.data
}