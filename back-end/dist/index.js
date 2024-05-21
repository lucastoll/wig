"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("./src/routes");
const db_1 = __importDefault(require("./src/db"));
require("./src/associations");
const errorHandler_1 = require("./src/middleware/errorHandler");
const controllerFactory_1 = require("./src/controllers/controllerFactory");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const routes = new routes_1.Routes((0, controllerFactory_1.createCategoryController)(), (0, controllerFactory_1.createCityController)(), (0, controllerFactory_1.createEventController)(), (0, controllerFactory_1.createLocationController)(), (0, controllerFactory_1.createSustainabilityQuestionController)(), (0, controllerFactory_1.createUserController)());
app.use(routes.getRouter());
app.use(errorHandler_1.errorHandler);
db_1.default.sync().then(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));
app.get("/", (req, res) => {
    res.send("Hello World! v2");
});
if (process.env.NODE_ENV === "development") {
    app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
}
exports.default = app;
