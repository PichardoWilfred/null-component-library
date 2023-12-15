<template>
    <button>
        {{ label }}
    </button>
</template>
<script setup>
defineProps({
    label: String,
});
</script>
<style scoped>
</style>