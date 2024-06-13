import { Router } from 'express'
import OrderController from '../controllers/orderController'

const orderController = new OrderController()

const router: Router = Router()

router.post('/', orderController.createOrder)

export default router
