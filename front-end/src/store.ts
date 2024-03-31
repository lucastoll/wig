import { reactive } from "vue";

export interface IUserStore {
  loggedIn?: boolean;
  name?: string;
  email?: string;
  profilePicture?: string;
  registerDone?: boolean;
}

export const userStore: IUserStore = reactive({
  loggedIn: false,
});
