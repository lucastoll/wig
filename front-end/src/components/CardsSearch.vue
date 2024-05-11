<template>
  <div class="event-list">
    <div class="event-list-container">
      <div v-if="events.length > 0" class="events-wrapper">
        <div
          class="event-card"
          v-for="(event, index) in events"
          @click="goToEvent(event)"
          :key="index"
        >
          <div class="event-image-wrapper">
            <img
              class="event-image"
              :src="event.imageMobile"
              alt="Event Image"
            />
            <div
              :class="{
                'event-status': true,
                active: showStatus,
                desktop: true,
              }"
              :style="{
                backgroundColor: statusBackgroundColor(event.status),
              }"
            >
              {{ event.status.charAt(0).toUpperCase() + event.status.slice(1) }}
            </div>
          </div>
          <div class="event-details">
            <div
              class="event-date"
              :style="{
                backgroundColor: eventDateBackgroundColor(event.initialDate),
              }"
            >
              <img
                class="event-calendar-icon"
                src="@/assets/Calendar.png"
                alt="Calendar Icon"
              />
              {{ formatDate(event.initialDate) }}
            </div>
            <div
              :class="{
                'event-status': true,
                active: showStatus,
              }"
              :style="{
                backgroundColor: statusBackgroundColor(event.status),
              }"
            >
              {{ event.status.charAt(0).toUpperCase() + event.status.slice(1) }}
            </div>
            <div class="event-name">{{ event?.name }}</div>
            <div class="event-categories">
              <div
                v-for="(category, catIndex) in event.Categories"
                :key="catIndex"
                :class="{
                  'event-category': true,
                  'user-category': isUserCategory(category),
                }"
              >
                {{ category.name }}
              </div>
            </div>
            <div class="event-location">
              <img src="@/assets/Location.png" alt="Calendar Icon" />
              {{ event?.Location?.address }}
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="loading === false" class="no-results">
        <img
          src="@/assets/NothingFound.png"
          alt="No results found"
          class="no-results-image"
        />
        <p class="no-results-text">
          Oops! Parece que nenhum evento foi encontrado.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { userStore } from "@/store";
import type IEvent from "@/types/IEvent";
import type ICategory from "@/types/ICategory";
import goToEvent from "@/helpers/goToEvent";

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
    authRoute: {
      type: Boolean,
      required: true,
    },
    showStatus: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      loading: false as boolean,
      user: userStore,
      events: [] as IEvent[],
    };
  },
  mounted() {
    this.fetchEvents();
  },
  watch: {
    endpoint: {
      handler: "fetchEvents",
      immediate: true,
    },
  },
  methods: {
    goToEvent,
    async fetchEvents() {
      try {
        this.loading = true;
        let response;

        if (!this.authRoute) {
          response = await axios.get(this.endpoint);
        } else {
          response = await axios.post(this.endpoint, {
            googleToken: userStore.googleToken,
            email: userStore.email,
          });
        }
        this.events = response.data;
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      } finally {
        this.loading = false;
      }
    },
    formatDate(dateString: string) {
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
    eventDateBackgroundColor(dateString: string) {
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
    isUserCategory(category: ICategory) {
      const userCategories = this.user.Categories.map((cat) => cat.name);
      return userCategories.includes(category.name);
    },
    statusBackgroundColor(status: string) {
      switch (status) {
        case "aprovado":
          return "#41C13E";
        case "reprovado":
          return "#C13E3E";
        case "em análise":
          return "#C19C3E";
        default:
          return "#505050";
      }
    },
  },
};
</script>

<style scoped>
.event-list {
  margin-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
}

.event-list-container {
  width: 100%;
  max-width: 1280px;
}

.events-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.event-card {
  margin: 16px;
  width: calc(100% - 80px);
  height: auto;
  border-radius: 10px;
  overflow: hidden;
  border: solid black 1.5px;
  background-color: #1597b1;
  display: flex;
  flex-direction: column;
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

.event-image {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: -7px;
}

.event-details {
  color: white;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.event-date {
  width: 100%;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  margin-top: 0%;
  display: flex;
  justify-content: center;
  position: relative;
  left: -10px;
}

.event-status {
  width: 100%;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  margin-top: 0%;
  display: flex;
  justify-content: center;
  position: relative;
  left: -10px;
  top: -6px;
  display: none;
  color: white;
}

.event-status.active {
  display: flex;
}

.event-status.desktop {
  display: none;
  bottom: 15px;
  position: absolute;
  top: auto;
  left: 0px;
  border-radius: 0 0 8px 8px;
}
.event-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.event-category {
  font-size: 12px;
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  border: solid black 1.5px;
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

.event-calendar-icon {
  display: none;
}

.user-category {
  border-color: #ffffff;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.no-results-image {
  width: 80%;
  height: auto;
}

.no-results-text {
  margin-top: 10px;
  text-align: center;
  font-family: Inter;
  font-size: 18px;
  padding-left: 5px;
  padding-right: 5px;
  color: black;
}

@media screen and (min-width: 500px) and (max-width: 1023px) {
  .event-image {
    height: auto;
    max-height: none;
  }
}

@media screen and (min-width: 1024px) {
  .event-status, .event-status.active{
    display: none;
  }

  .event-status.desktop.active {
    display: flex;
  }

  .event-location img {
    height: 25px;
  }

  .event-card {
    display: flex;
    flex-direction: row;
    align-self: center;
    background-color: white;
    margin-left: 40px;
    margin-right: 40px;
    border: none;
    margin: 6px;
  }

  .event-details {
    color: black;
    gap: 16px;
    margin: 0 32px;
  }

  .event-image-wrapper {
    border-radius: 8px;
    position: relative;
  }

  .event-image {
    min-width: 335px;
    width: 335px;
    height: auto;
    max-height: 280px;
    object-fit: cover;
    border-radius: 8px 8px 8px 8px;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 10px;
  }

  .event-categories {
    order: 0;
    margin-top: 10px;
  }

  .event-category {
    color: black;
    font-size: 16px;
  }

  .event-name {
    order: 1;
    font-size: 32px;
    font-weight: bold;
    line-height: normal;
  }

  .event-date {
    order: 2;
    width: 100%;
    margin-top: 10px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    background-color: transparent !important;
    left: 0px;
    gap: 8px;
    font-size: 18px;
    font-weight: normal;
  }

  .event-location {
    order: 3;
    gap: 8px;
    display: flex;
    font-size: 18px;
  }

  .event-calendar-icon {
    display: flex;
    width: 32px;
    height: 32px;
  }

  .user-category {
    border-color: #1597b1;
  }
}
</style>
