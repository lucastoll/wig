<template>
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
  </div>
</template>

<script>
import { debounce } from 'lodash';
import CheckIcon from '@/assets/Check.png';

export default {
  data() {
    return {
      searchQuery: '',
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
      // Implemente aqui a lógica para atualizar a requisição após 4 segundos sem digitar
      console.log('Atualizando requisição...');
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
    }
  },
};
</script>


<style scoped>
.arrow {
  content: "";
  position: absolute;
  left: auto;
  right: 51px;
  transform: none;
  width: 0;
  height: 0;
  top: 102px;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #000000;
}


.search-container {
  display: flex;
  margin-top: 10px;
  justify-content: center;
  flex-direction: column;
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
}

.filter-options {
  width: fit-content;
  min-width: 233px;
  height: 130px;
  padding: 10px;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: flex-end;
  align-items: flex-start;
  border: 1px solid #000000;
  border-radius: 4px;
}

.filter-option {
  padding: 5px;
  width: 100%;
  cursor: pointer;
  align-self: flex-start;
  color: black;
  position: relative;
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
</style>
