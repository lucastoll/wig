import { Request, Response } from 'express';
import { Category } from '../models/category';

class CategoryController {
  static async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      res.status(500).json({ error: "Erro ao buscar categorias" });
    }
  }

  static async createCategory(req: Request, res: Response): Promise<void> {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({
        error: "O campo name é obrigatório",
      });
      return;
    }

    try {
      const newCategory = await Category.create({ name });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      res.status(500).json({ error: "Erro ao criar categoria" });
    }
  }
}

export { CategoryController };