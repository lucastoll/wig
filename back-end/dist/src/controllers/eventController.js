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
exports.EventController = void 0;
class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    getEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const cityId = typeof req.query.cityId === "string" ? req.query.cityId : undefined;
            const cityName = typeof req.query.cityName === "string" ? req.query.cityName : undefined;
            if (!cityId && !cityName) {
                res.status(400).json({
                    error: "Você deve fornecer um cityId ou cityName",
                });
                return;
            }
            try {
                const events = yield this.eventService.getEvents(cityId, cityName);
                res.status(200).json(events);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getEventsToApprove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const cityId = typeof req.query.cityId === "string" ? req.query.cityId : undefined;
            const cityName = typeof req.query.cityName === "string" ? req.query.cityName : undefined;
            if (!cityId && !cityName) {
                res.status(400).json({
                    error: "Você deve fornecer um cityId ou cityName",
                });
                return;
            }
            try {
                const events = yield this.eventService.getEventsToApprove(cityId, cityName);
                res.status(200).json(events);
            }
            catch (error) {
                next(error);
            }
        });
    }
    approveEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const approvedEvent = yield this.eventService.approveEvent(req.params.id, req.body.approvalFeedback);
                res.status(201).json(approvedEvent);
            }
            catch (error) {
                next(error);
            }
        });
    }
    rejectEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rejectedEvent = yield this.eventService.rejectEvent(req.params.id, req.body.approvalFeedback);
                res.status(201).json(rejectedEvent);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getEventsRecomended(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const cityId = typeof req.query.cityId === "string" ? req.query.cityId : undefined;
            const cityName = typeof req.query.cityName === "string" ? req.query.cityName : undefined;
            const userId = typeof req.query.userId === "string" ? req.query.userId : undefined;
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
                const events = yield this.eventService.getEventsRecomendation(cityId, cityName, userId);
                res.status(200).json(events);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getEventsByDate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const cityId = typeof req.query.cityId === "string" ? req.query.cityId : undefined;
            const cityName = typeof req.query.cityName === "string" ? req.query.cityName : undefined;
            const searchBar = typeof req.query.searchBar === "string" ? req.query.searchBar : undefined;
            if (!cityId && !cityName) {
                res.status(400).json({
                    error: "Você deve fornecer um cityId ou cityName",
                });
                return;
            }
            try {
                const events = yield this.eventService.getEventsByDate(cityId, cityName, searchBar);
                res.status(200).json(events);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getEventsByDistance(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const cityId = typeof req.query.cityId === "string" ? req.query.cityId : undefined;
            const cityName = typeof req.query.cityName === "string" ? req.query.cityName : undefined;
            const userId = typeof req.query.userId === "string" ? req.query.userId : undefined;
            const searchBar = typeof req.query.searchBar === "string" ? req.query.searchBar : undefined;
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
                const events = yield this.eventService.getEventsByDistance(cityId, cityName, userId, searchBar);
                res.status(200).json(events);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getEventsByCategories(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const cityId = typeof req.query.cityId === "string" ? req.query.cityId : undefined;
            const cityName = typeof req.query.cityName === "string" ? req.query.cityName : undefined;
            const userId = typeof req.query.userId === "string" ? req.query.userId : undefined;
            const searchBar = typeof req.query.searchBar === "string" ? req.query.searchBar : undefined;
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
                const events = yield this.eventService.getEventsByCategories(cityId, cityName, userId, searchBar);
                res.status(200).json(events);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getEventById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventId = typeof req.params.id === "string" ? req.params.id : undefined;
            if (!eventId) {
                res.status(400).json({
                    error: "Você deve fornecer um Id",
                });
                return;
            }
            try {
                const events = yield this.eventService.getEventById(eventId);
                if (!events) {
                    res.status(404).json({ error: "Evento não encontrado" });
                    return;
                }
                res.status(200).json(events);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createEvent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const newEvent = yield this.eventService.createEvent(req.body);
                res.status(201).json(newEvent);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOrganizerEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = typeof req.params.userId === "string" ? req.params.userId : undefined;
            const email = req.body.email;
            if (!userId) {
                res.status(400).json({
                    error: "Você deve fornecer um userId",
                });
                return;
            }
            try {
                const events = yield this.eventService.getOrganizerEvents(userId, email);
                res.status(200).json(events);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAnalysisEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield this.eventService.getAnalysisEvents();
                res.status(200).json(events);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.EventController = EventController;
