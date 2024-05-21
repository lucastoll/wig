require("dotenv").config();
import cors from "cors";
import express from "express";
import { Routes } from "./src/routes";
import db from "./src/db";
import "./src/associations";
import { errorHandler } from "./src/middleware/errorHandler";
import {
  createCategoryController,
  createCityController,
  createEventController,
  createLocationController,
  createSustainabilityQuestionController,
  createUserController,
} from "./src/controllers/controllerFactory";

const app = express();
app.use(cors());
app.use(express.json());

const routes = new Routes(
  createCategoryController(),
  createCityController(),
  createEventController(),
  createLocationController(),
  createSustainabilityQuestionController(),
  createUserController()
);
app.use(routes.getRouter());

app.use(errorHandler);

db.sync().then(() =>
  console.log(`Banco de dados conectado: ${process.env.DB_NAME}`)
);

app.get("/", (req, res) => {
  res.send("Hello World! v2");
});

if (process.env.NODE_ENV === "development") {
  app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
}

export default app;
