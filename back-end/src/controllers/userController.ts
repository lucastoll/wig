import { Request, Response } from "express";
import { User } from "../models/User";
import { ValidationError } from "sequelize";

class UserController {
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    const { nome, email } = req.body;

    if (!nome || !email) {
      res.status(400).json({
        error: "Todos os campos são obrigatórios: nome, email, senha",
      });
    }

    try {
      const newUser = await User.create({ nome, email });
      res.status(201).json(newUser);
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error("Erro de validação ao criar usuário:", error.errors);
        res.status(400).json({
          error: "Erro de validação ao criar usuário",
          details: error.errors,
        });
      } else {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ error: "Erro ao criar usuário" });
      }
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    const { nome, email, senha } = req.body;
    try {
      const [updatedRows] = await User.update(
        { nome, email, senha },
        { where: { id: userId } }
      );
      if (updatedRows > 0) {
        res.json({ message: "Usuário atualizado com sucesso" });
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    try {
      const deletedRows = await User.destroy({ where: { id: userId } });
      if (deletedRows > 0) {
        res.json({ message: "Usuário deletado com sucesso" });
      } else {
        res.status(404).json({ error: "Usuário não encontrado" });
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  }
}

export default UserController;
