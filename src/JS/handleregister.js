import { defineStore } from 'pinia'
import { getDatabase, ref, set } from "firebase/database";

export const handleregister = defineStore('profile', {
  state: () => ({
    user: {
      name: '',
      email: '',
      password: ''
    }
  }),

  actions: {
    saveProfile(userData) {
      this.user = { ...userData }
    },

    async saveToFirebase() {
      const db = getDatabase()
      const safeEmail = this.user.email
        .replace(/\./g, ',')
        .replace(/@/g, '_')

      await set(ref(db, `users/${safeEmail}`), {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })

      console.log('User saved:', this.user.email)
      return true
    }
  }
})