<script setup lang="ts">
import SearchBar from "@/components/SearchBar.vue";
import CardsSearch from "@/components/CardsSearch.vue";
import LogoLoading from "@/components/LogoLoading.vue";
import { cityStore, userStore } from "@/store";
import { computed, ref, onMounted, watch } from "vue";
import axios from "axios";

const searchQuery = ref("");
const selectedFilter = ref("date");
const loading = ref(true);
const events = ref([]);

const updateSearch = (newTerm: string) => {
  searchQuery.value = newTerm;
};

const updateFilter = (newFilter: string) => {
  selectedFilter.value = newFilter;
};

const endpoint = computed(() => {
  if (!userStore.loggedIn && cityStore.id !== null) {
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

const fetchData = async () => {
  try {
    loading.value = true;
    const response = await axios.get(endpoint.value);
    events.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

watch([searchQuery, selectedFilter], fetchData);
</script>

<template>
  <div v-if="loading" class="loading-spinner">
    <LogoLoading />
  </div>
  <div v-else>
    <SearchBar @update:searchQuery="updateSearch" @update:filter="updateFilter" />
    <CardsSearch :events="events" title="Eventos recomendados" :user="userStore.user" />
  </div>
</template>
