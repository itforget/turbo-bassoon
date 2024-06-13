import prisma from '../models/prismaClient'

class OrderService {
  async createOrder(
    userId: string,
    products: { productId: string; quantity: number; price: number }[],
  ) {
    let totalValue = 0;
    for (const product of products) {
      totalValue += product.quantity * product.price;
    }

    const order = await prisma.order.create({
      data: {
        userId,
        totalValue,
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
