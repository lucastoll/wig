<template>
  <div class="event-list">
    <div class="event-list-container">
      <h2 class="title">{{ title }}</h2>
      <div class="events-wrapper" ref="eventsWrapper">
        <div class="arrow-left-container" v-if="showLeftArrow" @click="scrollLeft">
          <div class="arrow-click-area">&#10094;</div>
        </div>
        <div @click="goToEvent(event)" class="event-card" v-for="(event, index) in events" :key="index">
          <img :src="event.imageMobile" alt="Event Image" />
          <div class="event-details">
            <div class="event-date" :style="{ backgroundColor: eventDateBackgroundColor(event.finalDate.toString()) }">
              {{ formatDate(event.finalDate.toString()) }}
            </div>
            <div class="event-info">
              <div class="event-name">{{ event?.name }}</div>
              <div class="event-category">{{ event?.Categories ? event?.Categories[0].name : "" }}</div>
              <div class="event-location">{{ event?.Location?.address }}</div>
            </div>
          </div>
        </div>
        <div class="arrow-right-container" v-if="showRightArrow" @click="scrollRight">
          <div class="arrow-click-area">&#10095;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import type { IEvent } from "@/types/IEvent";
import goToEvent from "@/helpers/goToEvent";

const props = defineProps<{
  events: IEvent[];
  title: string;
}>();

const showLeftArrow = ref(false);
const showRightArrow = ref(false);

const checkScroll = () => {
  const wrapper = document.querySelector('.events-wrapper') as HTMLElement;
  const scrollWidth = wrapper.scrollWidth;
  const clientWidth = wrapper.clientWidth;
  const scrollLeft = wrapper.scrollLeft;
  const maxScroll = scrollWidth - clientWidth;
  const isMobile = window.innerWidth < 768;

  showLeftArrow.value = !isMobile && scrollLeft > 0;
  showRightArrow.value = !isMobile && (wrapper.children[wrapper.children.length - 2] as HTMLElement)?.offsetLeft + (wrapper.children[wrapper.children.length - 2] as HTMLElement)?.clientWidth > clientWidth && scrollLeft < maxScroll;
};

const scrollLeft = () => {
  const wrapper = document.querySelector('.events-wrapper') as HTMLElement;
  wrapper.scrollBy({ left: -150, behavior: 'smooth' });
  checkScroll();
};

const scrollRight = () => {
  const wrapper = document.querySelector('.events-wrapper') as HTMLElement;
  wrapper.scrollBy({ left: 150, behavior: 'smooth' });
  checkScroll();
};

const formatDate = (dateString: string) => {
  const eventDate = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (eventDate.toDateString() === today.toDateString()) {
    return 'Hoje';
  } else if (eventDate.toDateString() === tomorrow.toDateString()) {
    return 'Amanhã';
  } else {
    return eventDate.toLocaleDateString('pt-BR');
  }
};

const eventDateBackgroundColor = (dateString: string) => {
  const eventDate = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (eventDate.toDateString() === today.toDateString() || eventDate.toDateString() === tomorrow.toDateString()) {
    return 'green';
  } else {
    return '#505050';
  }
};

onMounted(() => {
  window.addEventListener('resize', checkScroll);
  checkScroll();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScroll);
});
</script>

<style scoped>
.event-list {
  position: relative;
  margin-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
}

.event-list-container {
  width: 100%;
  max-width: 1280px;
}

.title {
  text-align: left;
  font-size: 20px;
  padding-left: 16px;
  margin-right: 5px;
  color: black;
  margin-bottom: 10px;
  font-weight: bold;
}

.events-wrapper {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-right: 20px;
}

.event-card {
  flex: 0 0 auto;
  margin-left: 16px;
  width: 140px;
  height: auto;
  border-radius: 10px;
  overflow: hidden;
  border: solid black 1px;
  background-color: #1597b1;
}

.event-name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 700;
  line-height: 20px;
}

.event-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  margin-bottom: -7px;
}

.event-details {
  color: white;
  border-radius: 10px;
  height: auto;
}

.event-date {
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  margin-top: 0%;
}

.event-info {
  margin: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.event-location,
.event-category {
  font-size: 12px;
}

.event-location {
  margin-top: 5px;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.arrow-left-container,
.arrow-right-container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
  display: none;
}

.arrow-click-area {
  width: 30px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 40px;
  color: black;
}

.arrow-left-container {
  left: 0;
}

.arrow-right-container {
  right: 0;
}
</style>
