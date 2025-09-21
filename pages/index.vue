<template>
  <div class="flex flex-col min-h-screen">
    <HomeHeader />
    <div v-if="isLoading" class="flex justify-center items-center my-10">
      <span class="loading loading-dots loading-xl"></span>
    </div>
    <div v-else>
      <HomeBody />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import HomeBody from '../components/homePage/HomeBody.vue';
import HomeHeader from '../components/homePage/HomeHead.vue';
import { useMyAuthStore } from '@/store/Auth';

const authStore = useMyAuthStore();
const { isLoading } = storeToRefs(authStore);

</script>

<style>
/* Add any custom styles here */
</style>