import prisma from '../models/prismaClient'

class OrderService {
  async createOrder(
    userId: string,
    products: { productId: string; quantity: number }[],
  ) {
    const order = await prisma.order.create({
      data: {
        userId,
        totalValue: 0,
        orderItems: {
          create: products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    })

    return order
  }


}

export default new OrderService()
