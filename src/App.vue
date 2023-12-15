<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import { ref } from "vue";
  
  import Sidebar from './components/Sidebar.vue';

  const user = ref(null);

</script>

<template>
  <div class="flex h-full">
    <Sidebar v-if="user" />
    <div class="grow flex flex-col transition-all">
      <header>
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/admin">Admin</RouterLink>
          <RouterLink to="/auth/login">Authentication</RouterLink>
        </nav>
      </header>
      <main class="grow overflow-y-scroll overflow-x-hidden">
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
  @apply ms-6;
}
main {
  height: calc(100vh - 64px);
}
</style>
