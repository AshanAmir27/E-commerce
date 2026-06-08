import pool from "../../core/database/index.js";

export const getTotalCustomers = async ()=> {
    const [rows] = await pool.query("SELECT count(*) as total_customers from customers");
    return rows[0];
}

export const getTotalProducts = async ()=> {
    const [rows] = await pool.query("SELECT count(*) as total_products from products");
    return rows[0];
}