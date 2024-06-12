import { Request, Response } from 'express'
import UserService from '../services/userService'

class UserController {
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await UserService.getUsers()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter usuários' })
    }
  }

  createUser = async (req: Request, res: Response) => {
    const { name, email, password, address, imgUrl, role } = req.body
    try {
      const newUser = await UserService.createUser({
        name,
        email,
        password,
        address,
        imgUrl,
        role,
      })
      res.status(201).json({ message: 'Usuário criado com sucesso', newUser })
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário' })
    }
  }

  getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id
    try {
      const user = await UserService.getUser(userId)
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter usuário' })
    }
  }

  updateUser = async (req: Request, res: Response) => {
    const userId = req.params.id
    const { name, email, password, address, imgUrl, role } = req.body
    try {
      const updatedUser = await UserService.updateUser(userId, {
        name,
        email,
        password,
        address,
        imgUrl,
        role,
      })
      res
        .status(200)
        .json({ message: 'Usuario atualizado com sucesso', updatedUser })
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário' })
    }
  }

  deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id
    try {
      const deletedUser = await UserService.deleteUser(userId)
      res
        .status(204)
        .json({ message: 'Usuario deletado com sucesso', deletedUser })
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário' })
    }
  }
}

export default UserController
