import pool from "../../core/database/index.js";

const getCustomers = async () => {
  const [rows] = await pool.query("SELECT * FROM customers limit 3");
  return rows;
};

const createCustomer = async (data) => {
  const { username, email, signup_date, city } = data;

  const query = `INSERT INTO customers (username,email,signup_date, city)
    VALUES (?,?,?,?)
  `;

  const values = [username, email, signup_date, city];

  const [result] = await pool.query(query, values);

  return {
    customer_id: result.insertId,
    ...data
  };
}

const getCustomerById = async (id) => {
  const query = `select * from customers where customer_id = ?`;
  const [result] = await pool.query(query, [id]);
  return result;
}

const getCustomersByFilter = async ({ city, limit, offset }) => {
   let query = `SELECT * FROM customers`;
  let values = [];

  // Filter
  if (city) {
    query += ` WHERE city = ?`;
    values.push(city);
  }

  // Pagination
  query += ` LIMIT ? OFFSET ?`;
  values.push(limit, offset);

  const [rows] = await pool.query(query, values);

  // Get total count (for pagination info)
  let countQuery = `SELECT COUNT(*) as total FROM customers`;
  let countValues = [];

  if (city) {
    countQuery += ` WHERE city = ?`;
    countValues.push(city);
  }

  const [[{ total }]] = await pool.query(countQuery, countValues);

  return {
    data: rows,
    pagination: {
      total,
      page: Math.floor(offset / limit) + 1,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

export default {
  getCustomers,
  createCustomer,
  getCustomerById,
  getCustomersByFilter
};