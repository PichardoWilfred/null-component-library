<template>
    <div class="modal-container">
        <div class="mask"  @click="closeModal"></div>
        <div class="modal">
            <div class="modal-header">
                <h3>
                    {{ title }}
                </h3>
                <span class="cursor-pointer text-[1rem] text-gray-300 ms-auto" @click="closeModal">
                    ✖
                </span>
            </div>
            <slot />
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    title: String,
});
const emit = defineEmits('closeModal');
const closeModal = () => {
    emit('closeModal');
}
</script>
<style scoped>
.modal-container  {
    @apply fixed top-0 left-0 h-screen w-screen flex items-center justify-center;
}
.modal-container .mask {
    @apply absolute top-0 left-0 bg-[#090909CC] w-full h-screen;
}
.modal-container .modal {
    @apply min-h-[400px] min-w-[720px] z-[99] bg-secondary rounded-[8px] p-5;
}
.modal-container .modal .modal-header {
    @apply flex justify-center;
}
.modal-container .modal .modal-header h3 {
    @apply text-[#D2D9E9] text-[1.6rem] font-medium;
}
</style>