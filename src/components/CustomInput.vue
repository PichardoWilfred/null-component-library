<template>
    <div class="w-full min-h-[76px] mt-3">
        <div class="component-container" :class="color_scheme[theme].color">
            <div class="input-container" :class="color_scheme[theme].border">
                <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" 
                :class="{'filled': modelValue !== ''}" :type="show_text ? 'text':'password'" />
                <label :class="color_scheme[theme].label">
                    {{ label }}
                </label>
                <template v-if="type === 'password'">
                    <Icon v-if="show_text" icon="ri:eye-off-line" class="password-toggler" :class="color_scheme[theme].color"  @click="show_text = !show_text"/>
                    <Icon v-else icon="ri:eye-line" class="password-toggler" :class="color_scheme[theme].color"  @click="show_text = !show_text" />
                </template>
            </div>
        </div>
        <span class="error-message" :class="color_scheme[theme].color">{{ props.error }}</span>
    </div>
</template>
<style scoped>
    .component-container {
        @apply flex flex-col min-w-[320px] font-poppins relative;
    }
    input {
        @apply bg-[transparent] focus-within:outline-none active:outline-none focus:outline-none mt-2 w-full;
    }
    .input-container {
        @apply flex border-2 rounded-[4px] p-2;
    }
    .input-container label {
        @apply font-bold absolute left-[10px] top-[15px] transition-all;
        pointer-events: none;
    }
    .input-container input:is(:active, :focus-within, :focus, .filled) + label {
        @apply scale-[0.6] top-[8px];
        transform-origin: top left;
    }
    .input-container svg.password-toggler {
        @apply absolute right-[10px] top-[50%] translate-y-[-50%] cursor-pointer text-[1.4rem];
    }
    span.error-message {
        @apply text-[12px] mt-1;
    }
</style>
<script setup>
import { Icon } from '@iconify/vue';
import { ref, onMounted } from "vue";

const props = defineProps({
    theme: {
        type: String,
        default: "dark"
    },
    type: {
        type: String,
        default: "text"
    },
    modelValue: String,
    error: String,
    label: String,
    placeholder: Number
});
defineEmits(['update:modelValue']);
const show_text = ref(true);
const color_scheme = ref({
    light: {
        border: 'border-blue-100',
        color: 'text-blue-100',
        label: 'text-blue-100',
        label_active: 'text-gray-400'
    },
    dark: {
        border: 'border-gray-400',
        color: 'text-gray-100',
        label: 'text-gray-400',
        label_active: 'text-gray-400'
    }
})
// const input = ref('');

onMounted(() => {
    show_text.value = props.type === 'text';
})
</script>