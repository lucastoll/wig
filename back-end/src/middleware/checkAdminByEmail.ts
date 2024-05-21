import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

export async function checkAdminByEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({
      error: "O email é obrigatório",
    });
    return;
  }

  const user = await User.findOne({ where: { email } });

  if (user?.administrator === false) {
    res.status(401).json({
      error: "Operação não autorizada",
    });
  }

  next();
}
