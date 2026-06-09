"use server";
import { fetchTotalCutomers, fetchTotalProducts, fetchTotalOrdersAPI, fetchRevenueTrendAPI, fetchRevenueByTimeAPI} from "../lib/api/analytics.api";

export const fetchTotalCustomer = async () => {
    const response = await fetchTotalCutomers();
    return {
        totalCustomers: response.data.totalCustomer,
    };
}

export const fetchTotalProduct = async () => {
    const response = await fetchTotalProducts();
    return {
        totalProducts: response.data.totalProducts
    }
}

export const fetchTotalOrders = async () => {
    const response = await fetchTotalOrdersAPI();
    return {
        totalOrders: response.data.totalOrders
    }
}

export const fetchRevenueTrend = async () => {
    const response = await fetchRevenueTrendAPI();
    return {
        revenue: response.data.revenue
    }
}

export const fetchRevenueByTime = async (period: string) => {
    const response = await fetchRevenueByTimeAPI(period);
    return {
        revenueByTime: response.data.points ?? [],
    };
};