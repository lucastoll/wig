<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import CardsSearch from "../components/CardsSearch.vue";
import { cityStore, userStore } from "@/store";
import { computed, ref } from "vue";

const searchQuery = ref("");
const selectedFilter = ref("date");

const updateSearch = (newTerm: string) => {
  searchQuery.value = newTerm;
  console.log(searchQuery.value);
};

const updateFilter = (newFilter: string) => {
  selectedFilter.value = newFilter;
  console.log(selectedFilter.value);
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
    title="Eventos recomendados"
  />
</template>
