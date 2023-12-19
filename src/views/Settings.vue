<template>
  <div class="about">
    <h1 class="font-poppins">
      This is the administrator dashboard
      <Icon icon="ant-design:close-circle-twotone" />
    </h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

</style>

<script setup>
import { Icon } from '@iconify/vue';
</script>
