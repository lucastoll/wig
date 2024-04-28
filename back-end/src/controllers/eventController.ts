import { Request, Response, NextFunction } from "express";
import { EventService } from "../services/eventService";

class EventController {
  static async getEvents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const cityId =
      typeof req.query.cityId === "string" ? req.query.cityId : undefined;
    const cityName =
      typeof req.query.cityName === "string" ? req.query.cityName : undefined;

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

  static async getEventsRecomended(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const cityId =
      typeof req.query.cityId === "string" ? req.query.cityId : undefined;
    const cityName =
      typeof req.query.cityName === "string" ? req.query.cityName : undefined;
    const userId =
      typeof req.query.userId === "string" ? req.query.userId : undefined;

    if (!cityId && !cityName) {
      res.status(400).json({
        error: "Você deve fornecer um cityId ou cityName",
      });
      return;
    }

    if (!userId) {
      res.status(400).json({
        error: "Você deve fornecer um userId",
      });
      return;
    }

    try {
      const events = await EventService.getEventsRecomendation(
        cityId,
        cityName,
        userId
      );
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  static async getEventsByDate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const cityId =
      typeof req.query.cityId === "string" ? req.query.cityId : undefined;
    const cityName =
      typeof req.query.cityName === "string" ? req.query.cityName : undefined;
    const searchBar =
      typeof req.query.searchBar === "string" ? req.query.searchBar : undefined;

    if (!cityId && !cityName) {
      res.status(400).json({
        error: "Você deve fornecer um cityId ou cityName",
      });
      return;
    }

    try {
      const events = await EventService.getEventsByDate(
        cityId,
        cityName,
        searchBar
      );
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  static async getEventsByDistance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const cityId =
      typeof req.query.cityId === "string" ? req.query.cityId : undefined;
    const cityName =
      typeof req.query.cityName === "string" ? req.query.cityName : undefined;
    const userId =
      typeof req.query.userId === "string" ? req.query.userId : undefined;
    const searchBar =
      typeof req.query.searchBar === "string" ? req.query.searchBar : undefined;

    if (!cityId && !cityName) {
      res.status(400).json({
        error: "Você deve fornecer um cityId ou cityName",
      });
      return;
    }

    if (!userId) {
      res.status(400).json({
        error: "Você deve fornecer um userId",
      });
      return;
    }

    try {
      const events = await EventService.getEventsByDistance(
        cityId,
        cityName,
        userId,
        searchBar
      );
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  static async getEventsByCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const cityId =
      typeof req.query.cityId === "string" ? req.query.cityId : undefined;
    const cityName =
      typeof req.query.cityName === "string" ? req.query.cityName : undefined;
    const userId =
      typeof req.query.userId === "string" ? req.query.userId : undefined;
    const searchBar =
      typeof req.query.searchBar === "string" ? req.query.searchBar : undefined;

    if (!cityId && !cityName) {
      res.status(400).json({
        error: "Você deve fornecer um cityId ou cityName",
      });
      return;
    }

    if (!userId) {
      res.status(400).json({
        error: "Você deve fornecer um userId",
      });
      return;
    }

    try {
      const events = await EventService.getEventsByCategories(
        cityId,
        cityName,
        userId,
        searchBar
      );
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  static async getEventById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const eventId =
      typeof req.params.id === "string" ? req.params.id : undefined;
    if (!eventId) {
      res.status(400).json({
        error: "Você deve fornecer um Id",
      });
      return;
    }

    try {
      const events = await EventService.getEventById(eventId);
      if (!events) {
        res.status(404).json({ error: "Evento não encontrado" });
        return;
      }
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  static async createEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      "startTime",
      "endTime",
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

  static async getOrganizerEvents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId =
      typeof req.params.userId === "string" ? req.params.userId : undefined;
    const email = req.body.email;

    if (!userId) {
      res.status(400).json({
        error: "Você deve fornecer um userId",
      });
      return;
    }

    try {
      const events = await EventService.getOrganizerEvents(userId, email);
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  static async getAnalysisEvents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const email = req.body.email;

    try {
      const events = await EventService.getAnalysisEvents(email);
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }
}

export { EventController };
