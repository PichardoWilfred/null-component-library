import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Clients from '@/views/Client.vue'
import Auth from '@/views/Auth.vue'

import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/client', component: Clients },
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
});

//  { router };
