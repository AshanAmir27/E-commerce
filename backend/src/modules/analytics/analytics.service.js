import * as analyticsRepository from './analytics.repository.js';

export const getRevenueTrend = async () => {
    const repoResult = await analyticsRepository.getRevenueTrend();
    return {
        revenue: repoResult.revenue
    };
}

export const getMetrics = async () => {
    const repoResult = await analyticsRepository.getMetrics();
    return {
        totalCustomers: repoResult.total_customers,
        totalProducts: repoResult.total_products,
        totalOrders: repoResult.total_orders,
        totalRevenue: repoResult.total_revenue
    };
}

const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const getRevenueByTime = async (period) => {
    const rows = await analyticsRepository.getRevenueByTime(period);

    const points = rows.map((row) => {
        let timestamp;

        switch (period) {
            case "daily":
                timestamp = row.date instanceof Date
                    ? row.date.toISOString().split("T")[0]
                    : String(row.date).split("T")[0];
                break;
            case "weekly":
                timestamp = `Week ${row.week}`;
                break;
            case "monthly":
                timestamp = monthLabels[row.month - 1] || `Month ${row.month}`;
                break;
            case "yearly":
                timestamp = String(row.year);
                break;
            default:
                timestamp = String(row.date ?? row.week ?? row.month ?? row.year);
        }

        return {
            timestamp,
            value: Number(row.revenue) || 0,
        };
    });

    return { period, points };
};

export const getCustomersByCity = async () => {
    const repoResult = await analyticsRepository.getCustomersByCity();
    return {
        data: repoResult.map((row) => ({
            city: row.city ?? "Unknown",
            value: Number(row.value) || 0,
        })),
    };
}   

export const getRecentOrders = async () => {
    const repoResult = await analyticsRepository.getRecentOrders();
    return {
        data: repoResult.map((row) => ({
            order_id: row.order_id,
            order_date: row.order_date,
            total_amount: Number(row.total_amount) || 0,
        })),
    };
}