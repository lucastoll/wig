"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = __importDefault(require("express"));
const verifyGoogleToken_1 = require("./middleware/verifyGoogleToken");
const checkAdminByEmail_1 = require("./middleware/checkAdminByEmail");
class Routes {
    constructor(categoryController, cityController, eventController, locationController, sustainabilityQuestionController, userController) {
        this.router = express_1.default.Router();
        this.categoryController = categoryController;
        this.cityController = cityController;
        this.eventController = eventController;
        this.locationController = locationController;
        this.sustainabilityQuestionController = sustainabilityQuestionController;
        this.userController = userController;
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Categories
        this.router.get("/categories", (req, res, next) => this.categoryController.getCategories(req, res, next));
        this.router.post("/category", (req, res, next) => this.categoryController.createCategory(req, res, next));
        // Cities
        this.router.get("/cities", (req, res, next) => this.cityController.getAllCities(req, res, next));
        this.router.post("/city", (req, res, next) => this.cityController.createCity(req, res, next));
        // Events
        this.router.get("/events", (req, res, next) => this.eventController.getEvents(req, res, next));
        this.router.get("/events/approve", (req, res, next) => this.eventController.getEventsToApprove(req, res, next));
        this.router.get("/events/categories", (req, res, next) => this.eventController.getEventsByCategories(req, res, next));
        this.router.get("/events/distance", (req, res, next) => this.eventController.getEventsByDistance(req, res, next));
        this.router.get("/events/recommendation", (req, res, next) => this.eventController.getEventsRecomended(req, res, next));
        this.router.get("/events/date", (req, res, next) => this.eventController.getEventsByDate(req, res, next));
        this.router.post("/event", (req, res, next) => this.eventController.createEvent(req, res, next));
        this.router.get("/event/getId/:id", (req, res, next) => this.eventController.getEventById(req, res, next));
        this.router.put("/event/acceptEvent/:id", (req, res, next) => this.eventController.approveEvent(req, res, next));
        this.router.put("/event/rejectEvent/:id", (req, res, next) => this.eventController.rejectEvent(req, res, next));
        this.router.post("/events/organizer/:userId", verifyGoogleToken_1.verifyGoogleToken, (req, res, next) => this.eventController.getOrganizerEvents(req, res, next));
        this.router.post("/events/analysis", verifyGoogleToken_1.verifyGoogleToken, checkAdminByEmail_1.checkAdminByEmail, (req, res, next) => this.eventController.getAnalysisEvents(req, res, next));
        // Sustainability Questions
        this.router.post("/event/:eventId/sustainabilityQuestions", verifyGoogleToken_1.verifyGoogleToken, checkAdminByEmail_1.checkAdminByEmail, (req, res, next) => this.sustainabilityQuestionController.getEventSustainabilityQuestions(req, res, next));
        // Locations
        this.router.get("/locations", (req, res, next) => this.locationController.getAllLocations(req, res, next));
        this.router.post("/location", (req, res, next) => this.locationController.createLocation(req, res, next));
        // Users
        this.router.get("/users", (req, res, next) => this.userController.getAllUsers(req, res, next));
        this.router.get("/user/:email", (req, res, next) => this.userController.getUserByEmail(req, res, next));
        this.router.post("/user", verifyGoogleToken_1.verifyGoogleToken, (req, res, next) => this.userController.createUser(req, res, next));
    }
    getRouter() {
        return this.router;
    }
}
exports.Routes = Routes;
