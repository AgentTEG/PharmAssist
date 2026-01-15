import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Vue Router (GitHub Pages compatible)
import { createRouter, createWebHashHistory } from 'vue-router';

// Pages
import LoginPage from './components/login.vue';
import RegisterPage from './components/register.vue';
import Dashboard from './components/dashboard.vue';
import Homepage from './components/home.vue';
import EditMedication from './components/editmedication.vue';
import EditProfile from './components/editProfile.vue';
import MedHistory from './components/medhistory.vue';

// Routes
const routes = [
    { path: '/', redirect: '/login' },

    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/register', name: 'Register', component: RegisterPage },

    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        children: [
            { path: 'home', name: 'Home', component: Homepage },
            { path: 'editmedication', name: 'EditMedication', component: EditMedication },
            { path: 'editprofile', name: 'EditProfile', component: EditProfile },
            { path: 'medhistory', name: 'MedHistory', component: MedHistory }
        ]
    }
];

// Router instance
const router = createRouter({
    history: createWebHashHistory(), // ✅ REQUIRED for GitHub Pages
    routes
});

// Create app
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
