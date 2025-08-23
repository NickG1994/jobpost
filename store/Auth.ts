import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useMyAlertStore } from '~/store/Alert'

export const useMyAuthStore = defineStore('myAuthStore', () => {
  // Persistent state via VueUse
  const isAuthenticated = useStorage('isAuthenticated', false)
  const user = useStorage('user', { username: '', password: '' })
  const token = useStorage<string | null>('token', null)

  // Non-persistent state
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // --- Actions ---
  async function loginAction(email: string, password: string) {
    try {
      isLoading.value = true
      const result = await checkUserExist(email, password)
      if(import.meta.client) {
      if (result.status === 'success' && result.user) {
        user.value = result.user
        isAuthenticated.value = true
        token.value = result.user.token || null
        error.value = null
      } else {
        error.value = result.message || 'Invalid email or password'
        isAuthenticated.value = false
        user.value = { username: '', password: '' }
        token.value = null
        }
      }
    } catch (err: any) {
      console.error('Login failed:', err)
      error.value = err.message
      isAuthenticated.value = false
      user.value = { username: '', password: '' }
      token.value = null
      throw new Error('Login failed: ' + err.message)
    } finally {
      isLoading.value = false
    }
  }

  function logoutAction() {
    isAuthenticated.value = false
    user.value = { username: '', password: '' }
    token.value = null
    isLoading.value = false
    useMyAlertStore().triggerAlert(
      'success',
      'You have been logged out successfully',
      5000
    )
  }

  async function checkUserExist(email: string, password: string) {
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
  }

  async function signUp(email: string, username: string, password: string, userType: string) {
    if (!email || !username || !password) {
      throw new Error('Email, username, and password are required')
    }

    await $fetch('/api/auth/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password, userType }),
    }).catch((error) => {
      console.error('Error creating user:', error)
      throw new Error('Failed to create user: ' + error.message)
    })
  }

  return {
    // state
    isAuthenticated,
    user,
    token,
    isLoading,
    error,
    // actions
    loginAction,
    logoutAction,
    checkUserExist,
    signUp,
  }
})
