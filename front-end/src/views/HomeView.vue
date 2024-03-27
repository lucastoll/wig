<script setup lang="ts">
import LoginGoogle from "../components/LoginGoogle.vue";
import Hero from "../components/Hero.vue";
import { userStore } from "../store";
</script>

<template>
  <div>
    <Hero />
    {{ userStore.name }}
    <LoginGoogle />
  </div>
</template>
