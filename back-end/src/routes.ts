import express from "express";
import { UserController } from "./controllers/userController";
import { CityController } from "./controllers/cityController";
import { LocationController } from "./controllers/locationController";
import { CategoryController } from "./controllers/categoryController";
import { EventController } from "./controllers/eventController";
import { verifyGoogleToken } from "./middleware/verifyGoogleToken";
import { SustainabilityQuestionController } from "./controllers/sustainabilityQuestionController";

const router = express.Router();

router.get("/users", UserController.getAllUsers);
router.post("/user", verifyGoogleToken, UserController.createUser);
router.get("/user/:email", UserController.getUserByEmail);

router.get("/cities", CityController.getAllCities);
router.post("/city", CityController.createCity);

router.get("/locations", LocationController.getAllLocations);
router.post("/location", LocationController.createLocation);

router.get("/categories", CategoryController.getCategories);
router.post("/category", CategoryController.createCategory);

router.get("/events", EventController.getEvents);
router.get("/events/categories", EventController.getEventsByCategories);
router.get("/events/distance", EventController.getEventsByDistance);
router.get("/events/recommendation", EventController.getEventsRecomended);
router.get("/events/date", EventController.getEventsByDate);
router.post("/event", EventController.createEvent);
router.get("/event/getId/:id", EventController.getEventById);
router.get(
  "/events/organizer/:userId",
  verifyGoogleToken,
  EventController.getOrganizerEvents
);
router.get(
  "/events/analysis",
  verifyGoogleToken,
  EventController.getAnalysisEvents
);
router.get(
  "/event/:eventId/sustainabilityQuestions",
  verifyGoogleToken,
  SustainabilityQuestionController.getEventSustainabilityQuestions
);

export default router;
