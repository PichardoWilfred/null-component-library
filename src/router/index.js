import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Auth from '@/views/Auth.vue'

import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { 
      path: '/auth', 
      component: Auth,
      children: [
        {
          path: '/auth/login',
          component: Login
        },
        {
          path: '/auth/register',
          component: Register
        }
      ]
    }
  ]
})

export default router
