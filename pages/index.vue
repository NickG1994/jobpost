<template>
  <div class="flex flex-col min-h-screen">
    <NuxtLayout
      name="main"
      class="
        px-4
        sm:px-8
        md:px-16
        lg:px-32
        xl:px-48
        2xl:px-16
        py-4
        w-full
        max-w-screen-2xl
        mx-auto
      "
    >
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