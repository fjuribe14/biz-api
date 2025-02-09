import { Request } from "express";
import prisma from "../config/db";
import { Prisma } from "@prisma/client";
import { getPagination, getParams } from "../utils/helper";

class InventoryRepository {
  async findAll(req: Request) {
    const { query, body } = getParams(req);

    const { pagination } = body;

    const newQuery: Prisma.InventoryWhereInput = {
      id: query.id as string,
      quantity: query.quantity as unknown as number,
      productId: query.productId as string,
    };

    const data = await prisma.inventory.findMany({
      where: newQuery,
      take: Number(pagination.limit),
      skip: Number(pagination.offset),
      include: { product: true },
    });

    const total = await prisma.inventory.count({ where: newQuery });

    return {
      data,
      pagination: getPagination({ pagination, total }),
    };
  }

  async findById(req: Request) {
    const { id, query } = getParams(req);

    const newQuery: Prisma.InventoryWhereInput = {
      id: query.id as string,
      productId: query.productId as string,
      quantity: query.quantity as unknown as number,
    };

    return await prisma.inventory.findUnique({
      where: { id, AND: newQuery },
      include: { product: true },
    });
  }
  async create(req: Request) {
    const { body } = getParams(req);
    const { productId, quantity } = body;

    console.log({ productId, quantity });

    if (!productId || !quantity) {
      throw new Error("Fields productId and quantity are required");
    }

    if (quantity < 0) {
      throw new Error("Quantity must be greater than 0");
    }

    return prisma.inventory.upsert({
      where: { productId },
      update: { quantity },
      create: { productId, quantity },
    });
  }
  async update(req: Request) {
    const { id, body } = getParams(req);

    const { productId, quantity } = body;

    if (!productId || !quantity) {
      throw new Error("Fields productId and quantity are required");
    }

    const oldInventory = await this.findById(req);

    if (!oldInventory) {
      throw new Error("Inventory not found");
    }

    if (quantity < oldInventory || quantity < 0) {
      throw new Error("Quantity must be greater than 0");
    }

    return prisma.inventory.update({ where: { id }, data: { productId, quantity } });
  }

  async delete(req: Request) {
    const { id } = getParams(req);

    return prisma.inventory.delete({ where: { id } });
  }

  async removeStock(req: Request) {
    const { id, body } = getParams(req);

    const { quantity } = body;

    const oldInventory = await this.findById(req);

    if (!oldInventory) {
      throw new Error("Inventory not found");
    }

    if (quantity < oldInventory.quantity || quantity < 0) {
      throw new Error("Quantity must be greater than 0");
    }

    return prisma.inventory.update({ where: { id }, data: { quantity: { decrement: quantity } } });
  }

  async addStock(req: Request) {
    const { id, body } = getParams(req);

    const { quantity } = body;

    const oldInventory = await this.findById(req);

    if (!oldInventory) {
      throw new Error("Inventory not found");
    }

    if (quantity < oldInventory.quantity || quantity < 0) {
      throw new Error("Quantity must be greater than 0");
    }

    return prisma.inventory.update({ where: { id }, data: { quantity: { increment: quantity } } });
  }
}

export default new InventoryRepository();
