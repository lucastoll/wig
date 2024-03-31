<script setup lang="ts">
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