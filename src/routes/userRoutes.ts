import express, { Router } from 'express'
import UserController from '../controllers/userController'
import authMiddleware from '../middlewares/authMiddleware'

const userController = new UserController()
const router: Router = express.Router()

router.get('/', authMiddleware , userController.getAllUsers)
router.post('/', userController.createUser)
router.get('/:id', authMiddleware, userController.getUserById)
router.put('/:id', authMiddleware, userController.updateUser)
router.delete('/:id', authMiddleware, userController.deleteUser)

export default router
