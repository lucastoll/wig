<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <div class ="navbar">
      <nav>
        <RouterLink class="routerlogo" to="/">
        <img
        alt="Home logo"
        class="logo"
        src="@/assets/Home.png"
        width="24"
        height="24"
    />
    <tittle>home</tittle>
  </RouterLink>
        <RouterLink class="routerlogo" to="/about">About</RouterLink>
      </nav>
    </div>
</template>
<style>
.navbar{
  display:flex;
  flex-direction: row;
  align-items: center;
  background-color: #1597B1;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 52px;
}
nav{
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  color:white;
  text-decoration: none;
}
.routerlogo{
  display:flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
  color:white;
  text-decoration: none;
}
</style>