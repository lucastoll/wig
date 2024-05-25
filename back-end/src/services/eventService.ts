import { Event } from "../models/event";
import { User } from "../models/user";
import { Location } from "../models/location";
import { Category } from "../models/category";
import { CustomError } from "../errors/customError";
import { City } from "../models/city";
import { FindOptions, Op, WhereOptions, literal } from "sequelize";
import getDistance from "../helpers/getDistance";
import { SustainabilityQuestion } from "../models/sustainabilityQuestion";
import getCoordinates from "../helpers/getCoordinates";

interface IEventService {
  getEvents(
    cityId: string | undefined,
    cityName: string | undefined
  ): Promise<Event[]>;
  getAnalysisEvents(): Promise<Event[]>;
  getEventsToApprove(
    cityId: string | undefined,
    cityName: string | undefined
  ): Promise<Event[]>;
  approveEvent(eventId: string, approvalFeedback: string): Promise<void>;
  rejectEvent(eventId: string, approvalFeedback: string): Promise<void>;
  getEventsByDate(
    cityId: string | undefined,
    cityName: string | undefined,
    searchBar: string | undefined
  ): Promise<Event[]>;
  getEventById(eventId: string): Promise<Event | null>;
  getEventsRecomendation(
    cityId: string | undefined,
    cityName: string | undefined,
    userId: string
  ): Promise<Event[]>;
  getEventsByCategories(
    cityId: string | undefined,
    cityName: string | undefined,
    userId: string,
    searchBar: string | undefined
  ): Promise<Event[]>;
  getEventsByDistance(
    cityId: string | undefined,
    cityName: string | undefined,
    userId: string,
    searchBar: string | undefined
  ): Promise<Event[]>;
  createEvent(eventData: EventData): Promise<Event>;
  getOrganizerEvents(userId: string, email: string): Promise<Event[]>;
}

type EventData = Event &
  Partial<Location> & {
    categoryIds: number[];
    cityId: number;
    organizerId: number;
    locationId?: number;
    questions: { question: string; answer: string }[];
  };

class EventService implements IEventService {
  async findCity(
    cityId: string | undefined,
    cityName: string | undefined
  ): Promise<City> {
    let city;
    if (cityId) {
      city = await City.findByPk(String(cityId));
    } else if (cityName) {
      city = await City.findOne({ where: { name: String(cityName) } });
    }

    if (!city) {
      throw new CustomError("Cidade não encontrada", 404);
    }

    return city;
  }

  async findUser(userId: string): Promise<User> {
    const user = await User.findByPk(userId, {
      include: [Category],
    });

    if (!user) {
      throw new CustomError("Usuário não encontrado", 404);
    }

    return user;
  }

  calculateCategoryPoints(user: User, event: Event) {
    let points = 0;

    user.Categories.forEach((userCategory) => {
      if (
        event.Categories.some(
          (eventCategory) => eventCategory.id === userCategory.id
        )
      ) {
        points += 5;
        console.log(`\n\nUsuário gosta de ${userCategory.name} +5 pontos`);
      }
    });

    return points;
  }

  calculateDistancePoints(user: User, event: Event) {
    const userCoordinates = {
      latitude: user.coordlat,
      longitude: user.coordlon,
    };

    const eventCoordinates = {
      latitude: event.Location.coordlat,
      longitude: event.Location.coordlon,
    };

    const distance = getDistance(userCoordinates, eventCoordinates);
    let points = 0;

    if (distance <= 1.0) {
      points += 12;
      console.log("\n\nEvento a menos de 1km +12 pontos");
    } else if (distance <= 3.0) {
      points += 8;
      console.log("\n\nEvento a menos de 3km +8 pontos");
    } else if (distance <= 5.0) {
      points += 4;
      console.log("\n\nEvento a menos de 5km +4 pontos");
    }

    return points;
  }

  calculateSustainabilityPoints(user: User, event: Event) {
    const feedbackAsNumber = Number(event.approvalFeedback);
    if (!isNaN(feedbackAsNumber)) {
      console.log(
        `${event.name} recebeu ${feedbackAsNumber} pontos de sustentabilidade`
      );
      return feedbackAsNumber;
    } else {
      return 0;
    }
  }

  async getEvents(
    cityId: string | undefined,
    cityName: string | undefined
  ): Promise<Event[]> {
    const city = await this.findCity(cityId, cityName);
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
      where: { status: "aprovado" },
    });

    events.sort((a, b) => {
      const aPoints = Number(a.approvalFeedback);
      const bPoints = Number(b.approvalFeedback);

      if (isNaN(aPoints) && isNaN(bPoints)) {
        return 0;
      } else if (isNaN(aPoints)) {
        return 1;
      } else if (isNaN(bPoints)) {
        return -1;
      } else {
        return bPoints - aPoints;
      }
    });

    return events;
  }

  async getEventsToApprove(
    cityId: string | undefined,
    cityName: string | undefined
  ): Promise<Event[]> {
    const city = await this.findCity(cityId, cityName);
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
      where: { status: "Em análise" },
    });

    return events;
  }

  async approveEvent(eventId: string, approvalFeedback: string): Promise<void> {
    try {
      const event = await Event.findByPk(eventId);
      if (!event) {
        throw new CustomError("Evento não encontrado", 404);
      }
      event.status = "aprovado";
      event.approvalFeedback = approvalFeedback;
      await event.save();
    } catch (error) {
      throw new CustomError("Erro ao aprovar o evento", 500);
    }
  }

  async rejectEvent(eventId: string, approvalFeedback: string): Promise<void> {
    try {
      const event = await Event.findByPk(eventId);
      if (!event) {
        throw new CustomError("Evento não encontrado", 404);
      }
      event.status = "recusado";
      event.approvalFeedback = approvalFeedback;
      await event.save();
    } catch (error) {
      throw new CustomError("Erro ao aprovar o evento", 500);
    }
  }

  async getEventsByDate(
    cityId: string | undefined,
    cityName: string | undefined,
    searchBar: string | undefined
  ): Promise<Event[]> {
    const city = await this.findCity(cityId, cityName);
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
        status: "aprovado",
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

  async getEventById(eventId: string): Promise<Event | null> {
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

  async getEventsRecomendation(
    cityId: string | undefined,
    cityName: string | undefined,
    userId: string
  ): Promise<Event[]> {
    const city = await this.findCity(cityId, cityName);
    const user = await this.findUser(userId);

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
      where: { status: "aprovado" },
    });

    const eventsWithRecommendations = events.map(async (event) => {
      let recommendationPoints = 0;
      recommendationPoints += this.calculateDistancePoints(user, event);
      recommendationPoints += this.calculateCategoryPoints(user, event);
      recommendationPoints += this.calculateSustainabilityPoints(user, event);

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

  async getEventsByCategories(
    cityId: string | undefined,
    cityName: string | undefined,
    userId: string,
    searchBar: string | undefined
  ): Promise<Event[]> {
    const city = await this.findCity(cityId, cityName);
    const user = await this.findUser(userId);
    console.log(user);
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
      where: { status: "aprovado" },
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
      let recommendationPoints = this.calculateCategoryPoints(user, event);

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

  async getEventsByDistance(
    cityId: string | undefined,
    cityName: string | undefined,
    userId: string,
    searchBar: string | undefined
  ): Promise<Event[]> {
    const city = await this.findCity(cityId, cityName);
    const user = await this.findUser(userId);

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
      where: { status: "aprovado" },
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

  async createEvent(eventData: EventData): Promise<Event> {
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
      questions,
    } = eventData;

    await this.findUser(organizerId.toString());

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

        const { latitude, longitude } = await getCoordinates(
          zipcode.toString()
        );

        location = await Location.create({
          address,
          zipcode,
          maxCapacity,
          cityId,
          coordlat: latitude,
          coordlon: longitude,
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

    if (questions) {
      const sustainabilityQuestions = questions.map((question) => ({
        ...question,
        eventId: newEvent.id,
      }));

      await SustainabilityQuestion.bulkCreate(sustainabilityQuestions);
    }

    return newEvent;
  }

  async getOrganizerEvents(userId: string, email: string): Promise<Event[]> {
    const user = await this.findUser(userId);

    if (user.email !== email) {
      throw new CustomError("Usuário não autorizado", 401);
    }

    const events = await Event.findAll({
      where: { organizerId: userId },
      include: [
        { model: Category },
        { model: User, as: "organizer" },
        { model: Location },
      ],
    });

    return events;
  }

  async getAnalysisEvents(): Promise<Event[]> {
    const events = await Event.findAll({
      where: { status: "em análise" },
      include: [
        { model: Category },
        { model: User, as: "organizer" },
        { model: Location },
        { model: SustainabilityQuestion },
      ],
    });

    return events;
  }
}

export { EventService, IEventService };
