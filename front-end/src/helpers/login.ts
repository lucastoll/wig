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

  console.log("callback");
  try {
    const backEndUser = await axios.get(`http://localhost:3000/user/${userData.email}`);
    console.log(backEndUser.data);
    userStore.registerDone = true;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      userStore.registerDone = false;
    } else {
      console.log('Ocorreu um erro ao buscar o usuário');
      logout();
    }
  }

  userStore.loggedIn = true;
  userStore.name = userData.name;
  userStore.email = userData.email;
  userStore.profilePicture = userData.picture;
};
