import express from "express";
import { ICategoryController } from "./controllers/categoryController";
import { ICityController } from "./controllers/cityController";
import { IEventController } from "./controllers/eventController";
import { ILocationController } from "./controllers/locationController";
import { ISustainabilityQuestionController } from "./controllers/sustainabilityQuestionController";
import { IUserController } from "./controllers/userController";

class Routes {
  private router = express.Router();
  private categoryController: ICategoryController;
  private cityController: ICityController;
  private eventController: IEventController;
  private locationController: ILocationController;
  private sustainabilityQuestionController: ISustainabilityQuestionController;
  private userController: IUserController;

  constructor(
    categoryController: ICategoryController,
    cityController: ICityController,
    eventController: IEventController,
    locationController: ILocationController,
    sustainabilityQuestionController: ISustainabilityQuestionController,
    userController: IUserController
  ) {
    this.categoryController = categoryController;
    this.cityController = cityController;
    this.eventController = eventController;
    this.locationController = locationController;
    this.sustainabilityQuestionController = sustainabilityQuestionController;
    this.userController = userController;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Categories
    this.router.get("/categories", (req, res, next) =>
      this.categoryController.getCategories(req, res, next)
    );
    this.router.post("/category", (req, res, next) =>
      this.categoryController.createCategory(req, res, next)
    );
    // Cities
    this.router.get("/cities", (req, res, next) =>
      this.cityController.getAllCities(req, res, next)
    );
    this.router.post("/city", (req, res, next) =>
      this.cityController.createCity(req, res, next)
    );
    // Events
    this.router.get("/events", (req, res, next) =>
      this.eventController.getEvents(req, res, next)
    );
    this.router.get("/events/approve", (req, res, next) =>
      this.eventController.getEventsToApprove(req, res, next)
    );
    this.router.get("/events/categories", (req, res, next) =>
      this.eventController.getEventsByCategories(req, res, next)
    );
    this.router.get("/events/distance", (req, res, next) =>
      this.eventController.getEventsByDistance(req, res, next)
    );
    this.router.get("/events/recommendation", (req, res, next) =>
      this.eventController.getEventsRecomended(req, res, next)
    );
    this.router.get("/events/date", (req, res, next) =>
      this.eventController.getEventsByDate(req, res, next)
    );
    this.router.post("/event", (req, res, next) =>
      this.eventController.createEvent(req, res, next)
    );
    this.router.get("/event/getId/:id", (req, res, next) =>
      this.eventController.getEventById(req, res, next)
    );
    this.router.put("/event/acceptEvent/:id", (req, res, next) =>
      this.eventController.approveEvent(req, res, next)
    );
    this.router.put("/event/rejectEvent/:id", (req, res, next) =>
      this.eventController.rejectEvent(req, res, next)
    );
    this.router.post("/events/analysis", (req, res, next) =>
      this.eventController.getAnalysisEvents(req, res, next)
    );
    // Sustainability Questions
    this.router.post(
      "/event/:eventId/sustainabilityQuestions",
      (req, res, next) =>
        this.sustainabilityQuestionController.getEventSustainabilityQuestions(
          req,
          res,
          next
        )
    );
    // Locations
    this.router.get("/locations", (req, res, next) =>
      this.locationController.getAllLocations(req, res, next)
    );
    this.router.post("/location", (req, res, next) =>
      this.locationController.createLocation(req, res, next)
    );
    // Users
    this.router.get("/users", (req, res, next) =>
      this.userController.getAllUsers(req, res, next)
    );
    this.router.get("/user/:email", (req, res, next) =>
      this.userController.getUserByEmail(req, res, next)
    );
    this.router.post("/user", (req, res, next) =>
      this.userController.createUser(req, res, next)
    );
  }

  public getRouter() {
    return this.router;
  }
}

export { Routes };
