import express, { Router } from 'express'
import UserController from '../controllers/userController'

const userController = new UserController()
const router: Router = express.Router()

router.get('/', userController.getAllUsers)
router.post('/', userController.createUser)
router.get('/:id', userController.getUserById)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export default router
