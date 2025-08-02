import { defineStore } from 'pinia'

export const useMyAuthStore = defineStore('myAuthStore', {
  state: () => ({
    Auth:{
      isAuthenticated: true,
      user: 'dgaona2',
      token: null,
      isloading: false,
      error: null,
      login: false,
      logout: false
    }, 
    alert: {
      show: false,
      message: '',
      type: '' // 'success', 'error', 'info', etc.
    }
   }),
  actions: {
    // function to check if the user is authenticated
    login(user:String, token:String) {
      return this.login
    },
    //function to log out the user
    logout() {
      return this.logout
    },
    // function to refresh the token
     refreshToken() {
       return this.refreshToken
     }
  }
})
