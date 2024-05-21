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
exports.SustainabilityQuestionController = void 0;
class SustainabilityQuestionController {
    constructor(sustainabilityQuestionService) {
        this.sustainabilityQuestionService = sustainabilityQuestionService;
    }
    getEventSustainabilityQuestions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventId = typeof req.params.eventId === "string" ? req.params.eventId : undefined;
            if (!eventId) {
                res.status(400).json({
                    error: "Você deve fornecer um eventId",
                });
                return;
            }
            try {
                const sustainabilityQuestions = yield this.sustainabilityQuestionService.getEventSustainabilityQuestions(eventId);
                res.status(200).json(sustainabilityQuestions);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.SustainabilityQuestionController = SustainabilityQuestionController;
