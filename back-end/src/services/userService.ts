import { User } from "../models/user";
import { Category } from "../models/category";
import { CustomError } from "../errors/customError";
import getCoordinates from "../helpers/getCoordinates";
require("dotenv").config();

interface IUserService {
  getAllUsers(): Promise<User[]>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(
    name: string,
    email: string,
    address: string,
    categoryIds: number[],
    zipcode: string
  ): Promise<User>;
}

class UserService implements IUserService {
  async getAllUsers(): Promise<User[]> {
    const users = await User.findAll();
    return users;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({
      where: { email },
      include: Category,
    });
    return user;
  }

  async checkExistingUser(email: string): Promise<void> {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new CustomError("Usuário já cadastrado", 400);
    }
  }

  async createUser(
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

    await this.checkExistingUser(email);
    const { latitude, longitude } = await getCoordinates(zipcode);

    const newUser = await User.create({
      name,
      email,
      address,
      zipcode,
      coordlat: latitude,
      coordlon: longitude,
    });

    await newUser.addCategories(categories);

    const reloadedUser = await newUser.reload({ include: Category });

    return reloadedUser;
  }
}

export { UserService, IUserService };
