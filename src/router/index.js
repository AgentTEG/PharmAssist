import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/home.vue'
import Login from '../components/login.vue'
import Register from '../components/register.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = createRouter({
  history: createWebHashHistory(), // prevents white screen on GitHub Pages
  routes
})

export default router
