import prisma from "../config/db";
import { Request } from "express";
import { getPagination, getParams } from "../utils/helper";

class OrderRepository {
  async getAllOrders(req: Request) {
    const { body } = getParams(req);

    const { user, pagination } = body;

    const data = await prisma.order.findMany({
      where: { userId: user.sub },
      take: Number(pagination.limit),
      skip: Number(pagination.offset),
    });

    const total = await prisma.order.count({ where: { userId: user.sub } });

    return {
      data,
      pagination: getPagination({ pagination, total }),
    };
  }

  async getOrderById(req: Request) {
    const { id, body } = getParams(req);

    const { user } = body;

    return prisma.order.findUnique({ where: { id, userId: user.sub } });
  }

  async createOrder(req: Request) {
    const { body } = getParams(req);

    const { quantity, address, comment, productId, user } = body;

    if (!quantity || !address || !productId) {
      throw new Error("Todos los campos son obligatorios");
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    if (product.stock < quantity) {
      throw new Error("No hay suficiente stock");
    }

    return prisma.order.create({
      data: {
        quantity,
        address,
        comment,
        totalPrice: quantity * product.price,
        products: { connect: { id: productId } },
        user: { connect: { id: user.sub } },
      },
    });
  }

  async updateOrder(req: Request) {
    const { id, body } = getParams(req);

    const { user } = body;

    return prisma.order.update({ where: { id, userId: user.sub }, data: body });
  }
}

export default new OrderRepository();
