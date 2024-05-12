require("dotenv").config();
import { Sequelize } from "sequelize";
import mysql2 from 'mysql2';

const dbName: string = process.env.DB_NAME || '';
const dbUser: string = process.env.DB_USER || '';
const dbHost: string = process.env.DB_HOST || '';
const dbPassword: string = process.env.DB_PASSWORD || '';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "mysql",
  dialectModule: mysql2,
  host: dbHost,
});

export default sequelize;
