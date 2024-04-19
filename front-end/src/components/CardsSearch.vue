<template>
    <div class="event-list">
        <div class="event-list-container">
            <div class="events-wrapper">
                <div class="event-card" v-for="(event, index) in events" :key="index">
                    <img :src="event.imageMobile" alt="Event Image" />
                    <div class="event-details">
                        <div
                            class="event-date"
                            :style="{ backgroundColor: eventDateBackgroundColor(event.finalDate) }"
                        >
                            {{ formatDate(event.finalDate) }}
                        </div>
                        <div class="event-name">{{ event?.name }}</div>
                        <div class="event-categories">
                            <div
                                v-for="(category, catIndex) in event.Categories"
                                :key="catIndex"
                                class="event-category"
                                :style="{ borderColor: isUserCategory(category) ? 'green' : '#505050' }"
                                >
                                {{ category.name }}
                            </div>


                        </div>
                        <div class="event-location">{{ event?.Location?.address }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import { userStore } from "@/store";

interface Category {
    name: string;
}

interface Location {
    address: string;
}

interface Event {
    imageMobile: string;
    finalDate: string;
    name: string;
    Categories: Category[];
    Location: Location;
}

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
            user: userStore,
            events: [] as Event[],
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
        async fetchEvents() {
            try {
                const response = await axios.get(this.endpoint);
                this.events = response.data;
                console.log(this.user);
            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
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
            const isDesktop = window.innerWidth >= 1024;

            if (isDesktop) {
                return "white";
            } else if (
                eventDate.toDateString() === today.toDateString() ||
                eventDate.toDateString() === tomorrow.toDateString()
            ) {
                return "green";
            } else {
                return "#505050";
            }
        },
        isUserCategory(category) {
            const userCategories = this.user.Categories.map(cat => cat.name);
            return userCategories.includes(category.name);
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
    border: solid black 1px;
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

.event-card img {
    width: 100%;
    height: 120px;
    object-fit: cover;
    margin-bottom: -7px;
}

.event-details {
    color: white;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    position: relative;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.event-date {
    width: calc(100% + 20px);
    margin-top: -10px;
    margin-left: -10px;
    font-weight: bold;
    font-size: 12px;
    text-align: center;
    margin-top: 0%;
}

.event-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.event-category {
    font-size: 12px;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    border: solid black 1px;
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
@media screen and (min-width: 1024px) {
    .event-card {
        display: flex;
        flex-direction: row;
        align-self: center;
        background-color: white;
        margin-left: 40px;
        margin-right: 40px;
    }

    .event-details {
        color: black;
    }

    .event-card img {
        width: 150px;
        height: 100%;
    }

    .event-categories {
        order: 0;
        margin-top: 10px;
    }

    .event-category {
        color: black;
    }

    .event-name {
        order: 1;
    }

    .event-date {
        order: 2;
        margin-top: 10px;
        text-align: left;
        padding-left: 10px;
    }

    .event-location {
        order: 3;
    }
}
</style>
