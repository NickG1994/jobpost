<template>
  <div class="flex flex-col h-screen pl-92 pr-92">
    <NuxtLayout>
      <HomeHeader />
      <HomeBody />
    </NuxtLayout> 
  </div>
</template>

<script lang="ts" setup>
  import HomeBody from '../components/homePage/HomeBody.vue';
  import HomeHeader from '../components/homePage/HomeHead.vue';
</script>

<style>

</style>