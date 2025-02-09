import { Request } from "express";
import OrderRepository from "../repositories/order_repository";

class OrderService {
  async findAll(req: Request) {
    return OrderRepository.findAll(req);
  }

  async findById(req: Request) {
    return OrderRepository.findById(req);
  }

  async create(req: Request) {
    return OrderRepository.create(req);
  }

  async update(req: Request) {
    return OrderRepository.update(req);
  }
}

export default new OrderService();
