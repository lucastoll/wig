import { CustomError } from "../errors/CustomError";
import { City } from "../models/City";

class CityService {
  static async getAllCities(): Promise<City[]> {
    const cities = await City.findAll();
    return cities;
  }

  static async createCity(name: string): Promise<City> {
    const existingCity = await City.findOne({ where: { name } });
    if (existingCity) {
      throw new CustomError("Cidade já cadastrada", 400);
    }

    const newCity = await City.create({ name });
    return newCity;
  }
}

export { CityService };
