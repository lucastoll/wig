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
const customError_1 = require("../errors/customError");
function getCoordinates(zipcode) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://nominatim.openstreetmap.org/search?postalcode=${zipcode}&format=json`;
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            if (data && data.length > 0) {
                return {
                    latitude: parseFloat(data[0].lat),
                    longitude: parseFloat(data[0].lon),
                };
            }
            else {
                console.log("Nenhum resultado encontrado para o CEP especificado.");
                throw new customError_1.CustomError("Nenhum resultado encontrado para o CEP especificado", 404);
            }
        }
        catch (error) {
            console.error("Erro ao processar a solicitação:", error);
            throw new customError_1.CustomError("Erro ao obter coordenadas", 500);
        }
    });
}
exports.default = getCoordinates;
