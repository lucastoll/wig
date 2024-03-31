<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Header from "./components/Header.vue";
import { onMounted } from "vue";
import { logout } from "@/helpers/logout.ts";
import { login } from "@/helpers/login.ts";

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
</template>

<style scoped></style>
