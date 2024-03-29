<script setup lang="ts">
import { onUnmounted } from "vue";
import { onMounted } from "vue";

const props = defineProps<{
  closePopup: () => void;
}>();

const handleClickOutside = (event: MouseEvent) => {
  if ((event.target as HTMLElement)?.id !== "popUpCity") {
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
    <div id="popUpCity" class="popup-content">
      <span style="color: red">oi</span>
    </div>
  </div>
</template>
<style scoped>
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