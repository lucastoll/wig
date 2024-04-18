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
      path: "/locations",
      name: "locations",
      component: () => import("@/views/LocationsView.vue"),
    },
  ],
});

export default router;
