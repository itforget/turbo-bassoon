import { Router } from 'express'
import { getAllOrders, createOrder } from '../controllers/orderController'

const router: Router = Router()

router.get('/', getAllOrders)
router.post('/', createOrder)

export default router
