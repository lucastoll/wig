import { Request, Response, NextFunction } from "express";
import { IUserService } from "../services/userService";

interface IUserController {
  getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
  getUserByEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}

class UserController implements IUserController {
  constructor(private userService: IUserService) {}

  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserByEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email } = req.params;

    if (!email) {
      res.status(400).json({
        error: "O campo email é obrigatório",
      });
      return;
    }

    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name, email, address, categoryIds, zipcode, googleToken } =
      req.body;

    const fields = ["name", "email", "address", "zipcode", "categoryIds"];

    for (let field of fields) {
      if (!req.body[field]) {
        res.status(400).json({
          error: `O campo ${field} é obrigatório`,
        });
        return;
      }
    }

    if (!Array.isArray(req.body.categoryIds)) {
      res.status(400).json({
        error: "O campo categoryIds deve ser um array",
      });
      return;
    }

    try {
      const newUser = await this.userService.createUser(
        name,
        email,
        address,
        categoryIds,
        zipcode
      );
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
}

export { UserController, IUserController };
