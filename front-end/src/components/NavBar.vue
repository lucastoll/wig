<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="navbar">
    <nav>
      <RouterLink class="routerlogo" to="/">
        <img
          alt="Home logo"
          class="logo"
          src="@/assets/Home.svg"
          width="22"
          height="22"
        />
        <span>Home</span>
      </RouterLink>
      <RouterLink class="routerlogo" to="/events">
        <img
          alt="Evento logo"
          class="logo"
          src="@/assets/Calendar.svg"
          width="18"
          height="18"
        />
        <span>Eventos</span>
      </RouterLink>
      <RouterLink class="routerlogo" to="/locations">
        <img
          alt="Locais logo"
          class="logo"
          src="@/assets/Locais.svg"
          width="20"
          height="20"
        />
        <span>Locais</span>
      </RouterLink>
    </nav>
  </div>
</template>
<style>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #1597b1;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 49px;
  z-index: 2;
  border-top: 2px solid black;
}
nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  color: white;
  text-decoration: none;
}
.routerlogo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  padding-top: 5px;
}

@media (min-width: 1024px) {
  .navbar {
    display: none;
  }
}
</style>
