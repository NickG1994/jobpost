import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useMyAlertStore } from '~/store/Alert'

export const useMyAuthStore = defineStore('myAuthStore', {
  state: () => ({
    // Persistent state
    isAuthenticated: typeof window !== 'undefined' ? useStorage('isAuthenticated', false) : false,
    user: typeof window !== 'undefined' ? useStorage('user', { username: '', password: '' }) : { username: '', password: '' },
    token: typeof window !== 'undefined' ? useStorage<string | null>('token', null) : null,
    activeRole: typeof window !== 'undefined' ? useStorage<string | null>('activeRole', null) : null,

    // Non-persistent state
    isLoading: false,
    error: null as string | null,
  }),
  hydrate(state, initialState) {
    if (import.meta.client) {
      state.isAuthenticated = useStorage('isAuthenticated', false)
      state.user = useStorage('user', {})
      state.token = useStorage<string | null>('token', null)
      state.activeRole = useStorage<string | null>('activeRole', null)
    }
  },

  actions: {
    async loginAction(email: string, password: string) {
      try {
        this.isLoading = true
        const result = await this.checkUserExist(email, password)
        console.log(result)
        if (import.meta.client) {
          if (result.status === 'success' && result.user) {
            this.user = result.user
            this.isAuthenticated = true
            this.token = result.user.token || null
            this.error = null
            console.log('Login successful:', result.user)
          } else {
            this.error = result.message || 'Invalid email or password'
            this.isAuthenticated = false
            this.user = { username: '', password: '' }
            this.token = null
            return createError({ statusCode: 401, statusMessage: this.error })
          }
        }
      } catch (err: any) {
        console.error('Login failed:', err)
        this.error = err.message
        this.isAuthenticated = false
        this.user = { username: '', password: '' }
        this.token = null
        return createError({ statusCode: 500, statusMessage: err.message })
      } finally {
        this.isLoading = false
      }
    },

    logoutAction() {
      this.isAuthenticated = false
      this.user = { username: '', password: '' }
      this.token = null
      this.isLoading = false
      useMyAlertStore().triggerAlert(
        'success',
        'You have been logged out successfully',
        5000
      )
      navigateTo('/auth/signin')
    },

    async checkUserExist(email: string, password: string) {
      const { status, message, user: foundUser } = await $fetch('/api/auth/getUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }).catch((error) => {
        throw new Error('Failed to fetch user: ' + error.message)
      })
      if (foundUser) {
        return { status, message, user: foundUser }
      } else {
        return { status: 'error', message: 'User not found or invalid credentials', user: null }
      }
    },

    async signUp(email: string, username: string, password: string, userType: string) {
      try {
        if (!email || !username || !password) {
          throw new Error('Email, username, and password are required')
        }

        const response = await $fetch('/api/auth/create-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, password, userType }),
        })

        return response        
      } catch (error) {
        console.error('Sign up failed:', error)
        throw new Error('Sign up failed: ' + error.message)
      }

    },
  },
})
