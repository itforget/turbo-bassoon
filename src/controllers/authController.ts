import { Request, Response } from 'express'
import authService from '../services/authService'

class authController {
  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body
      const authUser = await authService.login(email, password)
      res.status(200).json(authUser)
    } catch (error) {
      res.status(500).json({ error: 'Usuário ou senha incorretos' })
    }
  }
}

export default authController
