import { Request } from "express";
import ProductRepository from "../repositories/product_repository";

class ProductService {
  async getAllProducts(req: Request) {
    return ProductRepository.findAll(req);
  }

  async getProductById(req: Request) {
    return ProductRepository.findById(req);
  }

  async createProduct(req: Request) {
    return ProductRepository.create(req);
  }

  async updateProduct(req: Request) {
    return ProductRepository.update(req);
  }

  async deleteProduct(req: Request) {
    return ProductRepository.delete(req);
  }

  async addStock(req: Request) {
    return ProductRepository.addStock(req);
  }

  async removeStock(req: Request) {
    return ProductRepository.removeStock(req);
  }
}

export default new ProductService();
