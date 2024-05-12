"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const sequelize_1 = require("sequelize");
const mysql2_1 = __importDefault(require("mysql2"));
const dbName = process.env.DB_NAME || '';
const dbUser = process.env.DB_USER || '';
const dbHost = process.env.DB_HOST || '';
const dbPassword = process.env.DB_PASSWORD || '';
const sequelize = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    dialect: "mysql",
    dialectModule: mysql2_1.default,
    host: dbHost,
});
exports.default = sequelize;
