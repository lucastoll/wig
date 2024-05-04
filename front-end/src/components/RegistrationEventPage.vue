<template>
  <div class="container">
    <p class="titleRegistration">Cadastrar Eventos</p>
    <p class="title">Título e descrição</p>
    <div class="name">
      <p class="subtitle">* Nome do evento</p>
      <input
        :class="{ inputTextName: true, 'error-border': errors.name }"
        type="text"
        id="nome"
        v-model="form.name"
        placeholder="Digite o nome"
      />
    </div>
    <div class="description">
      <p class="subtitle">* Descrição do evento</p>
      <MdEditor language="en-US" v-model="form.description" />
    </div>
    <p class="title">Locais</p>
    <p class="dontFindLocate" @click="showLocalFields">
      Não encontrou o local? Cadastre um.
    </p>
    <div class="locateInfos">
      <div class="localRegistration" v-if="showLocalSelect">
        <div class="citiesSelectRegistration">
          <p class="subtitle">* Cidade</p>
          <select class="cities" v-model="form.cityId" @change="changeCity">
            <option value="" disabled selected hidden>
              Selecione a cidade
            </option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>
        <div class="address">
          <p class="subtitle">* Endereço</p>
          <input
            class="inputTextAddress"
            type="text"
            id="address"
            v-model="form.address"
            placeholder="Digite o endereço"
          />
        </div>
        <div class="maximumCapacity">
          <p class="subtitle">* Capacidade máxima de pessoas</p>
          <input
            class="inputTextAddress"
            type="text"
            id="capacity"
            v-model="form.maxCapacity"
            placeholder="Ex: 100"
          />
        </div>
        <div class="cep">
          <p class="subtitle">* CEP</p>
          <input
            class="inputTextAddress"
            type="text"
            id="cep"
            v-model="form.zipcode"
            placeholder="Ex: 18023-442"
          />
        </div>
      </div>
      <div class="registeredLocation" v-else>
        <div class="citiesSelect">
          <p class="subtitle">* Cidade</p>
          <select class="cities" v-model="form.cityId" @change="changeCity">
            <option value="" disabled selected hidden>
              Selecione a cidade
            </option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>
        <div class="citiesSelect">
          <p class="subtitle">* Local</p>
          <select
            class="cities"
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
    <p class="title">Categorias</p>
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
    <p class="title">Datas</p>
    <div class="dateInfos">
      <div class="inicialDate">
        <p class="subtitle">* Data inicial</p>
        <div class="dateInput">
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
        <p class="subtitle">* Data Final</p>
        <div class="dateInput">
          <input
            class="inputTextDate"
            type="date"
            id="FinalDate"
            v-model="form.finalDate"
            placeholder="Digite a data final"
          />
        </div>
      </div>
    </div>
    <p class="title">Ingressos</p>
    <div class="prices">
      <p class="subtitle">* O evento é gratuito?</p>
      <div class="buttonPrice">
        <button
          class="optionButton"
          :class="{ selected: isYesSelected }"
          @click="selectYes"
          :disabled="isYesSelected"
        >
          Sim
        </button>
        <button
          class="optionButton"
          :class="{ selected: !isYesSelected }"
          @click="selectNo"
          :disabled="!isYesSelected"
        >
          Não
        </button>
      </div>
      <div class="priceDefinition">
        <div class="priceInicial">
          <p class="subtitle">* Preço Inicial (BRL)</p>
          <div class="priceInput">
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
          <p class="subtitle">* Preço Final (BRL)</p>
          <div class="priceInput">
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
          <p class="subtitle">* Link para compra do ingresso</p>
          <input
            class="inputTextPriceLink"
            type="text"
            id="linkBuy"
            v-model="form.ticketUrl"
            placeholder="Ex: https://minhaimagem.png"
          />
        </div>
      </div>
    </div>
    <p class="title">Imagens de divulgação</p>
    <div class="divulgation">
      <div class="mobileLink">
        <p class="subtitle">* Link da imagem Mobile</p>
        <input
          class="inputTextLinkDivulgation"
          type="text"
          id="linkMobile"
          v-model="form.imageMobile"
          placeholder="Ex: https://minhaimagem.png"
        />
      </div>
      <div class="desktopLink">
        <p class="subtitle">* Link da imagem Desktop</p>
        <input
          class="inputTextLinkDivulgation"
          type="text"
          id="linkDesktop"
          v-model="form.imageDesktop"
          placeholder="Ex: https://minhaimagem.png"
        />
      </div>
    </div>
    <p class="title">Sustentabilidade</p>
    <div class="sustainability">
      <div class="sustainabilityQuests">
        <div>
          <p class="subtitle sustentabilityQuestion">
            O evento utilizará uma fonte de energia renovável (solar, eólica,
            hídrica...)?
          </p>
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
          <p class="subtitle sustentabilityQuestion">
            O evento possui um plano de gestão de resíduos que inclui coleta
            seletiva e reciclagem?
          </p>
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
          <p class="subtitle sustentabilityQuestion">
            São disponibilizadas lixeiras para coleta seletiva em locais
            visíveis?
          </p>
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
          <p class="subtitle sustentabilityQuestion">
            Existe alguma estratégia no evento para reduzir o desperdício de
            alimentos e materiais descartáveis?
          </p>
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
          <p class="subtitle sustentabilityQuestion">
            É possível chegar facilmente ao local do evento por meio de
            transporte público?
          </p>
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
          <p class="subtitle sustentabilityQuestion">
            Há incentivos para que os participantes utilizem meios de transporte
            sustentáveis?
          </p>
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
          <p class="subtitle sustentabilityQuestion">
            O evento beneficia alguma causa social ou ambiental?
          </p>
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
          <p class="subtitle sustentabilityQuestion">
            O evento monitora e avalia seu impacto ambiental?
          </p>
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
      <button class="submit-button" @click="submitForm">Enviar Evento</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import axios from "axios";
import type { ICity } from "@/types/ICity";
import type { IEventWithSustainabilityQuestions } from "@/types/IEvent";
import type ILocation from "@/types/ILocation";
import { useNotification } from "@kyvg/vue3-notification";
import type ICategory from "@/types/ICategory";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";

const { notify } = useNotification();
const isYesSelected = ref(true);
const cities = ref<ICity[]>([]);
const locations = ref<ILocation[]>([]);
const categories = ref<ICategory[]>([]);
const categoriesIds = ref<number[]>([]);
const showLocalSelect = ref(false);

const form = ref<IEventWithSustainabilityQuestions>({
  name: "",
  imageMobile: "",
  imageDesktop: "",
  initialDate: new Date(),
  finalDate: new Date(),
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
});

const errors = ref<Record<string, boolean>>({});

const requiredFields = [
  "name",
  "imageMobile",
  "imageDesktop",
  "initialDate",
  "finalDate",
  "initialPrice",
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

const submitForm = () => {
  errors.value = {};

  for (const field of requiredFields) {
    if (!form.value[field as keyof typeof form.value]) {
      errors.value[field] = true;
    }
    if (field === "categoryIds" && form.value?.categoryIds?.length === 0) {
      errors.value[field] = true;
    }
  }

  let requestBody = {
    ...form.value,
  };

  requestBody = treatSustentabilityQuestions(requestBody);

  if (Object.keys(errors.value).length === 0) {
    axios
      .post("http://localhost:3000/events", requestBody)
      .then((res) => {
        if (res.status === 201) {
          notify({
            title: "Evento cadastrado com sucesso!",
            type: "success",
          });
        }
      })
      .catch((err) => {
        notify({
          title: `Erro ao cadastrar evento ${err}`,
          type: "error",
        });
      });
  } else {
    notify({
      title: `Preencha os seguintes campos obrigatorios: ${Object.keys(
        errors.value
      ).join(", ")}`,
      type: "error",
    });
  }

  console.log(requestBody);
  console.error(errors.value);
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
  isYesSelected.value = true;
  form.value.initialPrice = 0;
  form.value.finalPrice = 0;
}

function selectNo() {
  isYesSelected.value = false;
}

function showLocalFields() {
  console.log("showLocalFields() foi chamado");
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
    .get("http://localhost:3000/cities")
    .then((res) => res.data);

  locations.value = await axios
    .get("http://localhost:3000/locations")
    .then((res) => res.data);

  categories.value = await axios
    .get("http://localhost:3000/categories")
    .then((res) => res.data);

  categoriesIds.value = categories.value.map((category) => category.id);
});
</script>
<style scoped>
body {
  color: black;
}

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
  line-height: 58.09px;
  text-align: center;
  color: black;
  margin-top: 16px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  line-height: 29.05px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  color: black;
}

.subtitle {
  font-size: 16px;
  line-height: 29.05px;
  text-align: left;
  color: black;
}

.inputTextName {
  width: calc(100%);
  height: 48px;
  border-radius: 8px;
  padding: 10px;
}

.inputTextLinkSustainability,
.inputTextLinkDivulgation,
.inputTextPriceLink,
.inputTextAddress {
  width: calc(100%);
  height: 48px;
  gap: 0px;
  border-radius: 8px;
  border: solid 1px black;
  opacity: 0px;
  padding: 10px;
}

.inputTextPrice,
.inputTextDate {
  width: calc(100%);
  height: 48px;
  padding: 10px;
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

.sustainabilityQuests,
.mobileLink,
.desktopLink,
.inicialDate,
.finalDate {
  width: 50%;
}

.linkBuy,
.priceInicial,
.priceFinal {
  width: 33.3%;
}

.priceInput,
.dateInput {
  width: calc(100%);
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
  margin-bottom: 10px;
  color: black;
}

.registeredLocation {
  width: 100%;
  display: inline-flex;
  gap: 16px;
}

.localRegistration {
  width: 100%;
  display: inline-flex;
}

.citiesSelect {
  width: 50%;
}

.cep,
.maximumCapacity,
.address,
.citiesSelectRegistration {
  width: 25%;
}

.cities {
  width: calc(100%);
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
  width: calc(100%);
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
  margin-top: 20px;
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

@media (max-width: 1000px) {
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

@media screen and (min-width: 1024px) {
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
}
</style>
