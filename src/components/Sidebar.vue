<template>
    <aside class="flex flex-col overflow-hidden bg-secondary grow-0 border-r border-r-gray-400 w-full transition-all h-[100vh]" >
        <div class="flex p-4 w-[240px]">
            <div class="bg-gray-400 rounded-full h-[52px] w-[52px]" />
            <div class="font-poppins text-gray-100  ms-[18px] flex-1">
                <h1 class="font-bold text-[1.2rem] leading-5 pt-3">
                    John Doe
                </h1>
                <h2 >
                    Administrador
                </h2>
            </div>
        </div>
        <ul class="grow flex flex-col text-white font-poppins min-w-[240px]">
            <!-- :to="address" -->
            <li v-for="({ icon, label, address, action },index) in navigation_" :key="index"
            @click.prevent="action"
            class="flex items-center cursor-pointer text-gray-200 last:mb-0 py-[18px] px-4 last:mt-auto hover:text-white hover:bg-gray-400 transition-all">
                <Icon :icon="icon" class="mx-[10px] text-[1.8rem]"/>
                <span class="ms-[19px]">
                    {{ label }}
                </span>
            </li>
        </ul>
    </aside>
</template>
<style scoped>
    aside { @apply max-w-[85px]; }
    aside:hover { @apply max-w-[260px]; }
</style>
<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { router } from '@/router';

import { useAuthStore } from '@/stores/auth.js';
const auth = useAuthStore();

const navigation_ = ref([
    {
        icon: 'fluent:task-list-square-16-filled',
        label: 'Historial de Citas',
        address: '/',
        action: () => {

        }
    },
    {
        icon: 'fluent:task-list-24-regular',
        label: 'Citas Activas',
        address: '/login',
        action: () => {

        }

    },
    {
        icon: 'ri:user-line',
        label: 'Clientes',
        address: '/admin',
        action: () => {

        }
    },
    {
        icon: 'material-symbols:dashboard-outline-rounded',
        label: 'Manejo general',
        address: '/settings',
        action: () => {
            // router.push('/auth/login');
        }
    },
    {
        icon: 'mynaui:logout',
        label: 'Cerrar Sesión',
        address: '/settings',
        action: () => {
            auth.logout();
        }
    }
])
// const logout = () => {
// }
</script>