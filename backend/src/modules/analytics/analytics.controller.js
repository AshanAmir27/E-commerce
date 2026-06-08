import * as analyticsService from './analytics.service.js'

export const getTotalCustomers = async (req, res)=> {
    try {
        const result = await analyticsService.getTotalCustomers();
        return res.json({
            result
        })
    } catch (error) {
        res.status(500).json({
            code:500,
            status: false,
            success: false,
            message: error.message
        })
    }
}

export const getTotalProducts = async (req, res)=> {
    try {
        const result = await analyticsService.getTotalProducts();
        return res.json({
            result
        })
    } catch (error) {
        res.status(500).json({
            code:500,
            status: false,
            success: false,
            message: error.message
        })
    }
}