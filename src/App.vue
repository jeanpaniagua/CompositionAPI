<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import compositionAPI from "./components/compositionAPI.vue";
import optionsAPI from "./components/optionsAPI.vue";
import scriptSetup from "./components/scriptSetup.vue";
</script>

<template>
  <compositionAPI variant="primary" toggle>Composition API</compositionAPI>
  <optionsAPI variant="primary" toggle>Options API</optionsAPI>
  <script-setup variant="primary" toggle>Script Setup</script-setup>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
