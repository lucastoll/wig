<template>
  <div class="footer">
    <div class="all-events-container">
      <p class="all-events">Todos os eventos</p>
      <p>-></p>
    </div>
    <div class="container">
      <div class="custom-field">
        <p class="title">Cadastro de eventos</p>
        <p class="text-field">
          Você é um organizador de eventos buscando divulgar seu evento em
          Sorocaba?
        </p>
        <button class="custom-button" @click="faleConosco">
          {{ buttonText }}
        </button>
      </div>
    </div>
    <p class="rights-reserved">WIG 2024 © - Todos os direitos reservados</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const buttonText = ref("Fale Conosco");

const faleConosco = () => {
  console.log("Botão 'Fale Conosco' clicado!");
};
</script>

<style scoped>
.footer {
  padding-left: 16px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.all-events {
  text-decoration: underline;
}

.all-events-container {
  display: flex;
  align-items: center;
  color: #000000;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.custom-field {
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid black;
  background-color: #1597b1;
  width: 320px;
  height: 170px;
}
.custom-button {
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  width: 280px;
  height: 40px;
  color: black;
  cursor: pointer;
  background: linear-gradient(to right, #d8d8d8 50%, #249eb6 100%);
}

.custom-button:hover {
  background-color: #f0f0f0;
}

.title,
.text-field {
  text-align: left;
  color: white;
  margin-left: 10px;
  margin-right: 10px;
}

.rights-reserved {
  text-align: center;
  color: black;
  font-size: 15px;
  margin-top: 20px;
}

@media screen and (min-width: 1024px) {
  .footer {
    align-items: center;
  }

  .all-events-container {
    width: 100%;
    max-width: 1280px;
    margin-left: 20px;
  }

  .container {
    justify-content: flex-start;
    max-width: 1280px;
    width: 100%;
    margin-left: 20px;
  }
}
</style>
