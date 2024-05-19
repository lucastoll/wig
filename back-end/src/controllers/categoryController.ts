import { Request, Response, NextFunction } from "express";
import { ICategoryService } from "../services/categoryService";

interface ICategoryController {
  getCategories(req: Request, res: Response, next: NextFunction): Promise<void>;
  createCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}

class CategoryController implements ICategoryController {
  private categoryService: ICategoryService;

  constructor(categoryService: ICategoryService) {
    this.categoryService = categoryService;
  }

  async getCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await this.categoryService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  async createCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({
        error: "O campo name é obrigatório",
      });
      return;
    }

    try {
      const newCategory = await this.categoryService.createCategory(name);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
}

export { CategoryController, ICategoryController };
