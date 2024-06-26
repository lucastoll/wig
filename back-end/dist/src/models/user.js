"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    zipcode: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    coordlat: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        unique: false,
    },
    coordlon: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        unique: false,
    },
    administrator: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        unique: false,
        defaultValue: false,
    },
}, {
    sequelize: db_1.default,
    modelName: "User",
});
