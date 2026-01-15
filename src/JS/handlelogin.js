//handlelogin.js
import { defineStore } from 'pinia'
import { getDatabase, ref, get, update } from 'firebase/database'
export const handlelogin = defineStore('login', {
  state: () => ({
    email: '',
    password: '',
    name: '',
    lastLog: null,  
    safeEmail:''
  }),
  actions: {
    async loginCredentials(Email, Password) {
      this.email = Email
      this.password = Password

      console.log('Login credentials saved:', this.email, this.password)

      const db = getDatabase()
      this.safeEmail = this.email.replace(/\./g, ',').replace(/@/g, '_')
      const userRef = ref(db, `users/${this.safeEmail}`)

      try {
        const snapshot = await get(userRef)

        if (!snapshot.exists()) {
          console.error('No user found with email:', this.email)
          return false
        } else if (snapshot.val().password !== this.password) {
          console.error('Incorrect password for email:', this.email)
          return false
        } else {
          console.log('User logged in successfully:', this.email)
          console.log('User data:', this.safeEmail)
          const now = new Date().toISOString()
          await update(userRef, { lastLog: now })

          this.lastLog = now
          this.name = snapshot.val().name || '' 
          console.log('Updated lastLog:', now)
          console.log('User name:', this.name)
          return true
        }
      } catch (err) {
        console.error('Firebase error:', err)
        return false
      }
    }
  }
})