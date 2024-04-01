<script setup lang="ts">
import PopupCity from "@/components/PopupCity.vue";
import PopupLogin from "@/components/PopupLogin.vue";
import { RouterLink } from "vue-router";
import { ref } from "vue";
import {selectCity} from '../store';
const showPopupCity = ref(false);
const showPopupLogin = ref(false);

const closePopupLogin = () => {
  showPopupLogin.value = false;
};

const openPopupLogin = (event: MouseEvent) => {
  event.stopPropagation();
  showPopupLogin.value = true;
  showPopupCity.value = false;
};

const closePopupCity = () => {
  showPopupCity.value = false;
};

const openPopupCity = (event: MouseEvent) => {
  event.stopPropagation();
  showPopupCity.value = true;
  showPopupLogin.value = false;
};
</script>

<template>
  <div class="header">
    <div class="header__wrapper">
      <div class="header__logoLinks">
        <RouterLink class="header__logoLinks__logo" to="/">
          <img alt="Logo site" src="@/assets/WIG.svg" width="30" height="30" />
        </RouterLink>
        <RouterLink class="header__logoLinks__link" to="/events"
          >Eventos</RouterLink
        >
        <RouterLink class="header__logoLinks__link" to="/locations"
          >Locais</RouterLink
        >
        <div></div>
      </div>
      <div class="header__menu" @click="openPopupCity">
        <img
          alt="Logo site"
          class="header__menu-icon"
          src="@/assets/Locais.svg"
          width="20"
          height="20"
        />
        <span class="header__menu-city">{{ selectCity }}</span>
        <PopupCity v-if="showPopupCity" :closePopup="closePopupCity" />
      </div>
      <div class="header__menu" @click="openPopupLogin">
        <img
          alt="Usuário"
          class="header__menu-icon"
          src="@/assets/Direita.svg"
          width="40"
          height="40"
        />
        <PopupLogin v-if="showPopupLogin" :closePopup="closePopupLogin" />
      </div>
    </div>
  </div>
</template>

<style>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1597b1;
  top: 0px;
  width: 100%;
  height: 49px;
  position: fixed;
}

.header__wrapper {
  max-width: 1280px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
}

.header__logoLinks {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.header__logoLinks__link {
  display: none;
}

.header__logoLinks__logo {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header__logoLinks__logo img {
  width: 40px;
}

.header__menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: white;
  position: relative;
}

.header__menu-icon {
  width: 24px;
  height: 24px;
}

.header__menu-icon--relative {
  position: relative;
}

.header__menu-popup {
  position: absolute;
  bottom: -144px;
}

.header__menu-popup-content {
  width: 233px;
  height: 123px;
  background: #fff;
  padding: 20px;
}

@media screen and (min-width: 1024px) {
  .header {
    height: 80px;
  }

  .header__wrapper {
    gap: 8px;
    padding: 0 32px;
  }

  .header__logoLinks {
    width: 100%;
    justify-content: space-between;
  }

  .header__logoLinks a {
    font-size: 20px;
    color: white;
    text-decoration: none;
  }

  .header__logoLinks__logo img {
    width: 60px;
    height: 60px;
  }

  .header__logoLinks__logo {
    width: 60px;
    height: 60px;
  }

  .header__logoLinks__link {
    display: flex;
  }

  .header__logoLinks__logo .header__menu-city {
    display: none;
  }

  .header__menu-icon {
    width: 40px;
    height: 40px;
  }

  .header__menu-city {
    display: none;
  }
}
</style>
