<template>
  <div id="app">
    <div v-if="events.length > 0" class="main-event">
      <img :src="events[0].imageDesktop" :alt="'Event Image ' + events[0].name" class="main-image">
      <div class="details">
        <img src="@/assets/Calendario.png" alt="Calendar Icon">
        <div class="event-date">
          <span>{{ formatDate(events[0].finalDate) }}</span>
        </div>
        <p>{{ events[0].name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      events: []
    }
  },
  mounted() {
    this.fetchEvents();
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
    formatDate(dateString) {
      const eventDate = new Date(dateString);
      return eventDate.toLocaleDateString('pt-BR'); 
    }
  }
}
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
}

.details {
  position: absolute;
  width: 100%;
  bottom: 6px;
  padding: 10px;
  color: white;
  z-index: 2;
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
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 7px -50px 60px 0px #000000 inset;

  z-index: 0;
}
</style>
