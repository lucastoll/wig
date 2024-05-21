import { CategoryController } from "./categoryController";
import { CategoryService } from "../services/categoryService";
import { CityService } from "../services/cityService";
import { CityController } from "./cityController";
import { EventController } from "./eventController";
import { EventService } from "../services/eventService";
import { LocationController } from "./locationController";
import { LocationService } from "../services/locationService";
import { SustainabilityQuestionService } from "../services/sustainabilityQuestionService";
import { SustainabilityQuestionController } from "./sustainabilityQuestionController";
import { UserService } from "../services/userService";
import { UserController } from "./userController";

export function createCategoryController() {
  const categoryService = new CategoryService();
  return new CategoryController(categoryService);
}

export function createCityController() {
  const cityService = new CityService();
  return new CityController(cityService);
}

export function createEventController() {
  const eventService = new EventService();
  return new EventController(eventService);
}

export function createLocationController() {
  const locationService = new LocationService();
  return new LocationController(locationService);
}

export function createSustainabilityQuestionController() {
  const sustainabilityQuestionService = new SustainabilityQuestionService();
  return new SustainabilityQuestionController(sustainabilityQuestionService);
}

export function createUserController() {
  const userService = new UserService();
  return new UserController(userService);
}
