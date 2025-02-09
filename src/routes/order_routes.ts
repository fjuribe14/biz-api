import express from "express";
import { orderController } from "../controllers/order_controller";

const router = express.Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);

export default router;
