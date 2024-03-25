<template>
  <div class="recommended-events">
    <h2>Eventos Recomendados</h2>
    <div class="events-wrapper" ref="eventsWrapper">
      <div class="event-card" v-for="(event, index) in events" :key="index" :style="{ width: eventWidth }">
        <img :src="event.image" alt="Event Image">
        <div class="event-details">
          <div class="event-date">{{ event.date }}</div>
          <div class="event-info">
            <div class="event-name">{{ event.name }}</div>
            <div class="event-category">{{ event.category }}</div>
            <div class="event-location">{{ event.location }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      events: [
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento: ',
          category: 'Categorias: ',
          location: 'Localização '
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento: ',
          category: 'Categorias: ',
          location: 'Localização '
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento: ',
          category: 'Categorias: ',
          location: 'Localização '
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento: ',
          category: 'Categoria: ',
          location: 'Localização '
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento: ',
          category: 'Categoria: ',
          location: 'Localização '
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento: ',
          category: 'Categoria: ',
          location: 'Localização '
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento: ',
          category: 'Categoria:',
          location: 'Localização'
        }
      ],
      eventWidth: 'calc(100% - 40px)'
    };
  },
  mounted() {
    this.checkScroll();
  },
  methods: {
    checkScroll() {
      const wrapper = this.$refs.eventsWrapper;
      const scrollWidth = wrapper.scrollWidth;
      const clientWidth = wrapper.clientWidth;
      if (scrollWidth > clientWidth) {
        wrapper.style.overflowX = 'scroll';
        this.eventWidth = ''; // Reinicie a largura dos cartões para que ela seja definida pelo CSS
      }
      else {
        this.eventWidth = 'calc((100% / 7) - 20px)'; // Define a largura dos cartões quando não há rolagem
      }
    }
  }
};
</script>

<style scoped>
.recommended-events {
  text-align: left;
  margin-left: 10px
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
  width: 170px;
  border-radius: 10px;
}

.event-card img {
  width: 100%;
  height: auto;
}

.event-details {
  background-color: #868585;
  color: black;
}

.event-date {
  font-weight: bold;
  background-color: #505050;
  text-align: center;
}

.event-info {
  margin-left: 10px;
  margin-bottom: 20px;
}
</style>