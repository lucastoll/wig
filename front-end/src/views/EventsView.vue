<template>
  <div class="swiper-container">
 
    <div class="swiper-wrapper">
      <div v-for="(item, index) in items" :key="index" class="swiper-slide">
        <img :src="item.image" :alt="item.alt" />
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
  },
  {
    image:
      "https://imgs.search.brave.com/BwxKWXghgg7KWw7aGSFSJbaJ9KMishuCNF--fx-lfiU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzEzLzcz/LzU3LzEzNzM1NzY1/NDM4OGRhYWRmZGY2/OGNmMzU3NDFhYzRh/LmpwZw",
    alt: "Alt text 1",
  },
  {
    image:
      "https://imgs.search.brave.com/BwxKWXghgg7KWw7aGSFSJbaJ9KMishuCNF--fx-lfiU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzEzLzcz/LzU3LzEzNzM1NzY1/NDM4OGRhYWRmZGY2/OGNmMzU3NDFhYzRh/LmpwZw",
    alt: "Alt text 1",
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
  text-align: center;
}

.swiper-slide img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: 0 auto;
}
</style>
