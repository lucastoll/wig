<script setup lang="ts">
import { onUnmounted, ref, onMounted } from "vue";
import axios from 'axios';

interface City{
  name:string
}

const props = defineProps<{
  closePopup: () => void;
}>();




const handleClickOutside = (event: MouseEvent) => {
  if ((event.target as HTMLElement)?.id !== "popUpCity") {
    props.closePopup();
  }
};

const cities = ref<City[]>()
const loading = ref<boolean>(true)

onMounted(async() => {
  try{
    const response = await axios.get('http://localhost:3000/cities');
    loading.value = false
    cities.value=response.data;
  }
  catch(error){
    console.log("erro")
  }
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<template>
  <div class="popup">
    <div id="popUpCity" class="popup-content">
      <span class="changecity">Trocar cidade</span>
      <select class="cities">
        <option v-for="city in cities">{{ city.name }}</option>

      </select>
    </div>
  </div>
</template>
<style scoped>
.popup {
  position: absolute;
  bottom: -143px;
  background: #1597b1;
}
.popup-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  width: 233px;
  height: 123px;
  gap:5px;
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

.cities{
width: 201px;
height: 41px;
border-radius: 10px;
}
@media screen and (min-width: 1024px) {
  .popup {
    bottom: -150px;
    right: 0;
  }

  .popup-content::after {
    right: 10px;
    left: auto;
    transform: none;
  }
}
</style>
