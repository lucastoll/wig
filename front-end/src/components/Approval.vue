<script setup lang="ts">
import PopupApproval from "@/components/PopupApproval.vue";
import PopupDisapprove from "@/components/PopupDisapprove.vue";
import { ref } from "vue";
const isOpenApproval = ref<boolean>(false);
const isOpenDecline = ref<boolean>(false);
</script>

<template>
 <div class="approval">
  <PopupApproval :isOpenApproval="isOpenApproval"/>
  <PopupDisapprove :isOpenDecline="isOpenDecline"/>
    <button class="approved" @click="isOpenApproval=true"> aprovar </button>
    <button class="decline" @click="isOpenDecline=true"> reprovar </button>
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
