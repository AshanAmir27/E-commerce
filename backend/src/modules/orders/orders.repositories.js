// modules/orders/orders.repository.js
import pool from "../../core/database/index";

export const getOrders = async ({ status, page = 1, limit = 10 }) => {
  const offset = (page - 1) * limit;

  let query = "SELECT * FROM orders";
  let values = [];

  if (status) {
    query += " WHERE status = ?";
    values.push(status);
  }

  query += " LIMIT ? OFFSET ?";
  values.push(limit, offset);

  const [rows] = await pool.query(query, values);

  return rows;
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

    // Get order items
    const [items] = await connection.query(
      "SELECT * FROM order_items WHERE order_id = ?",
      [id]
    );

    // Restore stock
    for (const item of items) {
      await connection.query(
        `UPDATE products 
         SET stock_quantity = stock_quantity + ?
         WHERE product_id = ?`,
        [item.quantity, item.product_id]
      );
    }

    // Update order
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