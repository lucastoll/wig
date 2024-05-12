"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customError_1 = require("../errors/customError");
function errorHandler(error, req, res, next) {
    if (error instanceof customError_1.CustomError) {
        res.status(error.statusCode).json({ error: error.message });
    }
    else {
        console.error("Erro:", error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
}
exports.errorHandler = errorHandler;
