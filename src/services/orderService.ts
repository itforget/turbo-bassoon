import { PrismaClient, Order, Product } from '@prisma/client';

const prisma = new PrismaClient();

interface OrderItemInput {
  productId: string;
  quantity: number;
}

class OrderService {
 static async createOrder(userId: string, orderItems: OrderItemInput[]): Promise<Order> {
    let totalValue = 0;

    for (const item of orderItems) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      });

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      if (product.amount < item.quantity) {
        throw new Error(`Insufficient quantity for product ${product.name}`);
      }

      totalValue += product.price * item.quantity;
    }

    const order = await prisma.order.create({
      data: {
        userId,
        totalValue,
        status: 'EM_PROCESSAMENTO',
        orderItems: {
          create: orderItems.map(item => ({
            quantity: item.quantity,
            productId: item.productId
          }))
        }
      }
    });

    for (const item of orderItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          amount: {
            decrement: item.quantity
          }
        }
      });
    }

    return order;
  }

  static async getOrders(userId: string): Promise<Order[]> {
    return prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: true
      }
    });
  }



  static async deleteOrder(id: string): Promise<Order> {
    const order = await prisma.order.findUnique({
        where: { id },
        include: { orderItems: true }
      });
  
      if (!order) {
        throw new Error(`Order with ID ${id} not found`);
      }
  
      await prisma.orderItem.deleteMany({
        where: { orderId: id }
      });
  
      const deletedOrder = await prisma.order.delete({
        where: { id }
      });
  
      return deletedOrder;
      
  }
}
export default OrderService