<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type IEvent from "@/types/IEvent";
import { eventStore, cityStore } from "@/store";
import axios from "axios";

const event = ref<IEvent>(eventStore);
const route = useRoute();
const router = useRouter();
const data = ref<string>();

function formatDate(dateString: string) {
  console.log(dateString);
  const eventDate = new Date(dateString);
  console.log(eventDate.toLocaleDateString("pt-BR"));
  return eventDate.toLocaleDateString("pt-BR");
}

const mapUrl = computed(() => {
  const encodedAddress = encodeURIComponent(event.value.Location.address);
  return `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
});

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
  console.log("eventoooooooooooo", event.value);
  data.value = formatDate(event.value.initialDate);
});
</script>

<template>
  <div class="events">
    <img :src="event.imageMobile" alt="imgMobile" class="imgEventMobile" />
  </div>
  <div class="sectiontitle">
    <div class="data">
      <img
        alt="Icone calendario"
        src="@/assets/Iconecalendario.svg"
        width="25"
        height="25"
      />
      <span class="day">{{ data }}</span>
    </div>
    <div class="title">
      <h1 class="nameEvent">{{ event.name }}</h1>
      <div class="row">
        <span>categoria:</span>
        <div v-for="(item, index) in event.Categories" :key="index">
          <span v-if="index === event.Categories.length - 1">
            {{ item.name }}</span
          >
          <span v-else>{{ item.name }},</span>
        </div>
      </div>
    </div>
  </div>
  <div class="location">
    <img alt="Logo site" src="@/assets/Location.svg" width="20" height="25" />
    <span>{{ event.Location.address }}</span>
  </div>
  <iframe
    :src="mapUrl"
    width="600"
    height="450"
    frameborder="0"
    style="border: 0"
    allowfullscreen="true"
    aria-hidden="false"
    tabindex="0"
  ></iframe>
</template>

<style>
.location {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  padding-left: 16px;
  color: black;
  font-size: medium;
  padding-top: 20px;
}
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.row {
  display: flex;
  flex-direction: row;
  gap: 3px;
  font-size: small;
  color: black;
}
.data {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 31px;
  gap: 7px;
}
.day {
  color: black;
  font-size: 10px;
  padding-left: 3px;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-top: 8px;
  padding-left: 25px;
}
.categories {
  color: black;
  font-size: small;
}
.nameEvent {
  font-size: medium;
  color: black;
  font-weight: 700;
  width: 70%;
  align-self: center;
}
.sectiontitle {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
.imgEventMobile {
  width: 100%;
  height: 341px;
}
</style>
