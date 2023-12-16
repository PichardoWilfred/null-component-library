<script setup>
import CustomTable from '@/components/CustomTable.vue';
</script>

<template>
  <div class="m-5">
    <CustomTable :column_headers="['Cliente','Lavador','Fecha','Duración','Estación']" />
  </div>
</template>
