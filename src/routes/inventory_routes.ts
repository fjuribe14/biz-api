import express from "express";
import { inventoryController } from "../controllers/inventory_controller";

const router = express.Router();

router.get("/", inventoryController.findAll);
router.post("/", inventoryController.create);
router.put("/add_stock/:id", inventoryController.update);
router.put("/remove_stock/:id", inventoryController.update);
router.get("/:id", inventoryController.findById);

export default router;
