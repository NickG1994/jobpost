import { useMyAlertStore } from '~/store/Alert'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useMyAuthStore = defineStore('myAuthStore', {
  state: () => ({
  Auth: typeof window !== 'undefined' ? useStorage('Auth',{
      isAuthenticated: true,
      user: '',
      token: null,
      isloading: false,
      error: null,
      login: false,
      logout: false
  }) :
      {
      isAuthenticated: false,
      user: 'dgaona2',
      token: null,
      isloading: false,
      error: null,
      login: false,
      logout: false
    }
   }),
  actions: {
    async login(email: string, password: string) {
      try {
        if (import.meta.client) {
          const storedAuth = localStorage.getItem('Auth')
          if (!storedAuth.user || storedAuth.user !== '') {
            localStorage.removeItem('Auth')
            console.log('Auth data found in localStorage, removing it')
          }

          //if there is not data in localStorage object, set it to default
          if (!storedAuth) {
            console.log('No Auth data found in localStorage, setting default values')
      
          }
          else {
            console.log('testing storedAuth', storedAuth)
          }
        }
          
        } catch (error) {
        console.error('Login failed:', error)
        this.Auth.error = error.message
        this.Auth.isAuthenticated = false
        this.Auth.isloading = false
        throw new Error('Login failed: ' + error.message)
      }
      
    },
    logout() {
      this.Auth.isAuthenticated = false
      this.Auth.user = null
      this.Auth.token = null
      this.Auth.isloading = false
      this.Auth.login = false
      this.Auth.logout = true
      useMyAlertStore().triggerAlert(
        'success',
        'You have been logged out successfully',
        5000
      )
    },
    async checkUserExist(email: string, password: string) {
      // Logic to check user credentials
      const {status,message, user} = await $fetch('/api/auth/getUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        }),
      }).catch((error) => {
        throw new Error('Failed to fetch user: ' + error.message)
      })
      if (user) {
        return {status, message, user}
      }
      else {
        return {
          status: 'error',
          message: 'User not found or invalid credentials',
          user: null
        }
      }
      
    },
    async signUp(email: string, username: string, password: string, userType: string) {
      // Logic to create a new user
      if(!email || !username || !password) {
        throw new Error('Email, username, and password are required')
      }

      // Call the API to create a new user
      await $fetch('/api/auth/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,  
          username,
          password,
          userType
        }),
      }).catch((error) => {
        console.error('Error creating user:', error)
        throw new Error('Failed to create user: ' + error.message)
      })
    },
  }
})
