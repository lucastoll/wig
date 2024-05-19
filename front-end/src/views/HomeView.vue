<template>
  <div v-if="loading"><LogoLoading /></div>
  <div v-else>
    <Hero :events="heroEvents" />
    <EventList :events="eventListEvents" title="Eventos recomendados" />
    <EventList :events="upcomingEvents" title="Próximos eventos" />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Footer from "../components/Footer.vue";
import Hero from "../components/Hero.vue";
import EventList from "../components/EventList.vue";
import LogoLoading from "@/components/LogoLoading.vue";
import { cityStore, userStore } from "@/store";

const heroEndpoint = computed(() => `${import.meta.env.VITE_API_URL}/events?cityId=${cityStore.id}`);
const eventListEndpoint = computed(() => {
  if (userStore.loggedIn === false && cityStore.id !== null) {
    return `${import.meta.env.VITE_API_URL}/events?cityId=${cityStore.id}`;
  } else {
    return `${import.meta.env.VITE_API_URL}/events/recommendation?cityId=${cityStore.id}&userId=${userStore.id}`;
  }
});
const upcomingEventsEndpoint = computed(() => `${import.meta.env.VITE_API_URL}/events/date?cityId=${cityStore.id}`);

const loading = ref(true);
const heroEvents = ref([]);
const eventListEvents = ref([]);
const upcomingEvents = ref([]);

const fetchData = async () => {
  try {
    const [heroResponse, eventListResponse, upcomingEventsResponse] = await Promise.all([
      axios.get(heroEndpoint.value),
      axios.get(eventListEndpoint.value),
      axios.get(upcomingEventsEndpoint.value)
    ]);

    heroEvents.value = heroResponse.data;
    eventListEvents.value = eventListResponse.data;
    upcomingEvents.value = upcomingEventsResponse.data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>


