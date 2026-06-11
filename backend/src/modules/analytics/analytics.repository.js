import pool from "../../core/database/index.js";

export const getTotalRevenue = async () => {
    let query = "SELECT SUM(p.amount) AS total_revenue FROM orders o JOIN payments p ON o.order_id = p.order_id";
    const [rows] = await pool.query(query);
    return rows[0];
}

export const getRevenueTrend = async () => {
    let query = `SELECT SUM(p.amount) AS revenue FROM orders o JOIN payments p ON o.order_id = p.order_id WHERE DATE(o.order_date) <= CURDATE()`;
    const [rows] = await pool.query(query);
    return rows[0];
}

export const getMetrics = async () => {
    let query = `
    SELECT
        (SELECT COUNT(*) FROM customers) AS total_customers,
        (SELECT COUNT(*) FROM products) AS total_products,
        (SELECT COUNT(*) FROM orders) AS total_orders,
        (SELECT SUM(p.amount) AS total_revenue FROM orders o JOIN payments p ON o.order_id = p.order_id) AS total_revenue`;
    const [rows] = await pool.query(query);
    return rows[0];
}

export const getRevenueByTime = async (period) => {
    let query = '';

    switch (period) {
        case 'daily':
            query = ` 
            SELECT 
                DATE(o.order_date) AS date,
                SUM(p.amount) AS revenue
            FROM orders o
            JOIN payments p 
            ON o.order_id = p.order_id
            GROUP BY DATE(o.order_date)
            ORDER BY DATE(o.order_date) ASC
        `;
            break;
        case 'weekly':
            query = `
            SELECT 
                WEEK(o.order_date) AS week,
                SUM(p.amount) AS revenue
            FROM orders o
            JOIN payments p 
            ON o.order_id = p.order_id
            GROUP BY WEEK(o.order_date)
            ORDER BY WEEK(o.order_date) ASC
        `;
            break;
        case 'monthly':
            query = `
            SELECT 
                MONTH(o.order_date) AS month,
                SUM(p.amount) AS revenue
            FROM orders o
            JOIN payments p 
            ON o.order_id = p.order_id
            GROUP BY MONTH(o.order_date)
            ORDER BY MONTH(o.order_date) ASC
        `;
            break;
        case 'yearly':
            query = `
            SELECT 
                YEAR(o.order_date) AS year,
                SUM(p.amount) AS revenue
            FROM orders o
            JOIN payments p 
            ON o.order_id = p.order_id
            GROUP BY YEAR(o.order_date)
            ORDER BY YEAR(o.order_date) ASC
        `;
            break;
        default:
            throw new Error('Invalid period');
    }
    const [rows] = await pool.query(query);
    return rows;
}

export const getCustomersByCity = async () => {
    let query = `
    SELECT city, COUNT(*) AS value
    FROM customers
    GROUP BY city
    ORDER BY value DESC, city ASC;
    `;
    const [rows] = await pool.query(query);
    return rows;
}

export const getRecentOrders = async () => {
    let query = `
    SELECT o.order_id, o.order_date, SUM(p.amount) AS total_amount
    FROM orders o
    JOIN payments p
    ON o.order_id = p.order_id
    GROUP BY o.order_id, o.order_date
    ORDER BY o.order_date DESC
    LIMIT 5;
    `;
    const [rows] = await pool.query(query);
    return rows;
}