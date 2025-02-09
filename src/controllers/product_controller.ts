import { type Request, Response } from "express";
import ProductService from "../services/product_service";

export const productController = {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductService.getAllProducts(req);
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async getProductById(req: Request<{ id: string }>, res: Response) {
    try {
      const product = await ProductService.getProductById(req);
      if (!product) {
        res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  async createProduct(req: Request, res: Response) {
    try {
      await ProductService.createProduct(req);
      res.status(201).json({ message: "Product created successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async updateProduct(req: Request, res: Response) {
    try {
      await ProductService.updateProduct(req);
      res.json({ message: "Product updated successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteProduct(req: Request, res: Response) {
    try {
      await ProductService.deleteProduct(req);
      res.status(204).json({ message: "Product deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};
