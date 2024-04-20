<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import CardsSearch from "../components/CardsSearch.vue";
import { cityStore, userStore } from "@/store";
</script>

<template>
  <SearchBar />
  <CardsSearch
    v-if="cityStore && userStore"
    :endpoint="
      userStore.loggedIn === false && cityStore.id !== null
        ? `http://localhost:3000/events?cityId=${cityStore.id}`
        : `http://localhost:3000/events/recommendation?cityId=${cityStore.id}&userId=${userStore.id}`
    "
    title="Eventos recomendados"
  />
</template>
