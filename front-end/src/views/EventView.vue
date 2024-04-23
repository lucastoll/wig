<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type IEvent from "@/types/IEvent";
import { eventStore, cityStore } from "@/store";
import { MdPreview } from "md-editor-v3";
import axios from "axios";

import Livre from "@/assets/Livre.svg";
import Menor18 from "@/assets/eighteen.png";
import Menor16 from "@/assets/sixteen.png";
import Menor14 from "@/assets/fourteen.png";
import Menor12 from "@/assets/twelve.png";
import Menor10 from "@/assets/ten.png";

const event = ref<IEvent>(eventStore);
const route = useRoute();
const router = useRouter();

function formatDate(dateString: string) {
  console.log(dateString);
  const eventDate = new Date(dateString);
  console.log(eventDate.toLocaleDateString("pt-BR"));
  return eventDate.toLocaleDateString("pt-BR");
}
const dateStr = ref(event.value.initialDate); // substitua isso pela data do seu banco de dados
const dayOfWeek = computed(() => {
  const date = new Date(dateStr.value);
  const dayIndex = date.getDay();
  const days = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  return days[dayIndex];
});

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
    return "Livre para todos os públicos";
  } else if (event.value.minAge === 10) {
    return "Não recomendado para menores de 10 anos";
  } else if (event.value.minAge === 12) {
    return "Não recomendado para menores de 12 anos";
  } else if (event.value.minAge === 14) {
    return "Não recomendado para menores de 14 anos";
  } else if (event.value.minAge === 16) {
    return "Não recomendado para menores de 16 anos";
  } else if (event.value.minAge === 18) {
    return "Não recomendado para menores de 18 anos";
  }
});

const ageIcon = computed(() => {
  if (event.value.minAge === 0) {
    return Livre;
  } else if (event.value.minAge === 10) {
    return Menor10;
  } else if (event.value.minAge === 12) {
    return Menor12;
  } else if (event.value.minAge === 14) {
    return Menor14;
  } else if (event.value.minAge === 16) {
    return Menor16;
  } else if (event.value.minAge === 18) {
    return Menor18;
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
  <div v-if="event.initialDate" class="grandFather">
  <div  class="father">
    <div class="sectiontitle">
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
        <div class="ticket">
          <img alt="" src="@/assets/ticket.svg" width="32" height="32" />
          <span v-if="event.finalPrice > 0"
            >R${{ event.initialPrice }},00 a R${{ event.finalPrice }},00</span
          >
          <span v-else>Gratuito</span>
        </div>
        <div class="location">
          <img
            alt=""
            src="@/assets/Iconecalendario.svg"
            width="26"
            height="26"
          />
          <span
            >{{ dayOfWeek }}, {{ formatDate(event.initialDate) }},
            {{ event.startTime }}h às {{ event.endTime }}h</span
          >
        </div>
        <div class="location">
          <img alt="" :src="ageIcon" width="25" height="25" />
          <span>{{ ageTextComputed }}</span>
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
          height="100%"
          frameborder="0"
          scrolling="yes"
          allowtransparency="true"
        ></iframe>
      </div>
    </div>
    <div class="footer">
      <span class="foot">WIG 2024 © - Todos os direitos reservados</span>
    </div>
  </div>
</div>
</template>

<style scoped>
.foot {
  font-size: smaller;
  color: black;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}
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

.father {
  display: flex;
  flex-direction: column;
  padding: 16px 16px 50px;
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
.instagram {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  align-items: center;
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
  align-self: center;
  width: 100%;
  height: 450px;
}

@media screen and (min-width: 1024px) {
  .imgEventMobile {
    display: none;
  }

  .sectiontitle{
    justify-content: start;
  }
.title{
  align-items: start;
  width: 100%;
}
.nameEvent{
  padding-right: 475px;
}
.row{
  justify-content: flex-start;
}
  .grandFather{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .father{
    display: flex;
    flex-direction: column;
    max-width: 1280px;
  }
  .imgEventDesktop {
    display: block;
    width: 100%;
  }
  .instagram_embed {
    border: 2px solid black;
    min-height: 764px;
    max-width: 600px;
  }
  .maps {
    width: 600px;
  }

  .infosWrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
  }

  .maps__infos {
    flex-direction: column-reverse;
  }

  .father {
    padding-bottom: 0px;
  }
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

.description figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media screen and (min-width: 1024px) {
  .description img {
    max-width: 600px;
  }
}
</style>
