import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customErrorr";

function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}

export { errorHandler };
