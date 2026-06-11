"use server";
import { fetchRevenueByTimeAPI, fetchMetricsAPI, fetchCustomersByCityAPI } from "../lib/api/analytics.api";

export const fetchMetrics = async () => {
    const response = await fetchMetricsAPI();
    return {
        totalCustomers: response.data.totalCustomers,
        totalProducts: response.data.totalProducts,
        totalOrders: response.data.totalOrders,
        totalRevenue: response.data.totalRevenue
    }
}


export const fetchRevenueByTime = async (period: string) => {
    const response = await fetchRevenueByTimeAPI(period);
    return {
        revenueByTime: response.data.points ?? [],
    };
};

export const fetchCustomersByCity = async () => {
    const response = await fetchCustomersByCityAPI();
    return {
        data: response.data,
    };
};