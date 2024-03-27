<template>
  <div id="app">
    <div v-if="events.length > 0" class="main-event">
      <img :src="events[0].image" :alt="'Event Image ' + events[0].name" class="main-image">
      <div class="details">
        <img src="@/assets/Calendario.png" alt="Calendar Icon">
        <div class="event-date">
          <span>{{ events[0].date }}</span>
        </div>
        <p>{{ events[0].name }}</p>
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
          image: 'https://imgs.search.brave.com/klD5KUtMfSVTPp5Hx6uPQ8QGMWOFMXUirFuXRryvtjA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMyLmFscGhhY29k/ZXJzLmNvbS83MDkv/NzA5OTc2LnBuZw',
          date: '27/03/2024',
          name: 'Event 1'
        },
        { 
          image: 'https://imgs.search.brave.com/klD5KUtMfSVTPp5Hx6uPQ8QGMWOFMXUirFuXRryvtjA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMyLmFscGhhY29k/ZXJzLmNvbS83MDkv/NzA5OTc2LnBuZw',
          date: '28/03/2024',
          name: 'Event 2'
        },
        { 
          image: 'https://imgs.search.brave.com/klD5KUtMfSVTPp5Hx6uPQ8QGMWOFMXUirFuXRryvtjA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMyLmFscGhhY29k/ZXJzLmNvbS83MDkv/NzA5OTc2LnBuZw',
          date: '29/03/2024',
          name: 'Event 3'
        }
      ]
    }
  }
}
</script>

<style scoped>
.main-event {
  position: relative;
}

.main-image {
  width: 100%;
  height: 300px;
}

.details {
  position: absolute;
  bottom: 20px;
  left: 20px;
  padding: 10px;
}

.details img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.event {
  margin-top: 20px;
}

.event-date{
  display: inline;
  margin-top: -30px;
}

.event img {
  width: 100%;
  display: block;
}
</style>
