import express from "express";
import { orderController } from "../controllers/order_controller";

const router = express.Router();

router.get("/", orderController.findAll);
router.post("/", orderController.create);
router.put("/:id", orderController.update);
router.get("/:id", orderController.findById);

export default router;
