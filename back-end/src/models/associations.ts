import { City } from "./city";
import { User } from "./user";
import { Category } from "./category";
import { Event } from "./event";
import { Location } from "./location";

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
Event.belongsTo(Location); // 1 - 1
Location.hasMany(Event);
// Location - City
Location.belongsTo(City, { foreignKey: 'cityId' });
City.hasMany(Location, { foreignKey: 'cityId' });
