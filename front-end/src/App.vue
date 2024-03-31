<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Header from "./components/Header.vue";
import PopupRegister from "./components/PopupRegister.vue";
import { onMounted } from "vue";
import type { CallbackTypes } from "vue3-google-login";
import { logout } from "@/helpers/logout.ts";
import { login } from "@/helpers/login.ts";
import { userStore } from "./store";

onMounted(() => {
  const credential = localStorage.getItem("credential");
  try {
    credential &&
      login({
        credential,
      } as unknown as CallbackTypes.CredentialPopupResponse);
  } catch (e) {
    logout();
    console.log(e);
  }
});
</script>

<template>
  <Header />
  <NavBar />
  <RouterView />
  <PopupRegister :isOpen="userStore.registerDone === false" />
</template>

<style scoped></style>
