<script setup lang="ts">
import { computed } from "vue";
import { userStore } from "@/store";
import { login } from "@/helpers/login";
import { logout } from "@/helpers/logout";
import { useNotification } from "@kyvg/vue3-notification";

const name = computed(() => userStore.name?.split(" ")[0] || "Visitante");
const { notify } = useNotification();

async function performLogin() {
  try {
    const loggedIn = await login(); // Assume login() returns a promise
    if (userStore.loggedIn) {
      notify({
        title: "Login bem-sucedido!",
        type: "success",
      });
    } else {
      notify({
        title: "Erro ao fazer login.",
        type: "error",
      });
    }
  } catch (error) {
    notify({
      title: `Erro ao fazer login: ${error.message}`,
      type: "error",
    });
  }
}

</script>

<template>
  <div>
    <span class="loginGoogle__name">Olá, {{ name }}</span>
    <div v-if="!userStore.loggedIn">
      <GoogleLogin :callback="login" auto-login />
    </div>
    <div class="loginGoogle__logout" v-else>
      <img
        alt="Sair da conta"
        src="@/assets/Leave.svg"
        width="20"
        height="20"
      />
      <span @click="logout">Sair da conta</span>
    </div>
  </div>
</template>

<style scoped>
.loginGoogle__name {
  display: block;
  text-align: center;
  width: 100%;
  margin-bottom: 8px;
}
.loginGoogle__logout {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.loginGoogle__logout {
  color: red;
  text-decoration: underline;
}
</style>
