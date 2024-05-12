"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const city_1 = require("./models/city");
const user_1 = require("./models/user");
const category_1 = require("./models/category");
const event_1 = require("./models/event");
const location_1 = require("./models/location");
const sustainabilityQuestion_1 = require("./models/sustainabilityQuestion");
// User - Category
user_1.User.belongsToMany(category_1.Category, { through: "UserCategory" });
category_1.Category.belongsToMany(user_1.User, { through: "UserCategory" });
// Event - User
event_1.Event.belongsTo(user_1.User, { as: "organizer" });
user_1.User.hasMany(event_1.Event, { foreignKey: "organizerId" });
// Event - Category
event_1.Event.belongsToMany(category_1.Category, { through: "EventCategory" });
category_1.Category.belongsToMany(event_1.Event, { through: "EventCategory" });
// Event - Location
event_1.Event.belongsTo(location_1.Location, { foreignKey: "locationId" }); // 1 - 1
location_1.Location.hasMany(event_1.Event, { foreignKey: "locationId" });
// Event - SustainabilityQuestion
event_1.Event.hasMany(sustainabilityQuestion_1.SustainabilityQuestion, { foreignKey: "eventId" });
sustainabilityQuestion_1.SustainabilityQuestion.belongsTo(event_1.Event, { foreignKey: "eventId" });
// Location - City
location_1.Location.belongsTo(city_1.City, { foreignKey: "cityId" });
city_1.City.hasMany(location_1.Location, { foreignKey: "cityId" });
