import express from "express";
import UserController from "./controllers/userController";
import CityController from "./controllers/cityController";
import LocationController from "./controllers/locationController";

const router = express.Router();

router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

router.get('/cities', CityController.getAllCities);
router.post('/city', CityController.createCity);

router.get('/locations', LocationController.getAllLocations);
router.post('/location', LocationController.createLocation);

export default router;
