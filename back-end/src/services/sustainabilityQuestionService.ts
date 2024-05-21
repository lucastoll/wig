import { SustainabilityQuestion } from "../models/sustainabilityQuestion";

interface ISustainabilityQuestionService {
  getEventSustainabilityQuestions(
    eventId: string
  ): Promise<SustainabilityQuestion[]>;
}

class SustainabilityQuestionService implements ISustainabilityQuestionService {
  async getEventSustainabilityQuestions(
    eventId: string
  ): Promise<SustainabilityQuestion[]> {
    const sustainabilityQuestions = await SustainabilityQuestion.findAll({
      where: { eventId },
    });
    return sustainabilityQuestions;
  }
}

export { SustainabilityQuestionService, ISustainabilityQuestionService };
