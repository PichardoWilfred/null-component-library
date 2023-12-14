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
button {
    @apply font-poppins bg-blue-200 font-medium rounded-md min-h-[30px] min-w-[70px] text-white px-12 py-3 active:brightness-75 transition-all;
}
</style>