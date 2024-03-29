import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/CategoryService";

class CategoryController {
  static async getCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await CategoryService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({
        error: "O campo name é obrigatório",
      });
      return;
    }

    try {
      const newCategory = await CategoryService.createCategory(name);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
}

export { CategoryController };