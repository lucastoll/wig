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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const event_1 = require("../models/event");
const user_1 = require("../models/user");
const location_1 = require("../models/location");
const category_1 = require("../models/category");
const customError_1 = require("../errors/customError");
const city_1 = require("../models/city");
const sequelize_1 = require("sequelize");
const getDistance_1 = __importDefault(require("../helpers/getDistance"));
const sustainabilityQuestion_1 = require("../models/sustainabilityQuestion");
const getCoordinates_1 = __importDefault(require("../helpers/getCoordinates"));
class EventService {
    findCity(cityId, cityName) {
        return __awaiter(this, void 0, void 0, function* () {
            let city;
            if (cityId) {
                city = yield city_1.City.findByPk(String(cityId));
            }
            else if (cityName) {
                city = yield city_1.City.findOne({ where: { name: String(cityName) } });
            }
            if (!city) {
                throw new customError_1.CustomError("Cidade não encontrada", 404);
            }
            return city;
        });
    }
    findUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findByPk(userId, {
                include: [category_1.Category],
            });
            if (!user) {
                throw new customError_1.CustomError("Usuário não encontrado", 404);
            }
            return user;
        });
    }
    calculateCategoryPoints(user, event) {
        let points = 0;
        user.Categories.forEach((userCategory) => {
            if (event.Categories.some((eventCategory) => eventCategory.id === userCategory.id)) {
                points += 5;
                console.log(`\n\nUsuário gosta de ${userCategory.name} +5 pontos`);
            }
        });
        return points;
    }
    calculateDistancePoints(user, event) {
        const userCoordinates = {
            latitude: user.coordlat,
            longitude: user.coordlon,
        };
        const eventCoordinates = {
            latitude: event.Location.coordlat,
            longitude: event.Location.coordlon,
        };
        const distance = (0, getDistance_1.default)(userCoordinates, eventCoordinates);
        let points = 0;
        if (distance <= 1.0) {
            points += 12;
            console.log("\n\nEvento a menos de 1km +12 pontos");
        }
        else if (distance <= 3.0) {
            points += 8;
            console.log("\n\nEvento a menos de 3km +8 pontos");
        }
        else if (distance <= 5.0) {
            points += 4;
            console.log("\n\nEvento a menos de 5km +4 pontos");
        }
        return points;
    }
    getEvents(cityId, cityName) {
        return __awaiter(this, void 0, void 0, function* () {
            const city = yield this.findCity(cityId, cityName);
            const events = yield event_1.Event.findAll({
                include: [
                    { model: category_1.Category },
                    { model: user_1.User, as: "organizer" },
                    {
                        model: location_1.Location,
                        where: { cityId: city.id },
                        include: [{ model: city_1.City }],
                    },
                ],
                where: { status: "aprovado" },
            });
            return events;
        });
    }
    getEventsToApprove(cityId, cityName) {
        return __awaiter(this, void 0, void 0, function* () {
            const city = yield this.findCity(cityId, cityName);
            const events = yield event_1.Event.findAll({
                include: [
                    { model: category_1.Category },
                    { model: user_1.User, as: "organizer" },
                    {
                        model: location_1.Location,
                        where: { cityId: city.id },
                        include: [{ model: city_1.City }],
                    },
                ],
                where: { status: "Em análise" },
            });
            return events;
        });
    }
    approveEvent(eventId, approvalFeedback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield event_1.Event.findByPk(eventId);
                if (!event) {
                    throw new customError_1.CustomError("Evento não encontrado", 404);
                }
                event.status = "aprovado";
                event.approvalFeedback = approvalFeedback;
                yield event.save();
            }
            catch (error) {
                throw new customError_1.CustomError("Erro ao aprovar o evento", 500);
            }
        });
    }
    rejectEvent(eventId, approvalFeedback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield event_1.Event.findByPk(eventId);
                if (!event) {
                    throw new customError_1.CustomError("Evento não encontrado", 404);
                }
                event.status = "recusado";
                event.approvalFeedback = approvalFeedback;
                yield event.save();
            }
            catch (error) {
                throw new customError_1.CustomError("Erro ao aprovar o evento", 500);
            }
        });
    }
    getEventsByDate(cityId, cityName, searchBar) {
        return __awaiter(this, void 0, void 0, function* () {
            const city = yield this.findCity(cityId, cityName);
            let eventsQuery = {
                include: [
                    { model: category_1.Category },
                    { model: user_1.User, as: "organizer" },
                    {
                        model: location_1.Location,
                        where: { cityId: city.id },
                        include: [{ model: city_1.City }],
                    },
                ],
                where: {
                    finalDate: { [sequelize_1.Op.gte]: new Date() },
                    status: "aprovado",
                },
                order: [["initialDate", "ASC"]],
                limit: 10,
            };
            if (searchBar) {
                eventsQuery.where = Object.assign(Object.assign({}, eventsQuery.where), { [sequelize_1.Op.or]: [(0, sequelize_1.literal)(`LOWER(Event.name) LIKE LOWER('%${searchBar}%')`)] });
            }
            const events = yield event_1.Event.findAll(eventsQuery);
            return events;
        });
    }
    getEventById(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = yield event_1.Event.findByPk(eventId, {
                    include: [
                        { model: category_1.Category },
                        { model: user_1.User, as: "organizer" },
                        { model: location_1.Location },
                    ],
                });
                return event;
            }
            catch (error) {
                throw new Error("Erro ao buscar evento por ID");
            }
        });
    }
    getEventsRecomendation(cityId, cityName, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const city = yield this.findCity(cityId, cityName);
            const user = yield this.findUser(userId);
            const events = yield event_1.Event.findAll({
                include: [
                    { model: category_1.Category },
                    { model: user_1.User, as: "organizer" },
                    {
                        model: location_1.Location,
                        where: { cityId: city.id },
                        include: [{ model: city_1.City }],
                    },
                ],
                where: { status: "aprovado" },
            });
            const eventsWithRecommendations = events.map((event) => __awaiter(this, void 0, void 0, function* () {
                let recommendationPoints = 0;
                recommendationPoints += this.calculateDistancePoints(user, event);
                recommendationPoints += this.calculateCategoryPoints(user, event);
                return Object.assign(Object.assign({}, event.get({ plain: true })), { recommendationPoints });
            }));
            const resolvedEvents = yield Promise.all(eventsWithRecommendations);
            resolvedEvents.sort((a, b) => b.recommendationPoints - a.recommendationPoints);
            return resolvedEvents;
        });
    }
    getEventsByCategories(cityId, cityName, userId, searchBar) {
        return __awaiter(this, void 0, void 0, function* () {
            const city = yield this.findCity(cityId, cityName);
            const user = yield this.findUser(userId);
            console.log(user);
            let eventsQuery = {
                include: [
                    { model: category_1.Category },
                    { model: user_1.User, as: "organizer" },
                    {
                        model: location_1.Location,
                        where: { cityId: city.id },
                        include: [{ model: city_1.City }],
                    },
                ],
                where: { status: "aprovado" },
                limit: 10,
            };
            if (searchBar) {
                eventsQuery.where = Object.assign(Object.assign({}, eventsQuery.where), { [sequelize_1.Op.or]: [(0, sequelize_1.literal)(`LOWER(Event.name) LIKE LOWER('%${searchBar}%')`)] });
            }
            const events = yield event_1.Event.findAll(eventsQuery);
            const eventsWithRecommendations = events.map((event) => __awaiter(this, void 0, void 0, function* () {
                let recommendationPoints = this.calculateCategoryPoints(user, event);
                return Object.assign(Object.assign({}, event.get({ plain: true })), { recommendationPoints });
            }));
            const resolvedEvents = yield Promise.all(eventsWithRecommendations);
            resolvedEvents.sort((a, b) => b.recommendationPoints - a.recommendationPoints);
            return resolvedEvents;
        });
    }
    getEventsByDistance(cityId, cityName, userId, searchBar) {
        return __awaiter(this, void 0, void 0, function* () {
            const city = yield this.findCity(cityId, cityName);
            const user = yield this.findUser(userId);
            let eventsQuery = {
                include: [
                    { model: category_1.Category },
                    { model: user_1.User, as: "organizer" },
                    {
                        model: location_1.Location,
                        where: { cityId: city.id },
                        include: [{ model: city_1.City }],
                    },
                ],
                where: { status: "aprovado" },
                limit: 10,
            };
            if (searchBar) {
                eventsQuery.where = Object.assign(Object.assign({}, eventsQuery.where), { [sequelize_1.Op.or]: [(0, sequelize_1.literal)(`LOWER(Event.name) LIKE LOWER('%${searchBar}%')`)] });
            }
            const events = yield event_1.Event.findAll(eventsQuery);
            const userCoordinates = {
                latitude: user.coordlat,
                longitude: user.coordlon,
            };
            const eventsWithRecommendations = events.map((event) => __awaiter(this, void 0, void 0, function* () {
                const eventCoordinates = {
                    latitude: event.Location.coordlat,
                    longitude: event.Location.coordlon,
                };
                const distance = (0, getDistance_1.default)(userCoordinates, eventCoordinates);
                return {
                    event: event.get({ plain: true }),
                    distance,
                };
            }));
            const resolvedEvents = yield Promise.all(eventsWithRecommendations);
            resolvedEvents.sort((a, b) => a.distance - b.distance);
            return resolvedEvents.map((event) => event.event);
        });
    }
    createEvent(eventData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, imageMobile, imageDesktop, organizerId, initialDate, finalDate, initialPrice, finalPrice, minAge, description, instagramEmbed, locationId, address, zipcode, maxCapacity, cityId, categoryIds, startTime, endTime, ticketUrl, questions, } = eventData;
            yield this.findUser(organizerId.toString());
            const categories = yield category_1.Category.findAll({ where: { id: categoryIds } });
            if (categories.length !== categoryIds.length) {
                throw new customError_1.CustomError("Uma ou mais categorias não foram encontradas", 404);
            }
            let location;
            if (locationId) {
                location = yield location_1.Location.findByPk(locationId);
                if (!location) {
                    throw new customError_1.CustomError("Localização não encontrada", 404);
                }
            }
            else if (address && zipcode && maxCapacity && cityId) {
                const existingLocation = yield location_1.Location.findOne({
                    where: { address, zipcode, cityId },
                });
                if (existingLocation) {
                    throw new customError_1.CustomError("Uma localização com o mesmo endereço, CEP e ID da cidade já existe", 400);
                }
                else {
                    const city = yield city_1.City.findOne({
                        where: { id: cityId },
                    });
                    if (!city) {
                        throw new customError_1.CustomError("Cidade não encontrada", 404);
                    }
                    const { latitude, longitude } = yield (0, getCoordinates_1.default)(zipcode.toString());
                    location = yield location_1.Location.create({
                        address,
                        zipcode,
                        maxCapacity,
                        cityId,
                        coordlat: latitude,
                        coordlon: longitude,
                    });
                }
            }
            else {
                throw new customError_1.CustomError("Você deve fornecer um locationId ou um address, zipcode, maxCapacity e cityId", 400);
            }
            const newEvent = yield event_1.Event.create({
                name,
                imageMobile,
                imageDesktop,
                initialDate,
                finalDate,
                initialPrice,
                finalPrice,
                minAge,
                description,
                instagramEmbed,
                organizerId,
                locationId: location.id,
                startTime,
                endTime,
                ticketUrl,
            });
            yield newEvent.addCategories(categories);
            if (questions) {
                const sustainabilityQuestions = questions.map((question) => (Object.assign(Object.assign({}, question), { eventId: newEvent.id })));
                yield sustainabilityQuestion_1.SustainabilityQuestion.bulkCreate(sustainabilityQuestions);
            }
            return newEvent;
        });
    }
    getOrganizerEvents(userId, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUser(userId);
            if (user.email !== email) {
                throw new customError_1.CustomError("Usuário não autorizado", 401);
            }
            const events = yield event_1.Event.findAll({
                where: { organizerId: userId },
                include: [
                    { model: category_1.Category },
                    { model: user_1.User, as: "organizer" },
                    { model: location_1.Location },
                ],
            });
            return events;
        });
    }
    getAnalysisEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield event_1.Event.findAll({
                where: { status: "em análise" },
                include: [
                    { model: category_1.Category },
                    { model: user_1.User, as: "organizer" },
                    { model: location_1.Location },
                    { model: sustainabilityQuestion_1.SustainabilityQuestion },
                ],
            });
            return events;
        });
    }
}
exports.EventService = EventService;
