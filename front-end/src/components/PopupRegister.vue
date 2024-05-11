<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useNotification } from "@kyvg/vue3-notification";
import axios from "axios";

import { userStore } from "@/store";
import { logout } from "@/helpers/logout";
import type ICategory from "@/types/ICategory";

const { notify } = useNotification();

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

onMounted(async () => {
  try {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/categories`)
      .then((response) => {
        categories.value = response.data;
      });
  } catch (error) {
    console.log(error);
  }
});

const stage = ref<number>(1);
const cep = ref("");
const cepError = ref(false);
const hasSubmitError = ref(false);
const categories = ref<ICategory[]>([]);
const selectedCategories = ref<number[]>([]);

watch(cep, (newCep) => {
  if (newCep.length === 8 && !newCep.includes("-")) {
    cep.value = newCep.slice(0, 5) + "-" + newCep.slice(5);
  }
});

const validateCep = () => {
  const cepRegex = /^[0-9]{5}-[0-9]{3}$/;
  cepError.value = !cepRegex.test(cep.value);
};

const selectCategory = (category: number) => {
  if (selectedCategories.value.includes(category)) {
    selectedCategories.value = selectedCategories.value.filter(
      (c) => c !== category
    );
  } else {
    selectedCategories.value.push(category);
  }
};

const submit = async () => {
  if (
    cep.value.length !== 9 ||
    cepError.value ||
    selectedCategories.value.length === 0
  ) {
    notify({
      title:
        "Selecione ao menos uma categoria e digite um CEP no formato xxxxx-xxx",
      type: "error",
    });
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
      notify({
        title: "Cadastro realizado com sucesso!",
        type: "success",
      });
    } catch (error) {
      notify({
        title:
          "Ocorreu um erro na ação de cadastro, verifique as informações e tente novamente!",
        type: "error",
      });
    }
  }
};
</script>
<template>
  <div v-if="isOpen" class="overlay" @click.stop>
    <div class="popup">
      <div class="popup__stageOne" v-if="stage === 1">
        <h2 class="popup__stageOne__title">Bem vindo, {{ userStore.name }}</h2>
        <p class="popup__stageOne__description">
          Para obter uma melhor experiência na plataforma, por favor preencha
          alguns dados:
        </p>
        <button class="popup__stageOne__buttonPrimary" @click="stage = 2">
          Ok
        </button>
        <button class="popup__stageOne__buttonSecondary" @click="logout">
          Sair da conta
        </button>
      </div>
      <div class="popup__stageTwo" v-else>
        <h2 class="popup__stageTwo__title">Localização</h2>
        <p class="popup__stageTwo__description">
          Usada para recomendar eventos perto de você
        </p>
        <input
          class="popup__stageTwo__cep"
          placeholder="CEP"
          type="text"
          id="cep"
          v-model="cep"
          @input="validateCep"
          maxlength="9"
        />
        <p v-if="cepError" class="popup__stageTwo__cepError">
          Por favor, insira um CEP válido no formato xxxxx-xxx.
        </p>
        <h2 class="popup__stageTwo__title">Categorias</h2>
        <p class="popup__stageTwo__description">
          Selecione todas as categorias de evento que você tem interesse:
        </p>
        <div class="popup__stageTwo__categoriesWrapper">
          <div
            :class="[
              'popup__stageTwo__categoriesWrapper__categorie',
              { active: selectedCategories.includes(category.id) },
            ]"
            v-for="category in categories"
            :key="category.name"
            @click="selectCategory(category.id)"
          >
            {{ category.name }}
          </div>
        </div>
        <button class="popup__stageTwo__buttonPrimary" @click="submit">
          Ok
        </button>
        <p v-if="hasSubmitError" class="popup__stageTwo__description">
          Selecione pelo menos uma categoria e digite o CEP corretamente.
        </p>
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

.popup {
  width: 80%;
  max-width: 320px;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;
}

.popup__stageOne {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.popup__stageOne__title,
.popup__stageTwo__title {
  font-size: 24px;
  font-weight: bold;
  color: #1597b1;
  text-align: center;
}

.popup__stageTwo__title {
  text-align: left;
}

.popup__stageOne__description,
.popup__stageTwo__description {
  font-size: 16px;
  color: black;
  text-align: center;
}

.popup__stageTwo__description {
  text-align: left;
}

.popup__stageOne__buttonPrimary,
.popup__stageTwo__buttonPrimary {
  background-color: #1597b1;
  color: white;
  padding: 16px;
  border-radius: 16px;
  width: 100%;
  cursor: pointer;
  border: none;
  outline: none;
}

.popup__stageTwo__buttonPrimary {
  margin-top: 16px;
}

.popup__stageOne__buttonSecondary {
  background-color: white;
  color: #1597b1;
  padding: 16px;
  border-radius: 16px;
  width: 100%;
  cursor: pointer;
  border: none;
  outline: none;
}

.popup__stageTwo__cep {
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  border: 1px solid #b0b0b0;
  margin: 16px 0;
}

.popup__stageTwo__cepError {
  color: black;
  font-size: 14px;
}

.popup__stageTwo__categoriesWrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  row-gap: 10px;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 8px;
}

.popup__stageTwo__categoriesWrapper__categorie {
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 8px;
  background-color: white;
  color: #1597b1;
  border: 1px solid #1597b1;
  cursor: pointer;
  font-weight: medium;
}

.popup__stageTwo__categoriesWrapper__categorie.active {
  background-color: #1597b1;
  color: white;
}
</style>
@/types/ICategory
