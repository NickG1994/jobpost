<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center">
    <!-- Slim Cover -->
    <div class="w-full h-28 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

    <!-- Profile Info -->
    <div class="mt-10 text-center">
      <h1 class="text-2xl font-bold text-gray-800">{{ user.fullName }}</h1>
      <p class="text-gray-500">@{{ user.username }}</p>
      <p class="mt-3 max-w-xl text-gray-600 mx-auto" v-if="!editMode">{{ user.bio }}</p>

      <!-- Editable Bio -->
      <div v-if="editMode" class="mt-4">
        <textarea
          v-model="user.bio"
          rows="3"
          class="w-full max-w-xl border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Edit button (only owner) -->
      <div v-if="isOwner" class="mt-4">
        <button
          v-if="!editMode"
          @click="editMode = true"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
        >
          Edit Profile
        </button>
        <div v-else class="flex gap-4 justify-center">
          <button
            @click="saveChanges"
            class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Save
          </button>
          <button
            @click="cancelEdit"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg shadow"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="mt-6 flex gap-8 text-center">
      <div>
        <p class="text-xl font-bold text-gray-800">{{ user.posts }}</p>
        <p class="text-gray-500">Posts</p>
      </div>
      <div>
        <p class="text-xl font-bold text-gray-800">{{ user.followers }}</p>
        <p class="text-gray-500">Followers</p>
      </div>
      <div>
        <p class="text-xl font-bold text-gray-800">{{ user.following }}</p>
        <p class="text-gray-500">Following</p>
      </div>
    </div>

    <!-- User Details -->
    <div class="mt-8 bg-white shadow-md rounded-2xl p-6 max-w-2xl w-full space-y-4">
      <h2 class="text-lg font-semibold text-gray-700 border-b pb-2">About</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <!-- Full Name -->
        <div>
          <p class="text-gray-500 text-sm">Full Name</p>
          <p v-if="!editMode" class="font-medium">{{ user.fullName }}</p>
          <input
            v-else
            v-model="user.fullName"
            type="text"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Email -->
        <div>
          <p class="text-gray-500 text-sm">Email</p>
          <p v-if="!editMode" class="font-medium">{{ user.email }}</p>
          <input
            v-else
            v-model="user.email"
            type="email"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Phone -->
        <div>
          <p class="text-gray-500 text-sm">Phone</p>
          <p v-if="!editMode" class="font-medium">{{ user.phone }}</p>
          <input
            v-else
            v-model="user.phone"
            type="tel"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Location -->
        <div>
          <p class="text-gray-500 text-sm">Location</p>
          <p v-if="!editMode" class="font-medium">{{ user.location }}</p>
          <input
            v-else
            v-model="user.location"
            type="text"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// mock: is this the logged-in user?
const isOwner = ref(true); // 🔑 change to false to test "public view"

const editMode = ref(false);
const originalUser = ref<any>(null);

const user = ref({
  id: "123456",
  username: "john_doe",
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+1 234 567 890",
  location: "Austin, TX",
  bio: "Full-stack developer. Coffee enthusiast ☕ | Sharing code and ideas.",
  posts: 42,
  followers: 1234,
  following: 321,
});

function saveChanges() {
  editMode.value = false;
  // 🚀 Normally you'd call API here to persist user.value
}

function cancelEdit() {
  if (originalUser.value) {
    user.value = { ...originalUser.value };
  }
  editMode.value = false;
}
</script>
