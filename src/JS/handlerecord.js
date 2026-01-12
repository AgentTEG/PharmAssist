import { defineStore } from "pinia";
import { db } from "./firebase";
import { ref, set, onValue } from "firebase/database";

export const useMedicineStore = defineStore("record", {
  state: () => ({
    medicines: {}
  }),

  actions: {
    listenMedicines() {
      const medicineRef = ref(db, "medicine");
      onValue(medicineRef, (snapshot) => {
        if (snapshot.exists()) {
          this.medicines = snapshot.val();
        }
      });
    },

    async saveMedicine(box, medicine, time, dose) {
      await set(ref(db, `medicine/${box}`), {
        medicine,
        time,
        dose
      });
    }
  }
});
