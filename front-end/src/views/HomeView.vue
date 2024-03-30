<script setup lang="ts">
import LoginGoogle from "../components/LoginGoogle.vue";
import { userStore } from "../store";
</script>

<template>
  <div>
    {{ userStore.name }}
    <LoginGoogle />
  </div>
</template>
