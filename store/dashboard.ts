import { defineStore } from 'pinia'

export const useMyDashboardStore = defineStore('myDashboardStore',{
  state: () => ({ 
    userData: {
      personalInfo: {
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: ''
      },
      contactInfo: {
        personalEmail: '',
        workEmail: '',
        phone: '',
        address: ''
      },
      securityInfo: {
        password: '',
        twoFactorAuth: false
      }
    }
  }),
  actions: {
    saveData() {
      console.log('Data saved!');
    }
  }
})
