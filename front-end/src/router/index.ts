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
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

export default router;
