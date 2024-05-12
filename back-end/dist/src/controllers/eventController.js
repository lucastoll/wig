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
const eventService_1 = require("../services/eventService");
class EventController {
    static getEvents(req, res, next) {
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
                const events = yield eventService_1.EventService.getEvents(cityId, cityName);
                res.status(200).json(events);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getEventsRecomended(req, res, next) {
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
                const events = yield eventService_1.EventService.getEventsRecomendation(cityId, cityName, userId);
                res.status(200).json(events);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getEventsByDate(req, res, next) {
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
                const events = yield eventService_1.EventService.getEventsByDate(cityId, cityName, searchBar);
                res.status(200).json(events);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getEventsByDistance(req, res, next) {
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
                const events = yield eventService_1.EventService.getEventsByDistance(cityId, cityName, userId, searchBar);
                res.status(200).json(events);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getEventsByCategories(req, res, next) {
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
                const events = yield eventService_1.EventService.getEventsByCategories(cityId, cityName, userId, searchBar);
                res.status(200).json(events);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getEventById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const eventId = typeof req.params.id === "string" ? req.params.id : undefined;
            if (!eventId) {
                res.status(400).json({
                    error: "Você deve fornecer um Id",
                });
                return;
            }
            try {
                const events = yield eventService_1.EventService.getEventsById(eventId);
                res.status(200).json(events);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createEvent(req, res, next) {
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
                const newEvent = yield eventService_1.EventService.createEvent(req.body);
                res.status(201).json(newEvent);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.EventController = EventController;
