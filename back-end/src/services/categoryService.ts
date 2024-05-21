import { Category } from "../models/category";

interface ICategoryService {
  getCategories(): Promise<Category[]>;
  createCategory(name: string): Promise<Category>;
}

class CategoryService implements ICategoryService {
  async getCategories(): Promise<Category[]> {
    const categories = await Category.findAll();
    return categories;
  }

  async createCategory(name: string): Promise<Category> {
    const newCategory = await Category.create({ name });
    return newCategory;
  }
}

export { ICategoryService, CategoryService };