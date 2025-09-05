<template>
  <div>
    <GlobalHeader/>
    <Alert />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import GlobalHeader from '../components/GlobalHeader.vue';
import Alert from '../components/Alert-Component.vue';
</script>

<style>

</style>


