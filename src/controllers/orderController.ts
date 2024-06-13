import { Request, Response } from 'express';
import OrderService from '../services/orderService';

class OrderController {
  createOrder = async (req: Request, res: Response) => {
    try {
      const { userId, products } = req.body;

      if (!userId || !products) {
        return res.status(400).json({ message: 'userId and products are required' });
      }

      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: 'products must be a non-empty array' });
      }

      for (const product of products) {
        if (!product.productId || !product.quantity || !product.price) {
          return res.status(400).json({ message: 'Each product must have productId, quantity, and price' });
        }
      }

      const order = await OrderService.createOrder(userId, products);
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default OrderController
