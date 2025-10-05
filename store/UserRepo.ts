import { defineStore } from 'pinia'

export const useMyUserRepoStore = defineStore('myUserRepoStore',{
  state: () => ({
    userProfileData: null as null | Record<string, any>,
    loading: false,
    error: null as null | string,
   }),
  actions: {
    setUserProfileData(data: Record<string, any>) {
      this.userProfileData = data
    },
    setLoading(isLoading: boolean) {
      this.loading = isLoading
    },
    setError(errorMessage: string | null) {
      this.error = errorMessage
    },
    fetchUserProfileData: async function(userId: number) {
      this.setLoading(true)
      this.setError(null)
      try {
        const response = await fetch('/api/fetchProfileData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        })
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        this.setUserProfileData(data)
      } catch (error: any) {
        this.setError(error.message || 'An error occurred while fetching profile data.')
      } finally {
        this.setLoading(false)
      }
    }
  }
})
