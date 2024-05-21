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
exports.CityController = void 0;
class CityController {
    constructor(cityService) {
        this.cityService = cityService;
    }
    getAllCities(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cities = yield this.cityService.getAllCities();
                res.json(cities);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createCity(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            if (!name) {
                res.status(400).json({
                    error: "O campo nome é obrigatório",
                });
                return;
            }
            try {
                const newCity = yield this.cityService.createCity(name);
                res.status(201).json(newCity);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CityController = CityController;
