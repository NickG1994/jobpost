import { useMyAlertStore } from '~/store/Alert'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useMyAuthStore = defineStore('myAuthStore', () => {
  const isAuthenticated = useStorage('isAuthenticated', false)
  const user = useStorage('user', { username: '', password: '' })
  const token = useStorage('token', null)
  const isLoading = ref(false)
  const error = ref(null)
  const login = ref(false)
  const logout = ref(false)

  async function loginAction(email: string, password: string) {
    try {
      if (import.meta.client) {
        const result = await checkUserExist(email, password)
        if (result.status === 'success') {
          user.value = result.user
          isAuthenticated.value = true
          token.value = result.user.token || null
          error.value = null
          console.log('User is authenticated:', isAuthenticated.value)
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
      isLoading.value = false
      throw new Error('Login failed: ' + err.message)
    }
  }

  function logoutAction() {
    isAuthenticated.value = false
    user.value = { username: '', password: '' }
    token.value = null
    isLoading.value = false
    login.value = false
    logout.value = true
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
    isAuthenticated,
    user,
    token,
    isLoading,
    error,
    login,
    logout,
    login: loginAction,
    logout: logoutAction,
    checkUserExist,
    signUp,
  }
})
