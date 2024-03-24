import { Request, Response } from "express";
import { Location } from "../models/location";
import { ValidationError, ForeignKeyConstraintError } from "sequelize";

class LocationController {
  static async getAllLocations(req: Request, res: Response): Promise<void> {
    try {
      const locations = await Location.findAll({
        include: "City",
      });
      res.json(locations);
    } catch (error) {
      console.error("Erro ao buscar locais:", error);
      res.status(500).json({ error: "Erro ao buscar locais" });
    }
  }

  static async createLocation(req: Request, res: Response): Promise<void> {
    const { address, zipcode, maxCapacity, cityId } = req.body;
    if (!address) {
      res.status(400).json({
        error: "O campo address é obrigatório",
      });
      return;
    }

    if (!zipcode) {
      res.status(400).json({
        error: "O campo zipcode é obrigatório",
      });
      return;
    }

    if (!maxCapacity) {
      res.status(400).json({
        error: "O campo maxCapacity é obrigatório",
      });
      return;
    }

    if (!cityId) {
      res.status(400).json({
        error: "O campo cityId é obrigatório",
      });
      return;
    }

    try {
      const existingLocation = await Location.findOne({
        where: { address, zipcode, cityId },
      });
      if (existingLocation) {
        res.status(400).json({
          error:
            "Uma localização com o mesmo endereço, CEP e ID da cidade já existe",
        });
        return;
      }

      const newLocation = await Location.create({
        address,
        zipcode,
        maxCapacity,
        cityId,
      });
      res.status(201).json(newLocation);
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error("Erro de validação ao criar local:", error.errors);
        res.status(400).json({
          error: "Erro de validação ao criar local",
        });
      } else if (error instanceof ForeignKeyConstraintError) {
        res.status(400).json({
          error: "Cidade não encontrada",
        });
      } else {
        res.status(500).json({ error: "Erro ao criar local" });
      }
    }
  }
}

export default LocationController;
