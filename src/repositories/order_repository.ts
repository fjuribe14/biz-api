import prisma from "../config/db";
import { Request } from "express";
import { getPagination, getParams } from "../utils/helper";

class OrderRepository {
  async findAll(req: Request) {
    const { body } = getParams(req);

    const { user, pagination } = body;

    const data = await prisma.order.findMany({
      where: { userId: user.sub },
      take: Number(pagination.limit),
      skip: Number(pagination.offset),
      include: {
        ordenItems: {
          include: { product: true },
        },
      },
    });

    const total = await prisma.order.count({ where: { userId: user.sub } });

    return {
      data,
      pagination: getPagination({ pagination, total }),
    };
  }

  async findById(req: Request) {
    const { id, body } = getParams(req);

    const { user } = body;

    return prisma.order.findUnique({
      where: { id, userId: user.sub },
      include: {
        ordenItems: {
          include: { product: true },
        },
      },
    });
  }

  async create(req: Request) {
    const { body } = getParams(req);

    const { address, comment, products, user } = body;

    if (!address || !products) {
      throw new Error("Fields address and products are required");
    }

    let totalPrice = 0;

    for (const item of products) {
      if (!item.productId || !item.quantity) {
        throw new Error("Fields productId and quantity are required");
      }

      if (item.quantity <= 0) {
        throw new Error(`Quantity of product ${item.productId} must be greater than 0`);
      }

      const inventario = await prisma.inventory.findUnique({
        where: { productId: item.productId },
        include: { product: true },
      });

      if (!inventario) {
        throw new Error(`Inventory for product with ID ${item.productId} not found`);
      }

      if (inventario.quantity < item.quantity) {
        throw new Error(`Product with ID ${item.productoId} is out of stock`);
      }

      totalPrice += inventario.product.price * item.quantity;
    }

    const order = await prisma.order.create({
      data: {
        address,
        comment,
        totalPrice,
        ordenItems: { create: products },
        user: { connect: { id: user.sub } },
      },
    });

    for (const item of products) {
      await prisma.inventory.update({
        where: { productId: item.productId },
        data: { quantity: { decrement: item.quantity } },
      });
    }

    return order;
  }

  async update(req: Request) {
    const { id, body } = getParams(req);

    const { user } = body;

    return prisma.order.update({ where: { id, userId: user.sub }, data: body });
  }
}

export default new OrderRepository();
