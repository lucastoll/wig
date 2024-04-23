import { User } from "../models/user";
import { Category } from "../models/category";
import { CustomError } from "../errors/customError";
import { OAuth2Client } from "google-auth-library";
import getCoordinates from "../helpers/getCoordinates";
require("dotenv").config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verify(token: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) throw new CustomError("Token inválido", 400);
    return payload;
  } catch (err) {
    throw new CustomError("Token inválido", 400);
  }
}

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
    zipcode: string,
    googleToken: string
  ): Promise<User> {
    const googleUser = await verify(googleToken);
    if (googleUser.email !== email) {
      throw new CustomError(
        "O token do Google não corresponde ao email fornecido",
        400
      );
    }

    const categories = await Category.findAll({
      where: { id: categoryIds },
    });

    if (categories.length !== categoryIds.length) {
      throw new CustomError(
        "Uma ou mais categorias não foram encontradas",
        404
      );
    }

    const { latitude, longitude } = await getCoordinates(zipcode);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new CustomError("Usuário já cadastrado", 400);
    }

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

export { UserService };
