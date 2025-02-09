import { Request, Response } from "express";
import InventoryService from "../services/inventory_service";

export const inventoryController = {
  findAll: async (req: Request, res: Response) => {
    const orders = await InventoryService.findAll(req);
    res.json(orders);
  },

  findById: async (req: Request, res: Response) => {
    const order = await InventoryService.findById(req);

    if (!order) {
      res.status(404).json({ error: "Inventory not found" });
    }

    res.json(order);
  },

  create: async (req: Request, res: Response) => {
    try {
      await InventoryService.create(req);
      res.status(201).json({ message: "Inventory created successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      await InventoryService.update(req);
      res.json({ message: "Inventory updated successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  addStock: async (req: Request, res: Response) => {
    try {
      await InventoryService.addStock(req);
      res.json({ message: "Inventory updated successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  removeStock: async (req: Request, res: Response) => {
    try {
      await InventoryService.removeStock(req);
      res.json({ message: "Inventory updated successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
