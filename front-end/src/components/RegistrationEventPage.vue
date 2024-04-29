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
    <MdPreview :editorId="id" :modelValue="text" />
  </div>
  <div class="title"><p>Locais</p></div>
  <div class="dontFindLocate"><p>Não encontrou o local? Cadastre um.</p></div>
  <div class="locateInfos">
    <div class="citiesSelect">
      <div class="subtitle"><p>* Cidade</p></div>
      <select class="cities" v-model="cityStore.id" @change="changeCity">
        <option v-for="city in cities" :key="city.id" :value="city.id">
          {{ city.name }}
        </option>
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
    <div class="CEP">
      <div class="subtitle"><p>* CEP</p></div>
      <input class="inputTextAddress" type="text" id="cep" v-model="cep" placeholder="Ex: 18023-442">
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
      <div class="dateInput">
        <input class="inputTextDate" type="text" id="inicialFinal" v-model="inicialFinal" placeholder="Digite a data final">
        <img class="calendarImg" src="@/assets/Calendar.png"/>
      </div>
    </div>
  </div>
  <div class="title"><p>Ingressos</p></div>
  <div class="bottonPrice">
    <button 
      class="optionButton" 
      :class="{ 'selected': isYesSelected }" 
      @click="selectYes"
    >
      Sim
    </button>
    <button 
      class="optionButton" 
      :class="{ 'selected': !isYesSelected }" 
      @click="selectNo"
    >
      Não
    </button>
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

watch(text, (newVal) => {
  console.log(newVal);
});

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

</script>
<style>
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
}

.subtitle{
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  text-align: left;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-top: 10px;
}

.inputTextName{
  width: 1280px;
  height: 48px;
  gap: 0px;
  border-radius: 8px;
  opacity: 0px;
  margin-left: 10px;
  padding: 10px;
}

.inputTextAddress{
  width: 300px;
  height: 48px;
  gap: 0px;
  border-radius: 8px;
  opacity: 0px;
  margin-left: 10px;
  padding: 10px;
}

.inputTextDate{
  width: 300px;
  height: 48px;
  gap: 0px;
  border-radius: 8px;
  opacity: 0px;
  margin-left: 10px;
  border: none;
}

.inputTextDate:focus{
  border: none;
  outline: none;
}

.dateInput{
  border-radius: 8px;
  border: solid 1px black;
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

.cities {
  width: 327px;
  height: 48px;
  top: 24px;
  gap: 0px;
  border-radius: 8px;
  opacity: 0px;
  margin-left: 10px;
}

.locateInfos{
  display: flex;
}

.dateInfos{
  display: inline-block;
}

.dateInput{
  display: inline-block;
  margin-left: 10px;
}

.calendarImg{
  align-self: center;
  justify-content: center;
  margin-bottom: -10px;
  margin-right: 10px;
  width: 25px;
  height: 25px;
}

.bottonPrice {
  display: flex;
  justify-content: space-between;
}

.optionButton {
  flex: 1;
  height: 60px;
  background-color: #ccc;
  color: black;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.optionButton.selected {
  background-color: white;
}

/* Estilo para ocupar a largura da página */
@media (max-width: 1280px) {
  .optionButton {
    width: 100%;
  }
}

</style>