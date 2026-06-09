import express from 'express'
const router = express.Router();
import * as analytics  from './analytics.controller.js'

router.get('/total-customers', analytics.getTotalCustomers)
router.get('/total-products', analytics.getTotalProducts)
router.get('/total-orders', analytics.getTotalOrders)
router.get('/revenue-trend', analytics.getRevenueTrend)
router.get('/revenue', analytics.getRevenueByTime)

export default router;