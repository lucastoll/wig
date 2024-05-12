<script setup lang="ts">
import Popup from "@/components/PopupApproval.vue";
import { ref } from "vue";
const isOpen = ref<boolean>(false);
</script>

<template>
 <div class="approval">
  <Popup :isOpen="isOpen"/>
    <button class="approved" @click="isOpen=true"> aprovar </button>
    <button class="decline"> reprovar </button>
 </div>
</template>
<style>
.approval{
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  background-color: none;
  position: fixed;
  gap:3px;
  bottom: 50px;
  z-index: 2;
  padding: 0 10px 0 10px;
}
.approved{
  background-color: #38A149;
  border-radius: 20px;
  width: 50%;
  height: 36px;
  color:white;
  border: 2px solid black;
}
.decline{
  background-color: #8C0000;
  border-radius: 20px;
  width: 50%;
  height: 36px;
  color:white;
  border: 2px solid black;
}
</style>
