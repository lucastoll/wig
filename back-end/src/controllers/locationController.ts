import { Request, Response, NextFunction } from "express";
import { LocationService } from "../services/locationService";
import { ValidationError } from "sequelize";

class LocationController {
  static async getAllLocations(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const locations = await LocationService.getAllLocations();
      res.json(locations);
    } catch (error) {
      next(error);
    }
  }

  static async createLocation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { address, zipcode, maxCapacity, cityId, name } = req.body;

    if (!address || !zipcode || !maxCapacity || !cityId) {
      res.status(400).json({
        error:
          "Os campos address, zipcode, maxCapacity e cityId são obrigatórios",
      });
      return;
    }

    try {
      const newLocation = await LocationService.createLocation(
        address,
        zipcode,
        maxCapacity,
        cityId,
        name
      );
      res.status(201).json(newLocation);
    } catch (error) {
      if (error instanceof ValidationError) {
        next(error);
      }
    }
  }
}

export { LocationController };
