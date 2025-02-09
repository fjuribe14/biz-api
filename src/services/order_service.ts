import { Request } from "express";
import OrderRepository from "../repositories/order_repository";

class OrderService {
  async getAllOrders(req: Request) {
    return OrderRepository.getAllOrders(req);
  }

  async getOrderById(req: Request) {
    return OrderRepository.getOrderById(req);
  }

  async createOrder(req: Request) {
    return OrderRepository.createOrder(req);
  }

  async updateOrder(req: Request) {
    return OrderRepository.updateOrder(req);
  }
}

export default new OrderService();
