import { Router } from 'express'
import ProductController from '../controllers/productController'
import authMiddleware from '../middlewares/authMiddleware'
const productController = new ProductController()
const router: Router = Router()

router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProductById)
router.post('/', authMiddleware, productController.createProduct)
router.put('/:id', authMiddleware, productController.updateProduct)
router.delete('/:id', authMiddleware, productController.deleteProduct)

export default router
