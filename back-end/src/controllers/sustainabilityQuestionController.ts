import { NextFunction, Request, Response } from "express";
import { ISustainabilityQuestionService } from "../services/sustainabilityQuestionService";

interface ISustainabilityQuestionController {
  getEventSustainabilityQuestions(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}

class SustainabilityQuestionController
  implements ISustainabilityQuestionController
{
  constructor(
    private sustainabilityQuestionService: ISustainabilityQuestionService
  ) {}

  async getEventSustainabilityQuestions(
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
        await this.sustainabilityQuestionService.getEventSustainabilityQuestions(
          eventId,
          email
        );
      res.status(200).json(sustainabilityQuestions);
    } catch (error) {
      next(error);
    }
  }
}

export { SustainabilityQuestionController, ISustainabilityQuestionController };
