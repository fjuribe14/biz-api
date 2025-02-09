import { Request } from "express";
import prisma from "../config/db";
import { getPagination, getParams } from "../utils/helper";
import { Prisma, Product, ProductCategory } from "@prisma/client";

class ProductRepository {
  async findAll(req: Request) {
    const { query, body } = getParams(req);

    const { pagination } = body;

    const newQuery: Prisma.ProductWhereInput = {
      id: query.id as string,
      name: query.name as string,
      image: query.image as string,
      createdAt: query.createdAt as string,
      updatedAt: query.updatedAt as string,
      price: query.price as unknown as number,
      description: query.description as string,
      status: query.status as unknown as boolean,
      category: query.category as ProductCategory,
    };

    const data = await prisma.product.findMany({
      where: newQuery,
      take: Number(pagination.limit),
      skip: Number(pagination.offset),
      include: { inventory: true },
    });

    const total = await prisma.product.count({ where: newQuery });

    return {
      data,
      pagination: getPagination({ pagination, total }),
    };
  }

  async findById(req: Request) {
    const { id, query } = getParams(req);

    const newQuery: Prisma.ProductWhereInput = {
      id: query.id as string,
      name: query.name as string,
      image: query.image as string,
      createdAt: query.createdAt as string,
      updatedAt: query.updatedAt as string,
      price: query.price as unknown as number,
      description: query.description as string,
      status: query.status as unknown as boolean,
      category: query.category as ProductCategory,
    };

    return await prisma.product.findUnique({
      where: { id, AND: newQuery },
      include: { inventory: true },
    });
  }

  async create(req: Request) {
    const { body } = getParams(req);

    const { name, image, description, category, price } = body;

    if (!name || !image || !description || !category || !price) {
      throw new Error("Fields name, image, description, category and price are required");
    }

    if (!Object.values(ProductCategory).includes(category)) {
      throw new Error("category is not valid");
    }

    return prisma.product.create({
      data: {
        name,
        image,
        price,
        category,
        description,
      },
    });
  }

  async update(req: Request) {
    const { id, body } = getParams(req);

    const { category, description, image, name, price, status } = body;

    return prisma.product.update({
      where: { id },
      data: { category, description, image, name, price, status },
    });
  }

  async delete(req: Request) {
    const { id } = getParams(req);

    return prisma.product.delete({ where: { id } });
  }
}

export default new ProductRepository();
