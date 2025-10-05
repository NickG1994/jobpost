<template>
  <div v-if="isAuthenticated">
    <div class="navbar bg-base-100 shadow-sm flex justify-between">
      <!-- Logo -->
      <div>
        <NuxtLink to="/" btn btn-ghost text-xl>daisyUI</NuxtLink> 
      </div>

      <!-- Profile Dropdown -->
      <div class="flex gap-2">
        <div class="max-sm:dropdown max-sm:dropdown-end sm:flex sm:flex-row-reverse sm:items-center">
          <div tabindex="0" role="button" class="max-sm:btn max-sm:btn-ghost max-sm:btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content md:dropdown-open bg-base-100 rounded-box z-10 mt-3 max-sm:w-52 p-2 shadow sm:flex sm:flex-row sm:gap-2 sm:items-center sm:width-fit sm:block" 
          >
            <li>
              <NuxtLink to="Dashboard" class="justify-between">
                Profile
              </NuxtLink> 
            </li>
            <li><a>Settings</a></li>
            <li v-if="user.userType === 'employer'"><a>My Company</a></li>
            <li v-on:click="logout"><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="border-t-2 border-gray-300 my-4"/>
  </div>
</template>

<script lang="ts" setup>
import { useMyAuthStore } from '~/store/Auth';
const authStore = useMyAuthStore();
const { isAuthenticated, user } = storeToRefs(authStore);

const logout = async () => {
  await authStore.logoutAction();
};
</script>

<style>
@import "tailwindcss";

/* Hover effect for menu items */
.menu li a:hover {
  @apply bg-blue-100 text-gray-800;
}

/* Hide the search icon when the input is focused */
.relative:focus-within .search-icon {
  @apply opacity-0;
  transition: opacity 0.2s ease-in-out;
}

/* Ensure the search icon is visible by default */
.search-icon {
  @apply absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10 opacity-100;
  transition: opacity 0.2s ease-in-out;
}
</style>