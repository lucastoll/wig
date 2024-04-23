import { Event } from "../models/event";
import { User } from "../models/user";
import { Location } from "../models/location";
import { Category } from "../models/category";
import { CustomError } from "../errors/customError";
import { City } from "../models/city";
import { FindOptions, Op, WhereOptions, literal } from "sequelize";
import getDistance from "../helpers/getDistance";

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
    cityName: string | undefined,
    searchBar: string | undefined
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

    let eventsQuery: FindOptions = {
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
    };

    if (searchBar) {
      eventsQuery.where = {
        ...eventsQuery.where,
        [Op.or]: [literal(`LOWER(Event.name) LIKE LOWER('%${searchBar}%')`)],
      };
    }

    const events = await Event.findAll(eventsQuery);

    return events;
  }

  static async getEventsById(eventId: string): Promise<Event | null> {
    try {
      const event = await Event.findByPk(eventId, {
        include: [
          { model: Category },
          { model: User, as: "organizer" },
          { model: Location },
        ],
      });

      return event;
    } catch (error) {
      throw new Error("Erro ao buscar evento por ID");
    }
  }

  static async getEventsRecomendation(
    cityId: string | undefined,
    cityName: string | undefined,
    userId: string | undefined
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

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Category,
          as: "Categories",
        },
      ],
    });

    if (!user) {
      throw new CustomError("Usuário não encontrado", 404);
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

    const userCoordinates = {
      latitude: user.coordlat,
      longitude: user.coordlon,
    };

    const eventsWithRecommendations = events.map(async (event) => {
      const eventCoordinates = {
        latitude: event.Location.coordlat,
        longitude: event.Location.coordlon,
      };
      const distance = getDistance(userCoordinates, eventCoordinates);
      let recommendationPoints = 0;

      if (distance <= 1.0) {
        recommendationPoints += 12;
      } else if (distance <= 3.0) {
        recommendationPoints += 8;
      } else if (distance <= 5.0) {
        recommendationPoints += 4;
      }

      user.Categories.forEach((userCategory) => {
        if (
          event.Categories.some(
            (eventCategory) => eventCategory.id === userCategory.id
          )
        ) {
          recommendationPoints += 5;
          console.log(`\n\nUsuário gosta de ${userCategory.name} +5 pontos`);
        }
      });

      return {
        ...event.get({ plain: true }),
        recommendationPoints,
      };
    });

    const resolvedEvents = await Promise.all(eventsWithRecommendations);
    resolvedEvents.sort(
      (a, b) => b.recommendationPoints - a.recommendationPoints
    );

    return resolvedEvents;
  }

  static async getEventsByCategories(
    cityId: string | undefined,
    cityName: string | undefined,
    userId: string | undefined,
    searchBar: string | undefined
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

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Category,
          as: "Categories",
        },
      ],
    });

    if (!user) {
      throw new CustomError("Usuário não encontrado", 404);
    }

    let eventsQuery: FindOptions = {
      include: [
        { model: Category },
        { model: User, as: "organizer" },
        {
          model: Location,
          where: { cityId: city.id },
          include: [{ model: City }],
        },
      ],
      limit: 10,
    };

    if (searchBar) {
      eventsQuery.where = {
        ...eventsQuery.where,
        [Op.or]: [literal(`LOWER(Event.name) LIKE LOWER('%${searchBar}%')`)],
      };
    }

    const events = await Event.findAll(eventsQuery);

    const eventsWithRecommendations = events.map(async (event) => {
      let recommendationPoints = 0;

      user.Categories.forEach((userCategory) => {
        if (
          event.Categories.some(
            (eventCategory) => eventCategory.id === userCategory.id
          )
        ) {
          recommendationPoints += 5;
          console.log(`\n\nUsuário gosta de ${userCategory.name} +5 pontos`);
        }
      });

      return {
        ...event.get({ plain: true }),
        recommendationPoints,
      };
    });

    const resolvedEvents = await Promise.all(eventsWithRecommendations);
    resolvedEvents.sort(
      (a, b) => b.recommendationPoints - a.recommendationPoints
    );

    return resolvedEvents;
  }

  static async getEventsByDistance(
    cityId: string | undefined,
    cityName: string | undefined,
    userId: string | undefined,
    searchBar: string | undefined
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

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Category,
          as: "Categories",
        },
      ],
    });

    if (!user) {
      throw new CustomError("Usuário não encontrado", 404);
    }

    let eventsQuery: FindOptions = {
      include: [
        { model: Category },
        { model: User, as: "organizer" },
        {
          model: Location,
          where: { cityId: city.id },
          include: [{ model: City }],
        },
      ],
      limit: 10,
    };

    if (searchBar) {
      eventsQuery.where = {
        ...eventsQuery.where,
        [Op.or]: [literal(`LOWER(Event.name) LIKE LOWER('%${searchBar}%')`)],
      };
    }

    const events = await Event.findAll(eventsQuery);

    const userCoordinates = {
      latitude: user.coordlat,
      longitude: user.coordlon,
    };

    const eventsWithRecommendations = events.map(async (event) => {
      const eventCoordinates = {
        latitude: event.Location.coordlat,
        longitude: event.Location.coordlon,
      };

      const distance = getDistance(userCoordinates, eventCoordinates);

      return {
        event: event.get({ plain: true }),
        distance,
      };
    });

    const resolvedEvents = await Promise.all(eventsWithRecommendations);
    resolvedEvents.sort((a, b) => a.distance - b.distance);
    return resolvedEvents.map((event) => event.event);
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
      startTime,
      endTime,
      ticketUrl,
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
      startTime,
      endTime,
      ticketUrl,
    });
    await newEvent.addCategories(categories);

    return newEvent;
  }
}

export { EventService };
