<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import Header from "./components/Header.vue";

</script>

<template>
 <Header />
  <NavBar />
  <RouterView />
</template>

<style scoped></style>
