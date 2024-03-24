import { Request, Response } from "express";
import { Event } from "../models/event";
import { User } from "../models/user";
import { Location } from "../models/location";
import { Category } from "../models/category";
import { City } from "../models/city";

class EventController {
  static async getEvents(req: Request, res: Response): Promise<void> {
    const { cityId, cityName } = req.query;
  
    if (!cityId && !cityName) {
      res.status(400).json({
        error: "Você deve fornecer um cityId ou cityName",
      });
      return;
    }
  
    try {
      let city;
      if (cityId) {
        city = await City.findByPk(String(cityId));
      } else {
        city = await City.findOne({ where: { name: String(cityName) } });
      }
  
      if (!city) {
        res.status(404).json({ error: "Cidade não encontrada" });
        return;
      }
  
      const events = await Event.findAll({
        include: [
          { model: Category },
          { model: User, as: "organizer" },
          {
            model: Location,
            where: { cityId: city.id },
            include: [{ model: City }]
          },
        ],
      });
      res.status(200).json(events);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
      res.status(500).json({ error: "Erro ao buscar eventos" });
    }
  }

  static async createEvent(req: Request, res: Response): Promise<void> {
    const {
      name,
      imageMobile,
      imageDesktop,
      organizerId,
      initialDate,
      finalDate,
      initialPrice,
      finalPrice,
      minAge,
      description,
      instagramEmbed,
      locationId,
      address,
      zipcode,
      maxCapacity,
      cityId,
      categoryIds,
    } = req.body;

    const fields = [
      "name",
      "imageMobile",
      "imageDesktop",
      "organizerId",
      "initialDate",
      "finalDate",
      "initialPrice",
      "finalPrice",
      "minAge",
      "description",
      "instagramEmbed",
      "categoryIds",
    ];

    for (let field of fields) {
      if (!req.body[field]) {
        res.status(400).json({
          error: `O campo ${field} é obrigatório`,
        });
        return;
      }
    }

    try {
      const organizer = await User.findByPk(organizerId);
      const categories = await Category.findAll({ where: { id: categoryIds } });

      if (!organizer) {
        res.status(400).json({
          error: "Organizador não encontrado",
        });
        return;
      }

      let location;
      if (locationId) {
        location = await Location.findByPk(locationId);
        if (!location) {
          res.status(400).json({ error: "Localização não encontrada" });
          return;
        }
      } else if (address && zipcode && maxCapacity && cityId) {
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
        location = await Location.create({
          address,
          zipcode,
          maxCapacity,
          cityId,
        });
      } else {
        res.status(400).json({
          error:
            "Você deve fornecer um locationId ou um address, zipcode, maxCapacity e cityId",
        });
        return;
      }

      if (categories.length !== categoryIds.length) {
        res.status(400).json({
          error: "Uma ou mais categorias não foram encontradas",
        });
        return;
      }
      const newEvent = await Event.create({
        name,
        imageMobile,
        imageDesktop,
        initialDate,
        finalDate,
        initialPrice,
        finalPrice,
        minAge,
        description,
        instagramEmbed,
        organizerId,
        locationId: location.id,
      });
      await newEvent.addCategories(categories);
      res.status(201).json(newEvent);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      res.status(500).json({ error: "Erro ao criar evento" });
    }
  }
}

export { EventController };
