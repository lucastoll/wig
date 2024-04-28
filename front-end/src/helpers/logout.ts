import { userStore } from "@/store";

export const logout = () => {
  localStorage.removeItem("credential");
  userStore.loggedIn = false;
  userStore.name = "";
  userStore.email = "";
  userStore.profilePicture = "";
  userStore.loading = false;

  delete userStore.registerDone;

  console.log(userStore)
};
