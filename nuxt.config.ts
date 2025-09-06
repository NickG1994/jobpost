// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon', '@pinia/nuxt','@vueuse/nuxt'],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'My Nuxt App'
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: ['~/assets/css/app.css'],
})