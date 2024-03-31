<script setup lang="ts">
import Hero from "../components/Hero.vue";
import EventList from "../components/EventList.vue";
</script>

<template>
  <Hero />
  <EventList
    endpoint="http://localhost:3000/events?cityId=1"
    title="Eventos Recomendados"
  />
  <EventList
    endpoint="http://localhost:3000/events?cityId=1"
    title="Próximos eventos"
  />
</template>
