import express from 'express'
const router = express.Router();
import * as analytics  from './analytics.controller.js'

router.get('/revenue-trend', analytics.getRevenueTrend)
router.get('/metrics', analytics.getMetrics)
router.get('/revenue', analytics.getRevenueByTime)
router.get('/customers-by-city', analytics.getCustomersByCity)
router.get('/recent-orders', analytics.getRecentOrders)

export default router;