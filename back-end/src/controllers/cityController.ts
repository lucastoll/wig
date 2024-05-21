// CityController.ts
import { Request, Response, NextFunction } from "express";
import { ICityService } from "../services/cityService";

interface ICityController {
  getAllCities(req: Request, res: Response, next: NextFunction): Promise<void>;
  createCity(req: Request, res: Response, next: NextFunction): Promise<void>;
}

class CityController implements ICityController {
  private cityService: ICityService;

  constructor(cityService: ICityService) {
    this.cityService = cityService;
  }

  async getAllCities(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cities = await this.cityService.getAllCities();
      res.json(cities);
    } catch (error) {
      next(error);
    }
  }

  async createCity(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({
        error: "O campo nome é obrigatório",
      });
      return;
    }

    try {
      const newCity = await this.cityService.createCity(name);
      res.status(201).json(newCity);
    } catch (error) {
      next(error);
    }
  }
}

export { CityController, ICityController };
