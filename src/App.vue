<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <div class="flex h-full">
    <Sidebar />
    <div class="grow flex flex-col transition-all">
      <header>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
        </nav>
      </header>
      <main class="grow">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
header {
  @apply flex items-center font-poppins text-white bg-secondary min-h-[64px];
}
header nav {
  @apply ms-4;
}
header nav a {
  @apply ms-2;
}
</style>
