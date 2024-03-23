require("dotenv").config();
import express from "express";
import routes from "./src/routes";
import db from "./src/db";

const app = express();

app.use(express.json());
app.use(routes);

db.sync().then(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));
