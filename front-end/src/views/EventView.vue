<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type IEvent from "@/types/IEvent";
import { eventStore, cityStore } from "@/store";
import { MdPreview } from "md-editor-v3";
import axios from "axios";

import CalendarIcon from "@/assets/ticket.svg";

const event = ref<IEvent>(eventStore);
const route = useRoute();
const router = useRouter();

function formatDate(dateString: string) {
  console.log(dateString);
  const eventDate = new Date(dateString);
  console.log(eventDate.toLocaleDateString("pt-BR"));
  return eventDate.toLocaleDateString("pt-BR");
}

const mapUrl = computed(() => {
  if (!event.value.Location) return;

  const locationName = event.value.Location.name
    ? `${event.value.Location.name}, `
    : "";
  const address = `${locationName}${event.value.Location.address}`;
  const encodedAddress = encodeURIComponent(address);

  return `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
});

const instagramId = computed(() => {
  const url = event.value.instagramEmbed;
  const parts = url.split("/");
  const id = parts[4];
  console.log(id);
  return id;
});

const ageTextComputed = computed(() => {
  if (event.value.minAge === 0) {
    return "Livre";
  } else if (event.value.minAge === 18) {
    return "18+";
  } else {
    return `Idade mínima: ${event.value.minAge}+`;
  }
});

const ageIcon = computed(() => {
  if (event.value.minAge === 0) {
    return CalendarIcon;
  } else if (event.value.minAge === 18) {
    return CalendarIcon;
  } else {
    return CalendarIcon;
  }
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
});
</script>

<template>
  <div class="events" v-if="event.imageMobile && event.imageDesktop">
    <img :src="event.imageMobile" alt="imgMobile" class="imgEventMobile" />
    <img :src="event.imageDesktop" alt="imgDesktop" class="imgEventDesktop" />
  </div>
  <div v-if="event.initialDate" class="father">
    <div class="sectiontitle">
      <div class="data">
        <img
          alt="Icone calendario"
          src="@/assets/Iconecalendario.svg"
          width="32"
          height="32"
        />
        <span class="day">{{ formatDate(event.initialDate) }}</span>
        <span>{{ event.startTime }}h as {{ event.endTime }}h</span>
      </div>
      <div class="title">
        <h1 class="nameEvent">{{ event.name }}</h1>
        <div class="row">
          <span>Categorias:</span>
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
      <span v-if="event.Location?.name"
        >{{ event.Location?.name }} - {{ event.Location.address }}</span
      >
      <span v-else>{{ event.Location?.address }}</span>
    </div>
    <div class="maps__infos">
      <div class="maps">
        <iframe
          :src="mapUrl"
          width="100%"
          height="300px"
          frameborder="0"
          style="border: 0"
          allowfullscreen="true"
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </div>
      <div class="infosWrapper">
        <div class="location">
          <img alt="" :src="ageIcon" width="20" height="25" />
          <span>{{ ageTextComputed }}</span>
        </div>
        <div class="ticket">
          <img alt="" src="@/assets/ticket.svg" width="32" height="32" />
          <span v-if="event.finalPrice > 0"
            >R${{ event.initialPrice }} a R${{ event.finalPrice }}</span
          >
          <span v-else>Gratuito</span>
        </div>
      </div>
    </div>
    <div class="description">
      <MdPreview :modelValue="event.description" />
    </div>
    <div class="instagram">
      <h2>Confira mais fotos no instagram</h2>
      <div class="instagram_embed">
        <iframe
          :src="'https://www.instagram.com/p/' + instagramId + '/embed'"
          width="100%"
          height="500"
          frameborder="0"
          scrolling="no"
          allowtransparency="true"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ticket {
  align-items: center;
  color: black;
  display: flex;
  flex-direction: row;
  font-size: medium;
  gap: 8px;
  justify-content: flex-start;
}
.maps {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
  border-radius: 10px;
  width: 100%;
  align-self: center;
  overflow: hidden;
  margin-bottom: 10px;
  margin-top: 16px;
}

.maps__infos {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media screen and (min-width: 1024px) {
  .maps {
    width: 600px;
  }

  .infosWrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .maps__infos {
    flex-direction: column-reverse;
  }
}

.father {
  display: flex;
  flex-direction: column;
  padding: 16px 16px 200px;
}
.location {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  color: black;
  font-size: medium;
  padding-top: 20px;
  font-size: 16px;
}
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3px;
  font-size: small;
  color: black;
  font-size: 14px;
  margin-top: 8px;
  width: 55vw;
  max-width: 300px;
  flex-wrap: wrap;
}
.data {
  align-items: center;
  color: black;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  left: 0px;
  position: absolute;
  top: 16px;
  display: none;
}

@media screen and (min-width: 400px) {
  .data {
    display: flex;
  }

  .nameEvent {
    width: 75% !important;
  }
}

.data .day {
  margin-top: 8px;
}

.title {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  font-size: 20px;
  height: 80px;
  max-width: 90%;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.categories {
  color: black;
  font-size: small;
}
.nameEvent {
  font-size: medium;
  color: black;
  font-weight: 700;
  width: 100%;
  align-self: center;
  font-size: 20px;
  line-height: 28px;
}
.sectiontitle {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
}
.imgEventMobile {
  width: 100%;
}
.imgEventDesktop {
  display: none;
}

@media screen and (min-width: 1024px) {
  .imgEventMobile {
    display: none;
  }
  .imgEventDesktop {
    display: block;
    width: 100%;
  }
}

.instagram {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
}
.instagram h2 {
  font-size: 24px;
  line-height: 32px;
  font-weight: bold;
  margin: 16px 0;
  color: black;
}
.instagram_embed {
  border: 2px solid black;
}
</style>
<style>
.description {
  width: 100%;
  color: black;
  margin-top: 16px;
}

.description h1,
.description h2,
.description h3,
.description h4,
.description h5,
.description h6 {
  font-size: 24px;
  line-height: 32px;
  font-weight: bold;
  margin: 16px 0;
}

.description p {
  font-size: 16px;
  line-height: 24px;
  margin: 8px 0;
}

.description strong {
  font-weight: 500;
}

.description img {
  width: 100%;
}
</style>
