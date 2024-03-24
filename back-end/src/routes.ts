import express from "express";
import UserController from "./controllers/userController";
import CityController from "./controllers/cityController";
import LocationController from "./controllers/locationController";
import { CategoryController } from "./controllers/categoryController";

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

export default router;
