import pool from "../database/index.js";

const getCustomers = async () => {
  const [rows] = await pool.query("SELECT * FROM customers limit 3");
  return rows;
};

const createCustomer = async (data) => {
  const {username, email, signup_date,city} = data;

  const query = `INSERT INTO customers (username,email,signup_date, city)
    VALUES (?,?,?,?)
  `;

  const values = [username,email,signup_date,city];

  const [result] = await pool.query(query,values);

  return {
    customer_id: result.insertId,
    ...data
  };
}

export default {
  getCustomers,
  createCustomer
};