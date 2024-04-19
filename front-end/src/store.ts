import { reactive } from "vue";
import type { ICity } from "@/types/ICity";
import type { IUserStore } from "@/types/IUserStore";

export const userStore: IUserStore = reactive({
  loggedIn: false,
  Categories: [],
});

export const cityStore: ICity = reactive({} as ICity);

const storedCity = localStorage.getItem("city");
if (storedCity) {
  const city = JSON.parse(storedCity);
  cityStore.id = city.id;
  cityStore.name = city.name;
} else {
  cityStore.id = 1;
  cityStore.name = "Sorocaba";
}
