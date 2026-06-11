import * as analyticsService from './analytics.service.js'
import { successResponse, errorResponse } from '../../core/response/responseHandler.js'


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

export const getMetrics = async (req, res ) => {
    try {
        const result = await analyticsService.getMetrics();
        return successResponse(res, {
            data: result,
            message: "Metrics fetched successfully",
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

export const getCustomersByCity = async (req, res) => {
    try {
        const result = await analyticsService.getCustomersByCity();
        return res.status(200).json({
            success: true,
            message: "Customers by city fetched successfully",
            data: result.data
        })
    } catch (error) {
        return errorResponse(res, {
            message: error.message,
            code: 500
        })
    }
}

export const getRecentOrders = async (req, res) => {
    try {
        const result = await analyticsService.getRecentOrders();
        return res.status(200).json({
            success: true,
            message: "Recent orders fetched successfully",
            data: result.data
        })
    } catch (error) {
        return errorResponse(res, {
            message: error.message,
            code: 500
        })
    }
}