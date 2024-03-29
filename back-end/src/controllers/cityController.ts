import { Request, Response, NextFunction } from "express";
import { CityService } from "../services/CityService";

class CityController {
  static async getAllCities(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cities = await CityService.getAllCities();
      res.json(cities);
    } catch (error) {
      next(error);
    }
  }

  static async createCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({
        error: "O campo nome é obrigatório",
      });
      return;
    }

    try {
      const newCity = await CityService.createCity(name);
      res.status(201).json(newCity);
    } catch (error) {
        next(error);
      }
  }
}

export { CityController };