<script setup>
import GlobalHeader from './components/GlobalHeader.vue';
</script>
<template>
  <div id="app-page">
    <GlobalHeader />
    <div class="md:px-16 lg:pl-6 lg:pr-6 pt-4 pb-4">
      <NuxtPage/>
    </div>
  </div>
</template>
<style src="./assets/css/app.css">
</style>