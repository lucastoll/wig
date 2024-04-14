<script setup lang="ts">
import { computed } from "vue";
import Footer from "../components/Footer.vue";
import Hero from "../components/Hero.vue";
import EventList from "../components/EventList.vue";
import { cityStore, userStore } from "@/store";

const heroEndpoint = computed(
  () => `http://localhost:3000/events?cityId=${cityStore.id}`
);
const eventListEndpoint = computed(() => {
  if (userStore.loggedIn === false && cityStore.id !== null) {
    return `http://localhost:3000/events?cityId=${cityStore.id}`;
  } else {
    return `http://localhost:3000/events/recommendation?cityId=${cityStore.id}&userId=${userStore.id}`;
  }
});
const upcomingEventsEndpoint = computed(
  () => `http://localhost:3000/events/date?cityId=${cityStore.id}`
);
</script>

<template>
  <Hero v-if="cityStore && userStore" :endpoint="heroEndpoint" />
  <EventList
    v-if="cityStore && userStore"
    :endpoint="eventListEndpoint"
    title="Eventos recomendados"
  />
  <EventList
    v-if="cityStore.id !== null && userStore"
    :endpoint="upcomingEventsEndpoint"
    title="Próximos eventos"
  />
  <Footer />
</template>
