<template>
  <div class="loading-container">
    <div class="loading-animation"><img class="logo" src="@/assets/WIG.png" alt="Logo" /></div>
  </div>
</template>

<style scoped>
.loading-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.logo {
  margin-top: -4px;
  width: 50px;
  height: auto;
  align-self: center;
}

.loading-animation {
  width: 50px;
  height: 50px;
  background-color: #1597b1;
  border-radius: 50%;
  animation: scale-up 0.5s ease-in-out infinite alternate;
}

@keyframes scale-up {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(2);
    opacity: 1;
  }
}
</style>
