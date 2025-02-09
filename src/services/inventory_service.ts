import { Request } from "express";
import InventoryRepository from "../repositories/inventory_repository";

class InventoryService {
  async findAll(req: Request) {
    return InventoryRepository.findAll(req);
  }

  async findById(req: Request) {
    return InventoryRepository.findById(req);
  }

  async create(req: Request) {
    return InventoryRepository.create(req);
  }

  async update(req: Request) {
    return InventoryRepository.update(req);
  }

  async delete(req: Request) {
    return InventoryRepository.delete(req);
  }

  async addStock(req: Request) {
    return InventoryRepository.addStock(req);
  }

  async removeStock(req: Request) {
    return InventoryRepository.removeStock(req);
  }
}

export default new InventoryService();
