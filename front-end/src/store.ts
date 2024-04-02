import { reactive, ref } from "vue";

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

export interface City {
  name: string;
  id: number;
}

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
