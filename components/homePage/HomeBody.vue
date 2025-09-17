<template>
  <div class="flex flex-col lg:flex-row justify-between items-start bg-base-100 px-8 lg:px-16 py-8 gap-8 w-full">
    <!-- Left: Job Cards -->
    <div class="left w-full lg:w-1/2 space-y-6">
      <div
        v-for="job in jobs"
        :key="job.id"
        @click="selectJob(job)"
        class="card bg-white w-full shadow-md cursor-pointer hover:shadow-lg hover:scale-105 transition-transform transition-shadow rounded-lg overflow-hidden"
      >
        <figure class="w-full">
          <img
            :src="job.image"
            :alt="job.title"
            class="h-48 w-full object-cover"
          />
        </figure>
        <div class="card-body p-6">
          <h2 class="card-title text-xl font-semibold text-gray-800">
            {{ job.title }}
            <div class="badge badge-secondary ml-2">{{ job.type }}</div>
          </h2>
          <p class="text-gray-600 mt-2">{{ job.description }}</p>
          <div class="card-actions flex justify-between items-center mt-4">
            <div class="badge badge-outline">{{ job.location }}</div>
            <div class="badge badge-outline">{{ job.type }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Detailed Information -->
    <div class="right w-full lg:w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
      <div v-if="selectedJob">
        <!-- Job Image -->
        <figure>
          <img
            :src="selectedJob.image"
            :alt="selectedJob.title"
            class="h-64 w-full object-cover"
          />
        </figure>
        <div class="p-6 space-y-6">
          <h2 class="text-2xl font-bold text-gray-800 border-b pb-2">{{ selectedJob.title }}</h2>
          <div class="flex flex-col gap-6">
            <div class=" gap-4">
              <span class="font-semibold text-lg text-gray-700 block mb-2">About the Company:</span>
              <p class="text-base text-gray-600">{{ selectedJob.about_company }}</p>
            </div>
            <div class="gap-4 mb-2">
              <span class="font-semibold text-lg text-gray-700 mb-2">Description:</span>
              <p class="text-base text-gray-600">{{ selectedJob.description }}</p>
            </div>
            <div class="gap-4 mb-2">
              <span class="font-semibold text-lg text-gray-700">Location:</span>
              <p class="text-base text-gray-600">{{ selectedJob.location }}</p>
            </div>
            <div class="gap-4 mb-2">
              <span class="font-semibold text-lg text-gray-700">Job Type:</span>
              <p class="text-base text-gray-600">{{ selectedJob.job_type }}</p>
            </div>
            <div class="gap-4 mb-2">
              <span class="font-semibold text-lg text-gray-700">Salary:</span>
              <p class="text-base text-gray-600">${{ selectedJob.min_salary }} - ${{ selectedJob.max_salary }}</p>
            </div>
            <div class="gap-4 mb-2">
              <span class="font-semibold text-lg text-gray-700">Required Skills:</span>
              <ul class="list-disc pl-6 text-gray-600">
                <li v-for="skill in selectedJob.required_skills" :key="skill">{{ skill }}</li>
              </ul>
            </div>
            <div class="flex flex-col md:flex-row items-start gap-4">
              <span class="font-semibold text-lg text-gray-700">Experience:</span>
              <p class="text-base text-gray-600">{{ selectedJob.required_experience }}</p>
            </div>
            <div class="flex flex-col md:flex-row items-start gap-4">
              <span class="font-semibold text-lg text-gray-700">Education Level:</span>
              <p class="text-base text-gray-600">{{ selectedJob.required_education_level }}</p>
            </div>
            <div class="flex flex-col md:flex-row items-start gap-4">
              <span class="font-semibold text-lg text-gray-700">Industry:</span>
              <p class="text-base text-gray-600">{{ selectedJob.industry }}</p>
            </div>
            <div class="flex flex-col md:flex-row items-start gap-4">
              <span class="font-semibold text-lg text-gray-700">Benefits:</span>
              <ul class="list-disc pl-6 text-gray-600">
                <li v-for="benefit in selectedJob.benefits" :key="benefit">{{ benefit }}</li>
              </ul>
            </div>
            <div class="flex flex-col md:flex-row items-start gap-4">
              <span class="font-semibold text-lg text-gray-700">Application Deadline:</span>
              <p class="text-base text-gray-600">{{ selectedJob.application_deadline }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 p-6">
        <p>Select a job card to view details.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// Sample job data with consistent information
const jobs = ref([
  {
    id: 1,
    image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Software Engineer',
    description: 'Join our team as a Software Engineer and play a pivotal role in designing, developing, and maintaining cutting-edge web applications. You will work with a talented team of developers to create scalable and efficient solutions that meet the needs of our clients.',
    about_company: 'We are a leading tech company specializing in innovative solutions that empower businesses to achieve their goals. Our mission is to deliver exceptional software products while fostering a culture of collaboration, creativity, and growth.',
    location: 'San Francisco, CA',
    type: 'Full-Time',
    remote: false,
    job_type: 'Engineering',
    min_salary: 90000,
    max_salary: 130000,
    required_skills: ['JavaScript', 'Vue.js', 'Node.js', 'REST APIs', 'Agile Development'],
    required_experience: '3+ years of experience in software development, with a strong focus on web technologies.',
    required_education_level: "Bachelor's Degree in Computer Science or a related field.",
    industry: 'Technology',
    benefits: [
      'Comprehensive Health Insurance (Medical, Dental, Vision)',
      '401(k) Retirement Plan with Company Match',
      'Flexible Work Schedule and Remote Work Options',
      'Generous Paid Time Off (PTO) and Holidays',
      'Professional Development Opportunities and Training Programs',
    ],
    application_deadline: '2024-12-31',
  },
  {
    id: 2,
    image: 'https://img.daisyui.com/images/stock/photo-1606107561902-0e29a4b5b4aa.webp',
    title: 'Graphic Designer',
    description: 'As a Graphic Designer, you will create visually stunning designs that communicate ideas and captivate audiences. Collaborate with our marketing and product teams to develop creative assets for digital and print media.',
    about_company: 'Our company is a creative powerhouse that values innovation and design excellence. We work with top-tier clients to deliver impactful visual solutions that drive results.',
    location: 'New York, NY',
    type: 'Part-Time',
    remote: false,
    job_type: 'Design',
    min_salary: 50000,
    max_salary: 70000,
    required_skills: ['Adobe Photoshop', 'Illustrator', 'Creativity', 'Typography'],
    required_experience: '2+ years of experience in graphic design.',
    required_education_level: "Bachelor's Degree in Graphic Design or related field.",
    industry: 'Creative',
    benefits: [
      'Health Insurance',
      'Flexible Work Hours',
      'Creative Freedom',
    ],
    application_deadline: '2024-11-15',
  },
]);

const selectedJob = ref(null);

const selectJob = (job: any) => {
  selectedJob.value = job;
};
</script>

<style scoped>
.card-body {
  margin-top: 1rem;
}
</style>