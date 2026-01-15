<script setup>

</script>

<template>
  <span class="header">
    <div class="left-header">
      <div class="logo-container">
        <img src="../assets/logo.svg" alt="Logo" />
      </div>
      <span class="logo-name">PharmAssist</span>
    </div>

    <nav class="navlink-wrapper">
      <ul class="navlink-container">
        <span class="navlink">
          <li>
            <router-link to="/home">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/editProfile">Edit profile</router-link>
          </li>
          <li>
            <router-link to="/editMedication">Edit medication</router-link>
          </li>
        </span>
        <span class="logoutbtn">
          <li>
            <router-link to="/login">Logout</router-link>
          </li>
        </span>
      </ul>
    </nav>
  </span>
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
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
  flex-direction: column;
  height: 100vh;
  width: 17%;
  gap: 3rem;
  background-color: #fff;
  box-shadow: 2px 2px 16px rgb(219, 219, 219);
}

.left-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: transparent;
  flex-wrap: wrap;
  flex-direction: row;
  margin-left: -12%;
  user-select: none;
}

.logo-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #44403c;
  background-color: transparent;
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

/* Navlinks */

.navlink-wrapper {
  height: 100%;
  display: flex;
  width: 75%;
  background-color: transparent;
}

.navlink-wrapper ul {
  list-style: none;
  background-color: transparent;
}

.navlink-container {
  display: flex;
  flex-direction: column;
  background-color: transparent;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.logoutbtn, .navlink{
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
}

.logoutbtn li, .navlink li{
  background-color: transparent;
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.navlink li a, .logoutbtn li a{
  text-decoration:  none;
  background-color: transparent;
  font-size: x-large;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  display: flex;
  padding-left: 1.5rem;
  align-items: center;
}

.navlink li a{
  color: #F59E0B;
  background-color: #FFFBEB;
  border: 3px solid transparent; 
  border-radius: 12px;
  border: 3px solid;
  border-color: #F59E0B;  
}

.logoutbtn li a{
  color: #1E40AF;
  background-color: #F3E9FF;
  border: 3px solid ;
  border-color: #1E40AF;
  width: 100%;
  transition: all 0.3s ease;

}

</style>
