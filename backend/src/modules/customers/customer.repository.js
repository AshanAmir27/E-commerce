import pool from "../../core/database/index.js";

const getCustomers = async ({
  search,
  limit,
  offset,
}) => {
  let query = `
    SELECT *
    FROM customers
  `;

  let values = [];

  if (search) {
    query += `
      WHERE username LIKE ?
      OR email LIKE ?
      OR city LIKE ?
    `;

    values.push(
      `%${search}%`,
      `%${search}%`,
      `%${search}%`
    );
  }

  query += `
    ORDER BY customer_id DESC
    LIMIT ?
    OFFSET ?
  `;

  values.push(limit, offset);

  const [rows] = await pool.query(query, values);

  let countQuery = `
    SELECT COUNT(*) AS total
    FROM customers
  `;

  let countValues = [];

  if (search) {
    countQuery += `
      WHERE username LIKE ?
      OR email LIKE ?
      OR city LIKE ?
    `;

    countValues.push(
      `%${search}%`,
      `%${search}%`,
      `%${search}%`
    );
  }

  const [[{ total }]] = await pool.query(
    countQuery,
    countValues
  );

  return {
    data: rows,
    pagination: {
      total,
      page: Math.floor(offset / limit) + 1,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const createCustomer = async (data) => {
  const {
    username,
    email,
    city,
  } = data;

  const query = `
    INSERT INTO customers
    (
      username,
      email,
      city,
      signup_date
    )
    VALUES
    (
      ?,
      ?,
      ?,
      CURDATE()
    )
  `;

  const [result] = await pool.query(query, [
    username,
    email,
    city,
  ]);

  return {
    customer_id: result.insertId,
    username,
    email,
    city,
  };
};

const getCustomerById = async (id) => {
  const query = `
    SELECT *
    FROM customers
    WHERE customer_id = ?
  `;

  const [rows] = await pool.query(query, [id]);

  return rows[0] || null;
};

export default {
  getCustomers,
  createCustomer,
  getCustomerById,
};