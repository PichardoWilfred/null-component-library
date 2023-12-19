<script setup>
  import { RouterView } from 'vue-router';
  import { useAuthStore } from '@/stores/auth.js';

  import Sidebar from './components/Sidebar.vue';
  const auth = useAuthStore();
  </script>

<template>
  <div class="flex h-full">
    <Sidebar v-if="auth.user" />
    <div class="grow flex flex-col transition-all">
      <main class="grow overflow-y-scroll overflow-x-hidden h-screen">
        <RouterView />
      </main>
    </div>
  </div>
</template>
<style scoped>
header {
  @apply flex items-center font-poppins text-white bg-secondary min-h-[64px];
}
header nav a {
  @apply ms-6;
}
</style>
