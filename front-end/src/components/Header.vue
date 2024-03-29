
<script setup lang="ts">
import PopupCity from "@/components/PopupCity.vue";
import { ref } from "vue";
const showPopup = ref(false);

const closePopup = () => {
  showPopup.value = false;
};

const openPopup = (event: MouseEvent) => {
  event.stopPropagation();
  showPopup.value = true;
};
</script>
<template>
  <div class="header">
    <img
      alt="Logo site"
      class="logo"
      src="@/assets/WIG.svg"
      width="30"
      height="30"
    />
    <div class="logomeio">
      <img
        alt="Logo site"
        class="logo"
        src="@/assets/Locais.svg"
        width="20"
        height="20"
      />
      <button class="cidade" @click="openPopup">Sorocaba</button>
      <<<<<<< HEAD
      <div v-if="showPopup" class="popup">
        <div class="popup-content">
          <span style="color: red">oi</span>
        </div>
      </div>
      =======
      <PopupCity v-if="showPopup" :closePopup="closePopup" />
      >>>>>>> 59fdeca (feat: adicionado popcity e evento click)
    </div>
    <img
      alt="Logo site"
      class="logo"
      src="@/assets/Direita.svg"
      width="20"
      height="20"
    />
  </div>
</template>

<style>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #1597b1;
  position: fixed;
  top: 1;
  width: 100%;
  height: 49px;
  padding-left: 16px;
  padding-right: 16px;
}
.logomeio {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: white;
  position: relative;
}
.popup {
  position: absolute;
  bottom: -144px;
}
.popup-content {
  width: 233px;
  height: 123px;
  background: #fff;
  padding: 20px;
}
</style>
