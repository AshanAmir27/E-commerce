import express from 'express'
const router = express.Router();
import * as analytics  from './analytics.controller.js'

router.get('/total-customers', analytics.getTotalCustomers)
router.get('/total-products', analytics.getTotalProducts)

export default router;