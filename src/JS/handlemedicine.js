import { defineStore } from "pinia"
import { db } from "./firebase"
import { ref, set, onValue } from "firebase/database"

export const useMedicineStore = defineStore("medicine", {
  state: () => ({
    medicines: {
      daily: {},
      weekly: {}
    }
  }),

  actions: {
    listenMedicines() {
      const medicineRef = ref(db, "medicine")
      onValue(medicineRef, (snapshot) => {
        if (snapshot.exists()) {
          this.medicines = snapshot.val()
        }
      })
    },

    async saveMedicine(intakeType, box, medicine, time, dose, lastTaken) {

      const otherType = intakeType === "daily" ? "weekly" : "daily";

      const otherBoxRef = ref(db, `medicine/${otherType}/${box}`);
      await set(otherBoxRef, null); 

      await set(ref(db, `medicine/${intakeType}/${box}`), {
        medicine,
        time,
        dose,
        lastTaken
      })
    }
  }
})
