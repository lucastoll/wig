import { CustomError } from "../errors/customError";
import { SustainabilityQuestion } from "../models/sustainabilityQuestion";
import { User } from "../models/user";

class SustainabilityQuestionService {
  static async getEventSustainabilityQuestions(eventId: string, email: string) {
    const user = await User.findOne({ where: { email } });

    if (user?.administrator === false) {
      throw new CustomError("Usuário não autorizado", 401);
    }

    const sustainabilityQuestions = await SustainabilityQuestion.findAll({
      where: { eventId },
    });
    return sustainabilityQuestions;
  }
}

export { SustainabilityQuestionService };
