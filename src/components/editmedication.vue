<template>
  <div class="container">
    <div class="form-header">
      <h2>Setup medication Intakes</h2>
      <p>Add, edit, and schedule your medicine all in one place</p>
    </div>

    <div class="scheduler">
      <!-- LEFT: Form -->
      <div class="form-card">
        <h3>Adjust Schedule</h3>

        <form @submit.prevent="save">
          <!-- Intake -->
          <select v-model="intakeType" required>
            <option disabled value="">Select Intake</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>

          <!-- Box -->
          <select v-model="box" required>
            <option disabled value="">Select compartment</option>
            <option value="box1">Compartment A</option>
            <option value="box2">Compartment B</option>
            <option value="box3">Compartment C</option>
            <option value="box4">Compartment D</option>
          </select>

          <input
            type="text"
            v-model="medicine"
            placeholder="Medicine name"
            required
          />

          <input type="time" v-model="time" required />

          <input
            type="number"
            v-model="dose"
            placeholder="Dose"
            min="1"
            required
          />

          <!-- Last taken -->
          <input type="date" v-model="lastTaken" required />

          <button type="submit">Save</button>
        </form>
      </div>

      <!-- RIGHT: Display -->
      <div class="display-card-wrapper">
        <div class="display-card">
          <div class="med-list">
            <h4>Daily</h4>
            <div
              v-for="(data, key) in store.medicines.daily"
              :key="key"
              class="med-item"
            >
              <strong class="med-box">{{ key.toUpperCase() }}</strong>
              <p>
                <span class="med-label">Medicine:</span> {{ data.medicine }}
              </p>
              <p><span class="med-label">Time:</span> {{ data.time }}</p>
              <p><span class="med-label">Dose left:</span> {{ data.dose }}</p>
              <p>
                <span class="med-label">Last taken:</span> {{ data.lastTaken }}
              </p>
            </div>
          </div>

          <div class="med-list">
            <h4>Weekly</h4>
            <div
              v-for="(data, key) in store.medicines.weekly"
              :key="key"
              class="med-item"
            >
              <strong class="med-box">{{ key.toUpperCase() }}</strong>
              <p>
                <span class="med-label">Medicine:</span> {{ data.medicine }}
              </p>
              <p><span class="med-label">Time:</span> {{ data.time }}</p>
              <p><span class="med-label">Dose left:</span> {{ data.dose }}</p>
              <p>
                <span class="med-label">Last taken:</span> {{ data.lastTaken }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <newHome />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useMedicineStore } from "../JS/handlemedicine";

import { RouterLink } from "vue-router";
const store = useMedicineStore();

const intakeType = ref("");
const box = ref("");
const medicine = ref("");
const time = ref("");
const dose = ref("");
const lastTaken = ref("");

const save = async () => {
  await store.saveMedicine(
    intakeType.value,
    box.value,
    medicine.value,
    time.value,
    dose.value,
    lastTaken.value
  );

  intakeType.value = "";
  box.value = "";
  medicine.value = "";
  time.value = "";
  dose.value = "";
  lastTaken.value = "";
};

onMounted(() => {
  store.listenMedicines();
});
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-header h2 {
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #44403c;
}

.form-header p {
  font-weight: 600;
  color: #78716c;
}

.scheduler {
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  grid-template-rows: auto 1fr;
  gap: 2rem;
}

/* FORM CARD */
.form-card {
  flex: 1;
  min-width: 280px;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.form-card form,
.form-card select {
  background-color: transparent;
}

.form-card h3 {
  margin-bottom: 20px;
  color: #444;
  font-weight: 600;
  background-color: transparent;
}

.form-card input,
.form-card select {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  transition: border 0.2s;
  font-family: "Poppins", sans-serif;
}

.form-card input:focus,
.form-card select:focus {
  border-color: #5b8df9;
  outline: none;
}

.form-card button {
  width: 100%;
  padding: 12px;
  background: #5b8df9;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  font-family: "Poppins", sans-serif;
}

.form-card button:hover {
  background: #3f6ae0;
}

/* DISPLAY CARD */
.display-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  min-width: 280px;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.display-card h3 {
  margin-bottom: 20px;
  color: #444;
  font-weight: 600;
  background-color: transparent;
}

.display-card h4 {
  background-color: transparent;
  font-weight: 600;
  color: #44403c;
}

.med-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: transparent;
}

.med-item {
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding: 15px;
  border-radius: 10px;
  background: #f7f9fc;
  border-left: 5px solid #5b8df9;
  transition: transform 0.2s;
}

.med-item:hover {
  transform: translateX(5px);
}

.med-item p {
  margin: 4px 0;
  font-size: 14px;
  color: #555;
}

.med-item span {
  font-weight: 600;
  color: #333;
}

.med-box {
  color: #5b8df9;
  font-size: 16px;
}

/* RESPONSIVE */
@media (max-width: 700px) {
  .scheduler {
    flex-direction: column;
  }
}
</style>
