<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { userStore } from "@/store";
import { login } from "@/helpers/login";
import { logout } from "@/helpers/logout";

const name = ref(userStore.name?.split(" ")[0] || "Visitante");
const loggedIn = ref(userStore.loggedIn ?? undefined);

const updateValues = ([newLoggedIn, newName]: [
  boolean | undefined,
  string | undefined
]) => {
  console.log(newLoggedIn, newName)
  loggedIn.value = newLoggedIn;
  name.value = newName?.split(" ")[0] || "Visitante";
};

onMounted(() => {
  updateValues([userStore.loggedIn, userStore.name]);
});

watch([() => userStore.loggedIn, () => userStore.name], updateValues);
</script>

<template>
  <div>
    <span class="loginGoogle__name">Olá, {{ name }}</span>
    <div v-if="!loggedIn">
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
