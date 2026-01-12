import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Vue Router
import { createRouter, createWebHashHistory } from 'vue-router'; // <-- hash mode for GitHub Pages
import LoginPage from './components/login.vue';
import RegisterPage from './components/register.vue';
import Homepage from './components/home.vue';
import EditMedication from './components/editmedication.vue';
import EditProfile from './components/editProfile.vue';

// Routes
const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/register', name: 'Register', component: RegisterPage },
    { path: '/home', name: 'Home', component: Homepage },
    { path: '/editmedication', name: 'EditMedication', component: EditMedication },
    { path: '/editprofile', name: 'EditProfile', component: EditProfile },
];

// Router instance
const router = createRouter({
    history: createWebHashHistory(), // <-- use hash mode
    routes
});

// Create app
const app = createApp(App);
app.use(createPinia());
app.use(router); // <- must be before mount
app.mount("#app");
