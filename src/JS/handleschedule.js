// handleschedule.js
import { defineStore } from 'pinia'
import { db } from './firebase.js'
import { ref, get } from 'firebase/database'

// ---------------- HELPERS ----------------
function isSameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate()
}

function isPastScheduledTime(timeStr) {
  if (!timeStr) return false

  const now = new Date()
  const [h, m] = timeStr.split(':').map(Number)

  const sched = new Date()
  sched.setHours(h, m, 0, 0)

  return now > sched
}

// ---------------- STORE ----------------
export const useHandleSchedule = defineStore('handleSchedule', {
  state: () => ({
    box1medicine: null,
    box1dose: 0,
    box1shed: null,
    box1schedtype: null,
    box1status: 'empty',

    box2medicine: null,
    box2dose: 0,
    box2shed: null,
    box2schedtype: null,
    box2status: 'empty',

    box3medicine: null,
    box3dose: 0,
    box3shed: null,
    box3schedtype: null,
    box3status: 'empty',

    box4medicine: null,
    box4dose: 0,
    box4shed: null,
    box4schedtype: null,
    box4status: 'empty',

    medremain: 0
  }),

  actions: {
    async fetchBoxes() {
      const boxes = ['box1','box2','box3','box4']
      const types = ['daily','weekly']

      for (const box of boxes) {
        let medicine = null
        let dose = 0
        let shed = null
        let status = 'empty'
        let schedType = null
        let hasData = false

        for (const type of types) {
          const snap = await get(ref(db, `medicine/${type}/${box}`))
          if (!snap.exists()) continue

          hasData = true
          schedType = type   // 👉 SAVE DAILY / WEEKLY

          const data = snap.val()
          const now = new Date()
          const lastTaken = data.lastTaken ? new Date(data.lastTaken) : null

          // ---------- DAILY ----------
          if (type === 'daily') {
            if (lastTaken && isSameDay(lastTaken, now)) {
              status = 'taken'
            } else if (isPastScheduledTime(data.time)) {
              status = 'missed'
            } else {
              status = 'pending'
            }
          }

          // ---------- WEEKLY ----------
          if (type === 'weekly') {
            if (lastTaken) {
              const diffDays = (now - lastTaken) / (1000 * 60 * 60 * 24)
              status = diffDays < 7 ? 'taken' : 'missed'
            } else {
              status = 'pending'
            }
          }

          // ---------- ASSIGN DATA ----------
          if (!medicine) medicine = data.medicine || null
          if (!dose && data.dose) dose = data.dose
          if (!shed && data.time) shed = data.time
        }

        // ---------- EMPTY ----------
        if (!hasData || !medicine) {
          status = 'empty'
          schedType = null
        }

        // ---------- SAVE TO STATE ----------
        this[`${box}medicine`] = medicine
        this[`${box}dose`] = dose
        this[`${box}shed`] = shed
        this[`${box}schedtype`] = schedType
        this[`${box}status`] = status

        if (status === 'pending' || status === 'missed') {
          this.medremain++
        }

        console.log(`Debug ${box}:`, {
          medicine,
          dose,
          scheduled: shed,
          schedType,
          status
        })
      }
    }
  }
})