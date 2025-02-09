import { Request, Response } from "express";
import OrderService from "../services/order_service";
import ProductService from "../services/product_service";

export const orderController = {
  getAllOrders: async (req: Request, res: Response) => {
    const orders = await OrderService.getAllOrders(req);
    res.json(orders);
  },

  getOrderById: async (req: Request, res: Response) => {
    const order = await OrderService.getOrderById(req);

    if (!order) {
      res.status(404).json({ error: "Orden no encontrada" });
    }

    res.json(order);
  },

  createOrder: async (req: Request, res: Response) => {
    try {
      await OrderService.createOrder(req);
      await ProductService.removeStock(req);
      res.status(201).json({ message: "Orden creada exitosamente" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  updateOrder: async (req: Request, res: Response) => {
    try {
      const updatedOrder = await OrderService.updateOrder(req);
      res.json({ message: "Orden actualizada exitosamente" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
