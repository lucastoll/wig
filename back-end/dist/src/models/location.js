"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
class Location extends sequelize_1.Model {
}
exports.Location = Location;
Location.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    zipcode: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    maxCapacity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    coordlat: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    coordlon: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    modelName: "Location",
});
