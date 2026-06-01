import express from "express";
import * as customersController from "./customers.controller.js";

const router = express.Router();

// GET /api/users
router.get("/get-customer-by-filter", customersController.getCustomersByFilter);
router.get("/", customersController.getCustomers);
router.post("/", customersController.createCustomer);
router.get("/:id", customersController.getCustomerById);

export default router;