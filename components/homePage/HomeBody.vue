<template>
  <div class="flex flex-col lg:flex-row justify-between items-start bg-base-100 px-4 gap-8 w-full">
    <!-- Left: Job Cards -->
    <div class="left w-full lg:w-1/2">
      <div
        v-for="job in jobs"
        :key="job.id"
        @click="selectJob(job)"
        class="card bg-base-100 w-full shadow-sm cursor-pointer hover:shadow-lg hover:outline-2 hover:outline-offset-2 hover:outline-blue-700  transition-all transition-outline mb-4"
      >
        <figure>
          <img
            :src="job.image"
            :alt="job.title"
            class="h-48 w-full object-cover"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title flex flex-wrap gap-2 items-center">
            {{ job.title }}
            <div class="badge badge-secondary">{{ job.job_type }}</div>
            <div v-if="job.remote" class="badge badge-outline">Remote</div>
          </h2>
          <p class="mb-2">{{ job.description }}</p>
          <div class="flex flex-wrap gap-2 mb-2">
            <span class="badge badge-outline">{{ job.location }}</span>
            <span class="badge badge-outline">{{ job.industry }}</span>
            <span class="badge badge-outline">{{ job.required_experience }}</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-2">
            <span class="badge badge-outline">Salary: {{ job.min_salary }} - {{ job.max_salary }}</span>
            <span class="badge badge-outline">Start: {{ job.start_date }}</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-2">
            <span class="badge badge-outline">Skills: {{ job.required_skills }}</span>
            <span class="badge badge-outline">Education: {{ job.required_education_level }}</span>
          </div>
          <div class="flex flex-wrap gap-2 mb-2">
            <span class="badge badge-outline">Benefits: in {{ job.benefits_description.length >=60 ? job.benefits_description.replace(/(.{30})(.*)/, "$1...") : job.benefits_description }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Detailed Information -->
    <div class="right w-full lg:w-1/2 bg-base-200 p-4 md:p-6 rounded-lg shadow-md mt-8 lg:mt-0">
      <div v-if="selectedJob" class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-bold border-b pb-2">{{ selectedJob.title }}</h2>
        <div class="flex flex-col gap-4">
          <div class="w-full">
            <img
              :src="selectedJob.image"
              :alt="selectedJob.title"
              class="h-48 w-full object-cover rounded-lg border"
            />
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Description:</span>
            <p class="text-base text-gray-700">{{ selectedJob.description }}</p>
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Responsibilities:</span>
            <p class="text-base text-gray-700">{{ selectedJob.responsibilities }}</p>
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Location:</span>
            <p class="text-base text-gray-700">{{ selectedJob.location }}</p>
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Remote:</span>
            <p class="text-base text-gray-700">{{ selectedJob.remote ? 'Yes' : 'No' }}</p>
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Job Type:</span>
            <p class="text-base text-gray-700">{{ selectedJob.job_type }}</p>
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Salary Range:</span>
            <p class="text-base text-gray-700">{{ selectedJob.min_salary }} - {{ selectedJob.max_salary }}</p>
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Experience:</span>
            <p class="text-base text-gray-700">{{ selectedJob.required_experience }}</p>
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Skills:</span>
            <p class="text-base text-gray-700">{{ selectedJob.required_skills }}</p>
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Education Level:</span>
            <p class="text-base text-gray-700">{{ selectedJob.required_education_level }}</p>
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Industry:</span>
            <p class="text-base text-gray-700">{{ selectedJob.industry }}</p>
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Benefits:</span>
            <p class="text-base text-gray-700">{{ selectedJob.benefits_description }}</p>
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Benefits List:</span>
            <p class="text-base text-gray-700">{{ selectedJob.benefits_lists }}</p>
          </div>
          <div class="flex flex-col md:flex-row items-start gap-4">
            <span class="font-semibold text-lg">Start Date:</span>
            <p class="text-base text-gray-700">{{ selectedJob.start_date }}</p>
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

// Sample job data with all requested fields and longer descriptions
const jobs = ref([
  {
    id: 1,
    image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Software Engineer',
    description: 'Join our dynamic engineering team to build scalable web applications. You will work with modern frameworks and cloud technologies, collaborate with cross-functional teams, and help shape the future of our platform. We value innovation, teamwork, and a passion for learning. Our engineers are empowered to make decisions and drive projects from concept to completion.',
    location: 'San Francisco, CA',
    remote: 1,
    job_type: 'Full-Time',
    responsibilities: 'Design, develop, and maintain web applications; Collaborate with product managers and designers; Write clean, efficient, and well-documented code; Participate in code reviews and mentor junior engineers.',
    min_salary: 90000,
    max_salary: 140000,
    required_experience: '3+ years',
    required_skills: 'JavaScript, Vue, Node.js',
    required_education_level: 'Bachelor\'s Degree',
    industry: 'Technology',
    benefits_description: 'Comprehensive health insurance, flexible hours, remote work options, and generous PTO.',
    benefits_lists: 'Health Insurance, PTO, Remote Work, Stock Options',
    start_date: '2025-10-01',
  },
  {
    id: 2,
    image: 'https://img.daisyui.com/images/stock/photo-1606107561902-0e29a4b5b4aa.webp',
    title: 'Graphic Designer',
    description: 'We are seeking a creative graphic designer to join our marketing team. You will be responsible for creating visual concepts that communicate ideas and captivate our audience. The ideal candidate has a strong portfolio, excellent communication skills, and a passion for design. You will work closely with copywriters and marketers to deliver compelling campaigns.',
    location: 'New York, NY',
    remote: 0,
    job_type: 'Part-Time',
    responsibilities: 'Create graphics for digital and print media; Collaborate with marketing and content teams; Maintain brand consistency across all designs; Stay updated with design trends.',
    min_salary: 40000,
    max_salary: 60000,
    required_experience: '2+ years',
    required_skills: 'Photoshop, Illustrator, Creativity',
    required_education_level: 'Associate Degree',
    industry: 'Design',
    benefits_description: 'Flexible schedule, creative work environment, and opportunities for professional growth.',
    benefits_lists: 'Flexible Schedule, Creative Environment, Professional Growth',
    start_date: '2025-11-15',
  },
  {
    id: 3,
    image: 'https://img.daisyui.com/images/stock/photo-1606107561903-0e29a4b5b4aa.webp',
    title: 'Data Analyst',
    description: 'As a data analyst, you will transform raw data into actionable insights to support business decisions. You will work with large datasets, create visualizations, and present findings to stakeholders. The role requires strong analytical skills, attention to detail, and the ability to communicate complex information clearly.',
    location: 'Remote',
    remote: 1,
    job_type: 'Full-Time',
    responsibilities: 'Analyze datasets to identify trends; Develop dashboards and reports; Present insights to stakeholders; Ensure data integrity and accuracy.',
    min_salary: 70000,
    max_salary: 95000,
    required_experience: '1+ years',
    required_skills: 'SQL, Excel, Data Visualization',
    required_education_level: 'Bachelor\'s Degree',
    industry: 'Analytics',
    benefits_description: 'Remote work, health benefits, and ongoing training opportunities.',
    benefits_lists: 'Remote Work, Health Benefits, Training',
    start_date: '2025-09-25',
  },
]);

const selectedJob = ref(jobs.value[0]); // Default to the first job

// Function to select a job card
const selectJob = (job: any) => {
  if (job.id === selectedJob.value?.id) {
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