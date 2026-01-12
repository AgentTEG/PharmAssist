<template>
  <div class="form-container">
    <div class="card scrollable">
      <span class="logo-section">
        <div class="logo-container">
          <img src="../assets/logo.svg" alt="Logo" />
        </div>
        <span class="logo-name">PharmAssist</span>
      </span>
      <h3>Create New Account</h3>
      <form @submit.prevent="submitForm">
        <!-- USER INFO -->
        <input type="text" v-model="name" placeholder="Full Name" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          v-model="confirm"
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p class="switch-mode">
          Already have an account?
          <router-link to="/login" class="login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { handleregister } from "../JS/handleregister";

const profile = handleregister();

// User
const name = ref("");
const email = ref("");
const password = ref("");
const confirm = ref("");

// Medicines Boxes
const medicine1 = ref("");
const time1 = ref("");
const dose1 = ref("");
const medicine2 = ref("");
const time2 = ref("");
const dose2 = ref("");
const medicine3 = ref("");
const time3 = ref("");
const dose3 = ref("");

const submitForm = async () => {
  if (password.value !== confirm.value) {
    alert("Passwords do not match!");
    return;
  }

  const userData = {
    name: name.value,
    email: email.value,
    password: password.value,
  };

  // Save to Pinia store
  profile.saveProfile(userData);

  // Optional: sync to Firebase
  const saved = await profile.saveToFirebase();
  if (saved) alert("Registration successful!");

  // Reset form
  name.value = "";
  email.value = "";
  password.value = "";
  confirm.value = "";
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: rem;
  height: 100vh;
  background-color: #f4f6f8;
}

h2, h3 {
  background-color: transparent;
}

/* CARD STYLE */
.logo-section {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  margin-left: -0.5rem;
  background-color: transparent;
  gap: 0.3rem;
  user-select: none;
}
.logo-container{
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-container img{
  background-color: transparent;
  height: 20px;
  width: 20px;
}

.logo-name {
  background-color: transparent;
}

.card {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  padding: 1rem;
  height: 70vh;
  width: 30vw;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

/* Scrollable if form gets long */
.scrollable {
  max-height: 100vh;
  overflow-y: auto;
  padding-right: 10px;
}

/* HEADINGS */
h3 {
  margin-bottom: 15px;
  color: #444;
  font-weight: 600;
  margin-bottom: 2rem;
  user-select: none;
}

h4 {
  margin-bottom: 10px;
  color: #5b8df9;
  font-weight: 600;
  margin-top: 15px;
}

/* FORM INPUTS */
form {
  width: 95%;
  background-color: transparent;
}

form input,
form button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 12px;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: #fff;
}

/* BUTTON STYLE */
form button {
  background: #5b8df9;
  color: white;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

form button:hover {
  background: #3f6ae0;
}

.switch-mode, .login {
  background-color: transparent;
  text-decoration: none;
  user-select: none;
}
</style>
