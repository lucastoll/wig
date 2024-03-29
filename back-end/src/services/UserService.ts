import { User } from "../models/User";
import { Category } from "../models/Category";
import { CustomError } from "../errors/CustomError";

class UserService {
  static async getAllUsers(): Promise<User[]> {
    const users = await User.findAll();
    return users;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({
      where: { email },
      include: Category,
    });
    return user;
  }

  static async createUser(
    name: string,
    email: string,
    address: string,
    categoryIds: number[],
    zipcode: string
  ): Promise<User> {
    const categories = await Category.findAll({
      where: { id: categoryIds },
    });

    if (categories.length !== categoryIds.length) {
      throw new CustomError(
        "Uma ou mais categorias não foram encontradas",
        404
      );
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new CustomError("Usuário já cadastrado", 400);
    }

    const newUser = await User.create({ name, email, address, zipcode });

    await newUser.addCategories(categories);

    const reloadedUser = await newUser.reload({ include: Category });

    return reloadedUser;
  }
}

export { UserService };