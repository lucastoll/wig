<script setup>
import { ref, onMounted } from "vue";
import { decodeCredential, googleOneTap } from "vue3-google-login";

const user = ref({ loggedIn: false });

const callback = (response) => {
  const userData = decodeCredential(response.credential);
  localStorage.setItem("credential", response.credential);
  user.value = {
    loggedIn: true,
    name: userData.name,
    email: userData.email,
    profilePicture: userData.picture,
  };
  console.log(user.value);
};

const logout = () => {
  localStorage.removeItem("credential");
  user.value = { loggedIn: false };
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
    <div v-if="user.loggedIn === false">
      <GoogleLogin :callback="callback" auto-login />
    </div>
    <button v-else @click="logout">Logout</button>

    <div v-if="user">
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>
