import pool from "../../core/database/index.js";

export const getTotalCustomers = async () => {
    let query = "SELECT count(*) as total_customers from customers";
    const [rows] = await pool.query(query);
    return rows[0];
}

export const getTotalProducts = async () => {
    let query = "SELECT COUNT(*) AS total_products FROM products";
    const [rows] = await pool.query(query);
    return rows[0];
  };

export const getTotalOrders = async () => {
    let query = "SELECT COUNT(*) AS total_orders FROM orders";
    const [rows] = await pool.query(query);
    return rows[0];
}

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

export const getRevenueByTime = async (period) => {
  let query = '';

  switch(period){
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
