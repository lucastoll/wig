<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { IEvent } from "@/types/IEvent";
import type IQuestion from "@/types/IQuestions";
import { eventStore, userStore } from "@/store";
import { MdPreview } from "md-editor-v3";
import axios from "axios";
import Approval from "@/components/Approval.vue";

import Livre from "@/assets/Livre.svg";
import Menor18 from "@/assets/eighteen.png";
import Menor16 from "@/assets/sixteen.png";
import Menor14 from "@/assets/fourteen.png";
import Menor12 from "@/assets/twelve.png";
import Menor10 from "@/assets/ten.png";

const event = ref<IEvent>(eventStore);
const route = useRoute();
const router = useRouter();
const questions = ref<IQuestion[]>();

function formatDate(dateString: string) {
  const eventDate = new Date(dateString);
  return eventDate.toLocaleDateString("pt-BR");
}
const dateStr = ref(event.value.initialDate);
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
  const parts = url?.split("/");
  const id = parts?.[4] ?? "";
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

watch([userStore, event], () => {
  console.log(userStore.administrator);
  if (userStore.administrator && event.value.id) {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/event/${
          event.value.id
        }/sustainabilityQuestions`,
        {
          googleToken: userStore.googleToken,
          email: userStore.email,
        }
      )
      .then((response) => {
        questions.value = response.data;
        console.log(questions.value);
      })
      .catch((error) => {
        router.push({ name: "NotFound" });
      });
  }
});

onMounted(async () => {
  if (!event.value.id) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/event/getId/${route.params.id}`
      );
      if (response.status === 200) {
        event.value = response.data;
      } else {
        throw new Error("Evento não encontrado");
      }
    } catch (error) {
      router.push({ name: "NotFound" });
    }

    if (userStore.administrator) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/event/${
            event.value.id
          }/sustainabilityQuestions`,
          {
            googleToken: userStore.googleToken,
            email: userStore.email,
          }
        );
        if (response.status === 200) {
          questions.value = response.data;
        } else {
          throw new Error("Evento não encontrado");
        }
      } catch (error) {
        router.push({ name: "NotFound" });
      }
    }
  }
});
</script>

<template>
  <div class="events" v-if="event?.imageMobile && event?.imageDesktop">
    <img :src="event?.imageMobile" alt="imgMobile" class="imgEventMobile" />
    <img :src="event?.imageDesktop" alt="imgDesktop" class="imgEventDesktop" />
  </div>
  <div v-if="event?.initialDate" class="grandFather">
    <div class="father">
      <div class="sectiontitle">
        <div class="title">
          <h1 class="nameEvent">{{ event.name }}</h1>
          <div class="row">
            <span>Categorias:</span>
            <div v-for="(item, index) in event.Categories" :key="index">
              <span v-if="index === (event?.Categories?.length ?? 0) - 1">
                {{ item.name }}</span
              >
              <span v-else>{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="location">
        <img
          alt="Logo site"
          src="@/assets/Location.svg"
          width="20"
          height="25"
        />
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
        <div class="admin" v-if="userStore.administrator">
          <h2 style="color: black">Pontos de sustentabilidade</h2>
          <div
            class="questionsadmin"
            v-for="(item, index) in questions"
            :key="index"
          >
            <div class="question">
              {{ item.question }}
            </div>
            <div class="answer">R: {{ item.answer }}</div>
          </div>
          <h2 style="color: black">Informações do organizador</h2>
          <div class="questionsadmin">
            <div class="question">Nome: {{ event?.organizer?.name }}</div>
            <div class="question">Email: {{ event?.organizer?.email }}</div>
          </div>
        </div>
        <div
          class="admin"
          v-if="
            userStore.email === event.organizer?.email &&
            event.status === 'recusado'
          "
        >
          <h2 style="color: black">Motivo da recusa</h2>
          <div class="questionsadmin">
            <div class="question">R: {{ event?.approvalFeedback }}</div>
          </div>
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
              >{{ dayOfWeek }} {{ formatDate(event.initialDate.toString()) }},
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
    <div
      v-if="userStore.administrator && event.status === 'em análise'"
      class="analise"
    >
      <Approval />
    </div>
  </div>
</template>

<style scoped>
.analise {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.answer {
  font-weight: 700;
}
.admin {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.questionsadmin {
  display: flex;
  flex-direction: column;
  color: black;
  gap: 5px;
}
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
  width: 100%;
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

.data .day {
  margin-top: 8px;
}

.title {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  font-size: 20px;
  height: 80px;
  max-width: 100%;
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
  min-width: 75% !important;
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

  .data {
    display: flex;
  }

  .sectiontitle {
    justify-content: start;
  }
  .title {
    align-items: start;
    width: 100%;
  }
  .nameEvent {
    text-align: left;
  }
  .row {
    justify-content: flex-start;
  }
  .grandFather {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 80px 0px 80px;
  }
  .father {
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
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    gap: 10px;
  }

  .location {
    padding: 0px 0px 0px 0px;
  }
  .maps__infos {
    flex-direction: column-reverse;
  }

  .father {
    padding: 0px 0px 0px 0px;
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
