<template>
<<<<<<< HEAD
  <div class="search-container">
    <div class="search-bar">
      <i class="fas fa-search search-icon"> <img src="@/assets/Search.png" alt="Search icon"/></i>
      <input
        type="text"
        v-model="searchQuery"
        @input="debouncedSearch"
        placeholder="Pesquisar..."
        class="search-input"
      />
      <i class="fas fa-filter filter-icon" @click="toggleFilters"><img src="@/assets/Vector.png" alt="Search icon"/></i>
    </div>
    <div v-if="showFilters" class="filter-options">
      <div class="arrow"></div>
      <p class="title-filter">Filtrar por: </p>
      <div class="filter-option" v-for="(option, index) in filterOptions" :key="index" @click="toggleFilter(index)">
        {{ option.label }}
        <img v-if="selectedFilters.includes(index)" :src="option.image" alt="Selected filter" class="selected-filter-image" />
      </div>
    </div>
    <p v-if="searchQuery" class="search-results">
      Resultados de busca para: <b>{{ searchQuery }}</b>
    </p>
    <div v-if="searchResults.length === 0 && searchQuery !== ''" class="no-results">
      <img src="@/assets/NothingFound.png" alt="No results found" class="no-results-image"/>
      <p class="no-results-text">Oops! Parece que nenhum evento foi encontrado.</p>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';
import CheckIcon from '@/assets/Check.png';

export default {
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      showFilters: false,
      selectedFilters: [],
      filterOptions: [
        { label: 'Categorias em comum', image: CheckIcon },
        { label: 'Menor distância', image: CheckIcon },
        { label: 'Data Atual', image: CheckIcon }
      ]
    };
  },
  methods: {
    debouncedSearch: debounce(function () {
      // Realize a busca aqui, mas não atualize os resultados de busca diretamente
      // Em vez disso, mantenha o texto da consulta mesmo se não houver resultados
      this.searchResults = this.performSearch();
    }, 4000),
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    toggleFilter(index) {
      const filterIndex = this.selectedFilters.indexOf(index);
      if (filterIndex === -1) {
        this.selectedFilters = [index];
      } else {
        this.selectedFilters.splice(filterIndex, 1);
      }
    },
    performSearch() {
      // Aqui você deve implementar a lógica para realizar a busca
      // Retorne os resultados da busca (ou uma lista vazia se não houver resultados)
      // Por enquanto, estou retornando uma lista vazia como exemplo
      return [];
    }
  },
};
</script>

<style scoped>
.arrow {
  content: "";
  position: absolute;
  left: auto;
  right: 13px;
  transform: none;
  width: 0;
  height: 0;
  margin-top: -138px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #000000;
}


.search-container {
  display: flex;
  margin-top: 10px;
  justify-content: center;
  flex-direction: column;
  align-self: center;
}

.search-bar {
  display: flex;
  align-self: center;
  align-items: center;
  width: calc(100% - 80px);
  border-radius: 8px;
  border: solid #E3E5E5 1px;
  background-color: white;
}

.search-input {
  border: none;
  width: calc(100% - 80px);
  padding: 10px;
  border-radius: 20px;
}

.search-input:focus {
  border: none;
  outline: none;
}

.search-icon{
margin-top: 5px;
}

.search-icon,
.filter-icon {
  padding: 10px;
  cursor: pointer;
}

.title-filter {
  color: black;
  align-self: flex-start;
  font-family: Inter;
  font-size: 18px;
  font-weight: 500;
  line-height: 16px;
  text-align: left;
  margin-top: 5px;
}

.filter-options {
  z-index: 20;
  position: absolute;
  width: fit-content;
  min-width: 200px;
  top: 110px;
  height: 130px;
  padding: 10px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: flex-end;
  align-items: flex-start;
  border: 1px solid #000000;
  background-color: white;
  border-radius: 4px;
}

@media screen and (min-width: 1024px) {
  .filter-options {
    z-index: 20;
    position: absolute;
    width: fit-content;
    min-width: 233px;
    top: 140px;
    height: 130px;
    padding: 10px;
    margin-right: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: flex-end;
    align-items: flex-start;
    border: 1px solid #000000;
    background-color: white;
    border-radius: 4px;
  }  
}

.filter-option {
  padding: 5px;
  width: 100%;
  cursor: pointer;
  align-self: flex-start;
  color: black;
  position: relative;
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 14px;
  margin-top: 8px;
}

.selected-filter-image {
  width: 13px;
  height: 13px;
  margin-left: 5px;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
}

.search-results {
  color: black;
  align-self: left;
  margin-left: 42px;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  margin-top: 10px;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.no-results-image {
  width: 80%;
  height: auto;
}

.no-results-text {
  margin-top: 10px;
  text-align: center;
  font-family: Inter;
  font-size: 18px;
  padding-left: 5px;
  padding-right: 5px;
  color: black;
}

</style>
=======
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
  
>>>>>>> 94255d3 (feach: seach-bar)
