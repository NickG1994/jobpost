<template>
  <div class="bg-base-100 p-6 pl-92 pr-92 rounded-lg shadow-md">
    <!-- Input Fields -->
<!-- Container -->
<div class="whitespace-nowrap text-base">

  <!-- Search Input -->
  <label class="inline-block align-middle mr-4">
    <svg class="inline h-4 opacity-50 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </g>
    </svg>
    <input type="search" placeholder="Search" class="inline-block align-middle border rounded px-2 py-1"/>
  </label>

  <!-- Vertical Line Separator -->
  <div class="inline-block align-middle w-px h-5 bg-gray-300 mx-4"></div>

  <!-- Location Input -->
  <label class="inline-block align-middle mr-4">
    <svg class="inline h-4 opacity-50 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </g>
    </svg>
    <input type="search" placeholder="Location" class="inline-block align-middle border rounded px-2 py-1"/>
  </label>

  <!-- Search Button -->
  <button class="inline-block align-middle border-2 border-black px-4 py-1 rounded">Search</button>

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