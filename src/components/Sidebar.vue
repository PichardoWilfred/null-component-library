<template>
    <aside class="flex flex-col overflow-hidden bg-secondary grow-0 border-r border-r-gray-400 w-full transition-all h-[100vh]" >
        <div class="flex p-4 w-[240px]">
            <div class="bg-gray-400 rounded-full h-[52px] w-[52px]" />
            <div class="font-poppins text-gray-100  ms-[18px] flex-1">
                <h1 class="font-bold text-[1.2rem] leading-5 pt-3">
                    {{ auth.user.username }}
                </h1>
                <h2 >
                    {{ auth.user.role === 1 ? 'Administrador': 'Usuario' }}
                </h2>
            </div>
        </div>
        <ul class="grow flex flex-col text-white font-poppins min-w-[240px]">
            <li v-for="({ icon, label, show, action },index) in navigation_" :key="index"
            v-show="show" @click.prevent="action"
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
import { ref, computed, onMounted } from 'vue';
import { router } from '@/router';

import { useAuthStore } from '@/stores/auth.js';
const auth = useAuthStore();
const admin = computed(() => auth.user?.role === 1 ); // role 1 is designated as the admin role

const navigation_ = ref([
    {   
        show: admin,
        icon: 'material-symbols:dashboard-outline-rounded',
        label: 'Manejo general',
        address: '/settings',
        action: () => {
            router.push('/settings');
        }
    },
    // {   
    //     show: true,
    //     icon: 'fluent:task-list-square-16-filled',
    //     label: 'Historial de Citas',
    //     address: '/',
    //     action: () => {
    //         router.push('/past-appointments');
    //     }
    // },
    {   
        show: true,
        icon: 'fluent:task-list-24-regular',
        label: 'Citas Activas',
        address: '/login',
        action: () => {
            router.push('/appointments');
        }

    },
    {   
        show: true,
        icon: 'ri:task-line',
        label: 'Nueva Cita',
        address: '/',
        action: () => {
            router.push('/');
        }

    },
    // {
    //     show: admin,
    //     icon: 'ri:user-line',
    //     label: 'Clientes',
    //     address: '/clients',
    //     action: () => {}
    // },
    {
        show: true,
        icon: 'mynaui:logout',
        label: 'Cerrar Sesión',
        address: '/settings',
        action: () => {
            auth.logout();
        }
    }
])
// onMounted(() => {

// });
</script>