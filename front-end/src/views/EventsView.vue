<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div v-for="(item, index) in items" :key="index" class="swiper-slide">
        <div class="slide-content">
          <img :src="item.image" :alt="item.alt" class="slide-image" />
          <div class="overlay-text-container">
            <img alt="Calendar" class="calendar" src="@/assets/Calendario.png" />
            <span :class="'overlay-text overlay-text1-' + index">{{ item.overlayText1 }}</span>
          </div>
          <span :class="'overlay-text overlay-text2-' + index">{{ item.overlayText2 }}</span>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script setup>
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { ref, onMounted } from "vue";

const items = ref([
  {
    image:
      "https://imgs.search.brave.com/BwxKWXghgg7KWw7aGSFSJbaJ9KMishuCNF--fx-lfiU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzEzLzcz/LzU3LzEzNzM1NzY1/NDM4OGRhYWRmZGY2/OGNmMzU3NDFhYzRh/LmpwZw",
    alt: "Alt text 1",
    overlayText1: "Festa 1",
    overlayText2: "Evento 1"
  },
  {
    image:
      "https://imgs.search.brave.com/BwxKWXghgg7KWw7aGSFSJbaJ9KMishuCNF--fx-lfiU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzEzLzcz/LzU3LzEzNzM1NzY1/NDM4OGRhYWRmZGY2/OGNmMzU3NDFhYzRh/LmpwZw",
    alt: "Alt text 2",
    overlayText1: "Festa 2",
    overlayText2: "Evento 2"
  },
  {
    image:
      "https://imgs.search.brave.com/BwxKWXghgg7KWw7aGSFSJbaJ9KMishuCNF--fx-lfiU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzEzLzcz/LzU3LzEzNzM1NzY1/NDM4OGRhYWRmZGY2/OGNmMzU3NDFhYzRh/LmpwZw",
    alt: "Alt text 3",
    overlayText1: "Festa 3",
    overlayText2: "Evento 3"
  },
]);

onMounted(() => {
  const swiper = new Swiper(".swiper-container", {
    // Opções do Swiper
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  position: relative;
}

.slide-content {
  position: relative;
}

.slide-image {
  height: 150px;
  width: 100%;
  display: block;
  margin: 0 auto;
}

.overlay-text-container {
  display: flex;
  align-items: flex-end;
  position: absolute;
  bottom: 45px;
  left: 0px;
  margin-bottom: 0px; 
}

.overlay-text {
  display: inline-block;
  margin-bottom: 0px;
  padding: 0px;
  text-align: left;
}

.overlay-text1-0,
.overlay-text1-1,
.overlay-text1-2 {
  color: blue;
  font-size: 10px;
}

.overlay-text2-0,
.overlay-text2-1,
.overlay-text2-2 {
  display: flex;
  position: relative;
  color: blue;
  font-size: 12px;
  left: 10px;
  bottom: 25px;
}

.calendar {
  height: 20px;
  width: 20px; 
  margin-right: 5px;
  margin-left: 10px;
}
</style>
