<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { userStore } from "@/store";
import { login } from "@/helpers/login";
import { logout } from "@/helpers/logout";

const loggedIn = ref(userStore.loggedIn ?? undefined);

const updateValues = ([newLoggedIn, newName]: [
  boolean | undefined,
  string | undefined
]) => {
  loggedIn.value = newLoggedIn;
};

onMounted(() => {
  updateValues([userStore.loggedIn, userStore.name]);
});

watch([() => userStore.loggedIn, () => userStore.name], updateValues);
</script>

<template>
  <div>
    <div v-if="!loggedIn">
      <GoogleLogin :callback="login" auto-login />
    </div>
    <div class="loginGoogle__logout" v-else>
      <img
        alt="Sair da conta"
        src="@/assets/Leave.svg"
        width="20"
        height="20"
      />
      <span @click="logout">Sair da conta</span>
    </div>
  </div>
</template>
<style scoped>
.loginGoogle__logout {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.loginGoogle__logout {
  color: red;
  text-decoration: underline;
}
</style>
