import express from "express";
import { getOrders, intent, confirm } from "../controllers/order.controller.js";

const router = express.Router();

// router.post("/:chatId",  createOrder);
router.get("/",  getOrders);
router.post("/create-payment-intent/:id",  intent);
router.put("/",  confirm);

export default router;