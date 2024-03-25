<template>
  <div class="recommended-events">
    <h2 class="title">Eventos Recomendados</h2>
    <div class="events-wrapper" ref="eventsWrapper">
      <div class="arrow-left-container" v-if="showLeftArrow" @click="scrollLeft">
        <div class="arrow-click-area">&#10094;</div>
      </div>
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
      <div class="arrow-right-container" v-if="showRightArrow" @click="scrollRight">
        <div class="arrow-click-area">&#10095;</div>
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
          location: 'Localização 1'
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '25 de Março',
          name: 'Evento 2',
          category: 'Categoria 2',
          location: 'Localização 2'
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento 1',
          category: 'Categoria 1',
          location: 'Localização 1'
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '25 de Março',
          name: 'Evento 2',
          category: 'Categoria 2',
          location: 'Localização 2'
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento 1',
          category: 'Categoria 1',
          location: 'Localização 1'
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '25 de Março',
          name: 'Evento 2',
          category: 'Categoria 2',
          location: 'Localização 2'
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento 1',
          category: 'Categoria 1',
          location: 'Localização 1'
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '25 de Março',
          name: 'Evento 2',
          category: 'Categoria 2',
          location: 'Localização 2'
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '24 de Março',
          name: 'Evento 1',
          category: 'Categoria 1',
          location: 'Localização 1'
        },
        {
          image: 'https://i.pinimg.com/564x/35/04/b8/3504b8d1f12c20a6885459e6585b671f.jpg',
          date: '25 de Março',
          name: 'Evento 2',
          category: 'Categoria 2',
          location: 'Localização 2'
        },
        // Eventos aqui
      ],
      eventWidth: 'calc(100% - 40px)',
      showLeftArrow: false,
      showRightArrow: false
    };
  },
  mounted() {
    this.checkScroll();
    window.addEventListener('resize', this.checkScroll);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScroll);
  },
  methods: {
    checkScroll() {
      const wrapper = this.$refs.eventsWrapper;
      const scrollWidth = wrapper.scrollWidth;
      const clientWidth = wrapper.clientWidth;
      const scrollLeft = wrapper.scrollLeft;
      const maxScroll = scrollWidth - clientWidth;
      const lastCard = wrapper.children[wrapper.children.length - 2]; 

      const isMobile = window.innerWidth < 768;

      this.showLeftArrow = !isMobile && scrollLeft > 0;
      this.showRightArrow = !isMobile && lastCard.offsetLeft + lastCard.clientWidth > clientWidth && scrollLeft < maxScroll;

      if (scrollWidth > clientWidth) {
        wrapper.style.overflowX = 'scroll';
        this.eventWidth = '';
      } else {
        this.eventWidth = 'calc((100% / 7) - 20px)';
      }
    },
    scrollLeft() {
      const wrapper = this.$refs.eventsWrapper;
      wrapper.scrollBy({ left: -150, behavior: 'smooth' });
      this.checkScroll(); 
    },
    scrollRight() {
      const wrapper = this.$refs.eventsWrapper;
      wrapper.scrollBy({ left: 150, behavior: 'smooth' });
      this.checkScroll(); 
    }
  }
};
</script>

<style scoped>
.recommended-events {
  position: relative;
}

.title{
  text-align: left;
  margin-left: 5px;
  margin-right: 5px;
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
  width: 170px;
  border-radius: 10px;
  overflow: hidden; /* Garante que qualquer conteúdo que ultrapasse a borda do card seja cortado */
}

.event-card img {
  width: 100%;
  height: auto;
}


.event-details {
  background-color: #868585;
  color: black;
  border-radius: 10px;
}

.event-date {
  font-weight: bold;
  background-color: #505050;
  text-align: center;
  margin-top: 0%;
}

.event-info {
  margin-left: 10px;
  margin-bottom: 20px;
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
