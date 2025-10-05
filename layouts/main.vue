<template>
  <div>
    <GlobalHeader />
    <Alert />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import Alert from '../components/Alert-Component.vue';
import GlobalHeader from '../components/GlobalHeader.vue';
</script>

<style>
.page-enter-active,
.page-leave-active
{
  transition: 0.4s all;
}
.page-enter-from,
.page-leave-to {
  opacity:0;
  filter:blur(1rem);
}
</style>


