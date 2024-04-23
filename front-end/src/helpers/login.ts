import { userStore } from "@/store";
import axios from "axios";
import { decodeCredential, type CallbackTypes } from "vue3-google-login";
import { logout } from "./logout";

interface UserData {
  name?: string;
  email?: string;
  picture?: string;
}

export const login: CallbackTypes.CredentialCallback = async (response) => {
  const userData: UserData = decodeCredential(response.credential);
  localStorage.setItem("credential", response.credential);

  try {
    const backEndUser = await axios.get(
      `http://localhost:3000/user/${userData.email}`
    );
    userStore.loading = true;
    userStore.id = backEndUser.data.id;
    userStore.registerDone = true;
    userStore.Categories = backEndUser.data.Categories;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      userStore.registerDone = false;
    } else {
      logout();
    }
  } finally {
    userStore.loading = false;
  }

  userStore.loggedIn = true;
  userStore.name = userData.name;
  userStore.email = userData.email;
  userStore.profilePicture = userData.picture;
};
