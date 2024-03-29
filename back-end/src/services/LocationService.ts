import { CustomError } from "../errors/CustomError";
import { Location } from "../models/Location";

class LocationService {
  static async getAllLocations(): Promise<Location[]> {
    const locations = await Location.findAll({
      include: "City",
    });
    return locations;
  }

  static async createLocation(
    address: string,
    zipcode: string,
    maxCapacity: number,
    cityId: number
  ): Promise<Location> {
    const existingLocation = await Location.findOne({
      where: { address, zipcode, cityId },
    });

    if (existingLocation) {
      throw new CustomError(
        "Uma localização com o mesmo endereço, CEP e ID da cidade já existe",
        400
      );
    }

    const newLocation = await Location.create({
      address,
      zipcode,
      maxCapacity,
      cityId,
    });

    return newLocation;
  }
}

export { LocationService };
