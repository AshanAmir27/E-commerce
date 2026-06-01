// modules/orders/orders.service.js
import * as orderRepo from "./orders.repositories.js";
import { createOrderTransaction } from "./orders.transaction.js";

export const createOrder = async (payload) => {
  if (!payload.customer_id || !payload.items?.length) {
    throw new Error("Invalid order payload");
  }

  return await createOrderTransaction(payload);
};

export const getOrders = async (query) => {
  return await orderRepo.getOrders(query);
};

export const getOrderById = async (id) => {
  return await orderRepo.getOrderById(id);
};

export const cancelOrder = async (id) => {
  return await orderRepo.cancelOrder(id);
};