import { reactive } from "vue";
import type { City } from "./types/ICity";

export interface IUserStore {
  id?: string;
  loggedIn?: boolean;
  name?: string;
  email?: string;
  profilePicture?: string;
  registerDone?: boolean;
}

export const userStore: IUserStore = reactive({
  loggedIn: false,
});

export const cityStore: City = reactive({} as City);

const storedCity = localStorage.getItem("city");
if (storedCity) {
  const city = JSON.parse(storedCity);
  cityStore.id = city.id;
  cityStore.name = city.name;
} else {
  cityStore.id = 1;
  cityStore.name = "Sorocaba";
}
