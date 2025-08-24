<template>
  <div class="flex flex-col h-screen">
      <HomeHeader />

    <div class="flex-1 flex">
      <HomeBody />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import HomeBody from '../components/homePage/HomeBody.vue';
  import HomeHeader from '../components/homePage/HomeHead.vue';
</script>

<style>

</style>