<script lang="ts" setup>
import SignUpBody from '~/components/AuthPages/SignUp/SignUpBody.vue';
</script>
<template>
  <div id="signup-page">
  <NuxtLayout name="Signin-Signup" class="flex justify-center">
    <SignUpBody />
  </NuxtLayout>
  </div>
</template>
<script scoped lang="ts">
  import SigninSignup from '~/layouts/Signin-Signup.vue';
</script> 
<style scoped>
</style>