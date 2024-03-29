import { City } from "./models/City";
import { User } from "./models/User";
import { Category } from "./models/Category";
import { Event } from "./models/Event";
import { Location } from "./models/Location";

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
// Location - City
Location.belongsTo(City, { foreignKey: "cityId" });
City.hasMany(Location, { foreignKey: "cityId" });