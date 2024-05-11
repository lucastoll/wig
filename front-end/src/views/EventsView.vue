<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import CardsSearch from "../components/CardsSearch.vue";
import { cityStore, userStore } from "@/store";
import { computed, ref } from "vue";

const searchQuery = ref("");
const selectedFilter = ref("date");

const updateSearch = (newTerm: string) => {
  searchQuery.value = newTerm;
};

const updateFilter = (newFilter: string) => {
  selectedFilter.value = newFilter;
};

const endpoint = computed(() => {
  if (userStore.loggedIn === false && cityStore.id !== null) {
    return `${import.meta.env.VITE_API_URL}/events/${
      selectedFilter.value
    }?cityId=${cityStore.id}&searchBar=${searchQuery.value}`;
  } else if (selectedFilter.value === "date") {
    return `${import.meta.env.VITE_API_URL}/events/${
      selectedFilter.value
    }?cityId=${cityStore.id}&searchBar=${searchQuery.value}`;
  } else {
    return `${import.meta.env.VITE_API_URL}/events/${
      selectedFilter.value
    }?cityId=${cityStore.id}&searchBar=${searchQuery.value}&userId=${
      userStore.id
    }`;
  }
});
</script>

<template>
  <SearchBar @update:searchQuery="updateSearch" @update:filter="updateFilter" />
  <CardsSearch
    v-if="cityStore && userStore.loading === false"
    :endpoint="endpoint"
    :authRoute="false"
    title="Eventos recomendados"
  />
</template>
