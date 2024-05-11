import { reactive } from "vue";
import type { ICity } from "@/types/ICity";
import type { IUserStore } from "@/types/IUserStore";
import type IEvent from "./types/IEvent";

export const userStore: IUserStore = reactive({
  loading: true,
  loggedIn: false,
  Categories: [],
  administrator: undefined
});

export const cityStore: ICity = reactive({} as ICity);

export const eventStore: IEvent = reactive({} as IEvent);

const storedCity = localStorage.getItem("city");
if (storedCity) {
  const city = JSON.parse(storedCity);
  cityStore.id = city.id;
  cityStore.name = city.name;
} else {
  cityStore.id = 1;
  cityStore.name = "Sorocaba";
}
