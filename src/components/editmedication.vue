<template>
  <navBar />
  
  <div class="container">
    <div class="medication-header">
      <h2>Medicine Scheduler</h2>
      <span class="homepagebtn"> 
        <router-link to="/Home" class="hometext">Go Back</router-link>
      </span>
    </div>

    <div class="scheduler">
      <!-- LEFT: Form -->
      <div class="form-card">
        <h3>Add Medicine</h3>

        <form @submit.prevent="save">
          <!-- Intake -->
          <select v-model="intakeType" required>
            <option disabled value="">Select Intake</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>

          <!-- Box -->
          <select v-model="box" required>
            <option disabled value="">Select Box</option>
            <option value="box1">Box 1</option>
            <option value="box2">Box 2</option>
            <option value="box3">Box 3</option>
            <option value="box4">Box 4</option>
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
      <div class="display-card">
        <h3>Scheduled Medicines</h3>

        <h4>Daily</h4>
        <div class="med-list">
          <div
            v-for="(data, key) in store.medicines.daily"
            :key="key"
            class="med-item"
          >
            <strong class="med-box">{{ key.toUpperCase() }}</strong>
            <p><span class="med-label">Medicine:</span> {{ data.medicine }}</p>
            <p><span class="med-label">Time:</span> {{ data.time }}</p>
            <p><span class="med-label">Dose left:</span> {{ data.dose }}</p>
            <p><span class="med-label">Last taken:</span> {{ data.lastTaken }}</p>
          </div>
        </div>

        <h4>Weekly</h4>
        <div class="med-list">
          <div
            v-for="(data, key) in store.medicines.weekly"
            :key="key"
            class="med-item"
          >
            <strong class="med-box">{{ key.toUpperCase() }}</strong>
            <p><span class="med-label">Medicine:</span> {{ data.medicine }}</p>
            <p><span class="med-label">Time:</span> {{ data.time }}</p>
            <p><span class="med-label">Dose left:</span> {{ data.dose }}</p>
            <p><span class="med-label">Last taken:</span> {{ data.lastTaken }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <newHome />
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useMedicineStore } from "../JS/handlemedicine"

import navBar from './navbar.vue';
import { RouterLink } from "vue-router";
const store = useMedicineStore()

const intakeType = ref("")
const box = ref("")
const medicine = ref("")
const time = ref("")
const dose = ref("")
const lastTaken = ref("")

const save = async () => {
  await store.saveMedicine(
    intakeType.value,
    box.value,
    medicine.value,
    time.value,
    dose.value,
    lastTaken.value
  )

  intakeType.value = ""
  box.value = ""
  medicine.value = ""
  time.value = ""
  dose.value = ""
  lastTaken.value = ""
}

onMounted(() => {
  store.listenMedicines()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');


.container {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
  margin-top: 0%;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.medication-header{
  display: flex;
  justify-content: space-between;
}

.homepagebtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  background: #f3e9ff;
  color: #1e40af;
  border-radius: 16px;
  height: 3rem
}

.hometext {
  text-decoration: none;
  background-color: transparent;
}

.scheduler {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: flex-start;
}

/* FORM CARD */
.form-card {
  flex: 1;
  min-width: 280px;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
}

.form-card form, .form-card select {
  background-color: transparent;
}

.form-card h3 {
  margin-bottom: 20px;
  color: #444;
  font-weight: 600;
  background-color: transparent;
}

.form-card input, .form-card select {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  transition: border 0.2s;
  font-family: 'Poppins', sans-serif;
}

.form-card input:focus, .form-card select:focus {
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
  font-family: 'Poppins', sans-serif;
}

.form-card button:hover {
  background: #3f6ae0;
}

/* DISPLAY CARD */
.display-card {
  flex: 1;
  min-width: 280px;
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  max-height: 500px;
  overflow-y: auto;
}

.display-card h3 {
  margin-bottom: 20px;
  color: #444;
  font-weight: 600;
}

.med-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.med-item {
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
  font-family: 'Courier New', Courier, monospace; /* distinct, techy look */
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