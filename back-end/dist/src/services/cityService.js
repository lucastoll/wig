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
exports.CityService = void 0;
const customError_1 = require("../errors/customError");
const city_1 = require("../models/city");
class CityService {
    static getAllCities() {
        return __awaiter(this, void 0, void 0, function* () {
            const cities = yield city_1.City.findAll();
            return cities;
        });
    }
    static createCity(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingCity = yield city_1.City.findOne({ where: { name } });
            if (existingCity) {
                throw new customError_1.CustomError("Cidade já cadastrada", 400);
            }
            const newCity = yield city_1.City.create({ name });
            return newCity;
        });
    }
}
exports.CityService = CityService;
