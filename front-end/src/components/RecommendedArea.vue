<template>
  <div class="recommended-events">
    <h2 class="title">Eventos Recomendados</h2>
    <div class="events-wrapper" ref="eventsWrapper">
      <div
        class="arrow-left-container"
        v-if="showLeftArrow"
        @click="scrollLeft"
      >
        <div class="arrow-click-area">&#10094;</div>
      </div>
      <div
        class="event-card"
        v-for="(event, index) in events"
        :key="index"
        :style="{ width: eventWidth }"
      >
        <img :src="event.imageMobile" alt="Event Image" />
        <div class="event-details">
          <div
            class="event-date"
            :style="{ backgroundColor: eventDateBackgroundColor(event.finalDate) }"
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
import IconCommunity from "./icons/IconCommunity.vue";

export default {
  data() {
    return {
      events: [],
      eventWidth: "calc(100% - 40px)",
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
        const response = await axios.get(
          "http://localhost:3000/events?cityId=1"
        );
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
      const lastCard = wrapper.children[wrapper.children.length - 2];

      const isMobile = window.innerWidth < 768;

      this.showLeftArrow = !isMobile && scrollLeft > 0;
      this.showRightArrow =
        !isMobile &&
        lastCard?.offsetLeft + lastCard?.clientWidth > clientWidth &&
        scrollLeft < maxScroll;

      if (scrollWidth > clientWidth) {
        wrapper.style.overflowX = "scroll";
        this.eventWidth = "";
      } else {
        this.eventWidth = "calc((100% / 7) - 20px)";
      }
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
        return eventDate.toLocaleDateString('pt-BR'); // Altere o local conforme necessário
      }
    },
    eventDateBackgroundColor(dateString) {
      const eventDate = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (eventDate.toDateString() === today.toDateString() || eventDate.toDateString() === tomorrow.toDateString()) {
        return "green"; // Define o fundo como verde se for hoje ou amanhã
      } else {
        return "#505050"; // Mantém a cor de fundo padrão
      }
    }
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
  margin-right: 5px;
  color: black;
}

.events-wrapper {
  display: flex;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.event-card {
  flex: 0 0 auto;
  margin-left: 20px;
  width: 140px;
  height: auto;
  border-radius: 10px;
  overflow: hidden; /* Garante que qualquer conteúdo que ultrapasse a borda do card seja cortado */
  border: solid black 1px;
  background-color: #1597b1;
}

.event-card img {
  width: 100%;
  height: auto;
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
  margin-left: 10px;
  margin-bottom: 10px;
}

.event-location,
.event-category {
  font-size: 12px;
}

.event-location {
  margin-top: 5px;
  margin-bottom: 5px;
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
  width: 30px; /* Largura desejada para a área de clique */
  height: 350px; /* Altura igual à altura do card */
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
