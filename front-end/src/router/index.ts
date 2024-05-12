import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/events",
      name: "events",
      component: () => import("@/views/EventsView.vue"),
    },
    {
      path: "/event/:id",
      name: "event",
      component: () => import("@/views/EventView.vue"),
    },
    {
      path: "/locations",
      name: "locations",
      component: () => import("@/views/LocationsView.vue"),
    },
    {
      path: "/registrationEvent",
      name: "registrationEvent",
      component: () => import("@/views/RegistrationEventPage.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
    {
      path: "/eventsStatus",
      name: "eventsStatus",
      component: () => import("@/views/EventsStatusView.vue"),
    }
  ],
});

export default router;
