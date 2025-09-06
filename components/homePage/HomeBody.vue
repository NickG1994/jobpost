<template>
  <div class="flex flex-col lg:flex-row justify-between items-start bg-base-100 px-4 gap-8 w-full">
    <!-- Left: Job Cards -->
    <div class="left w-full lg:w-1/2">
      <div
        v-for="job in jobs"
        :key="job.id"
        @click="selectJob(job)"
        class="card bg-base-100 w-full shadow-sm cursor-pointer hover:shadow-lg hover:scale-110 transition-transform transition-shadow mb-4"
      >
        <figure>
          <img
            :src="job.image"
            :alt="job.title"
            class="h-48 w-full object-cover"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            {{ job.title }}
            <div class="badge badge-secondary">{{ job.type }}</div>
          </h2>
          <p>{{ job.description }}</p>
          <div class="card-actions justify-between items-center">
            <div class="badge badge-outline">{{ job.location }}</div>
            <div class="badge badge-outline">{{ job.type }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Detailed Information -->
    <div class="right w-full lg:w-1/2 bg-base-200 p-4 md:p-6 rounded-lg shadow-md mt-8 lg:mt-0">
      <div v-if="selectedJob" class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-bold border-b pb-2">{{ selectedJob.title }}</h2>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Image:</span>
            <img
              :src="selectedJob.image"
              :alt="selectedJob.title"
              class="h-48 w-full md:w-48 object-cover rounded-lg border"
            />
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Description:</span>
            <p class="text-base text-gray-700">{{ selectedJob.description }}</p>
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Location:</span>
            <p class="text-base text-gray-700">{{ selectedJob.location }}</p>
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Job Type:</span>
            <p class="text-base text-gray-700">{{ selectedJob.type }}</p>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500">
        <p>Select a job card to view details.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// Sample job data
const jobs = ref([
  {
    id: 1,
    image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Software Engineer',
    description: 'Develop and maintain web applications using modern frameworks.',
    location: 'San Francisco, CA',
    type: 'Full-Time',
  },
  {
    id: 2,
    image: 'https://img.daisyui.com/images/stock/photo-1606107561902-0e29a4b5b4aa.webp',
    title: 'Graphic Designer',
    description: 'Create visual concepts to communicate ideas that inspire and captivate.',
    location: 'New York, NY',
    type: 'Part-Time',
  },
  {
    id: 3,
    image: 'https://img.daisyui.com/images/stock/photo-1606107561903-0e29a4b5b4aa.webp',
    title: 'Data Analyst',
    description: 'Analyze data to provide actionable insights for business decisions.',
    location: 'Remote',
    type: 'Full-Time',
  },
]);

const selectedJob = ref(jobs.value[0]); // Default to the first job

// Function to select a job card
const selectJob = (job: any) => {
  if(job.id === selectedJob.value?.id) {
    selectedJob.value = null; // Deselect if the same job is clicked
  } else {
    selectedJob.value = job; // Select the clicked job
  }
};
</script>

<style scoped>
.right {
  background-color: #f3f4f6; /* Light gray background for better readability */
}
</style>