<template>
    <div>
      <div class="custom-field">
        <input type="text" placeholder="Digite sua mensagem...">
        <button @click="faleConosco">Fale Conosco</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      faleConosco() {
        console.log("Botão 'Fale Conosco' clicado!");
      }
    }
  };
  </script>
  
  <style scoped>
  .custom-field {
    display: inline-block;
    position: relative;
  }
  
  .custom-field input[type="text"] {
    padding: 10px;
    border-radius: 20px;
    border: none;
    background-color: blue;
    color: white;
  }
  
  .custom-field button {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    background-color: white;
    color: blue;
    cursor: pointer;
  }
  
  .custom-field button:hover {
    background-color: #f0f0f0;
  }
  </style>
  