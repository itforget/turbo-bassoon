import { Router } from 'express'
import ProductController from '../controllers/productController'
const productController = new ProductController()
const router: Router = Router()

router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProductById)
router.post('/', productController.createProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

export default router
