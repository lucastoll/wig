import { City } from "./models/city";
import { User } from "./models/user";
import { Category } from "./models/category";
import { Event } from "./models/event";
import { Location } from "./models/location";
import { SustainabilityQuestion } from "./models/sustainabilityQuestion";

// User - Category
User.belongsToMany(Category, { through: "UserCategory" });
Category.belongsToMany(User, { through: "UserCategory" });
// Event - User
Event.belongsTo(User, { as: "organizer" });
User.hasMany(Event, { foreignKey: "organizerId" });
// Event - Category
Event.belongsToMany(Category, { through: "EventCategory" });
Category.belongsToMany(Event, { through: "EventCategory" });
// Event - Location
Event.belongsTo(Location, { foreignKey: "locationId" }); // 1 - 1
Location.hasMany(Event, { foreignKey: "locationId" });
// Event - SustainabilityQuestion
Event.hasMany(SustainabilityQuestion, { foreignKey: "eventId" });
SustainabilityQuestion.belongsTo(Event, { foreignKey: "eventId" });
// Location - City
Location.belongsTo(City, { foreignKey: "cityId" });
City.hasMany(Location, { foreignKey: "cityId" });
