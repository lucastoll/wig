<template>
  <div class="container">
    <h1 class="titleRegistration">Cadastrar Eventos</h1>
    <h2 class="title">Título e descrição</h2>
    <div class="name">
      <h3 class="subtitle">* Nome do evento</h3>
      <input
        :class="{ inputTextName: true, 'error-border': errors.name }"
        type="text"
        id="nome"
        v-model="form.name"
        placeholder="Digite o nome"
      />
    </div>
    <div class="description">
      <h3 class="subtitle">* Descrição do evento</h3>
      <MdEditor language="en-US" v-model="form.description" />
    </div>
    <h2 class="title">Locais</h2>
    <p class="dontFindLocate" @click="showLocalFields">
      Não encontrou o local? Cadastre um.
    </p>
    <div class="locateInfos">
      <div
        :class="{
          citiesSelectRegistration: showLocalSelect,
          citiesSelect: !showLocalSelect,
        }"
      >
        <h3 class="subtitle">* Cidade</h3>
        <select
          :class="{ cities: true, 'error-border': errors.cityId }"
          v-model="form.cityId"
          @change="changeCity"
        >
          <option value="" disabled selected hidden>Selecione a cidade</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </select>
      </div>
      <div class="localRegistration" v-if="showLocalSelect">
        <div class="address">
          <p class="subtitle">* Endereço</p>
          <input
            :class="{ inputTextAddress: true, 'error-border': errors.address }"
            type="text"
            id="address"
            v-model="form.address"
            placeholder="Digite o endereço"
          />
        </div>
        <div class="maximumCapacity">
          <h3 class="subtitle">* Capacidade máxima de pessoas</h3>
          <input
            :class="{
              inputTextAddress: true,
              'error-border': errors.maxCapacity,
            }"
            type="text"
            id="capacity"
            v-model="form.maxCapacity"
            placeholder="Ex: 100"
          />
        </div>
        <div class="cep">
          <h3 class="subtitle">* CEP</h3>
          <input
            :class="{ inputTextAddress: true, 'error-border': errors.zipcode }"
            type="text"
            id="cep"
            v-model="form.zipcode"
            placeholder="Ex: 18023-442"
          />
        </div>
      </div>
      <div class="registeredLocation" v-else>
        <div class="localSelect">
          <h3 class="subtitle">* Local</h3>
          <select
            :class="{ cities: true, 'error-border': errors.locationId }"
            v-model="form.locationId"
            @change="changeLocation"
          >
            <option value="" disabled selected hidden>Selecione o local</option>
            <option
              v-for="location in locations"
              :key="location.id"
              :value="location.id"
            >
              {{ location.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <h2 class="title">Categorias</h2>
    <multiselect
      v-model="form.categoryIds"
      :options="categoriesIds"
      :allow-empty="false"
      :multiple="true"
      :close-on-select="false"
      deleselct-label="Pelomenos uma categoria é obrigatória"
      placeholder="Selecione uma ou mais categorias"
      :custom-label="getCategoryNameById"
    ></multiselect>
    <h2 class="title">Datas</h2>
    <div class="dateInfos">
      <div class="inicialDate">
        <h3 class="subtitle">* Data inicial</h3>
        <div :class="{ dateInput: true, 'error-border': errors.initialDate }">
          <input
            class="inputTextDate"
            type="date"
            id="inicialDate"
            v-model="form.initialDate"
            placeholder="Digite a data inicial"
          />
        </div>
      </div>
      <div class="finalDate">
        <h3 class="subtitle">* Data Final</h3>
        <div :class="{ dateInput: true, 'error-border': errors.finalDate }">
          <input
            class="inputTextDate"
            type="date"
            id="FinalDate"
            v-model="form.finalDate"
            placeholder="Digite a data final"
          />
        </div>
      </div>
      <div class="startTime">
        <h3 class="subtitle">* Horario inicial</h3>
        <input
          :class="{
            inputTextLinkDivulgation: true,
            'error-border': errors.startTime,
          }"
          type="number"
          min="0"
          :max="form.endTime"
          id="linkInstagram"
          v-model="form.startTime"
          placeholder="Digite a hora inicial"
        />
      </div>
      <div class="endTime">
        <h3 class="subtitle">* Horario final</h3>
        <input
          :class="{
            inputTextLinkDivulgation: true,
            'error-border': errors.endTime,
          }"
          type="number"
          id="linkInstagram"
          :min="form.startTime"
          max="24"
          v-model="form.endTime"
          placeholder="Digite a hora final"
        />
      </div>
    </div>
    <h2 class="title">Ingressos</h2>
    <div class="prices">
      <h3 class="subtitle">* O evento é gratuito?</h3>
      <div class="buttonPrice">
        <button
          class="optionButton"
          :class="{ selected: itIsFree }"
          @click="selectYes"
          :disabled="itIsFree"
        >
          Sim
        </button>
        <button
          class="optionButton"
          :class="{ selected: !itIsFree }"
          @click="selectNo"
          :disabled="!itIsFree"
        >
          Não
        </button>
      </div>
      <div class="priceDefinition">
        <div class="priceInicial">
          <h3 class="subtitle">* Preço Inicial (BRL)</h3>
          <div
            :class="{ priceInput: true, 'error-border': errors.initialPrice }"
          >
            <input
              class="inputTextPrice"
              type="number"
              id="inicialPrice"
              v-model="form.initialPrice"
              min="1"
              step="1"
              placeholder="Digite o preço inicial"
            />
            <img class="priceImg" src="@/assets/Price.png" />
          </div>
        </div>
        <div class="priceFinal">
          <h3 class="subtitle">* Preço Final (BRL)</h3>
          <div :class="{ priceInput: true, 'error-border': errors.finalPrice }">
            <input
              class="inputTextPrice"
              type="number"
              min="1"
              step="1"
              id="finalPrice"
              v-model="form.finalPrice"
              placeholder="Digite o preço final"
            />
            <img class="priceImg" src="@/assets/Price.png" />
          </div>
        </div>
        <div class="linkBuy">
          <h3 class="subtitle">* Link para compra do ingresso</h3>
          <input
            :class="{
              inputTextPriceLink: true,
              'error-border': errors.ticketUrl,
            }"
            type="text"
            id="linkBuy"
            v-model="form.ticketUrl"
            placeholder="Ex: https://minhaimagem.png"
          />
        </div>
        <div class="minAge">
          <h3 class="subtitle">* Idade minima</h3>
          <input
            :class="{ inputTextPriceLink: true, 'error-border': errors.minAge }"
            type="text"
            id="minAge"
            v-model="form.minAge"
            placeholder="Digite a idade minima"
          />
        </div>
      </div>
    </div>
    <h2 class="title">Imagens de divulgação</h2>
    <div class="divulgation">
      <div class="mobileLink">
        <h3 class="subtitle">* Link da imagem Mobile</h3>
        <input
          :class="{
            inputTextLinkDivulgation: true,
            'error-border': errors.imageMobile,
          }"
          type="text"
          id="linkMobile"
          v-model="form.imageMobile"
          placeholder="Ex: https://minhaimagem.png"
        />
      </div>
      <div class="desktopLink">
        <h3 class="subtitle">* Link da imagem Desktop</h3>
        <input
          :class="{
            inputTextLinkDivulgation: true,
            'error-border': errors.imageDesktop,
          }"
          type="text"
          id="linkDesktop"
          v-model="form.imageDesktop"
          placeholder="Ex: https://minhaimagem.png"
        />
      </div>
      <div class="instagramLink">
        <h3 class="subtitle">* Link da imagem Instagram</h3>
        <input
          :class="{
            inputTextLinkDivulgation: true,
            'error-border': errors.instagramEmbed,
          }"
          type="text"
          id="linkInstagram"
          v-model="form.instagramEmbed"
          placeholder="Ex: https://minhaimagem.png"
        />
      </div>
    </div>
    <h2 class="title">Sustentabilidade</h2>
    <div class="sustainability">
      <div class="sustainabilityQuests">
        <div>
          <h3 class="subtitle sustentabilityQuestion">
            O evento utilizará uma fonte de energia renovável (solar, eólica,
            hídrica...)?
          </h3>
        </div>
        <input
          class="inputTextLinkSustainability"
          type="text"
          id="renewableEnergy"
          v-model="form.renewableEnergy"
          placeholder="Responda com detalhes"
        />
      </div>
      <div class="sustainabilityQuests">
        <div>
          <h3 class="subtitle sustentabilityQuestion">
            O evento possui um plano de gestão de resíduos que inclui coleta
            seletiva e reciclagem?
          </h3>
        </div>
        <input
          class="inputTextLinkSustainability"
          type="text"
          id="wasteManagement"
          v-model="form.wasteManagement"
          placeholder="Responda com detalhes"
        />
      </div>
    </div>
    <div class="sustainability">
      <div class="sustainabilityQuests">
        <div>
          <h3 class="subtitle sustentabilityQuestion">
            São disponibilizadas lixeiras para coleta seletiva em locais
            visíveis?
          </h3>
        </div>
        <input
          class="inputTextLinkSustainability"
          type="text"
          id="visibleBins"
          v-model="form.visibleBins"
          placeholder="Responda com detalhes"
        />
      </div>
      <div class="sustainabilityQuests">
        <div>
          <h3 class="subtitle sustentabilityQuestion">
            Existe alguma estratégia no evento para reduzir o desperdício de
            alimentos e materiais descartáveis?
          </h3>
        </div>
        <input
          class="inputTextLinkSustainability"
          type="text"
          id="reduceWaste"
          v-model="form.reduceWaste"
          placeholder="Responda com detalhes"
        />
      </div>
    </div>
    <div class="sustainability">
      <div class="sustainabilityQuests">
        <div>
          <h3 class="subtitle sustentabilityQuestion">
            É possível chegar facilmente ao local do evento por meio de
            transporte público?
          </h3>
        </div>
        <input
          class="inputTextLinkSustainability"
          type="text"
          id="publicTransportation"
          v-model="form.publicTransportation"
          placeholder="Responda com detalhes"
        />
      </div>
      <div class="sustainabilityQuests">
        <div>
          <h3 class="subtitle sustentabilityQuestion">
            Há incentivos para que os participantes utilizem meios de transporte
            sustentáveis?
          </h3>
        </div>
        <input
          class="inputTextLinkSustainability"
          type="text"
          id="sustainableTransportIncentive"
          v-model="form.sustainableTransportIncentive"
          placeholder="Responda com detalhes"
        />
      </div>
    </div>
    <div class="sustainability">
      <div class="sustainabilityQuests">
        <div>
          <h3 class="subtitle sustentabilityQuestion">
            O evento beneficia alguma causa social ou ambiental?
          </h3>
        </div>
        <input
          class="inputTextLinkSustainability"
          type="text"
          id="socialEnvironmental"
          v-model="form.socialEnvironmental"
          placeholder="Responda com detalhes"
        />
      </div>
      <div class="sustainabilityQuests">
        <div>
          <h3 class="subtitle sustentabilityQuestion">
            O evento monitora e avalia seu impacto ambiental?
          </h3>
        </div>
        <input
          class="inputTextLinkSustainability"
          type="text"
          id="monitorImpact"
          v-model="form.monitorImpact"
          placeholder="Responda com detalhes"
        />
      </div>
    </div>
    <div class="submit-button-container">
      <button class="submit-button" @click="submitForm" :disabled="loading">
        {{ loading ? "Enviando..." : "Enviar Evento" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import axios from "axios";

import { MdEditor } from "md-editor-v3";
import Multiselect from "vue-multiselect";

import "md-editor-v3/lib/style.css";
import "vue-multiselect/dist/vue-multiselect.css";

import { useNotification } from "@kyvg/vue3-notification";

import type { ICity } from "@/types/ICity";
import type { IEventWithSustainabilityQuestions } from "@/types/IEvent";
import type ILocation from "@/types/ILocation";
import type ICategory from "@/types/ICategory";
import { userStore } from "@/store";

const { notify } = useNotification();
const itIsFree = ref(true);
const cities = ref<ICity[]>([]);
const locations = ref<ILocation[]>([]);
const categories = ref<ICategory[]>([]);
const categoriesIds = ref<number[]>([]);
const showLocalSelect = ref(false);
const loading = ref(false);

const form = ref<IEventWithSustainabilityQuestions>({
  name: "",
  organizerId: userStore.id,
  imageMobile: "",
  imageDesktop: "",
  initialDate: undefined,
  finalDate: undefined,
  initialPrice: 0,
  finalPrice: 10,
  minAge: 0,
  locationId: 0,
  address: "",
  zipcode: 0,
  maxCapacity: 0,
  categoryIds: [],
  cityId: 0,
  description: "# Descrição do evento!",
  startTime: 0,
  endTime: 1,
  ticketUrl: "",
  instagramEmbed: "",
});

const errors = ref<Record<string, boolean>>({});

const requiredFields = [
  "name",
  "imageMobile",
  "imageDesktop",
  "initialDate",
  "finalDate",
  "initialPrice",
  "finalPrice",
  "minAge",
  "locationId",
  "categoryIds",
  "cityId",
  "description",
  "startTime",
  "endTime",
  "ticketUrl",
  "categoryIds",
];

function getCategoryNameById(categoryId: number) {
  const category = categories.value.find(
    (category) => category.id === categoryId
  );
  return category?.name;
}

function validateNonNegative(
  field: keyof IEventWithSustainabilityQuestions,
  fieldName: string
) {
  const fieldValue = form.value[field];

  if (typeof fieldValue === "number" && fieldValue < 0) {
    errors.value[field] = true;
    notify({
      title: `${fieldName} não pode ser menor que 0!`,
      type: "error",
    });
  }
}

const submitForm = () => {
  if (loading.value) return;

  errors.value = {};
  loading.value = true;

  for (const field of requiredFields) {
    if (!form.value[field as keyof typeof form.value]) {
      errors.value[field] = true;
    }
    if (field === "categoryIds" && form.value?.categoryIds?.length === 0) {
      errors.value[field] = true;
    }
  }

  validateNonNegative("initialPrice", "Preço inicial");
  validateNonNegative("finalPrice", "Preço final");
  validateNonNegative("startTime", "Hora de início");
  validateNonNegative("endTime", "Hora de término");

  if (form.value.initialPrice > form.value.finalPrice) {
    errors.value["initialPrice"] = true;
    errors.value["finalPrice"] = true;
    notify({
      title: `Preço inicial não pode ser maior que o preço final!`,
      type: "error",
    });
  }

  if (form.value.startTime >= form.value.endTime) {
    errors.value["startTime"] = true;
    errors.value["endTime"] = true;
    notify({
      title: `Horário inicial não pode ser maior ou igual ao horário final!`,
      type: "error",
    });
  }

  let requestBody = {
    ...form.value,
  };

  if (requestBody.organizerId === undefined) {
    requestBody.organizerId = userStore.id;
  }

  requestBody = treatSustentabilityQuestions(requestBody);

  if (Object.keys(errors.value).length === 0) {
    axios
      .post(`${import.meta.env.VITE_API_URL}/event`, requestBody)
      .then((res) => {
        if (res.status === 201) {
          notify({
            title: "Evento cadastrado com sucesso!",
            type: "success",
          });

          form.value = {
            name: "",
            imageMobile: "",
            imageDesktop: "",
            initialDate: undefined,
            finalDate: undefined,
            initialPrice: 0,
            finalPrice: 0,
            minAge: 0,
            locationId: 0,
            address: "",
            zipcode: 0,
            maxCapacity: 0,
            categoryIds: [],
            cityId: 0,
            description: "# Descrição do evento!",
            startTime: 0,
            endTime: 0,
            ticketUrl: "",
            instagramEmbed: "",
          };
        }
      })
      .catch((err) => {
        notify({
          title: `Erro ao cadastrar evento ${err}`,
          type: "error",
        });
      })
      .finally(() => {
        loading.value = false;
      });
  } else {
    notify({
      title: `Preencha os seguintes campos obrigatórios: ${Object.keys(
        errors.value
      ).join(", ")}`,
      type: "error",
    });
    loading.value = false;
  }
};

function treatSustentabilityQuestions(
  requestBody: IEventWithSustainabilityQuestions
) {
  const questionsAndAnswers = [
    {
      question:
        "O evento utilizará uma fonte de energia renovável (solar, eólica, hídrica...)?",
      answer: form.value.renewableEnergy,
    },
    {
      question:
        "O evento possui um plano de gestão de resíduos que inclui coleta seletiva e reciclagem?",
      answer: form.value.wasteManagement,
    },
    {
      question:
        "São disponibilizadas lixeiras para coleta seletiva em locais visíveis?",
      answer: form.value.visibleBins,
    },
    {
      question:
        "Existe alguma estratégia no evento para reduzir o desperdício de alimentos e materiais descartáveis?",
      answer: form.value.reduceWaste,
    },
    {
      question:
        "É possível chegar facilmente ao local do evento por meio de transporte público?",
      answer: form.value.publicTransportation,
    },
    {
      question:
        "Há incentivos para que os participantes utilizem meios de transporte sustentáveis?",
      answer: form.value.sustainableTransportIncentive,
    },
    {
      question: "O evento beneficia alguma causa social ou ambiental?",
      answer: form.value.socialEnvironmental,
    },
    {
      question: "O evento monitora e avalia seu impacto ambiental?",
      answer: form.value.monitorImpact,
    },
  ];

  const sustainabilityQuestions = questionsAndAnswers.filter(
    (qa) => qa.answer !== undefined
  );

  if (sustainabilityQuestions.length > 0) {
    requestBody.questions = sustainabilityQuestions;
  }

  delete requestBody.renewableEnergy;
  delete requestBody.wasteManagement;
  delete requestBody.visibleBins;
  delete requestBody.reduceWaste;
  delete requestBody.publicTransportation;
  delete requestBody.sustainableTransportIncentive;
  delete requestBody.socialEnvironmental;
  delete requestBody.monitorImpact;

  return requestBody;
}

function changeCity(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  form.value.cityId = Number(selectElement.value);
}

function changeLocation(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  form.value.locationId = Number(selectElement.value);
}

function selectYes() {
  itIsFree.value = true;
  form.value.initialPrice = 0;
  form.value.finalPrice = 0;
}

function selectNo() {
  itIsFree.value = false;
}

function showLocalFields() {
  showLocalSelect.value = !showLocalSelect.value;

  if (!showLocalSelect.value) {
    requiredFields.push("locationId");
    requiredFields.splice(requiredFields.indexOf("address"), 1);
    requiredFields.splice(requiredFields.indexOf("zipcode"), 1);
    requiredFields.splice(requiredFields.indexOf("maxCapacity"), 1);
  } else {
    requiredFields.push("address");
    requiredFields.push("zipcode");
    requiredFields.push("maxCapacity");
    requiredFields.splice(requiredFields.indexOf("locationId"), 1);
  }
}

onMounted(async () => {
  cities.value = await axios
    .get(`${import.meta.env.VITE_API_URL}/cities`)
    .then((res) => res.data);

  locations.value = await axios
    .get(`${import.meta.env.VITE_API_URL}/locations`)
    .then((res) => res.data);

  categories.value = await axios
    .get(`${import.meta.env.VITE_API_URL}/categories`)
    .then((res) => res.data);

  categoriesIds.value = categories.value.map((category) => category.id);
});
</script>
<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

.container {
  padding: 16px 16px 32px 16px;
}

.titleRegistration {
  font-size: 24px;
  font-weight: 700;
  line-height: 58px;
  text-align: center;
  color: black;
  margin-top: 16px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  line-height: 29px;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 8px;
  color: black;
}

.subtitle {
  font-size: 16px;
  line-height: 29px;
  text-align: left;
  color: black;
}

.inputTextName {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  padding: 8px;
}

.inputTextLinkSustainability,
.inputTextLinkDivulgation,
.inputTextPriceLink,
.inputTextAddress {
  width: 100%;
  height: 48px;
  gap: 0px;
  border-radius: 8px;
  border: solid 1px black;
  opacity: 0px;
  padding: 8px;
}

.inputTextPrice,
.inputTextDate {
  width: 100%;
  height: 48px;
  padding: 8px;
  border-radius: 8px;
  border: none;
}
.inputTextLinkSustainability,
.inputTextLinkDivulgation,
.inputTextPriceLink,
.inputTextAddress:focus,
.inputTextPrice:focus,
.inputTextDate:focus {
  outline: none;
}

.monitorImpact {
  align-items: center;
}

.sustainabilityQuests {
  width: 50%;
}

.inicialDate,
.finalDate,
.startTime,
.endTime {
  width: 25%;
}

.mobileLink,
.desktopLink,
.instagramLink {
  width: 33.3%;
}

.minAge,
.linkBuy,
.priceInicial,
.priceFinal {
  width: 25%;
}

.priceInput,
.dateInput {
  width: 100%;
  border-radius: 8px;
  border: solid 1px black;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dontFindLocate {
  width: 327px;
  height: 16px;
  gap: 10px;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  text-align: left;
  text-decoration: underline;
  margin-top: 16px;
  margin-bottom: 8px;
  color: black;
}

.registeredLocation {
  width: 50%;
  display: inline-flex;
  gap: 16px;
}

.localRegistration {
  width: 75%;
  display: inline-flex;
  gap: 16px;
}

.citiesSelect {
  width: 50%;
}

.localSelect {
  width: 100%;
}

.cep,
.maximumCapacity,
.address,
.citiesSelectRegistration {
  width: 33.3%;
}

.cities {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid black;
}

.locateInfos,
.sustainability,
.divulgation,
.priceDefinition,
.dateInfos {
  display: flex;
  align-self: center;
  gap: 16px;
}

.priceImg {
  width: 16px;
  height: 20px;
  margin-right: 16px;
}

.buttonPrice {
  display: flex;
  justify-content: space-between;
  background-color: #ccc;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: solid black 1px;
}

.description {
  width: calc(100%);
}

.optionButton {
  width: calc(50% - 10px);
  height: 30px;
  background-color: #ccc;
  color: black;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.optionButton.selected {
  background-color: white;
  color: black;
}

.optionButton:disabled {
  opacity: 0.6;
}

.submit-button-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.submit-button {
  width: 300px;
  height: 50px;
  border-radius: 10px;
  background-color: #1597b1;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  outline: none;
}

.submit-button:hover {
  background: #1597b1;
}

:deep(.multiselect__tags) {
  border: 1px solid black !important;
}

:deep(.multiselect__tag) {
  background: #1597b1 !important;
  color: white !important;
}

:deep(.multiselect__option--highlight) {
  background: #1597b1 !important;
  color: white !important;
}

:deep(.multiselect__option--highlight::after) {
  background: #1597b1 !important;
  color: white !important;
}

.container {
  max-width: 1240px;
  margin: 0 auto;
}

.titleRegistration {
  font-size: 48px;
}

.title {
  font-size: 24px;
  text-align: left;
  margin-top: 16px;
}

.subtitle {
  font-size: 16px;
}

.sustentabilityQuestion {
  font-size: 13px;
}

.error-border {
  border: 1px solid red;
}

@media (max-width: 1023px) {
  .registeredLocation,
  .localRegistration,
  .locateInfos,
  .sustainability,
  .divulgation,
  .priceDefinition,
  .dateInfos {
    display: block;
    align-self: center;
  }

  .localRegistration,
  .registeredLocation,
  .minAge,
  .startTime,
  .endTime,
  .instagramLink,
  .citiesSelectRegistration,
  .cep,
  .maximumCapacity,
  .address,
  .citiesSelect,
  .linkBuy,
  .priceInicial,
  .priceFinal,
  .sustainabilityQuests,
  .mobileLink,
  .desktopLink,
  .inicialDate,
  .finalDate {
    width: 100%;
  }
}
</style>
