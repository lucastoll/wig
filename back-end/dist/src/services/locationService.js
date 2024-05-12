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
exports.LocationService = void 0;
const customError_1 = require("../errors/customError");
const getCoordinates_1 = __importDefault(require("../helpers/getCoordinates"));
const location_1 = require("../models/location");
class LocationService {
    static getAllLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            const locations = yield location_1.Location.findAll({
                include: "City",
            });
            return locations;
        });
    }
    static createLocation(address, zipcode, maxCapacity, cityId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const { latitude, longitude } = yield (0, getCoordinates_1.default)(zipcode);
            const existingLocation = yield location_1.Location.findOne({
                where: { address, zipcode, cityId },
            });
            if (existingLocation) {
                throw new customError_1.CustomError("Uma localização com o mesmo endereço, CEP e ID da cidade já existe", 400);
            }
            const newLocation = yield location_1.Location.create({
                address,
                zipcode,
                maxCapacity,
                cityId,
                name,
                coordlat: latitude,
                coordlon: longitude,
            });
            return newLocation;
        });
    }
    catch() {
        throw new customError_1.CustomError("Erro ao criar localização", 500);
    }
}
exports.LocationService = LocationService;
