import { userStore } from "@/store";
import { useNotification } from "@kyvg/vue3-notification";
export const logout = () => {
  const { notify } = useNotification();
  localStorage.removeItem("credential");
  userStore.loggedIn = false;
  userStore.name = "";
  userStore.email = "";
  userStore.profilePicture = "";
  userStore.loading = false;
  notify({
    title: "Sessão encerrada com sucesso!",
    type: "success",
  });
  delete userStore.registerDone;
};
