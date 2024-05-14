<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useNotification } from "@kyvg/vue3-notification";
import { useRoute, useRouter } from "vue-router";

defineProps({
  isOpenApproval: {
    type: Boolean,
    required: true,
  },
});

const reason = ref<string>("");
const emit = defineEmits(["close"]);
const { notify } = useNotification();
const route = useRoute();
const router = useRouter();

const submit = async () => {
  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/event/acceptEvent/${route.params.id}`,
      {
        approvalFeedback: reason.value,
      }
    );
    notify({
      title: "Evento aprovado com sucesso",
      type: "success",
    });
    emit("close");
    router.push({ name: "home" });
  } catch (error) {
    console.log(error);
    notify({
      title: "Ocorreu um erro ao aprovar o evento",
      type: "error",
    });
  }
};
</script>
<template>
  <div v-if="isOpenApproval" class="overlay" @click="emit('close')">
    <div class="popup" @click.stop>
      <div class="container">
        <h2 class="titulo">Pontos de sustentabilidade</h2>
        <span class="texto"
          >Cada resposta convincente deve contar 1 ponto, caso tenha dúvidas
          entre em contato com o usuário pelo e-mail</span
        >
        <input v-model="reason" type="number" class="input" placeholder="Pontos em número" />
        <button @click="submit" class="aprovar">Aprovar</button>
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
.aprovar {
  background-color: #38a149;
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
