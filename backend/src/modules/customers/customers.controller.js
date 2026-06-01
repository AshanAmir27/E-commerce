import * as customersService from "./customers.service.js";
import { successResponse, errorResponse } from "../../core/response/responseHandler.js";

export const getCustomers = async (req, res) => {
  try {
    const data = await customersService.getCustomers();
    return successResponse(res, { data });
  } catch (error) {
    return errorResponse(res, {
      message: error.message,
      code: error.code || 500
    })
  }
};

export const createCustomer = async (req, res) => {
  try {
    const data = await customersService.createCustomer(req.body);
    return successResponse(res, {
      data,
      message: 'Customer created Successfully',
      code: 201
    })
  } catch (error) {
    return errorResponse(res, {
      message: error.message,
      code: error.code || 500
    })

  }
}

export const getCustomerById = async (req, res) => {
  const id = req.params.id
  console.log(id)
  try {
    const data = await customersService.getCustomerById(id);
    return successResponse(res, { data })
  } catch (error) {
    return errorResponse(res, {
      message: error.message,
      code: error.code || 500
    })
  }
}

export const getCustomersByFilter = async (req, res) => {

  const { city, page = 1, limit = 10 } = req.query;

  try {
    const data = await customersService.getCustomersByFilter({
      city,
      page: Number(page),
      limit: Number(limit)
    });

    return res.status(200).json({
      success: true,
      message: "Customers fetched successfully",
      ...data
    });
  } catch (error) {
    return errorResponse(res, {
      success: false,
      message: error.message
    });
  }
}

