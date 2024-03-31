import { Event } from "../models/Event";
import { User } from "../models/User";
import { Location } from "../models/Location";
import { Category } from "../models/Category";
import { CustomError } from "../errors/CustomError";
import { City } from "../models/City";
import { Op } from "sequelize";

type EventData = Event &
  Partial<Location> & {
    categoryIds: number[];
    cityId: number;
    organizerId: number;
    locationId?: number;
  };

class EventService {
  static async getEvents(
    cityId: string | undefined,
    cityName: string | undefined
  ): Promise<Event[]> {
    let city;
    if (cityId) {
      city = await City.findByPk(String(cityId));
    } else if (cityName) {
      city = await City.findOne({ where: { name: String(cityName) } });
    }

    if (!city) {
      throw new CustomError("Cidade não encontrada", 404);
    }

    const events = await Event.findAll({
      include: [
        { model: Category },
        { model: User, as: "organizer" },
        {
          model: Location,
          where: { cityId: city.id },
          include: [{ model: City }],
        },
      ],
    });

    return events;
  }
  static async getEventsByDate(
    cityId: string | undefined,
    cityName: string | undefined
  ): Promise<Event[]> {
    let city;
    if (cityId) {
      city = await City.findByPk(String(cityId));
    } else if (cityName) {
      city = await City.findOne({ where: { name: String(cityName) } });
    }

    if (!city) {
      throw new CustomError("Cidade não encontrada", 404);
    }

    const events = await Event.findAll({
      include: [
        { model: Category },
        { model: User, as: "organizer" },
        {
          model: Location,
          where: { cityId: city.id },
          include: [{ model: City }],
        },
      ],
      where: {
        finalDate: { [Op.gte]: new Date() },  
      },
      order: [["initialDate", "ASC"]],
      limit: 10,
    });

    return events;
  }

  static async createEvent(eventData: EventData): Promise<Event> {
    const {
      name,
      imageMobile,
      imageDesktop,
      organizerId,
      initialDate,
      finalDate,
      initialPrice,
      finalPrice,
      minAge,
      description,
      instagramEmbed,
      locationId,
      address,
      zipcode,
      maxCapacity,
      cityId,
      categoryIds,
    } = eventData;

    const organizer = await User.findByPk(organizerId);
    if (!organizer) {
      throw new CustomError("Organizador não encontrado", 404);
    }

    const categories = await Category.findAll({ where: { id: categoryIds } });
    if (categories.length !== categoryIds.length) {
      throw new CustomError(
        "Uma ou mais categorias não foram encontradas",
        404
      );
    }

    let location;
    if (locationId) {
      location = await Location.findByPk(locationId);
      if (!location) {
        throw new CustomError("Localização não encontrada", 404);
      }
    } else if (address && zipcode && maxCapacity && cityId) {
      const existingLocation = await Location.findOne({
        where: { address, zipcode, cityId },
      });
      if (existingLocation) {
        throw new CustomError(
          "Uma localização com o mesmo endereço, CEP e ID da cidade já existe",
          400
        );
      } else {
        const city = await City.findOne({
          where: { id: cityId },
        });

        if (!city) {
          throw new CustomError("Cidade não encontrada", 404);
        }

        location = await Location.create({
          address,
          zipcode,
          maxCapacity,
          cityId,
        });
      }
    } else {
      throw new CustomError(
        "Você deve fornecer um locationId ou um address, zipcode, maxCapacity e cityId",
        400
      );
    }

    const newEvent = await Event.create({
      name,
      imageMobile,
      imageDesktop,
      initialDate,
      finalDate,
      initialPrice,
      finalPrice,
      minAge,
      description,
      instagramEmbed,
      organizerId,
      locationId: location.id,
    });
    await newEvent.addCategories(categories);

    return newEvent;
  }
}

export { EventService };
