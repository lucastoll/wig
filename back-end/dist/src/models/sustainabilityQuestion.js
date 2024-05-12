"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SustainabilityQuestion = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
class SustainabilityQuestion extends sequelize_1.Model {
}
exports.SustainabilityQuestion = SustainabilityQuestion;
SustainabilityQuestion.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    question: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    answer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: "SustainabilityQuestion",
});
