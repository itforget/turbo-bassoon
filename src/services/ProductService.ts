import prisma from '../models/prismaClient'
import Product from '../models/produtc'

class ProductService {
  static async getAllProducts() {
    const products = await prisma.product.findMany()
    return products
  }

  static async createProduct(data: Product) {
    const newProduct = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        amount: data.amount,
        description: data.description,
        category: data.category,
        imgUrl: data.imgUrl,
      },
    })
    return newProduct
  }

  static async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
    })
    if (!product) {
      throw new Error('Product not found')
    }
    return product
  }

  static async updateProduct(id: string, newData: Product) {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: newData.name,
        price: newData.price,
        amount: newData.amount,
        description: newData.description,
        category: newData.category,
        imgUrl: newData.imgUrl,
      },
    })
    return updatedProduct
  }

  static async deleteProduct(id: string) {
    const deletedProduct = await prisma.product.delete({
      where: { id },
    })
    return deletedProduct
  }
}

export default ProductService
