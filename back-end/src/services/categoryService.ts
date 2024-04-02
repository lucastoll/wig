import { Category } from "../models/category";

class CategoryService {
  static async getCategories(): Promise<Category[]> {
    const categories = await Category.findAll();
    return categories;
  }

  static async createCategory(name: string): Promise<Category> {
    const newCategory = await Category.create({ name });
    return newCategory;
  }
}

export { CategoryService };
