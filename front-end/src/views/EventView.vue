<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type IEvent from "@/types/IEvent";
import { eventStore, cityStore } from "@/store";
import axios from "axios";

const event = ref<IEvent>(eventStore);
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  if (!event.value.id) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/events?cityId=${cityStore.id}`
      );
      if (response.status === 200) {
        console.log(response);
        event.value = response.data.filter(
          (event: IEvent) => event.id === Number(route.params.id)
        )[0];
      } else {
        throw new Error("Evento não encontrado");
      }
    } catch (error) {
      router.push({ name: "NotFound" });
    }
  }
  console.log(event.value);
});
</script>

<template>
  <div class="events">
    <h1>esta é a pagina de eventos</h1>
  </div>
</template>
