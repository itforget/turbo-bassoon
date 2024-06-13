import { Request, Response } from 'express'
import OrderService from '../services/orderService';

class OrderController{
    createOrder = async (req: Request, res: Response) => {
    const { userId, orderItems } = req.body;

    try {
      const order = await OrderService.createOrder(userId, orderItems);
      res.status(201).json({ orderProducts: order });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  getOrders = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      const orders = await OrderService.getOrders(userId);
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const order = await OrderService.deleteOrder(id);
      res.status(200).json(order);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default OrderController;
