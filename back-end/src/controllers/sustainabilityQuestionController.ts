import { NextFunction, Request, Response } from "express";
import { SustainabilityQuestionService } from "../services/sustainabilityQuestionService";

class SustainabilityQuestionController {
  static async getEventSustainabilityQuestions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const eventId =
      typeof req.params.eventId === "string" ? req.params.eventId : undefined;

    const email = req.body.email;

    if (!eventId) {
      res.status(400).json({
        error: "Você deve fornecer um eventId",
      });
      return;
    }

    try {
      const sustainabilityQuestions =
        await SustainabilityQuestionService.getEventSustainabilityQuestions(
          eventId,
          email
        );
      res.status(200).json(sustainabilityQuestions);
    } catch (error) {
      next(error);
    }
  }
}

export { SustainabilityQuestionController };
