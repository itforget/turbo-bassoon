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

  getSession = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const authUser = await authService.getSession(authHeader);
        res.status(200).json(authUser);
      } else {
        res.status(401).json({ error: 'Usuário não autenticado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Usuário não autenticado' });
    }
  }
}

export default authController
