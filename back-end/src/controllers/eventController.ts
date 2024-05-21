import { Request, Response, NextFunction } from "express";
import { IEventService } from "../services/eventService";

interface IEventController {
  getEvents: (req: Request, res: Response, next: NextFunction) => void;
  getEventsToApprove: (req: Request, res: Response, next: NextFunction) => void;
  approveEvent: (req: Request, res: Response, next: NextFunction) => void;
  rejectEvent: (req: Request, res: Response, next: NextFunction) => void;
  getEventsRecomended: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  getEventsByDate: (req: Request, res: Response, next: NextFunction) => void;
  getEventsByDistance: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  getEventsByCategories: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  getEventById: (req: Request, res: Response, next: NextFunction) => void;
  createEvent: (req: Request, res: Response, next: NextFunction) => void;
  getOrganizerEvents: (req: Request, res: Response, next: NextFunction) => void;
  getAnalysisEvents: (req: Request, res: Response, next: NextFunction) => void;
}

class EventController implements IEventController {
  private eventService: IEventService;

  constructor(eventService: IEventService) {
    this.eventService = eventService;
  }

  async getEvents(
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
      const events = await this.eventService.getEvents(cityId, cityName);
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  async getEventsToApprove(
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
      const events = await this.eventService.getEventsToApprove(
        cityId,
        cityName
      );
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  async approveEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const approvedEvent = await this.eventService.approveEvent(
        req.params.id,
        req.body.approvalFeedback
      );
      res.status(201).json(approvedEvent);
    } catch (error) {
      next(error);
    }
  }

  async rejectEvent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const rejectedEvent = await this.eventService.rejectEvent(
        req.params.id,
        req.body.approvalFeedback
      );
      res.status(201).json(rejectedEvent);
    } catch (error) {
      next(error);
    }
  }

  async getEventsRecomended(
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
      const events = await this.eventService.getEventsRecomendation(
        cityId,
        cityName,
        userId
      );
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  async getEventsByDate(
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
      const events = await this.eventService.getEventsByDate(
        cityId,
        cityName,
        searchBar
      );
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  async getEventsByDistance(
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
      const events = await this.eventService.getEventsByDistance(
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

  async getEventsByCategories(
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
      const events = await this.eventService.getEventsByCategories(
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

  async getEventById(
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
      const events = await this.eventService.getEventById(eventId);
      if (!events) {
        res.status(404).json({ error: "Evento não encontrado" });
        return;
      }
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  async createEvent(
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
      "categoryIds",
      "startTime",
      "endTime",
    ];

    for (let field of fields) {
      if (!req.body[field] && req.body[field] !== 0) {
        res.status(400).json({
          error: `O campo ${field} é obrigatório`,
        });
        return;
      }
    }

    try {
      const newEvent = await this.eventService.createEvent(req.body);
      res.status(201).json(newEvent);
    } catch (error) {
      next(error);
    }
  }

  async getOrganizerEvents(
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
      const events = await this.eventService.getOrganizerEvents(userId, email);
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  async getAnalysisEvents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const events = await this.eventService.getAnalysisEvents();
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }
}

export { EventController, IEventController };
