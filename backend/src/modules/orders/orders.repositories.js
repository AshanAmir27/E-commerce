import pool from "../../core/database/index.js";

export const getOrders = async ({ status, page = 1, limit = 10, search = "" }) => {
  const offset = (page - 1) * limit;

  let query =
    "SELECT o.*, c.username FROM orders o JOIN customers c ON o.customer_id = c.customer_id";
  const conditions = [];
  const values = [];

  if (status) {
    conditions.push("o.status = ?");
    values.push(status);
  }

  if (search) {
    conditions.push("c.username LIKE ?");
    values.push(`%${search}%`);
  }

  if (conditions.length) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  query += " ORDER BY o.order_date DESC LIMIT ? OFFSET ?";
  values.push(Number(limit), Number(offset));

  const [rows] = await pool.query(query, values);

  let countQuery =
    "SELECT COUNT(*) AS total FROM orders o JOIN customers c ON o.customer_id = c.customer_id";

  if (conditions.length) {
    countQuery += ` WHERE ${conditions.join(" AND ")}`;
  }

  const [[{ total }]] = await pool.query(countQuery, values.slice(0, -2));

  return {
    data: rows,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

export const getOrderById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT o.*, c.username, p.amount, p.payment_method
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    LEFT JOIN payments p ON o.order_id = p.order_id
    WHERE o.order_id = ?
    `,
    [id]
  );

  return rows[0];
};

export const cancelOrder = async (id) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [items] = await connection.query(
      "SELECT * FROM order_items WHERE order_id = ?",
      [id]
    );

    for (const item of items) {
      await connection.query(
        `UPDATE products 
         SET stock_quantity = stock_quantity + ?
         WHERE product_id = ?`,
        [item.quantity, item.product_id]
      );
    }

    await connection.query(
      "UPDATE orders SET status = 'cancelled' WHERE order_id = ?",
      [id]
    );

    await connection.commit();

    return { order_id: id, status: "cancelled" };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
