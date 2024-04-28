<script setup lang="ts">
import { computed, onUnmounted } from "vue";
import { onMounted } from "vue";
import LoginGoogle from "@/components/LoginGoogle.vue";
import { useRouter } from "vue-router";
import { userStore } from "@/store";

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

const buttonText = computed(() => {
  return userStore.administrator ? "Eventos para análise" : "Meus eventos";
});

const userName = computed(() => {
  return userStore.name && userStore?.name.length > 0
    ? userStore.name.split(" ")[0]
    : "Visitante";
});

const router = useRouter();
</script>
<template>
  <div class="popup" :class="{ 'withButton': userStore.loggedIn }">
    <div id="popUpLogin" class="popup-content">
      <span>Olá, {{ userName }}</span>
      <button
        v-if="userStore.loggedIn"
        class="user_name"
        @click="router.push('/eventsStatus')"
      >
        {{ buttonText }}
      </button>
      <LoginGoogle />
    </div>
  </div>
</template>
<style scoped>
.user_name {
  display: block;
  text-align: center;
  width: 100%;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
  background: white;
  color: black;
  width: 100%;
  border-radius: 8px;
  border: 1px solid black;
  padding: 10px 0;
  outline: none;
  margin-top: 8px;
}
.popup {
  position: absolute;
  bottom: -130px;
  right: -9px;
  background: #1597b1;
  border-radius: 5px;
  z-index: 1;
}

.popup.withButton {
  bottom: -165px;
}
.popup-content {
  width: fit-content;
  min-width: 233px;
  height: fit-content;
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
    bottom: -140px;
    right: 0;
  }

  .popup.withButton{
    bottom: -173px;
  }
}
</style>
