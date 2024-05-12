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
exports.LocationController = void 0;
const locationService_1 = require("../services/locationService");
const sequelize_1 = require("sequelize");
class LocationController {
    static getAllLocations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const locations = yield locationService_1.LocationService.getAllLocations();
                res.json(locations);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createLocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { address, zipcode, maxCapacity, cityId, name } = req.body;
            if (!address || !zipcode || !maxCapacity || !cityId) {
                res.status(400).json({
                    error: "Os campos address, zipcode, maxCapacity e cityId são obrigatórios",
                });
                return;
            }
            try {
                const newLocation = yield locationService_1.LocationService.createLocation(address, zipcode, maxCapacity, cityId, name);
                res.status(201).json(newLocation);
            }
            catch (error) {
                if (error instanceof sequelize_1.ValidationError) {
                    next(error);
                }
            }
        });
    }
}
exports.LocationController = LocationController;
