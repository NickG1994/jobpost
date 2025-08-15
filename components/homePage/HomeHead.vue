<template>
  <div class="bg-white rounded-lg shadow p-4 mb-6">
    <div class="flex items-center gap-0">
      <!-- Search by Title/Keyword -->
      <div class="relative w-1/2">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <circle
              cx="11"
              cy="11"
              r="8"
              stroke="white"
              stroke-width="2"
              fill="none"
            />
            <line
              x1="21"
              y1="21"
              x2="16.65"
              y2="16.65"
              stroke="white"
              stroke-width="2"
            />
          </svg>
        </span>
        <input
          v-model="searchTitle"
          type="text"
          placeholder="Job title or keyword"
          class="input input-bordered rounded-none rounded-l-lg pl-10 w-full"
        />
      </div>
      <!-- Vertical Divider -->
      <div class="h-10 w-px bg-base-300 mx-2"></div>
      <!-- Search by Location -->
      <div class="relative w-1/2">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              stroke="white"
              stroke-width="2"
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"
            />
          </svg>
        </span>
        <input
          v-model="searchLocation"
          type="text"
          placeholder="Location"
          class="input input-bordered rounded-none rounded-r-lg pl-10 w-full"
        />
      </div>
    </div>
    <!-- Filters -->
    <div class="mt-6 flex flex-wrap gap-2">
      <button
        v-for="filter in filters"
        :key="filter"
        @click="toggleFilter(filter)"
        class="btn btn-sm"
        :class="{
          'btn-primary': activeFilters.includes(filter),
          'btn-outline': !activeFilters.includes(filter)
        }"
      >
        {{ filter }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const searchTitle = ref('');
</script>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

span {
  @apply z-100;
}

</style>