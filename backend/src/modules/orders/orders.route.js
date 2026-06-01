// modules/orders/orders.route.js
import express from "express";
import * as ordersController from "./orders.controller.js";

const router = express.Router();

router.post("/", ordersController.createOrder);
router.get("/", ordersController.getOrders);
router.get("/:id", ordersController.getOrderById);
router.patch("/:id/cancel", ordersController.cancelOrder);

export default router;