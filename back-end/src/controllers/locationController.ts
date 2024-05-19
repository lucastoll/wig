import { Request, Response, NextFunction } from "express";
import { ILocationService } from "../services/locationService";
import { ValidationError } from "sequelize";

interface ILocationController {
  getAllLocations(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  createLocation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}

class LocationController implements ILocationController {
  constructor(private locationService: ILocationService) {}

  async getAllLocations(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const locations = await this.locationService.getAllLocations();
      res.json(locations);
    } catch (error) {
      next(error);
    }
  }

  async createLocation(
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
      const newLocation = await this.locationService.createLocation(
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

export { LocationController, ILocationController };
