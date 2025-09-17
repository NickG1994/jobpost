<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center">
    <!-- Slim Cover -->
    <div class="w-full h-28 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

    <!-- Profile Info -->
    <div class="mt-10 text-center">
      <h1 class="text-2xl font-bold text-gray-800">{{ user.fullName }}</h1>
      <p class="text-gray-500">@{{ user.username }}</p>
      <p class="mt-3 max-w-xl text-gray-600 mx-auto">{{ user.bio }}</p>
    </div>

    <!-- User Details -->
    <div class="mt-8 max-w-4xl w-full space-y-6">
      <!-- Personal Information Card -->
      <div class="bg-white shadow-md rounded-2xl p-6">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-700">Personal Information</h2>
          <button
            @click="toggleEdit('personal')"
            class="edit-button"
          >
            {{ editSection === 'personal' ? 'Save' : 'Edit' }}
          </button>
        </div>
        <div class="grid sm:grid-cols-2 gap-4 mt-4">
          <!-- First Name -->
          <div>
            <p class="text-gray-500 text-sm">First Name</p>
            <p v-if="editSection !== 'personal'" class="font-medium">{{ user.firstName }}</p>
            <input
              v-else
              v-model="user.firstName"
              type="text"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Middle Name -->
          <div>
            <p class="text-gray-500 text-sm">Middle Name</p>
            <p v-if="editSection !== 'personal'" class="font-medium">{{ user.middleName }}</p>
            <input
              v-else
              v-model="user.middleName"
              type="text"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Last Name -->
          <div>
            <p class="text-gray-500 text-sm">Last Name</p>
            <p v-if="editSection !== 'personal'" class="font-medium">{{ user.lastName }}</p>
            <input
              v-else
              v-model="user.lastName"
              type="text"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Date of Birth -->
          <div>
            <p class="text-gray-500 text-sm">Date of Birth</p>
            <p v-if="editSection !== 'personal'" class="font-medium">{{ user.dateOfBirth }}</p>
            <input
              v-else
              v-model="user.dateOfBirth"
              type="date"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <!-- Contact Information Card -->
      <div class="bg-white shadow-md rounded-2xl p-6">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-700">Contact Information</h2>
          <button
            @click="toggleEdit('contact')"
            class="edit-button"
          >
            {{ editSection === 'contact' ? 'Save' : 'Edit' }}
          </button>
        </div>
        <div class="grid sm:grid-cols-2 gap-4 mt-4">
          <!-- Personal Email -->
          <div>
            <p class="text-gray-500 text-sm">Personal Email</p>
            <p v-if="editSection !== 'contact'" class="font-medium">{{ user.personalEmail }}</p>
            <input
              v-else
              v-model="user.personalEmail"
              type="email"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Work Email -->
          <div>
            <p class="text-gray-500 text-sm">Work Email</p>
            <p v-if="editSection !== 'contact'" class="font-medium">{{ user.workEmail }}</p>
            <input
              v-else
              v-model="user.workEmail"
              type="email"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Phone Number -->
          <div>
            <p class="text-gray-500 text-sm">Phone Number</p>
            <p v-if="editSection !== 'contact'" class="font-medium">{{ user.phone }}</p>
            <input
              v-else
              v-model="user.phone"
              type="tel"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Address -->
          <div>
            <p class="text-gray-500 text-sm">Address</p>
            <p v-if="editSection !== 'contact'" class="font-medium">{{ user.address }}</p>
            <input
              v-else
              v-model="user.address"
              type="text"
              class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <!-- Security Card -->
      <div class="bg-white shadow-md rounded-2xl p-6">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-700">Security</h2>
          <button
            @click="toggleEdit('security')"
            class="edit-button"
          >
            {{ editSection === 'security' ? 'Save' : 'Edit' }}
          </button>
        </div>
        <div class="mt-4">
          <!-- Password -->
          <p class="text-gray-500 text-sm">Password</p>
          <p v-if="editSection !== 'security'" class="font-medium">********</p>
          <input
            v-else
            v-model="user.password"
            type="password"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const editSection = ref<string | null>(null);

const user = ref({
  firstName: "John",
  middleName: "Michael",
  lastName: "Doe",
  username: "john_doe",
  password: "password123",
  dateOfBirth: "1990-01-01",
  address: "123 Main St, Austin, TX",
  phone: "+1 234 567 890",
  personalEmail: "john.personal@example.com",
  workEmail: "john.work@example.com",
  location: "Austin, TX",
  bio: "Full-stack developer. Coffee enthusiast ☕ | Sharing code and ideas.",
});

function toggleEdit(section: string) {
  if (editSection.value === section) {
    // Save changes
    editSection.value = null;
    // 🚀 Add API call here to save changes
  } else {
    editSection.value = section;
  }
}
</script>

<style scoped>
@reference "tailwindcss";
.edit-button {

}
</style>
