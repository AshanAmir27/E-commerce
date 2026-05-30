import pool from "../database/index.js";

const getCustomers = async () => {
  const [rows] = await pool.query("SELECT * FROM customers limit 3");
  return rows;
};

export default {
  getCustomers,
};