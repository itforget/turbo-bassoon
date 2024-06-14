import prisma from '../models/prismaClient'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwtUtils'
import jwt from 'jsonwebtoken'
class authService {
  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (isPasswordCorrect) {
        const token = generateToken(user)
        return {token: token}
      }
    }
    return null
  }

  static async getSession(token: string) {
    const tokenValue = token.split(' ')[1]
    const decoded: any = jwt.verify(tokenValue, process.env.JWT_SECRET as string);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (user) {
      return user
    }
    return null
  }
}
export default authService
