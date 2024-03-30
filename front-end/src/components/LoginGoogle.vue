<script setup lang="ts">
import { onMounted } from "vue";
import { decodeCredential, googleOneTap } from "vue3-google-login";
import { userStore } from "../store";

const callback = (response) => {
  const userData = decodeCredential(response.credential);
  localStorage.setItem("credential", response.credential);
  userStore.loggedIn = true;
  userStore.name = userData.name;
  userStore.email = userData.email;
  userStore.profilePicture = userData.picture;
};

const logout = () => {
  localStorage.removeItem("credential");
  userStore.loggedIn = false;
  userStore.name = "";
  userStore.email = "";
  userStore.profilePicture = "";
};

onMounted(() => {
  const credential = localStorage.getItem("credential");
  try {
    callback({ credential });
    if (credential) {
      googleOneTap(credential, callback);
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<template>
  <div>
    <div v-if="!userStore.loggedIn">
      <GoogleLogin :callback="callback" auto-login />
    </div>
    <button v-else @click="logout">Logout</button>

    <div v-if="userStore.loggedIn">
      <p>Name: {{ userStore.name }}</p>
      <p>Email: {{ userStore.email }}</p>
    </div>
  </div>
</template>
