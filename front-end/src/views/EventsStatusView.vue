<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { cityStore, userStore } from "@/store";
import { useRouter } from "vue-router";
import CardsSearch from "@/components/CardsSearch.vue";

const router = useRouter();

onMounted(() => {
  if (!userStore.loggedIn && !userStore.loading) {
    router.push("/");
  }
});

watch(userStore, () => {
  if (!userStore.loggedIn && !userStore.loading) {
    router.push("/");
  }
});

const headingText = computed(() => {
  return userStore.administrator ? "Eventos para análise" : "Meus eventos";
});

const endpoint = computed(() => {
  if (userStore.administrator) {
    return `${import.meta.env.VITE_API_URL}/events/analysis`;
  } else {
    return `${import.meta.env.VITE_API_URL}/events/organizer/${userStore.id}`;
  }
});
</script>
<template>
  <h1>{{ headingText }}</h1>
  <CardsSearch
    v-if="cityStore && userStore.loading === false"
    :endpoint="endpoint"
    :authRoute="true"
    :showStatus="true"
    title=""
  />
</template>
<style scoped>
h1 {
  font-size: 24px;
  font-weight: bold;
  margin: 16px 0;
  color: black;
  text-align: center;
}
</style>
