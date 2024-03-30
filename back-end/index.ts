require("dotenv").config();
import express from "express";
import routes from "./src/routes";
import db from "./src/db";
import "./src/associations";
import { errorHandler } from "./src/middleware/ErrorHandler";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

db.sync().then(() =>
  console.log(`Banco de dados conectado: ${process.env.DB_NAME}`)
);

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
