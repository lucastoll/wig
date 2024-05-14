<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useNotification } from "@kyvg/vue3-notification";
import { useRoute } from "vue-router";
import router from "@/router";

defineProps({
  isOpenDecline: {
    type: Boolean,
    required: true,
  },
});

const reason = ref<string>("");
const emit = defineEmits(["close"]);
const { notify } = useNotification();
const route = useRoute();

const submit = async () => {
  if (reason.value.length === 0) {
    notify({
      title: "Por favor, insira um motivo para a recusa",
      type: "error",
    });
    return;
  } else {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/event/rejectEvent/${route.params.id}`,
        {
          approvalFeedback: reason.value,
        }
      );
      notify({
        title: "Evento cancelado com sucesso",
        type: "success",
      });
      emit("close");
      router.push({ name: "home" });
    } catch (error) {
      console.log(error);
      notify({
        title: "Ocorreu um erro ao cancelar o evento",
        type: "error",
      });
    }
  }
};
</script>
<template>
  <div v-if="isOpenDecline" class="overlay" @click="emit('close')">
    <div class="popup" @click.stop>
      <div class="container">
        <h2 class="titulo">Motivo da recusa</h2>
        <span class="texto">Explique por que o evento foi recusado</span>
        <input
          v-model="reason"
          type="text"
          class="input"
          placeholder="Motivo"
        />
        <button class="reprovar" @click="submit">Reprovar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}
.reprovar {
  background-color: #8c0000;
  border-radius: 20px;
  width: 100%;
  height: 36px;
  color: white;
  border: 2px solid black;
}

.input {
  height: 38px;
  border: 1px solid black;
  border-radius: 8px;
  width: 100%;
  padding-left: 10px;
}
.popup {
  width: 80%;
  max-width: 320px;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.titulo {
  color: black;
  font-weight: 700;
}
.texto {
  color: black;
  font-size: small;
}
</style>
@/types/ICategory
