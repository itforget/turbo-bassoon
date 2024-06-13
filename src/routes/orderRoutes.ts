import { Router } from 'express'
import OrderController from '../controllers/orderController'

const orderController = new OrderController()

const router: Router = Router()

router.get('/:userId', orderController.getOrders)
router.post('/', orderController.createOrder)
router.delete('/:id', orderController.deleteOrder)

export default router
