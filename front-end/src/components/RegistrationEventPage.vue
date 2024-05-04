<template>
  <div class="titleRegistration"><p>Cadastrar Eventos</p></div>
  <div class="title"><p>Título e descrição</p></div>
  <div class="name">
    <div class="subtitle"><p>* Nome do evento</p></div>
    <input class="inputTextName" type="text" id="nome" v-model="nome" placeholder="Digite o nome">
  </div>
  <div class="description">
    <div class="subtitle"><p>* Descrição do evento</p></div>
    <MdEditor language="en-US" v-model="text" />
  </div>
  <div class="title"><p>Locais</p></div>
  <div class="dontFindLocate" @click="showLocalFields">
    <p>Não encontrou o local? Cadastre um.</p>
  </div>
  <div class="locateInfos">
    <div class="localRegistration" v-if="showLocalSelect">
      <div class="citiesSelectRegistration">
        <div class="subtitle"><p>* Cidade</p></div>
        <select class="cities" v-model="cityStore.id" @change="changeCity">
          <option value="" disabled selected hidden>Selecione a cidade</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
        </select>
      </div>
      <div class="address">
        <div class="subtitle"><p>* Endereço</p></div>
        <input class="inputTextAddress" type="text" id="address" v-model="address" placeholder="Digite o endereço">
      </div>
      <div class="maximumCapacity">
        <div class="subtitle"><p>* Capacidade máxima de pessoas</p></div>
        <input class="inputTextAddress" type="text" id="capacity" v-model="capacity" placeholder="Ex: 100">
      </div>
      <div class="cep">
        <div class="subtitle"><p>* CEP</p></div>
        <input class="inputTextAddress" type="text" id="cep" v-model="cep" placeholder="Ex: 18023-442">
      </div>
    </div>
    <div class="registeredLocation" v-else>
      <div class="citiesSelect">
        <div class="subtitle"><p>* Cidade</p></div>
        <select class="cities" v-model="cityStore.id" @change="changeCity">
          <option value="" disabled selected hidden>Selecione a cidade</option>
          <<option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
        </select>
      </div>
      <div class="citiesSelect">
        <div class="subtitle"><p>* Local</p></div>
        <select class="cities" v-model="cityStore.id">
          <option value="" disabled selected hidden>Selecione o local</option>
          <option v-for="city in city" :key="city.id" :value="city.id">{{ city.name }}</option>
        </select>
    </div>
    </div>
    
  </div>
  <div class="title"><p>Datas</p></div>
  <div class="dateInfos">
    <div class="inicialDate">
      <div class="subtitle"><p>* Data inicial</p></div>
      <div class="dateInput">
        <input class="inputTextDate" type="text" id="inicialDate" v-model="inicialDate" placeholder="Digite a data inicial">
        <img class="calendarImg" src="@/assets/Calendar.png"/>
      </div>
    </div>
    <div class="finalDate">
      <div class="subtitle"><p>* Data Final</p></div>
      <div class="dateInput">
        <input class="inputTextDate" type="text" id="FinalDate" v-model="FinalDate" placeholder="Digite a data final">
        <img class="calendarImg" src="@/assets/Calendar.png"/>
      </div>
    </div>
  </div>
  <div class="title"><p>Ingressos</p></div>
  <div class="prices">
    <div class="subtitle"><p>* O evento é gratuito?</p></div>
    <div class="buttonPrice">
        <button 
          class="optionButton" 
          :class="{ 'selected': isYesSelected }" 
          @click="selectYes"
          :disabled="isYesSelected"
        >
          Sim
        </button>
        <button 
          class="optionButton" 
          :class="{ 'selected': !isYesSelected }" 
          @click="selectNo"
          :disabled="!isYesSelected"
        >
          Não
        </button>
    </div>
    <div class="priceDefinition">
      <div class="priceInicial">
        <div class="subtitle"><p>* Preço Inicial (BRL)</p></div>
        <div class="priceInput">
          <input class="inputTextPrice" type="text" id="inicialPrice" v-model="inicialPrice" placeholder="Digite o preço inicial">
          <img class="priceImg" src="@/assets/Price.png"/>
        </div>
      </div>
      <div class="priceFinal">
        <div class="subtitle"><p>* Preço Final (BRL)</p></div>
        <div class="priceInput">
          <input class="inputTextPrice" type="text" id="finalPrice" v-model="finalPrice" placeholder="Digite o preço final">
          <img class="priceImg" src="@/assets/Price.png"/>
        </div>
      </div>
      <div class="linkBuy">
        <div class="subtitle"><p>* Link para compra do ingresso</p></div>
        <input class="inputTextPriceLink" type="text" id="linkBuy" v-model="linkBuy" placeholder="Ex: https://minhaimagem.png">
      </div>
    </div>
  </div>
  <div class="title"><p>Imagens de divulgação</p></div>
  <div class="divulgation">
    <div class="mobileLink">
      <div class="subtitle"><p>* Link da imagem Mobile</p></div>
      <input class="inputTextLinkDivulgation" type="text" id="linkMobile" v-model="linkMobile" placeholder="Ex: https://minhaimagem.png">
    </div>
    <div class="desktopLink">
      <div class="subtitle"><p>* Link da imagem Desktop</p></div>
      <input class="inputTextLinkDivulgation" type="text" id="linkDesktop" v-model="linkDesktop" placeholder="Ex: https://minhaimagem.png">
    </div>
  </div>
  <div class="title"><p>Sustentabilidade</p></div>
  <div class="sustainability">
    <div class="sustainabilityQuests">
      <div class="subtitle"><p>O evento utilizará uma fonte de energia renovável (solar, eólica, hídrica...)?</p></div>
      <input class="inputTextLinkSustainability" type="text" id="renewableEnergy" v-model="renewableEnergy" placeholder="Responda com detalhes">
    </div>
    <div class="sustainabilityQuests">
      <div class="subtitle"><p>O evento possui um plano de gestão de resíduos que inclui coleta seletiva e reciclagem?</p></div>
      <input class="inputTextLinkSustainability" type="text" id="wasteManagement" v-model="wasteManagement" placeholder="Responda com detalhes">
    </div>
  </div>
  <div class="sustainability">
    <div class="sustainabilityQuests">
      <div class="subtitle"><p>São disponibilizadas lixeiras para coleta seletiva em locais visíveis?</p></div>
      <input class="inputTextLinkSustainability" type="text" id="visibleBins" v-model="visibleBins" placeholder="Responda com detalhes">
    </div>
    <div class="sustainabilityQuests">
      <div class="subtitle"><p>Existe alguma estratégia no evento para reduzir o desperdício de alimentos e materiais descartáveis?</p></div>
      <input class="inputTextLinkSustainability" type="text" id="reduceWaste" v-model="reduceWaste" placeholder="Responda com detalhes">
    </div>
  </div>
  <div class="sustainability">
    <div class="sustainabilityQuests">
      <div class="subtitle"><p>É possível chegar facilmente ao local do evento por meio de transporte público?</p></div>
      <input class="inputTextLinkSustainability" type="text" id="publicTransportation" v-model="publicTransportation" placeholder="Responda com detalhes">
    </div>
    <div class="sustainabilityQuests">
      <div class="subtitle"><p>Há incentivos para que os participantes utilizem meios de transporte sustentáveis?</p></div>
      <input class="inputTextLinkSustainability" type="text" id="sustainableTransportIncentive" v-model="sustainableTransportIncentive" placeholder="Responda com detalhes">
    </div>
  </div>
  <div class="sustainability">
    <div class="sustainabilityQuests">
      <div class="subtitle"><p>O evento beneficia alguma causa social ou ambiental?</p></div>
      <input class="inputTextLinkSustainability" type="text" id="socialEnvironmental" v-model="socialEnvironmental" placeholder="Responda com detalhes">
    </div>
    <div class="sustainabilityQuests">
      <div class="subtitle"><p>  O evento monitora e avalia seu impacto ambiental?</p></div>
      <input class="inputTextLinkSustainability" type="text" id="monitorImpact" v-model="monitorImpact" placeholder="Responda com detalhes">
    </div>
  </div>
  <div class="submit-button-container">
    <button class="submit-button">Enviar Evento</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { MdEditor, MdPreview } from "md-editor-v3";
import MarkdownIt from "markdown-it";
import { cityStore } from "@/store";
import type { ICity } from "@/types/ICity";
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
  showLocalSelect.value = !showLocalSelect.value
  return showLocalSelect;
}

</script>
<style scoped>
body {
  color: black;
}

.titleRegistration{
  font-family: Inter;
  font-size: 48px;
  font-weight: 700;
  line-height: 58.09px;
  text-align: center;
}

.title{
  font-family: Inter;
  font-size: 24px;
  font-weight: 700;
  line-height: 29.05px;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  color: black;
}

.subtitle{
  font-size: 24px;
  font-weight: 700;
  line-height: 29.05px;
  text-align: left;
  color: black;
  font-weight: bold;
  margin-left: 10px;
  margin-bottom: 10px;
}

.inputTextName{
  width: calc(100% - 20px);
  height: 48px;
  gap: 0px;
  border-radius: 8px;
  opacity: 0px;
  margin-left: 10px;
  padding: 10px;
}

.inputTextLinkSustainability,
.inputTextLinkDivulgation,
.inputTextPriceLink,
.inputTextAddress{
  width: calc(100% - 20px);
  height: 48px;
  gap: 0px;
  border-radius: 8px;
  border: solid 1px black;
  opacity: 0px;
  margin-left: 10px;
  padding: 10px;
}

.inputTextPrice,
.inputTextDate{
  width: calc(100% - 50px);
  height: 48px;
  gap: 0px;
  border-radius: 8px;
  opacity: 0px;
  margin-left: 10px;
  border: none;
}
.inputTextLinkSustainability,
.inputTextLinkDivulgation,
.inputTextPriceLink,
.inputTextAddress:focus,
.inputTextPrice:focus,
.inputTextDate:focus{
  outline: none;
}

.monitorImpact{
  align-items: center;
}

.sustainabilityQuests,
.mobileLink,
.desktopLink,
.inicialDate,
.finalDate{
  width: 50%;
}

.linkBuy,
.priceInicial,
.priceFinal{
  width: 33.3%;
}

.priceInput,
.dateInput{
  width: calc(100% - 20px);
  border-radius: 8px;
  border: solid 1px black;
}

.dateInput{
  display: inline-block;
  margin-left: 10px;
}

.priceInput{
  display: inline-block;
  margin-left: 10px;
}

.dontFindLocate{
  width: Fixed (327px)px;
  height: Hug (16px)px;
  gap: 10px;
  opacity: 0px;
  margin-left: 10px;
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  text-align: left;
  text-decoration: underline;
}

.registeredLocation{
  width: 100%;
  display: inline-flex
}

.localRegistration{
  width: 100%;
  display: inline-flex;
}

.citiesSelect{
  width: 50%;
}

.cep,
.maximumCapacity,
.address,
.citiesSelectRegistration{
  width: 25%;
}

.cities {
  width: calc(100% - 20px);
  height: 48px;
  top: 24px;
  gap: 0px;
  border-radius: 8px;
  opacity: 0px;
  margin-left: 10px;
}

.locateInfos,
.sustainability,
.divulgation,
.priceDefinition,
.dateInfos{
  display: flex;
  align-self: center;
}

.priceImg,
.calendarImg{
  justify-content: center;
  margin-bottom: -10px;
  margin-right: 10px;
  width: 25px;
  height: 25px;
}

.buttonPrice {
  display: flex;
  justify-content: space-between;
  background-color: #ccc;
  width: calc(100% - 20px);
  padding: 10px;
  margin-left: 10px;
  border-radius: 8px;
  border: solid black 1px;
}

.description{
  width: calc(100% - 20px);
  margin-left: 10px;
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
  background-color: #1597B1;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  outline: none;
}

.submit-button:hover {
  background-color: #1597B1;
;
}

@media (max-width: 1000px) {
  .registeredLocation,
  .localRegistration,
  .locateInfos,
  .sustainability,
  .divulgation,
  .priceDefinition,
  .dateInfos{
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
  .finalDate{
    width: 100%;
  }
}

</style>