import * as customersService from "./customers.service.js";
import {
  successResponse,
  errorResponse,
} from "../../core/response/responseHandler.js";

export const getCustomers = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const data = await customersService.getCustomers({
      search,
      page: Number(page),
      limit: Number(limit),
    });

    return successResponse(res, {
      data,
      message: "Customers fetched successfully",
    });
  } catch (error) {
    return errorResponse(res, {
      message: error.message,
      code: error.code || 500,
    });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const data = await customersService.createCustomer(req.body);

    return successResponse(res, {
      data,
      message: "Customer created successfully",
      code: 201,
    });
  } catch (error) {
    return errorResponse(res, {
      message: error.message,
      code: error.code || 500,
    });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await customersService.getCustomerById(
      Number(req.params.id)
    );

    return successResponse(res, {
      data: customer,
    });
  } catch (error) {
    return errorResponse(res, {
      message: error.message,
      code: error.code || 500,
    });
  }
};