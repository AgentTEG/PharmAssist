// stores/handleTemphum.js
import { defineStore } from 'pinia'
import mqtt from 'mqtt'

export const useHandleTemphum = defineStore('handleTemphum', {
  state: () => ({
    temperature: '0 °C',
    humidity: '0 %',
    tempStatus: '',
    humStatus: '',
    client: null
  }),
  actions: {
    connectMQTT() {
      // connect to MQTT broker
      this.client = mqtt.connect('wss://12c86034fa9b49dcad0c8f78f4bb580a.s1.eu.hivemq.cloud:8884/mqtt', {
        username: 'NodeMCU',
        password: 'Nodemcu123',
        clientId: 'temphum_' + Math.random().toString(16).slice(2)
      })
      
      this.client.on('connect', () => {
        console.log('Connected to HiveMQ for TempHum!')
        this.client.subscribe('home/esp/sensors')
      })

      this.client.on('error', (err) => {
        console.log('MQTT ERROR:', err.message)
      })

      this.client.on('message', (topic, message) => {
        if (topic !== 'home/esp/sensors') return

        const payload = message.toString()
        // expected format: "28.5 | 65"
        const data = payload.split('|').map(s => s.trim())
        if (data.length < 2) return

        this.temperature = parseFloat(data[0]).toFixed(1) + ' °C'
        this.humidity = parseFloat(data[1]).toFixed(1) + ' %'

        this.updateStatus()
      })
    },

    updateStatus() {
      const tempValue = parseFloat(this.temperature)
      const humValue = parseFloat(this.humidity)

      // temperature status
      if (tempValue < 22) this.tempStatus = 'Cold'
      else if (tempValue <= 28) this.tempStatus = 'Perfect'
      else this.tempStatus = 'Hot'

      // humidity status
      if (humValue < 45) this.humStatus = 'Dry'
      else if (humValue <= 60) this.humStatus = 'Optimal range'
      else this.humStatus = 'Humid'
    }
  }
})