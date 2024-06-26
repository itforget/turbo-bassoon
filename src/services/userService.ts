import prisma from '../models/prismaClient'
import User from '../models/user'
import { Roles } from '@prisma/client'
import bcrypt from 'bcrypt'

class UserService {
  static async createUser(data: User) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10)
      const newUser = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          location: data.location,
          imgUrl: data.imgUrl,
          role: Roles.USER,
        },
      })
      return newUser
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`)
    }
  }

  static async getUsers() {
    const users = await prisma.user.findMany()
    return users
  }

  static async getUser(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }

  static async updateUser(id: string, newData: User) {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: newData.name,
        email: newData.email,
        password: newData.password,
        location: newData.location,
        imgUrl: newData.imgUrl,
        role: Roles?.USER || Roles.ADMIN,
      },
    })
    return updatedUser
  }

  static async deleteUser(id: string) {
    const deletedUser = await prisma.user.delete({
      where: { id },
    })
    return deletedUser
  }
}
export default UserService
