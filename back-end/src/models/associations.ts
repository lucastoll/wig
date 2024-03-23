import { City } from "./city";
import { User } from "./user";
import { Category } from "./category";
import { Event } from "./event";

// User - Category
User.belongsToMany(Category, { through: "UserCategory" });
Category.belongsToMany(User, { through: "UserCategory" });
// Event - User
Event.belongsTo(User, { as: 'organizer' });
User.hasMany(Event, { foreignKey: 'organizerId' });
// Event - Category
Event.belongsToMany(Category, { through: "EventCategory" });
Category.belongsToMany(Event, { through: "EventCategory" });
// City - Event
City.hasMany(Event);
Event.belongsTo(City); // 1 - 1 