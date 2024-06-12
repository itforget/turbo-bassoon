import { Router } from 'express'
import AuthController from '../controllers/authController'

const authController = new AuthController()
const router: Router = Router()

router.post('/login', authController.login)

export default router
