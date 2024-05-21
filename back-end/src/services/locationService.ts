import { CustomError } from "../errors/customError";
import getCoordinates from "../helpers/getCoordinates";
import { Location } from "../models/location";

interface ILocationService {
  getAllLocations(): Promise<Location[]>;
  createLocation(
    address: string,
    zipcode: string,
    maxCapacity: number,
    cityId: number,
    name: string
  ): Promise<Location>;
}

class LocationService implements ILocationService {
  async getAllLocations(): Promise<Location[]> {
    const locations = await Location.findAll({
      include: "City",
    });
    return locations;
  }

  async checkExistingLocation(
    address: string,
    zipcode: string,
    cityId: number
  ) {
    const existingLocation = await Location.findOne({
      where: { address, zipcode, cityId },
    });

    if (existingLocation) {
      throw new CustomError(
        "Uma localização com o mesmo endereço, CEP e ID da cidade já existe",
        400
      );
    }
  }

  async createLocation(
    address: string,
    zipcode: string,
    maxCapacity: number,
    cityId: number,
    name: string
  ): Promise<Location> {
    const { latitude, longitude } = await getCoordinates(zipcode);
    await this.checkExistingLocation(address, zipcode, cityId);

    const newLocation = await Location.create({
      address,
      zipcode,
      maxCapacity,
      cityId,
      name,
      coordlat: latitude,
      coordlon: longitude,
    });

    return newLocation;
  }

  catch() {
    throw new CustomError("Erro ao criar localização", 500);
  }
}

export { LocationService, ILocationService };
