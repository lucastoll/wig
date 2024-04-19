<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type IEvent from "@/types/IEvent";
import { eventStore, cityStore } from "@/store";
import axios from "axios";

const event = ref<IEvent>(eventStore);
const route = useRoute();
const router = useRouter();
const data = ref<string>();

function formatDate(dateString:string) {
      console.log(dateString  )
      const eventDate = new Date(dateString);
      console.log(eventDate.toLocaleDateString("pt-BR"))
        return eventDate.toLocaleDateString("pt-BR");
      }
    

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
  console.log("eventoooooooooooo",event.value);
  data.value = formatDate(event.value.initialDate);

});

</script>

<template>
  <div class="events">
    <img :src="event.imageMobile" alt="imgMobile" class="imgEventMobile">
  </div>
  <div class="sectiontitle">
    <div class="data">
      <img alt="Logo site" src="@/assets/Iconecalendario.svg" width="20" height="20" />
      <span class="day">{{ data}}</span>
    </div>
    <div class="title">
      <h1 class="nameEvent">{{ event.name }}</h1>
      <div class="row"  >
        <span>categoria:</span>
        <div v-for="(item, index) in event.Categories" :key="index">
        <span  v-if="index === event.Categories.length - 1"> {{ item.name }}</span>
        <span v-else>{{item.name}},</span>
    </div>
          </div>
    </div>
  </div>
</template>

<style>
.events{
display:flex;
flex-direction: column;
align-items: center;
}
.row{
  display:flex;
  flex-direction: row;
  gap:3px;
  font-size: small;
  color:black
}
.data{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
}
.day{
  color:black;
  font-size: 8px;
}
.title{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
  padding-left: 10px;
}
.categories{
  color:black;
  font-size: small;
  
}
.nameEvent{
  font-size: medium;
  color:black;
  font-weight: 700;
  width:70%;
}
.sectiontitle{
  display:flex;
  flex-direction: row;
}
.imgEventMobile{
  width: 100%;
  height: 341px;
}
</style>
