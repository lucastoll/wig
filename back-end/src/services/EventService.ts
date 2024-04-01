import { Event } from "../models/Event";
import { User } from "../models/User";
import { Location } from "../models/Location";
import { Category } from "../models/Category";
import { CustomError } from "../errors/CustomError";
import { City } from "../models/City";
import axios from "axios";
import * as geolib from "geolib";

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

    const user = await User.findByPk(userId);
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

    const userCoordinates = await EventService.getCoordinates(
      user.zipcode.toString()
    );

    const eventsWithRecommendations = events.map(async (event) => {
      const eventCoordinates = await EventService.getCoordinates(
        event.Location.zipcode.toString()
      );
      const distance = EventService.getDistance(
        userCoordinates,
        eventCoordinates
      );

      let recommendationPoints = 0;

      if (distance <= 1.0) {
        recommendationPoints += 15;
      } else if (distance <= 3.0) {
        recommendationPoints += 10;
      } else if (distance <= 5.0) {
        recommendationPoints += 5;
      }

      console.log(
        `A distância entre o usuário e o evento ${event.name} é de ${distance} km. Pontos de recomendação: ${recommendationPoints}`
      );

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

  static async getCoordinates(zipcode: string) {
    const url = `https://nominatim.openstreetmap.org/search?postalcode=${zipcode}&format=json`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data && data.length > 0) {
        return {
          latitude: data[0].lat,
          longitude: data[0].lon,
        };
      } else {
        console.log("Nenhum resultado encontrado para o CEP especificado.");
        return null;
      }
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
      return null;
    }
  }

  static getDistance(coord1: any, coord2: any) {
    const lat1 = coord1.latitude;
    const lon1 = coord1.longitude;
    const lat2 = coord2.latitude;
    const lon2 = coord2.longitude;

    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344;
      return dist;
    }
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
