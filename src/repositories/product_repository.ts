import { Request } from "express";
import prisma from "../config/db";
import { getPagination, getParams } from "../utils/helper";
import { Prisma, Product } from "@prisma/client";

class ProductRepository {
  async findAll(req: Request) {
    const { query, body } = getParams(req);

    const { pagination } = body;

    const newQuery: Prisma.ProductWhereInput = {
      id: query.id as string,
      name: query.name as string,
      image: query.image as string,
      price: query.price as unknown as number,
      stock: query.stock as unknown as number,
      // status: query.status as string,
      // category: query.category as string,
      createdAt: query.createdAt as string,
      updatedAt: query.updatedAt as string,
      description: query.description as string,
    };

    const data = await prisma.product.findMany({
      where: newQuery,
      take: Number(pagination.limit),
      skip: Number(pagination.offset),
    });

    const total = await prisma.product.count({ where: newQuery });

    return {
      data,
      pagination: getPagination({ pagination, total }),
    };
  }

  async findById(req: Request) {
    const { id, query } = getParams(req);
    return prisma.product.findUnique({ where: { id, ...query } });
  }

  async create(req: Request) {
    const { body } = getParams(req);

    const { name, image, description, category, price, stock } = body;

    return prisma.product.create({
      data: {
        name,
        image,
        price,
        stock,
        category,
        description,
      },
    });
  }

  async update(req: Request) {
    const { id, body } = getParams(req);

    const { category, description, image, name, price, stock, status } = body;

    return prisma.product.update({
      where: { id },
      data: { category, description, image, name, price, stock, status },
    });
  }

  async delete(req: Request) {
    const { id } = getParams(req);

    return prisma.product.delete({ where: { id } });
  }
  async removeStock(req: Request) {
    const { id, body } = getParams(req);

    const { quantity } = body;

    return prisma.product.update({ where: { id }, data: { stock: { decrement: quantity } } });
  }

  async addStock(req: Request) {
    const { id, body } = getParams(req);

    const { quantity } = body;

    return prisma.product.update({ where: { id }, data: { stock: { increment: quantity } } });
  }
}

export default new ProductRepository();
