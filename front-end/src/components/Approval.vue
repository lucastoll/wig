<script setup lang="ts">
import PopupApproval from "@/components/PopupApproval.vue";
import PopupDisapprove from "@/components/PopupDisapprove.vue";
import { ref } from "vue";
const isOpenApproval = ref<boolean>(false);
const isOpenDecline = ref<boolean>(false);
const sustentabilityPoints = ref<number>(0);
</script>

<template>
  <div class="approval">
    <PopupApproval
      @close="isOpenApproval = false"
      :isOpenApproval="isOpenApproval"
    />
    <PopupDisapprove
      @close="isOpenDecline = false"
      :isOpenDecline="isOpenDecline"
    />
    <div class="text">O que achou do evento?</div>
    <button class="approved" @click="isOpenApproval = true">Aprovar</button>
    <button class="decline" @click="isOpenDecline = true">Reprovar</button>
  </div>
</template>
<style>
.approval {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  background-color: none;
  position: fixed;
  gap: 3px;
  bottom: 50px;
  z-index: 2;
  padding: 0 10px 0 10px;
}
.approved,
.decline {
  border: none;
  outline: none;
}

.approved {
  background-color: #38a149;
  border-radius: 24px;
  width: 50%;
  height: 36px;
  color: white;
}
.decline {
  background-color: #8c0000;
  border-radius: 24px;
  width: 50%;
  height: 36px;
  color: white;
}

.text {
  display: none;
}
@media screen and (min-width: 1024px) {
  .text {
    display: block;
    color: black;
    display: flex;
    flex-direction: column;
  }
  .approval {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-end;
    align-items: flex-end;
    position: fixed;
    gap: 3px;
    bottom: 0px;
    background: none;
    z-index: 2;
    padding: 16px;
  }
  .approved,
  .decline {
    max-width: 150px;
  }
}
</style>
