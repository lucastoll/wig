<template>
  <div id="app">
    <div @click="goToEvent(events[0])" v-if="events.length > 0" class="main-event">
      <img :src="imageSrc" :alt="'Event Image ' + events[0].name" class="main-image" />
      <div class="details">
        <img src="@/assets/Calendar.svg" alt="Calendar Icon" />
        <div class="event-date">
          <span>{{ formatDate(events[0].initialDate.toString()) }}</span>
        </div>
        <p class="event-title">{{ events[0].name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import type { IEvent } from "@/types/IEvent";
import goToEvent from "@/helpers/goToEvent";

const props = defineProps<{
  events: IEvent[];
}>();

const windowWidth = ref(window.innerWidth);

const imageSrc = computed(() => {
  return windowWidth.value < 768 ? props.events[0]?.imageMobile : props.events[0]?.imageDesktop;
});

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

const formatDate = (dateString: string) => {
  const eventDate = new Date(dateString);
  return eventDate.toLocaleDateString("pt-BR");
};
</script>


<style scoped>
.main-event {
  position: relative;
  max-width: 100%;
}

.main-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  z-index: 1;
  max-height: 532px;
}

.details {
  position: absolute;
  width: 100%;
  bottom: 6px;
  padding: 0 16px;
  color: white;
  z-index: 2;
  max-width: 1280px;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.details img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.event-date {
  display: inline;
  margin-top: -30px;
}

.event img {
  width: 100%;
  display: block;
}

.main-event::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 5px -71px 100px 0px #000000 inset;

  z-index: 0;
}

.event-title {
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .details {
    left: 50%;
    transform: translateX(-50%);
    padding-left: 20px;
  }
}
</style>
@/types/IEvent
