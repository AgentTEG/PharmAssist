<script setup>
import { ref, onMounted } from "vue";

const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<template>
    <div class="header">
        <div class="left-header">
            <div class="logo-container">
                <img src="../assets/logo.svg" alt="Logo" />
            </div>
            <span class="logo-name">PharmAssist</span>
        </div>

        <nav class="avatar-dropdown">
            <ul>
                <li class="dropdown">
                    <button class="dropbtn" @click="toggleDropdown">LB</button>
                    <ul :class="{ 'dropdown-content': true, show: isDropdownOpen }">
                        <li>
                            <router-link to="/editProfile">Edit profile</router-link>
                        </li>
                        <li>
                            <router-link to="/editMedication">Edit medication</router-link>
                        </li>
                        <li>
                            <router-link to="/login">Logout</router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  margin-left: 10%;
  margin-right: 10%;
}

.left-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #44403C;
}

.logo-container {
  background-color: #fff;
  height: 56px;
  width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: -1px 2px 6px rgb(219, 219, 219);
}

.logo-container img {
  height: 32px;
  width: 32px;
  background-color: transparent;
}

/* Avatar Dropdown */
.dropdown {
  position: relative;
  display: inline-block;
  gap: 10px;
}

.dropbtn {
  background: #f3e9ff;
  color: #1e40af;
  cursor: pointer;
  height: 3.8rem;
  width: 3.8rem;
  border: none;
  border-radius: 50%;
  font-size: x-large;
  font-weight: 500;
}

.dropdown-content {
  display: none;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 4.4rem;
  background: white;
  min-width: 160px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  font-size: large;
  text-align: right;
  border-radius: 16px;
  overflow: hidden;
  border-bottom: 5px solid #f3e9ff;
}

.dropdown-content.show {
  display: flex;
}

.dropdown-content li {
  list-style: none;
}

.dropdown-content li a {
  display: block;
  padding: 10px;
  text-decoration: none;
  border: none;
  color: #1e40af;
}

</style>