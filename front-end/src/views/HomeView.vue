<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import EventList from "../components/EventList.vue";
</script>

<template>
  <EventList
    endpoint="http://localhost:3000/events?cityId=1"
    title="Eventos Recomendados"
  />
  <EventList
    endpoint="http://localhost:3000/events?cityId=1"
    title="Próximos eventos"
  />
</template>

<style scoped></style>
