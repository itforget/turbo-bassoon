import { Request, Response } from 'express'
import ProductService from '../services/ProductService'

class ProductController {
  getAllProducts = async (req: Request, res: Response) => {
    try {
      const products = await ProductService.getAllProducts()
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter produtos' })
    }
  }

  createProduct = async (req: Request, res: Response) => {
    const { name, description, price, imgUrl, location, amount, category } = req.body
    const cookieId = req.headers.cookie || ''
    const sliptCookie = cookieId.split('=')[1]
    const userId = sliptCookie
    try {
      const newProduct = await ProductService.createProduct({
        name,
        price,
        amount,
        description,
        category,
        imgUrl,
        location
      }, userId)
      res
        .status(201)
        .json({ message: 'Produto criado com sucesso', newProduct })
    } catch (error: any) {
      res.status(500).json({ error: error.message })
    }
  }

  getProductById = async (req: Request, res: Response) => {
    const productId = req.params.id
    try {
      const product = await ProductService.getProductById(productId)
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter produto' })
    }
  }

  updateProduct = async (req: Request, res: Response) => {
    const productId = req.params.id
    const { name, description, price, imgUrl, amount, category, location } = req.body
    try {
      const updatedProduct = await ProductService.updateProduct(productId, {
        name,
        price,
        amount,
        description,
        category,
        imgUrl,
        location
      })
      res
        .status(200)
        .json({ message: 'Produto atualizado com sucesso', updatedProduct })
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar produto' })
    }
  }

  deleteProduct = async (req: Request, res: Response) => {
    const productId = req.params.id
    try {
      const deletedProduct = await ProductService.deleteProduct(productId)
      res
        .status(200)
        .json({ message: 'Produto deletado com sucesso', deletedProduct })
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar produto' })
    }
  }
}
export default ProductController
