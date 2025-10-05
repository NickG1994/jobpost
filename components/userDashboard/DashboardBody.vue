<template>
  <div class="min-h-screen bg-base-100 flex flex-col items-center">
    <!-- Slim Cover -->
    <div class="w-full h-28 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

    <!-- Profile Info -->
    <div class="mt-10 text-center">
      <h1 class="text-2xl font-bold text-base-content">{{ userData.fullName }}</h1>
      <p class="text-base-content/70">@{{ userData.username }}</p>
      <p class="mt-3 max-w-xl text-base-content/60 mx-auto">{{ userData.bio }}</p>
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
            <p v-if="editSection !== 'personal'" class="font-medium text-base-content">{{ userData.firstName }}</p>
            <input
              v-else
              v-model="userData.firstName"
              type="text"
              class="w-full border border-base-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
            />
          </div>

          <!-- Middle Name -->
          <div>
            <p class="text-base-content/70 text-sm">Middle Name</p>
            <p v-if="editSection !== 'personal'" class="font-medium text-base-content">{{ userData.middleName }}</p>
            <input
              v-else
              v-model="userData.middleName"
              type="text"
              class="w-full border border-base-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
            />
          </div>

          <!-- Last Name -->
          <div>
            <p class="text-base-content/70 text-sm">Last Name</p>
            <p v-if="editSection !== 'personal'" class="font-medium text-base-content">{{ userData.lastName }}</p>
            <input
              v-else
              v-model="userData.lastName"
              type="text"
              class="w-full border border-base-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
            />
          </div>

          <!-- Date of Birth -->
          <div>
            <p class="text-base-content/70 text-sm">Date of Birth</p>
            <p v-if="editSection !== 'personal'" class="font-medium text-base-content">{{ userData.dateOfBirth }}</p>
            <input
              v-else
              v-model="userData.dateOfBirth"
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
            <p v-if="editSection !== 'contact'" class="font-medium text-base-content">{{ userData.personalEmail }}</p>
            <input
              v-else
              v-model="userData.personalEmail"
              type="email"
              class="w-full border border-base-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
            />
          </div>

          <!-- Work Email -->
          <div>
            <p class="text-base-content/70 text-sm">Work Email</p>
            <p v-if="editSection !== 'contact'" class="font-medium text-base-content">{{ userData.workEmail }}</p>
            <input
              v-else
              v-model="userData.workEmail"
              type="email"
              class="w-full border border-base-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
            />
          </div>

          <!-- Phone Number -->
          <div>
            <p class="text-base-content/70 text-sm">Phone Number</p>
            <p v-if="editSection !== 'contact'" class="font-medium text-base-content">{{ userData.phone }}</p>
            <input
              v-else
              v-model="userData.phone"
              type="tel"
              class="w-full border border-base-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 bg-base-100 text-base-content"
            />
          </div>

          <!-- Address -->
          <div>
            <p class="text-base-content/70 text-sm">Address</p>
            <p v-if="editSection !== 'contact'" class="font-medium text-base-content">{{ userData.address }}</p>
            <input
              v-else
              v-model="userData.address"
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
            v-model="userData.password"
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

const authStore = useMyAuthStore();
const { user } = storeToRefs(authStore);
const editSection = ref<string | null>(null);

const userData = ref({
  firstName: "",
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
  bio: "Full-stack developer. Coffee enthusiast ☕ | Sharing code and ideas.",
});

// Utility function to format date to MM-DD-YYYY
function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { month: "2-digit", day: "2-digit", year: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

// Define the toggleEdit function
function toggleEdit(section: string) {
  if (editSection.value === section) {
    // Save changes
    editSection.value = null;
    console.log("Saved changes for section:", section);
    // 🚀 Add API call here to save changes
  } else {
    editSection.value = section;
    console.log("Editing section:", section);
  }
}

onMounted(async () => {
  console.log("Fetching profile data for user ID:", user.value.id);
  if (!user.value.id) return;

  const { data, error } = await useFetch('/api/fetchProfileData', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: { userId: user.value.id },
  });

  // Wait for the data to be ready
  if (data.value) {
    console.log("Fetched data:", data.value);

    // Map the API response to userData
    userData.value = {
      firstName: data.value.first_name || "",
      middleName: data.value.middle_name || "",
      lastName: data.value.last_name || "",
      username: data.value.sec_username || "",
      password: data.value.sec_password_hash || "",
      dateOfBirth: formatDate(data.value.date_of_birth), // Format date to MM-DD-YYYY
      address: data.value.address || "",
      phone: data.value.phone_number || "",
      personalEmail: data.value.sec_email || "",
      workEmail: "", // No work email in the response
      location: "", // No location in the response
      bio: "Full-stack developer. Coffee enthusiast ☕ | Sharing code and ideas.", // Default bio
    };
  } else {
    console.error("Error fetching profile data:", error.value);
  }
});
</script>

<style scoped>
</style>