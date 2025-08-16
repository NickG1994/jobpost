<template>
  <div v-if="Auth.isAuthenticated" class="pl-32 pr-32">
    <div class="navbar bg-base-100 shadow-sm flex justify-between">
      <!-- Logo -->
      <div>
        <a class="btn btn-ghost text-xl">daisyUI</a>
      </div>

      <!-- Search Bar -->
      <div class="relative w-full max-w-xs">
        <span class="search-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          class="input input-bordered w-full pl-10 mb-0!"
        />
      </div>

      <!-- Profile Dropdown -->
      <div class="flex gap-2">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMyAuthStore } from '~/store/Auth';
const authStore = useMyAuthStore();
const { Auth } = storeToRefs(authStore);
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