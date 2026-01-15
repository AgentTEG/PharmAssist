<template>
  <div class="editprofile-container">
    <h3>Manage Account Settings</h3>
    <p class="description">Adjust and update your profile swiftly and quickly</p>
    <div class="main-content">
      <div class="formcontent">
        <h2>Edit Profile</h2>
        <form @submit.prevent="submitForm">
          <!-- USER INFO -->
          <span class="name-field inputfield">
            <span>Name:</span>
            <input
              type="text"
              v-model="profile.user.name"
              placeholder="Full Name"
            />
          </span>
          <span class="email-field inputfield">
            <span>Email:</span>
            <input
              type="email"
              v-model="profile.user.email"
              placeholder="Email"
            />
          </span>
          <span class="password-field inputfield">
            <span>Password:</span>
            <input
              type="password"
              v-model="profile.user.password"
              placeholder="Password"
            />
          </span>
          <button type="submit">Update Details</button>
        </form>
      </div>

      <div class="updated-details">
        <div class="userdetails">
          <div class="userdetails-header">
            <h2>Profile Overview</h2>
          </div>
          <p class="userdetails-title">
            <strong>Name:</strong> {{ profile.user.name }}
          </p>
          <p class="userdetails-title">
            <strong>Email:</strong> {{ profile.user.email }}
          </p>
          <p class="userdetails-title">
            <strong>Password:</strong>
            {{ profile.user.password ? "********" : "" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { handleregister } from "../JS/handleregister.js";
import { handlelogin } from "../JS/handlelogin.js";
import { getDatabase, ref as dbRef, get } from "firebase/database";

const router = useRouter();
const profile = handleregister();
const login = handlelogin();
const confirm = ref("");

onMounted(async () => {
  if (!login.safeEmail) {
    alert("Please login first");
    router.push("/login");
    return;
  }
  const db = getDatabase();
  const userRef = dbRef(db, `users/${login.safeEmail}`);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    profile.saveProfile(data);
  } else {
    alert("User data not found");
  }
});

const submitForm = async () => {
  const updated = await profile.saveToFirebase();
  if (updated) {
    alert("Profile updated successfully!");
    confirm.value = "";
  } else {
    alert("Update failed");
  }
};
</script>

<style scoped>
.editprofile-container h3 {
    font-size: 2.5rem;
    font-weight: 600;
    color: #44403c;
}

.description{
    font-weight: 600;
    color: #78716C;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: fit-content;
  gap: 1.5rem;
  background-color: #fafaf9;
}

.formcontent {
  background-color: #fff;
  display: flex;
  align-items: ;
  justify-content: center;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  gap: 1rem;
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.formcontent h2 {
  background-color: transparent;
  font-weight: 600;
  color: #44403c;
  font-size: 1.8rem;
}

.formcontent form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: transparent;
}

.formcontent input,
.formcontent button {
  width: 100%;
  padding: 1.5rem;
  background-color: transparent;
  border-radius: 12px;
  height: 3.5rem;
  border: 1px solid #ccc;
}

.formcontent button {
  background-color: #effff7;
  color: #059669;
  font-weight: 600;
  border: 2px solid #43a888;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}

.inputfield {
  display: flex;
  align-items: left;
  flex-direction: column;
  background-color: transparent;
}

.inputfield span {
  background-color: transparent;
  font-weight: 600;
  color: #44403c;
}

.updated-details {
  background-color: #fff;
  color: #44403c;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  padding: 2rem;
}

.userdetails {
  height: 90%;
  width: 90%;
  background-color: transparent;
}

.userdetails p,
.userdetails h2 {
  background-color: transparent;
}

.userdetails h2 {
  font-weight: 600;
}

.userdetails p {
  margin-top: 2rem;
  font-size: 1.2rem;
}

.userdetails-header {

  background-color: transparent;
}

.userdetails-title p{
    color: #44403c;
    background-color: transparent;
}
</style>
