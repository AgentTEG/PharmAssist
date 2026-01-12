// stores/handleTemphum.js
import { defineStore } from 'pinia';

export const useHandleTemphum = defineStore('handleTemphum', {
  state: () => ({
    temperature: 0,
    humidity: 0,
    tempStatus: '',
    humStatus: ''
  }),
  actions: {
    generateRandomData() {
      this.temperature = +(Math.random() * 15 + 20).toFixed(1); 
      this.humidity = +(Math.random() * 40 + 40).toFixed(1);  
      this.getstatus();
    },

    getstatus() {
      if (this.temperature < 22) this.tempStatus = 'Cold';
      else if (this.temperature <= 28) this.tempStatus = 'Perfect';
      else this.tempStatus = 'Hot';
      
      if (this.humidity < 45) this.humStatus = 'Dry';
      else if (this.humidity <= 60) this.humStatus = 'Optimal range';
      else this.humStatus = 'Humid';
    }
  }
});
