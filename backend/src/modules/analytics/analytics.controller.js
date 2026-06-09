import * as analyticsService from './analytics.service.js'
import { successResponse, errorResponse } from '../../core/response/responseHandler.js'

export const getTotalCustomers = async (req, res)=> {
    try {
        const result = await analyticsService.getTotalCustomers();
        return successResponse(res, {
            data: result,
            message: "Total customers fetched successfully",
            code: 200
        })
    } catch (error) {
        return errorResponse(res, {
            message: error.message,
            code: 500
        })
    }
}

export const getTotalProducts = async (req, res)=> {
    try {
        const result = await analyticsService.getTotalProducts();
        return successResponse(res, {
            data: result,
            message: "Total products fetched successfully",
            code: 200
        })
    } catch (error) {
        return errorResponse(res, {
            message: error.message,
            code: 500
        })
    }
}

export const getTotalOrders = async ( req, res ) => {
    try {
        const result = await analyticsService.getTotalOrders();
        return successResponse(res, {
            data: result,
            message: "Total orders fetched successfully",
            code: 200
        })
    } catch (error) {
        return errorResponse(res, {
            message: error.message,
            code: 500
        })
    }
}

export const getRevenueTrend = async (req, res) => {
    try {
        const result = await analyticsService.getRevenueTrend();
        return successResponse(res, {
            data: result,
            message: "Revenue trend fetched successfully",
            code: 200
        })
    } catch (error) {
        return errorResponse(res, {
            message: error.message,
            code: 500
        })
    }
}

export const getRevenueByTime = async (req, res) => {
    try {
        const { period = 'monthly' } = req.query;
        const result = await analyticsService.getRevenueByTime(period);
        return successResponse(res, {
            data: result,
            message: "Revenue by time fetched successfully",
            code: 200
        })
    } catch (error) {
        return errorResponse(res, { 
            message: error.message,
            code: 500
        })
    }
}

