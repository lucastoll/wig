<template>
  <div class="recommended-events">
    <h2 class="title">{{ title }}</h2>
    <div class="events-wrapper" ref="eventsWrapper">
      <div
        class="arrow-left-container"
        v-if="showLeftArrow"
        @click="scrollLeft"
      >
        <div class="arrow-click-area">&#10094;</div>
      </div>
      <div class="event-card" v-for="(event, index) in events" :key="index">
        <img :src="event.imageMobile" alt="Event Image" />
        <div class="event-details">
          <div
            class="event-date"
            :style="{
              backgroundColor: eventDateBackgroundColor(event.finalDate),
            }"
          >
            {{ formatDate(event.finalDate) }}
          </div>
          <div class="event-info">
            <div class="event-name">{{ event?.name }}</div>
            <div class="event-category">{{ event?.Categories[0]?.name }}</div>
            <div class="event-location">{{ event?.Location?.address }}</div>
          </div>
        </div>
      </div>
      <div
        class="arrow-right-container"
        v-if="showRightArrow"
        @click="scrollRight"
      >
        <div class="arrow-click-area">&#10095;</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    endpoint: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      events: [],
      showLeftArrow: false,
      showRightArrow: false,
    };
  },
  mounted() {
    this.checkScroll();
    this.fetchEvents();
    window.addEventListener("resize", this.checkScroll);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScroll);
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await axios.get(this.endpoint);
        this.events = response.data;
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    },
    checkScroll() {
      const wrapper = this.$refs.eventsWrapper;
      const scrollWidth = wrapper.scrollWidth;
      const clientWidth = wrapper.clientWidth;
      const scrollLeft = wrapper.scrollLeft;
      const maxScroll = scrollWidth - clientWidth;
      const isMobile = window.innerWidth < 768;

      this.showLeftArrow = !isMobile && scrollLeft > 0;
      this.showRightArrow =
        !isMobile &&
        wrapper.children[wrapper.children.length - 2]?.offsetLeft +
          wrapper.children[wrapper.children.length - 2]?.clientWidth >
          clientWidth &&
        scrollLeft < maxScroll;
    },
    scrollLeft() {
      const wrapper = this.$refs.eventsWrapper;
      wrapper.scrollBy({ left: -150, behavior: "smooth" });
      this.checkScroll();
    },
    scrollRight() {
      const wrapper = this.$refs.eventsWrapper;
      wrapper.scrollBy({ left: 150, behavior: "smooth" });
      this.checkScroll();
    },
    formatDate(dateString) {
      const eventDate = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (eventDate.toDateString() === today.toDateString()) {
        return "Hoje";
      } else if (eventDate.toDateString() === tomorrow.toDateString()) {
        return "Amanhã";
      } else {
        return eventDate.toLocaleDateString("pt-BR");
      }
    },
    eventDateBackgroundColor(dateString) {
      const eventDate = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (
        eventDate.toDateString() === today.toDateString() ||
        eventDate.toDateString() === tomorrow.toDateString()
      ) {
        return "green";
      } else {
        return "#505050";
      }
    },
  },
};
</script>

<style scoped>
.recommended-events {
  position: relative;
  margin-top: 40px;
  padding-bottom: 20px;
}

.title {
  text-align: left;
  font-size: 20px;
  margin-left: 5px;
  padding-left: 16px;
  margin-right: 5px;
  color: black;
  margin-bottom: 10px;
}

.events-wrapper {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.event-card {
  flex: 0 0 auto;
  margin-left: 20px;
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
