import express from "express";
import { UserController } from "./controllers/UserController";
import { CityController } from "./controllers/CityController";
import { LocationController } from "./controllers/LocationController";
import { CategoryController } from "./controllers/CategoryController";
import { EventController } from "./controllers/EventController";

const router = express.Router();

router.get("/users", UserController.getAllUsers);
router.post("/user", UserController.createUser);
router.get("/user/:email", UserController.getUserByEmail);

router.get("/cities", CityController.getAllCities);
router.post("/city", CityController.createCity);

router.get("/locations", LocationController.getAllLocations);
router.post("/location", LocationController.createLocation);

router.get("/categories", CategoryController.getCategories);
router.post("/category", CategoryController.createCategory);

router.get("/events", EventController.getEvents);
router.get("/events/date", EventController.getEventsByDate);
router.post("/event", EventController.createEvent);

export default router;
