import { CustomError } from "../errors/CustomError";
import { Location } from "../models/Location";
import axios from "axios";

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
    const { latitude, longitude } = await this.getCoordinates(zipcode);

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
      coordlat: latitude,
      coordlon: longitude
    });

    return newLocation;
  } catch() {
    throw new CustomError(
      "Erro ao criar localização",
      500
    );
  }

  static async getCoordinates(zipcode: string) {
    const url = `https://nominatim.openstreetmap.org/search?postalcode=${zipcode}&format=json`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data && data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat), // Convertendo para número
          longitude: parseFloat(data[0].lon), // Convertendo para número
        };
      } else {
        console.log("Nenhum resultado encontrado para o CEP especificado.");
        throw new CustomError(
          "Nenhum resultado encontrado para o CEP especificado",
          404
        );
      }
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
      throw new CustomError(
        "Erro ao obter coordenadas",
        500
      );
    }
  }
}


export { LocationService };
