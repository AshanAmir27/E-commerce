// modules/orders/orders.controller.js
import * as ordersService from "./orders.service.js";
import { successResponse, errorResponse } from "../../core/response/responseHandler.js";

export const createOrder = async (req, res) => {
  try {
    const data = await ordersService.createOrder(req.body);

    return successResponse(res, {
      data,
      message: "Order created successfully",
      code: 201
    });

  } catch (error) {
    return errorResponse(res, {
      message: error.message,
      code: 500
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", status } = req.query;
    const result = await ordersService.getOrders({
      page: Number(page),
      limit: Number(limit),
      search,
      status,
    });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    return errorResponse(res, {
      message: error.message,
      code: 500
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const data = await ordersService.getOrderById(req.params.id);

    return successResponse(res, { data });

  } catch (error) {
    return errorResponse(res, {
      message: error.message,
      code: 500
    });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const data = await ordersService.cancelOrder(req.params.id);

    return successResponse(res, {
      data,
      message: "Order cancelled successfully"
    });

  } catch (error) {
    return errorResponse(res, {
      message: error.message,
      code: 500
    });
  }
};