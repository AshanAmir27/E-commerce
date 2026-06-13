"use server";
import { fetchRevenueByTimeAPI, fetchMetricsAPI, fetchCustomersByCityAPI } from "../lib/api/analytics.api";

export const fetchMetrics = async () => {
    const response = await fetchMetricsAPI();
    return {
        totalCustomers: response.data.customers.totalCustomers,
        customerGrowthPercentage: response.data.customers.customerGrowthPercentage,
        totalProducts: response.data.products.totalProducts,
        productGrowthPercentage: response.data.products.productGrowthPercentage,
        totalOrders: response.data.orders.totalOrders,
        orderGrowthPercentage: response.data.orders.orderGrowthPercentage,
        totalRevenue: response.data.revenue.totalRevenue,
        revenueGrowthPercentage: response.data.revenue.revenueGrowthPercentage,
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