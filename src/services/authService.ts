import prisma from '../models/prismaClient'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/jwtUtils'
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
}
export default authService
