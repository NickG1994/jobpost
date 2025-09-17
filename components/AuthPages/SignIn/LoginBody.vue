<template>
  <div id="login-page">
    <Alert />
    <div class="login">
      <div class="login-body">
        <div class="login-form">
          <form>
            <label class="input validator">
              <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input v-model="refEmail" type="email" placeholder="mail@site.com" required />
            </label>
            <div class="validator-hint hidden">Enter valid email address</div>
            <label class="input validator">
              <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                  ></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
              </svg>
              <input
                v-model="refPassword"
                type="password"
                required
                placeholder="Password"
                minlength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>
            <p class="validator-hint hidden">
              Must be more than 8 characters, including
              <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
            </p>
            <div class="form-group">
              <p>Forgot Password</p>
            </div>
          </form>
        </div>
      </div>
      <div class="login-bottom">
        <div>
          <button :disabled="isLoading" class="btn btn-primary" @click="submitSignIn" ><span v-if="!isLoading">Sign In</span><span v-else class="loading loading-spinner text-success"></span></button>
        </div>
        <p>Don't have an account? <NuxtLink to="/auth/SignUp">Sign Up</NuxtLink></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useMyAlertStore} from '~/store/Alert';;
const alertStore = useMyAlertStore();
import { useMyAuthStore } from '~/store/Auth';
const authStore = useMyAuthStore();

import Alert from '~/components/Alert-Component.vue';

const refEmail = ref('');
const refPassword = ref('');

const {isAuthenticated, isLoading} = storeToRefs(authStore);

watch(() => isAuthenticated.value, (newValue) => {
  if (newValue) {
    alertStore.triggerAlert('success', 'Login successful', 3000);
    // Redirect to the home page or dashboard
    navigateTo('/');
  }
}, { immediate: true });

const submitSignIn = async () => {
  try {
    if (refEmail.value && refPassword.value) {
      const response = await authStore.loginAction(refEmail.value, refPassword.value)
      console.log(response?.statusCode)
      if(response?.statusCode === 500) {
        alertStore.triggerAlert('error', 'Login failed: ' + response?.statusMessage, 3000);
      }
      else if(response?.statusCode === 401) {
        alertStore.triggerAlert('error', 'Login failed: ' + response?.statusMessage, 3000);
      }
      else {
        // Successful login is handled by the watcher above
        return
      }
    } else {
      alertStore.triggerAlert('error', 'Please fill in all fields and agree to the terms!',3000);
      return
    }
  } catch (error) {
    alertStore.triggerAlert('error', 'Login failed: ' + error.message, 3000);
  }


};
</script>

<style>
@reference "tailwindcss";

#login-page {
  @apply flex items-center justify-center h-screen p-22;
}
.login {
  @apply flex flex-col bg-white shadow-lg rounded-lg p-8 w-96 h-[100%] justify-between;
}
.login-body {
  @apply mb-6;
}
.login-form {
  @apply space-y-4;
}
.input {
  @apply flex items-center border border-gray-300 rounded-md p-2 mb-4;
}
.input input {
  @apply flex-1 outline-none;
}
.validator {
  @apply relative;
}   
.login-bottom {
  @apply flex gap-4 flex-col mt-4;
}
.btn {
  @apply w-[100%];
}
</style>