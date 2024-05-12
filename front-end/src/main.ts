import "@/assets/main.css";
import { createApp, type Plugin } from "vue";
import vue3GoogleLogin from "vue3-google-login";
import App from "@/App.vue";
import router from "@/router";
import Notifications from "@kyvg/vue3-notification";

const app = createApp(App);
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
});
app.use(router);
app.use(Notifications as unknown as Plugin);
app.mount("#app");
