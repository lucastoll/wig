"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SustainabilityQuestionService = void 0;
const customError_1 = require("../errors/customError");
const sustainabilityQuestion_1 = require("../models/sustainabilityQuestion");
const user_1 = require("../models/user");
class SustainabilityQuestionService {
    static getEventSustainabilityQuestions(eventId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({ where: { email } });
            if ((user === null || user === void 0 ? void 0 : user.administrator) === false) {
                throw new customError_1.CustomError("Usuário não autorizado", 401);
            }
            const sustainabilityQuestions = yield sustainabilityQuestion_1.SustainabilityQuestion.findAll({
                where: { eventId },
            });
            return sustainabilityQuestions;
        });
    }
}
exports.SustainabilityQuestionService = SustainabilityQuestionService;
