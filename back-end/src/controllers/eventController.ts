import { Request, Response, NextFunction } from "express";
import { EventService } from "../services/EventService";

class EventController {
  static async getEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    const cityId = typeof req.query.cityId === 'string' ? req.query.cityId : undefined;
    const cityName = typeof req.query.cityName === 'string' ? req.query.cityName : undefined;

    if (!cityId && !cityName) {
      res.status(400).json({
        error: "Você deve fornecer um cityId ou cityName",
      });
      return;
    }

    try {
      const events = await EventService.getEvents(cityId, cityName);
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  static async getEventsByDate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const cityId = typeof req.query.cityId === 'string' ? req.query.cityId : undefined;
    const cityName = typeof req.query.cityName === 'string' ? req.query.cityName : undefined;

    if (!cityId && !cityName) {
      res.status(400).json({
        error: "Você deve fornecer um cityId ou cityName",
      });
      return;
    }

    try {
      const events = await EventService.getEventsByDate(cityId, cityName);
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  static async createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
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
      const newEvent = await EventService.createEvent(req.body);
      res.status(201).json(newEvent);
    } catch (error) {
      next(error);
    }
  }
}

export { EventController };
