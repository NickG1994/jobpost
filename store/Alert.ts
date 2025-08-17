import { defineStore } from 'pinia'

export const useMyAlertStore = defineStore('myAlertStore',{
  state: () => ({
    alert: {
      show: false,
      type: 'info', // 'info', 'success', 'warning', 'error'
      message: ''
    },
    milisecond: 5000, // Default timeout for alerts
    timerReference: null // To hold the timeout reference
   }),
  actions: {
    showAlert(type: string, message: string) {
      this.alert.show = true
      this.alert.type = type
      this.alert.message = message
    },
    hideAlert() {
      this.alert.show = false
      this.alert.type = 'info'
      this.alert.message = ''
    },
    alertTimeout(ms: number = this.milisecond) {
      if (this.alert.show) {
        this.hideAlert()
      }
      this.alert.show = true
      this.alert.type = 'info'
      this.alert.message = 'This is a timed alert'
      setTimeout(() => {
        this.alertTimeout
      }, ms)
      console.log(`Alert will hide after ${ms} milliseconds`)
    },
    /**
     * Trigger an alert with a specific type and message, and hide it after a specified time.
     * @param type - 'info', 'success', 'warning', 'error'
     * @param message - The message to display in the alert
     * @param ms - The time in milliseconds after which the alert will hide (default is 5000ms)
     */
    triggerAlert(type: string, message: string, ms: number = this.milisecond) {
      this.hideAlert()
      this.showAlert(type, message)
      if(this.timerReference) {
        clearTimeout(this.timerReference)
        this.timerReference = null
      }
      
      //console.log(`Alert of type ${type} with message "${message}" will hide after ${ms} milliseconds`)
      this.timerReference = setTimeout(() => {
        this.hideAlert()
        this.timerReference = null
      }, ms)
      //console.log(`Alert of type ${type} will hide after ${ms} milliseconds`)
    }
  }  
})

