<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";
import { userStore } from "@/store";


defineProps({
  isOpenDecline: {
    type: Boolean,
    required: true,
  },
});



const cep = ref("");
const cepError = ref(false);
const hasSubmitError = ref(false);
const selectedCategories = ref<number[]>([]);
const sustentabilityPoints = ref<number>(0);


const submit = async () => {
  if (
    cep.value.length !== 9 ||
    cepError.value ||
    selectedCategories.value.length === 0
  ) {
    hasSubmitError.value = true;
    return;
  } else {
    try {
      hasSubmitError.value = false;
      const addressResponse = await axios.get(
        `https://viacep.com.br/ws/${cep.value.replace("-", "")}/json/`
      );
      const address =
        addressResponse.data.logradouro +
        ", " +
        addressResponse.data.bairro +
        ", " +
        addressResponse.data.localidade +
        ", " +
        addressResponse.data.uf;

      const postResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/user`,
        {
          name: userStore.name,
          email: userStore.email,
          zipcode: cep.value.replace("-", ""),
          address,
          categoryIds: selectedCategories.value,
          googleToken: localStorage.getItem("credential"),
        }
      );

      userStore.registerDone = true;
      userStore.id = postResponse.data.id;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
<template>
  <div v-if="isOpenDecline" class="overlay" @click.stop>
    <div class="popup">
        <div class="container">
            <h2 class="titulo">Motivo da recusa</h2>
            <span class="texto">Explique por que o evento foi recusado</span>
            <input type="text" class="input" placeholder="Motivo">
            <button class="reprovar"> Reprovar </button>
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
.reprovar{
  background-color: #8C0000;
  border-radius: 20px;
  width: 100%;
  height: 36px;
  color:white;
  border: 2px solid black;
}

.input{
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

.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:10px;

}
.titulo{
color:black;
font-weight: 700;
}
.texto{
    color: black;
    font-size: small;
}
</style>
@/types/ICategory