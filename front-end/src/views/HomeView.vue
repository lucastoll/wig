<script setup lang="ts">
import Footer from "../components/Footer.vue";
import Hero from "../components/Hero.vue";
import EventList from "../components/EventList.vue";
import { cityStore, userStore } from "@/store";
</script>

<template>
  <Hero
    v-if="cityStore && userStore"
    :endpoint="`http://localhost:3000/events?cityId=${cityStore.id}`"
  />
  <EventList
    v-if="cityStore && userStore"
    :endpoint="
      userStore.loggedIn === false && cityStore.id !== null
        ? `http://localhost:3000/events?cityId=${cityStore.id}`
        : `http://localhost:3000/events/recommendation?cityId=${cityStore.id}&userId=${userStore.id}`
    "
    title="Eventos recomendados"
  />
  <EventList
    v-if="cityStore.id !== null && userStore"
    :endpoint="`http://localhost:3000/events/date?cityId=${cityStore.id}`"
    title="Próximos eventos"
  />
  <Footer />
</template>
