import express from "express";
import * as customersController from "./customers.controller.js";

const router = express.Router();

router.get("/", customersController.getCustomers);
router.post("/", customersController.createCustomer);
router.get("/:id", customersController.getCustomerById);

export default router;