<template>
  <div class="search-container">
    <div class="search-bar">
      <i class="search-icon">
        <img src="@/assets/Search.png" alt="Search icon"
      /></i>
      <input
        type="text"
        v-model="searchQuery"
        @input="debouncedSearch"
        placeholder="Pesquisar..."
        class="search-input"
      />
      <i class="filter-icon" @click="toggleFilters"
        ><img src="@/assets/Vector.png" alt="Search icon"
      /></i>
    </div>
    <div v-if="showFilters" class="filter-options">
      <div class="arrow"></div>
      <p class="title-filter">Filtrar por:</p>
      <div
        class="filter-option"
        v-for="(option, index) in filterOptions"
        :key="index"
        @click="toggleFilter(index)"
      >
        {{ option.label }}
        <img
          v-if="selectedFilterIndex === index"
          :src="option.image"
          alt="Selected filter"
          class="selected-filter-image"
        />
      </div>
    </div>
    <p v-if="searchQuery" class="search-results">
      Resultados de busca para: <b>{{ searchQuery }}</b>
    </p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import debounce from "lodash/debounce";
import CheckIcon from "@/assets/Check.png";
import { userStore } from "@/store";

const emit = defineEmits(["update:searchQuery", "update:filter"]);

const searchQuery = ref("");
const showFilters = ref(false);
const selectedFilterIndex = ref<number>(0);
const selectedFilter = ref<string>("date");
const filterOptions = ref([{ label: "Data Atual", image: CheckIcon }]);

onMounted(() => {
  if (userStore.loggedIn) {
    filterOptions.value.push({ label: "Categorias", image: CheckIcon });
    filterOptions.value.push({ label: "Distância", image: CheckIcon });
  } else {
    filterOptions.value = [{ label: "Data", image: CheckIcon }];
  }
});

watch(userStore, () => {
  if (userStore.loggedIn) {
    filterOptions.value.push({ label: "Categorias", image: CheckIcon });
    filterOptions.value.push({ label: "Distância", image: CheckIcon });
  } else {
    filterOptions.value = [{ label: "Data", image: CheckIcon }];
  }
});

const debouncedSearch = debounce(() => {
  emit("update:searchQuery", searchQuery.value);
}, 1750);

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const toggleFilter = (index: number) => {
  switch (index) {
    case 0:
      selectedFilter.value = "date";
      break;
    case 1:
      selectedFilter.value = "categories";
      break;
    case 2:
      selectedFilter.value = "distance";
      break;
  }

  selectedFilterIndex.value = index;
  emit("update:filter", selectedFilter.value);
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
  top: -9px;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #000000;
}

.search-container {
  display: flex;
  margin-top: 10px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.search-bar {
  display: flex;
  align-self: center;
  align-items: center;
  width: calc(100% - 80px);
  border-radius: 8px;
  border: solid #e3e5e5 1px;
  background-color: white;
  max-width: calc(1280px - 64px);
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

.search-icon {
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
  margin-left: 42px;
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  margin-top: 10px;
  max-width: 1280px;
  padding: 0 16px;
  width: 100%;
}

@media screen and (min-width: 1024px) {
  .filter-options {
    z-index: 20;
    position: absolute;
    width: fit-content;
    min-width: 233px;
    top: 140px;
    padding: 10px;
    margin-right: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-self: flex-end;
    align-items: flex-start;
    border: 1px solid #000000;
    background-color: white;
    border-radius: 4px;
  }
}

@media screen and (min-width: 1280px) {
  .filter-options {
    right: calc((100vw - 1310px) / 2);
  }
}
</style>
