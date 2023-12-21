import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js';

import Home from '@/views/Home.vue'
import Appointments from '@/views/Appointments.vue'
import Settings from "@/views/Settings.vue"
import Auth from '@/views/Auth.vue'

import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/appointments', component: Appointments },
    { path: '/settings', component: Settings },
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

router.beforeEach(async (to) => {
  const authStore = useAuthStore();
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/auth/login', '/auth/register'];

  const authRequired = !publicPages.includes( to.path );
  const auth_valid = authStore.user?.role !== 0;
  
  if (authRequired && !authStore?.user) {
    authStore.$patch({ returnUrl: to.fullPath });
    return '/auth/login';
  }
});
