import { Request, Response } from "express";
import OrderService from "../services/order_service";
import InventoryService from "../services/inventory_service";

export const orderController = {
  findAll: async (req: Request, res: Response) => {
    const orders = await OrderService.findAll(req);
    res.json(orders);
  },

  findById: async (req: Request, res: Response) => {
    const order = await OrderService.findById(req);

    if (!order) {
      res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  },

  create: async (req: Request, res: Response) => {
    try {
      await OrderService.create(req);
      res.status(201).json({ message: "Order created successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      await OrderService.update(req);
      res.json({ message: "Order updated successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
