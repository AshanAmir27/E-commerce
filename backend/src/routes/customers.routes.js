import express from "express";
import customersController from "../controllers/customers.controller.js";

const router = express.Router();

// GET /api/users
router.get("/", customersController.getCustomers);

export default router;