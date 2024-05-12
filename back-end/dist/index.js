"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/routes"));
const db_1 = __importDefault(require("./src/db"));
require("./src/associations");
const errorHandler_1 = require("./src/middleware/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(errorHandler_1.errorHandler);
db_1.default.sync().then(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
if (process.env.NODE_ENV === "development") {
    app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
}
exports.default = app;
