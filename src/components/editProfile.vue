<template>
    <navBar />
    <div class="editprofile-container">
        <div class="editprofile-content">
            <div class="editprofile-header">
                <router-link to="home" class="hometext"> Go Back </router-link>
            </div>


            <div class="main-content">
                <div class="formcontent">
                    <h2> Update User Profile </h2>
                    <form @submit.prevent="submitForm">
                        <!-- USER INFO -->
                        <input type="text" v-model="profile.user.name" placeholder="Full Name" required />
                        <input type="email" v-model="profile.user.email" placeholder="Email" required />
                        <input type="password" v-model="profile.user.password" placeholder="Password" required />
                        <input type="password" v-model="confirm" placeholder="Confirm Password" required />
                        <button type="submit">Update details</button>
                    </form>
                </div>

                <div class="updated-details">
                    <div class="userdetails">
                        <div class="userdetails-title">
                            <h3>Current User Details</h3>
                        </div>
                        <p><strong>Name:</strong> {{ profile.user.name }}</p>
                        <p><strong>Email:</strong> {{ profile.user.email }}</p>
                        <p><strong>Password:</strong> {{ profile.user.password ? '********' : '' }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import navBar from './navbar.vue'
import { handleregister } from '../JS/handleregister.js'
import { handlelogin } from '../JS/handlelogin.js'
import { getDatabase, ref as dbRef, get } from 'firebase/database'

const router = useRouter();
const profile = handleregister();
const login = handlelogin();
const confirm = ref('');

onMounted(async () => {
    if (!login.safeEmail) {
        alert('Please login first');
        router.push('/login');
        return;
    }
    const db = getDatabase();
    const userRef = dbRef(db, `users/${login.safeEmail}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        const data = snapshot.val();
        profile.saveProfile(data);
    } else {
        alert('User data not found');
    }
});

const submitForm = async () => {
    if (profile.user.password !== confirm.value) {
        alert("Passwords do not match!");
        return;
    }
    const updated = await profile.updateProfile();
    if (updated) {
        alert("Profile updated successfully!");
        confirm.value = '';
    } else {
        alert("Update failed");
    }
};
</script>

<style scoped>
.editprofile-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.editprofile-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 80vh;
    margin: 0;
    padding: 0;
    gap: 0.5rem;
}

.editprofile-header {
    display: flex;
    align-items: center;
    justify-content: right;
    width: 100%;
    padding-left: 5rem;
    padding-right: 5rem;
}

.hometext {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background-color: #f3e9ff;
    width: 7rem;
    height: 3rem;
    border-radius: 12px;
    color: #1e40af;
    margin-right: 5%;
}

h2 {
    font-size: x-large;
    font-weight: 600;
    color: #444430;
    background-color: transparent;
}

.main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;
    gap: 2rem;
    background-color: #fafaf9;
}


.formcontent {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 24px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    padding: 4rem;
}

.formcontent form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: transparent;
    padding: 1rem;
}

.formcontent input,
.formcontent button {
    width: 20vw;
    padding: 0.5rem;
    background-color: transparent;
    border-radius: 12px;
    height: 3.5rem;
    border: 1px solid #ccc;

}

.formcontent button {
    background-color: #d0fae6;
    color: #059669;
    font-weight: 600;
    border: none;
}

.updated-details {
    background-color: #fff;
    color: #444430;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.userdetails {
    height: 90%;
    width: 90%;
    background-color: transparent;
}

.userdetails p, .userdetails h3 {
    background-color: #fff
}

.userdetails h3{
    font-weight: 600;
}

.userdetails-title {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}
</style>
