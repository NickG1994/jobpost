<template>
  <div class="bg-base-100 p-6 rounded-lg shadow-md">
    <!-- Input Fields -->
    <div class="container flex gap-4">
      <div class="justify-between items-center gap-4 mb-12 w-full input pr-0!">
        <!-- Search Input -->
        <label class="flex gap-2 basis-full">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search"  placeholder="Search" />
        </label>

        <!-- Vertical Line Separator -->
        <div class="h-5 w-px bg-gray-300"></div>

        <!-- Location Input -->
        <label class="flex gap-2 basis-full">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" class="grow" placeholder="location" />
        </label>
      </div>
      <button class="btn btn-outline w-auto! basis-auto! ml-auto border-3 inline-block">Search</button>
    </div>
    <!-- Filter Buttons -->
    <div class="flex gap-4 mt-4 w-full">
      <button class="btn btn-primary w-auto! basis-auto">Full-Time</button>
      <button class="btn btn-secondary w-auto! basis-auto">Part-Time</button>
      <button class="btn btn-outline w-auto! basis-auto">Remote</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
/* Add custom styles if needed */
</style>