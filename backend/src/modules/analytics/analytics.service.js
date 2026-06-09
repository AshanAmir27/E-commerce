import * as analyticsRepository from './analytics.repository.js';

export const getTotalCustomers = async () => {
    const repoResult = await analyticsRepository.getTotalCustomers();
    return {
        totalCustomer: repoResult.total_customers
    };
}

export const getTotalProducts = async () => {
    const repoResult = await analyticsRepository.getTotalProducts();
    return {
        totalProducts : repoResult.total_products
    };
}

export const getTotalOrders = async () => {
    const repoResult = await analyticsRepository.getTotalOrders();
    return {
        totalOrders : repoResult.total_orders
    };
}

export const getRevenueTrend = async () => {
    const repoResult = await analyticsRepository.getRevenueTrend();
    return {
        revenue: repoResult.revenue
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