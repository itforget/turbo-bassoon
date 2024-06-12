import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllOrders = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const orders = await prisma.order.findMany()
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
}

export const createOrder = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { totalValue, status, userId } = req.body
  try {
    const newOrder = await prisma.order.create({
      data: {
        totalValue,
        status,
        userId,
      },
    })
    res.status(201).json(newOrder)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' })
  }
}
