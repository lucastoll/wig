import { Request, Response } from "express";
import { City } from "../models/city";
import { ValidationError } from "sequelize";

class CityController {
  static async getAllCities(req: Request, res: Response): Promise<void> {
    try {
      const cities = await City.findAll();
      res.json(cities);
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
      res.status(500).json({ error: "Erro ao buscar cidades" });
    }
  }

  static async createCity(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    console.log(name)

    if (!name) {
      res.status(400).json({
        error: "O campo nome é obrigatório",
      });
    }

    try {
      const newCity = await City.create({ name });
      res.status(201).json(newCity);
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error("Erro de validação ao criar cidade:", error.errors);
        res.status(400).json({
          error: "Erro de validação ao criar cidade",
          details: error.errors,
        });
      } else {
        console.error("Erro ao criar cidade:", error);
        res.status(500).json({ error: "Erro ao criar cidade" });
      }
    }
  }
}

export default CityController;