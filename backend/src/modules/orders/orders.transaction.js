// modules/orders/orders.transaction.js
import pool from "../../core/database/index.js";

export const createOrderTransaction = async (payload) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const { customer_id, items } = payload;

    // 1. Create order
    const [orderResult] = await connection.query(
      "INSERT INTO orders (customer_id, order_date, status) VALUES (?, NOW(), 'pending')",
      [customer_id]
    );

    const orderId = orderResult.insertId;

    let totalAmount = 0;

    // 2. Process items
    for (const item of items) {
      const { product_id, quantity } = item;

      // Get product
      const [[product]] = await connection.query(
        "SELECT * FROM products WHERE product_id = ?",
        [product_id]
      );

      if (!product) throw new Error("Product not found");

      if (product.stock_quantity < quantity) {
        throw new Error(`Insufficient stock for product ${product_id}`);
      }

      const price = product.price;
      totalAmount += price * quantity;

      // Insert order item
      await connection.query(
        `INSERT INTO order_items 
        (order_id, product_id, quantity, price_at_purchase)
        VALUES (?, ?, ?, ?)`,
        [orderId, product_id, quantity, price]
      );

      // Reduce stock
      await connection.query(
        `UPDATE products 
         SET stock_quantity = stock_quantity - ?
         WHERE product_id = ?`,
        [quantity, product_id]
      );
    }

    // 3. Create payment
    await connection.query(
      `INSERT INTO payments 
       (order_id, payment_date, amount, payment_method)
       VALUES (?, NOW(), ?, ?)`,
      [orderId, totalAmount, payload.payment_method]
    );

    // 4. Commit
    await connection.commit();

    return {
      order_id: orderId,
      total_amount: totalAmount,
      status: "completed"
    };

  } catch (error) {
    await connection.rollback();
    throw error;

  } finally {
    connection.release();
  }
};