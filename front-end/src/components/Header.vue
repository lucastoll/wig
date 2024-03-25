<script setup lang="ts">
</script>
<template>
    <div class="header">
        <img
        alt="Logo site"
        class="logo"
        src="@/assets/WIG.svg"
        width="30"
        height="30"
    />
    <div class ="logomeio">
    <img
        alt="Logo site"
        class="logo"
        src="@/assets/Locais.svg"
        width="20"
        height="20"
    />
    <span class ="cidade">Sorocaba</span>
</div>
    <img
        alt="Logo site"
        class="logo"
        src="@/assets/Direita.svg"
        width="20"
        height="20"
    />
    </div>
</template>

<style>

.header{
display:flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
background-color: #1597B1;
position: fixed;
top: 1;
width: 100%;
height: 49px;
padding-left: 16px;
padding-right: 16px;
}
.logomeio{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap:5px;
    color:white;
  
}
</style>