"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db"));
class Event extends sequelize_1.Model {
}
exports.Event = Event;
Event.init({
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
    imageMobile: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    imageDesktop: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    initialDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    finalDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    initialPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    finalPrice: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    minAge: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT("long"),
        allowNull: false,
    },
    instagramEmbed: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    startTime: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    endTime: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ticketUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("em análise", "recusado", "aprovado"),
        allowNull: false,
        defaultValue: "em análise",
    },
    approvalFeedback: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: db_1.default,
    modelName: "Event",
});
