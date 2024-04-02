import axios from "axios";
import { CustomError } from "../errors/customErrorr";

export default async function getCoordinates(zipcode: string) {
  const url = `https://nominatim.openstreetmap.org/search?postalcode=${zipcode}&format=json`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
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
    throw new CustomError("Erro ao obter coordenadas", 500);
  }
}
