import { Request, Response } from "express";
import { User } from "../models/user";
import { Category } from "../models/category";

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

  static async getUserByEmail(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
  
    if (!email) {
      res.status(400).json({
        error: "O campo email é obrigatório",
      });
      return;
    }
  
    try {
      const user = await User.findOne({
        where: { email },
        include: Category
      });
  
      if (!user) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return;
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  static async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, address, categoryIds, zipcode } = req.body;

    if (!name) {
      res.status(400).json({
        error: "O campo name é obrigatório",
      });
      return;
    }

    if (!email) {
      res.status(400).json({
        error: "O campo email é obrigatório",
      });
      return;
    }

    if (!address) {
      res.status(400).json({
        error: "O campo address é obrigatório",
      });
      return;
    }

    if (!zipcode) {
      res.status(400).json({
        error: "O campo zipcode é obrigatório",
      });
      return;
    }

    if (!categoryIds) {
      res.status(400).json({
        error: "O campo categoryIds é obrigatório",
      });
      return;
    }

    if (!Array.isArray(categoryIds)) {
      res.status(400).json({
        error: "O campo categoryIds deve ser um array",
      });
      return;
    }

    try {
      const categories = await Category.findAll({
        where: { id: categoryIds }, 
      });

      if (categories.length !== categoryIds.length) {
        res
          .status(400)
          .json({ error: "Uma ou mais categorias não foram encontradas" });
        return;
      }
      const newUser = await User.create({ name, email, address, zipcode });

      await newUser.addCategories(categories);

      const reloadedUser = await newUser.reload({ include: Category });

      res.status(201).json(reloadedUser);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }
}

export default UserController;
