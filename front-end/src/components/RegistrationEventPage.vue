<template>
  <div class="container">
    <p class="titleRegistration">Cadastrar Eventos</p>
    <p class="title">Título e descrição</p>
    <div class="name">
      <p class="subtitle">* Nome do evento</p>
      <input
        class="inputTextName"
        type="text"
        id="nome"
        v-model="nome"
        placeholder="Digite o nome"
      />
    </div>
    <div class="description">
      <p class="subtitle">* Descrição do evento</p>
      <MdEditor language="en-US" v-model="text" />
    </div>
    <p class="title">Locais</p>
    <p class="dontFindLocate" @click="showLocalFields">
      Não encontrou o local? Cadastre um.
    </p>
    <div class="locateInfos">
      <div class="localRegistration" v-if="showLocalSelect">
        <div class="citiesSelectRegistration">
          <p class="subtitle">* Cidade</p>
          <select class="cities" v-model="cityStore.id" @change="changeCity">
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
            v-model="address"
            placeholder="Digite o endereço"
          />
        </div>
        <div class="maximumCapacity">
          <p class="subtitle">* Capacidade máxima de pessoas</p>
          <input
            class="inputTextAddress"
            type="text"
            id="capacity"
            v-model="capacity"
            placeholder="Ex: 100"
          />
        </div>
        <div class="cep">
          <p class="subtitle">* CEP</p>
          <input
            class="inputTextAddress"
            type="text"
            id="cep"
            v-model="cep"
            placeholder="Ex: 18023-442"
          />
        </div>
      </div>
      <div class="registeredLocation" v-else>
        <div class="citiesSelect">
          <p class="subtitle">* Cidade</p>
          <select class="cities" v-model="cityStore.id" @change="changeCity">
            <option value="" disabled selected hidden>
              Selecione a cidade
            </option>
            <
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>
        <div class="citiesSelect">
          <p class="subtitle">* Local</p>
          <select class="cities" v-model="cityStore.id">
            <option value="" disabled selected hidden>Selecione o local</option>
            <option v-for="city in city" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <p class="title">Datas</p>
    <div class="dateInfos">
      <div class="inicialDate">
        <p class="subtitle">* Data inicial</p>
        <div class="dateInput">
          <input
            class="inputTextDate"
            type="date"
            id="inicialDate"
            v-model="inicialDate"
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
            v-model="FinalDate"
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
              v-model="inicialPrice"
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
              v-model="finalPrice"
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
            v-model="linkBuy"
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
          v-model="linkMobile"
          placeholder="Ex: https://minhaimagem.png"
        />
      </div>
      <div class="desktopLink">
        <p class="subtitle">* Link da imagem Desktop</p>
        <input
          class="inputTextLinkDivulgation"
          type="text"
          id="linkDesktop"
          v-model="linkDesktop"
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
          v-model="renewableEnergy"
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
          v-model="wasteManagement"
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
          v-model="visibleBins"
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
          v-model="reduceWaste"
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
          v-model="publicTransportation"
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
          v-model="sustainableTransportIncentive"
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
          v-model="socialEnvironmental"
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
          v-model="monitorImpact"
          placeholder="Responda com detalhes"
        />
      </div>
    </div>
    <div class="submit-button-container">
      <button class="submit-button">Enviar Evento</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { MdEditor } from "md-editor-v3";
import MarkdownIt from "markdown-it";
import { cityStore } from "@/store.ts";
import "md-editor-v3/lib/style.css";

const md = new MarkdownIt();

const text = ref("# Hello Editor");

const result = computed(() => md.render(text.value));

const isYesSelected = ref(true);

watch(text, (newVal) => {
  console.log(newVal);
});
/*
function changeCity() {
  if (props.cities) {
    const selectedCity = props.cities.find((city) => city.id === cityStore.id);
    if (selectedCity) {
      cityStore.id = selectedCity.id;
      cityStore.name = selectedCity.name;
    }  

    localStorage.setItem("city", JSON.stringify(selectedCity));
  }
}
*/
function selectYes() {
  isYesSelected.value = true;
}

function selectNo() {
  isYesSelected.value = false;
}

const showLocalSelect = ref(false);

function showLocalFields() {
  console.log("showLocalFields() foi chamado");
  showLocalSelect.value = !showLocalSelect.value;
  return showLocalSelect;
}
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
  width: calc(100% - 20px);
  height: 48px;
  border-radius: 8px;
  padding: 10px;
}

.inputTextLinkSustainability,
.inputTextLinkDivulgation,
.inputTextPriceLink,
.inputTextAddress {
  width: calc(100% - 20px);
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
  width: calc(100% - 20px);
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
  width: calc(100% - 20px);
  height: 48px;
  top: 24px;
  gap: 0px;
  border-radius: 8px;
  opacity: 0px;
}

.locateInfos,
.sustainability,
.divulgation,
.priceDefinition,
.dateInfos {
  display: flex;
  align-self: center;
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
  width: calc(100% - 20px);
  padding: 10px;
  border-radius: 8px;
  border: solid black 1px;
}

.description {
  width: calc(100% - 20px);
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
  background-color: #1597b1;
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
}
</style>
