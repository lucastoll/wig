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
          name: 'Evento 1',
          category: 'Categoria 1',
          location: 'Local 1'
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento 1',
          category: 'Categoria 1',
          location: 'Local 1'
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento 1',
          category: 'Categoria 1',
          location: 'Local 1'
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento 1',
          category: 'Categoria 1',
          location: 'Local 1'
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento 1',
          category: 'Categoria 1',
          location: 'Local 1'
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento 1',
          category: 'Categoria 1',
          location: 'Local 1'
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento 1',
          category: 'Categoria 1',
          location: 'Local 1'
        },
        // Adicione mais eventos conforme necessário
      ],
      eventWidth: 'calc(100% - 40px)' // Inicialize com uma string vazia para permitir a largura padrão dos cartões
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
}

.events-wrapper {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-bottom: 20px; /* Adiciona um espaço para a barra de rolagem */
}

.event-card {
  flex: 0 0 auto;
  margin-left: 20px;
  width: 170px; /* Ajuste conforme necessário */
}

.event-card img {
  width: 100%;
  height: 200px;
}

.event-details {
  background-color: #2c3e50;
  color: #fff;
  padding: 10px;
}

.event-date {
  font-weight: bold;
  background-color: blue;
}

.event-info {
  margin-top: 10px;
}
</style>
