<template>
  <div class="form-page">
    <div class="card auth-card">
      <span class="logo-section">
        <div class="logo-container">
          <img src="../assets/logo.svg" alt="Logo" />
        </div>
        <span class="logo-name">PharmAssist</span>
      </span>
      <span class="login-title">Welcome Back</span>
      <span class="titleDesc">Login to access the dashboard</span>
      <form @submit.prevent="submitlogin">
        <input type="email" v-model="email" placeholder="Email" required />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p class="switch">
        Don't have an account?
        <router-link to="/register" class="signup">Sign Up</router-link>
      </p>
    </div>
    <img :src="background" alt="Background" class="background-image" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { handlelogin } from "../JS/handlelogin";
import { useRouter } from "vue-router";
import background from "../assets/bg.jpg";

const router = useRouter();
const email = ref("");
const password = ref("");

let logpass = false;
let loginhandler = handlelogin();

async function submitlogin() {
  logpass = await loginhandler.loginCredentials(email.value, password.value);

  if (logpass) {
    router.push("/dashboard/home");
  }
}
</script>

<style scoped>
.form-page {
  min-height: 100vh;
  background: #f4f6f8;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-family: "Inter", sans-serif;
  gap: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  height: 70vh;
  max-width: 380px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

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
.logo-container {
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-container img {
  background-color: transparent;
  height: 20px;
  width: 20px;
}

.titleDesc {
  margin-bottom: 20px;
  font-size: 0.8rem;
  font-weight: 300;
  color: #44403c;
  background-color: transparent;
  margin-bottom: 1.5rem;
  user-select: none;
}

.login-title {
  text-align: center;
  color: #44403c;
  font-weight: 700;
  font-size: x-large;
  background-color: transparent;
  user-select: none;
}

.logo-name {
  font-size: 1rem;
  font-weight: 600;
  color: #44403c;
  background-color: transparent;
}

.card form {
  background-color: transparent;
  user-select: none;
}

input,
button {
  width: 100%;
  padding: 10px;
  margin-bottom: 1.1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: transparent;
}

button {
  background: #4f46e5;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background: #4338ca;
}

.switch {
  text-align: center;
  font-size: 14px;
  color: #555;
  background-color: transparent;
  user-select: none;
}

.switch a {
  color: #4f46e5;
  text-decoration: none;
}

.signup {
  background-color: transparent;
}

.background-image {
  top: 0;
  left: 0;
  width: 25vw;
  height: 70vh;
  z-index: 1;
  border: 10px solid #fff;
  outline-offset: -10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}
</style>
