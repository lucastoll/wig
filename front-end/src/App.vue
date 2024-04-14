<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import type { CallbackTypes } from "vue3-google-login";
import NavBar from "@/components/NavBar.vue";
import Header from "@/components/Header.vue";
import PopupRegister from "@/components/PopupRegister.vue";
import { logout } from "@/helpers/logout";
import { login } from "@/helpers/login";
import { userStore } from "@/store";

onMounted(() => {
  const credential = localStorage.getItem("credential");
  try {
    credential &&
      login({
        credential,
      } as unknown as CallbackTypes.CredentialPopupResponse);
  } catch (error) {
    logout();
    console.log(error);
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
