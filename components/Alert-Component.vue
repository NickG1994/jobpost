<template>
  <div v-if="alert.message" class="alert show-alert" :class="`alert-${alert.type}`">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <p class="alert-message">{{ alert.message }}</p>
  </div>
</template>

<script lang="ts" setup>
import  {useMyAlertStore} from '~/store/Alert';
const myAlertStore = useMyAlertStore();
const {alert} = storeToRefs(myAlertStore);
</script>

<style scoped>
@reference "tailwindcss";
.alert {
  @apply transition-all duration-300 ease-in-out fixed top-4 right-4 left-4 z-50 px-4 py-3 rounded fixed;
}
.show-alert {
  @apply opacity-100 pointer-events-auto;
}
.hide-alert {
  @apply opacity-0 pointer-events-none;
}
.alert-message {
  @apply text-sm text-white;
}
</style>