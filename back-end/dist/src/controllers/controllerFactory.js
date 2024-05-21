"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = exports.createSustainabilityQuestionController = exports.createLocationController = exports.createEventController = exports.createCityController = exports.createCategoryController = void 0;
const categoryController_1 = require("./categoryController");
const categoryService_1 = require("../services/categoryService");
const cityService_1 = require("../services/cityService");
const cityController_1 = require("./cityController");
const eventController_1 = require("./eventController");
const eventService_1 = require("../services/eventService");
const locationController_1 = require("./locationController");
const locationService_1 = require("../services/locationService");
const sustainabilityQuestionService_1 = require("../services/sustainabilityQuestionService");
const sustainabilityQuestionController_1 = require("./sustainabilityQuestionController");
const userService_1 = require("../services/userService");
const userController_1 = require("./userController");
function createCategoryController() {
    const categoryService = new categoryService_1.CategoryService();
    return new categoryController_1.CategoryController(categoryService);
}
exports.createCategoryController = createCategoryController;
function createCityController() {
    const cityService = new cityService_1.CityService();
    return new cityController_1.CityController(cityService);
}
exports.createCityController = createCityController;
function createEventController() {
    const eventService = new eventService_1.EventService();
    return new eventController_1.EventController(eventService);
}
exports.createEventController = createEventController;
function createLocationController() {
    const locationService = new locationService_1.LocationService();
    return new locationController_1.LocationController(locationService);
}
exports.createLocationController = createLocationController;
function createSustainabilityQuestionController() {
    const sustainabilityQuestionService = new sustainabilityQuestionService_1.SustainabilityQuestionService();
    return new sustainabilityQuestionController_1.SustainabilityQuestionController(sustainabilityQuestionService);
}
exports.createSustainabilityQuestionController = createSustainabilityQuestionController;
function createUserController() {
    const userService = new userService_1.UserService();
    return new userController_1.UserController(userService);
}
exports.createUserController = createUserController;
