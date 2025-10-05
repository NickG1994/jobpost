<template>
  <div class="min-h-screen bg-base-100 flex flex-col items-center">
    <!-- Slim Cover -->
    <div class="w-full h-28 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

    <!-- Profile Info -->
    <div class="mt-10 text-center">
      <h1 class="text-2xl font-bold text-base-content">{{ userRef.fullName }}</h1>
      <p class="text-base-content/70">@{{ userRef.username }}</p>
      <p class="mt-3 max-w-xl text-base-content/60 mx-auto">{{ userRef.bio }}</p>
    </div>

    <!-- User Details -->
    <div class="mt-8 w-full max-w-screen-2xl px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 2xl:px-64 space-y-6">
      <!-- Personal Information Card -->
      <div class="bg-base-200 bg-white shadow-md rounded-2xl p-6 border border-base-300">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-base-content">Personal Information</h2>
          <button
            @click="toggleEdit('personal')"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            {{ editSection === 'personal' ? 'Save' : 'Edit' }}
          </button>
        </div>
        <div class="grid sm:grid-cols-2 gap-4 mt-4">
          <!-- First Name -->
          <div>
            <p class="text-base-content/70 text-sm">First Name</p>
            <p v-if="editSection !== 'personal'" class="font-medium text-base-content">{{ userRef.firstName }}</p>
            <input
              v-else
              v-model="userRef.firstName"
              type="text"
              class="w-full border border-base-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
            />
          </div>

          <!-- Middle Name -->
          <div>
            <p class="text-base-content/70 text-sm">Middle Name</p>
            <p v-if="editSection !== 'personal'" class="font-medium text-base-content">{{ userRef.middleName }}</p>
            <input
              v-else
              v-model="userRef.middleName"
              type="text"
              class="w-full border border-base-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
            />
          </div>

          <!-- Last Name -->
          <div>
            <p class="text-base-content/70 text-sm">Last Name</p>
            <p v-if="editSection !== 'personal'" class="font-medium text-base-content">{{ userRef.lastName }}</p>
            <input
              v-else
              v-model="userRef.lastName"
              type="text"
              class="w-full border border-base-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
            />
          </div>

          <!-- Date of Birth -->
          <div>
            <p class="text-base-content/70 text-sm">Date of Birth</p>
            <p v-if="editSection !== 'personal'" class="font-medium text-base-content">{{ userRef.dateOfBirth }}</p>
            <input
              v-else
              v-model="userRef.dateOfBirth"
              type="date"
              class="w-full border border-base-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
            />
          </div>
        </div>
      </div>

      <!-- Contact Information Card -->
      <div class="bg-base-200 bg-white shadow-md rounded-2xl p-6 border border-base-300">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-base-content">Contact Information</h2>
          <button
            @click="toggleEdit('contact')"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            {{ editSection === 'contact' ? 'Save' : 'Edit' }}
          </button>
        </div>
        <div class="grid sm:grid-cols-2 gap-4 mt-4">
          <!-- Personal Email -->
          <div>
            <p class="text-base-content/70 text-sm">Personal Email</p>
            <p v-if="editSection !== 'contact'" class="font-medium text-base-content">{{ userRef.personalEmail }}</p>
            <input
              v-else
              v-model="userRef.personalEmail"
              type="email"
              class="w-full border border-base-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
            />
          </div>

          <!-- Work Email -->
          <div>
            <p class="text-base-content/70 text-sm">Work Email</p>
            <p v-if="editSection !== 'contact'" class="font-medium text-base-content">{{ userRef.workEmail }}</p>
            <input
              v-else
              v-model="userRef.workEmail"
              type="email"
              class="w-full border border-base-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
            />
          </div>

          <!-- Phone Number -->
          <div>
            <p class="text-base-content/70 text-sm">Phone Number</p>
            <p v-if="editSection !== 'contact'" class="font-medium text-base-content">{{ userRef.phone }}</p>
            <input
              v-else
              v-model="userRef.phone"
              type="tel"
              class="w-full border border-base-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
            />
          </div>

          <!-- Address -->
          <div>
            <p class="text-base-content/70 text-sm">Address</p>
            <p v-if="editSection !== 'contact'" class="font-medium text-base-content">{{ userRef.address }}</p>
            <input
              v-else
              v-model="userRef.address"
              type="text"
              class="w-full border border-base-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
            />
          </div>
        </div>
      </div>

      <!-- Security Card -->
      <div class="bg-base-200 bg-white shadow-md rounded-2xl p-6 border border-base-300">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-base-content">Security</h2>
          <button
            @click="toggleEdit('security')"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            {{ editSection === 'security' ? 'Save' : 'Edit' }}
          </button>
        </div>
        <div class="mt-4">
          <!-- Password -->
          <p class="text-base-content/70 text-sm">Password</p>
          <p v-if="editSection !== 'security'" class="font-medium text-base-content">********</p>
          <input
            v-else
            v-model="userRef.password"
            type="password"
            class="w-full border border-base-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useMyAuthStore } from "~/store/Auth";
const myAuthStore = useMyAuthStore();

const { user } = storeToRefs(myAuthStore);

const editSection = ref<string | null>(null);

// Use a single userRef object for all fields
const userRef = ref({
  fullName: "",
  firstName: "te",
  middleName: "",
  lastName: "",
  username: "",
  password: "",
  dateOfBirth: "",
  address: "",
  phone: "",
  personalEmail: "",
  workEmail: "",
  location: "",
  bio: "",
});

onMounted(async () => {
  try {
    // Use the actual user ID from the store
    const userId = user.value?.id;
    console.log('Pinia user:', user.value); // <--- Add this
    if (!userId) return;
    const response = await $fetch('/api/fetchProfileData', {
      method: 'POST',
      body: { user: userId }
    });
    console.log('Raw Response:', response);
    // Map response to userRef fields
    if (response) { 
      userRef.value = {
        fullName: `${response.firstName || ""} ${response.middleName || ""} ${response.lastName || ""}`.trim(),
        firstName: response.firstName || "",
        middleName: response.middleName || "",
        lastName: response.lastName || "",
        username: response.username || "",
        password: "", // Never fill password from backend
        dateOfBirth: response.dateOfBirth || "",
        address: response.address || "",
        phone: response.phone || "",
        personalEmail: response.email || "",
        workEmail: response.workEmail || "",
        location: response.location || "",
        bio: response.bio || "",
      };
    }
    console.log('Profile Data:', response);
  } catch (error) {
    console.error('Error fetching profile data:', error);
  }
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
</style>