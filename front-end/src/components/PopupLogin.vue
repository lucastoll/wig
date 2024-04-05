<script setup lang="ts">
import { onUnmounted } from "vue";
import { onMounted } from "vue";
import LoginGoogle from "./LoginGoogle.vue";

const props = defineProps<{
  closePopup: () => void;
}>();

const handleClickOutside = (event: MouseEvent) => {
  if ((event.target as HTMLElement)?.id !== "popUpLogin") {
    props.closePopup();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<template>
  <div class="popup">
    <div id="popUpLogin" class="popup-content">
      <LoginGoogle />
    </div>
  </div>
</template>
<style scoped>
.popup {
  position: absolute;
  bottom: -120px;
  right: -9px;
  background: #1597b1;
  border-radius: 5px;
}
.popup-content {
  width: fit-content;
  min-width: 233px;
  height: 100px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.popup-content::after {
  content: "";
  position: absolute;
  left: auto;
  right: 10px;
  transform: none;
  width: 0;
  height: 0;
  top: -8px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #1597b1;
}
.popup-content.right::after {
  left: auto;
  right: 10px;
  transform: none;
}

@media screen and (min-width: 1024px) {
  .popup {
    bottom: -130px;
    right: 0;
  }
}
</style>
