import { reactive } from "vue";

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
