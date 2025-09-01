<script lang="ts" setup>
import Alert from '~/components/Alert-Component.vue';
import {useMyAlertStore} from '~/store/Alert';
const myAlertStore = useMyAlertStore();
import { useMyAuthStore } from '~/store/auth';
const authStore = useMyAuthStore();

const refUsername = ref(null);
const refEmail = ref(null);
const refPassword = ref(null);
const refAgreement = ref(false);

const submitErrors = ref<string>(null);
const elHint = ref([])

const SubmitSignUp = async () => { 
  if (refUsername.value && refEmail.value && refPassword.value) {
    // Check agreement
    if (refAgreement.value !== true) {
      submitErrors.value = "You must agree to the terms and conditions.";
      myAlertStore.triggerAlert('warning', submitErrors.value, 3000);
      return;
    }

    try {
      const response = await authStore.signUp(
        refEmail.value,       // 📝 make sure order matches your store
        refUsername.value, 
        refPassword.value, 
        'user'
      );

      if (response.status === 'error' || response.statusCode >= 400) {
        // Show backend error
        submitErrors.value = response.message || "Sign up failed. Please try again.";
        console.error("Sign up failed:", response.data);
        myAlertStore.triggerAlert('error', submitErrors.value, 4000);
        return;
      }

      submitErrors.value = null;
      myAlertStore.triggerAlert('success', 'Sign up successful! You can now log in.', 4000);

      // Reset form fields
      refUsername.value = null;
      refEmail.value = null;
      refPassword.value = null;
      refAgreement.value = false;
      $router.push('/');


    } catch (err: any) {
      // Handle fetch/network errors
      const message = err.response?.message || err.message || "Unexpected signup error";
      const code = err.response?.statusCode || 500;
      submitErrors.value = `[${code}] ${message}`;
      console.error("Sign up failed (catch):", submitErrors.value);
      myAlertStore.triggerAlert('error', submitErrors.value, 4000);
    }
  } else {
    // Missing fields
    submitErrors.value = "Please fill in all fields and agree to the terms!";
    console.error(submitErrors.value);
    myAlertStore.triggerAlert('error', submitErrors.value, 3000);
  }
};

</script>

<template>
  <main>
    <Alert />
    <div id="sign-up-page" >
    <div class="sign-up">
        <div class="sign-up-body">
            <form class="sign-up-form">
                <div id="username" class="form-group">
                    <label class="input validator">
                      <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                          stroke-linejoin="round"
                          stroke-linecap="round"
                          stroke-width="2.5"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </g>
                      </svg>
                      <input
                      v-model="refUsername"
                        type="text"
                        required
                        placeholder="Username"
                        pattern="[A-Za-z][A-Za-z0-9\-]*"
                        minlength="3"
                        maxlength="30"
                        title="Only letters, numbers or dash"
                      />
                    </label>
                    <p :ref="(el) => {elHint.push(el)}" class="validator-hint hidden">
                      Must be 3 to 30 characters
                      <br />containing only letters, numbers or dash
                    </p>
                </div>
                <div id="email" class="form-group">
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
                </div>
                <div id="password" class="form-group">
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
                </div>
                <div id="agreement" class="form-group">
                  <label class="label">
                    <input v-model="refAgreement" type="checkbox" checked="checked" class="checkbox" />
                    <p class="agreement-msg">I have read and agree to the privacy policy and terms.</p>
                  </label>
                </div>
            </form>
        </div>
        <div class="sign-up-bottom">
            <div>
              <button @click="SubmitSignUp" class="btn btn-primary">Sign Up</button>
            </div>
            <div>
              <p class="text-sm">
                Already have an account? <a href="/auth/SignIn" class="text-blue-500 hover:underline">Log in</a>
              </p>
              <p class="forgot-password">
                <a href="/forgot-password" class="text-blue-500 hover:underline">Forgot password?</a>
              </p>
            </div>
        </div>
    </div>
    </div>
  </main>
</template>

<style scoped>
@reference "tailwindcss";
#sign-up-page {
  @apply flex justify-center h-screen  p-22;
}
.sign-up {
  @apply flex flex-col justify-between w-96 max-w-md p-6 bg-white rounded-lg shadow-lg h-[100%];
}
.sign-up-form {
  @apply flex flex-col;
} 
.input {
  @apply flex items-center border rounded-md focus-within:border-blue-500 w-full;
}
.validator {
  @apply relative;
}
.validator-hint {
  @apply text-xs text-blue-500;
}
.agreement-msg {
  @apply break-all;
}
.checkbox {
  @apply w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500;
}
.sign-up-bottom {
  @apply flex flex-col gap-4;
}
.agreement-msg {
  @apply sm:text-sm;
}
</style>