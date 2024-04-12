<template>
    <div class="search-container">
      <div class="search-bar">
        <i class="fas fa-search search-icon">a</i>
        <input
          type="text"
          v-model="searchQuery"
          @input="debouncedSearch"
          placeholder="Pesquisar..."
          class="search-input"
        />
        <i class="fas fa-filter filter-icon" @click="toggleFilters">a</i>
      </div>
      <div v-if="showFilters" class="filter-options">
        <!-- Opções de filtro -->
        <div class="filter-option">Filtro 1</div>
        <div class="filter-option">Filtro 2</div>
        <div class="filter-option">Filtro 3</div>
      </div>
    </div>
  </template>
  
  <script>
  import { debounce } from 'lodash';
  
  export default {
    data() {
      return {
        searchQuery: '',
        showFilters: false,
      };
    },
    methods: {
      debouncedSearch: debounce(function () {
        // Implemente aqui a lógica para atualizar a requisição após 4 segundos sem digitar
        console.log('Atualizando requisição...');
      }, 4000),
      toggleFilters() {
        this.showFilters = !this.showFilters;
      },
    },
  };
  </script>
  
  <style scoped>
  .search-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .search-bar {
    display: flex;
    align-items: center;
    border-radius: 20px;
    background-color: white;
  }
  
  .search-input {
    border: none;
    width: calc(100% - 80px);
    padding: 10px;
    border-radius: 20px;
  }
  
  .search-icon,
  .filter-icon {
    padding: 10px;
    cursor: pointer;
  }
  
  .filter-options {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  
  .filter-option {
    padding: 5px;
    cursor: pointer;
  }
</style>
  