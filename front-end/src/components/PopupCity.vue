<script setup lang="ts">
import { onUnmounted, onMounted } from "vue";
import { cityStore } from "@/store";
import type { ICity } from "@/types/ICity";

const props = defineProps<{
  closePopup: () => void;
  cities: ICity[];
}>();

const handleClickOutside = (event: MouseEvent) => {
  if ((event.target as HTMLElement)?.id !== "popUpCity") {
    props.closePopup();
  }
};

onMounted(async () => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

function changeCity() {
  if (props.cities) {
    const selectedCity = props.cities.find((city) => city.id === cityStore.id);
    if (selectedCity) {
      cityStore.id = selectedCity.id;
      cityStore.name = selectedCity.name;
      document.title = `Where i Go | ${selectedCity.name}`;
    }

    localStorage.setItem("city", JSON.stringify(selectedCity));
  }
}
</script>
<template>
  <div class="popup">
    <div id="popUpCity" class="popup-content">
      <span class="changecity">Trocar cidade</span>
      <select class="cities" v-model="cityStore.id" @change="changeCity">
        <option v-for="city in cities" :key="city.id" :value="city.id">
          {{ city.name }}
        </option>
      </select>
    </div>
  </div>
</template>
<style scoped>
.popup {
  position: absolute;
  bottom: -120px;
  background: #1597b1;
  border-radius: 5px;
}
.popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  width: 233px;
  height: 100px;
  gap: 5px;
  padding-top: 10px;
}

.popup-content::after {
  content: "";
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #1597b1;
}
.popup-content.right::after {
  left: auto;
  right: 10px;
  transform: none;
}

.cities {
  width: 201px;
  height: 41px;
  border-radius: 10px;
}
@media screen and (min-width: 1024px) {
  .popup {
    bottom: -130px;
    right: 0;
  }

  .popup-content::after {
    right: 10px;
    left: auto;
    transform: none;
  }
}
</style>
@/types/iCity
