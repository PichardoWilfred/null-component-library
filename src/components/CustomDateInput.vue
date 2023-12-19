<template>
    <div class="relative" :class="[props.theme, props.type === 'time' ? 'max-w-[140px]': 'w-max']">

        <VueDatePicker v-if="props.type === 'date'" v-model="props.modelValue"
        locale="es" :enable-time-picker="false" :clearable="false" :allowed-dates="available_dates" dark />
        <VueDatePicker v-else-if="props.type === 'time'" v-model="props.modelValue"
        locale="es" time-picker :clearable="false" :is-24="false" dark />

        <div v-if="props.type === 'time'" class="p-1 bg-[#17191D] w-max absolute top-[5px] left-[5px]">
            <Icon icon="ri:alarm-line" class="text-[1.2rem] text-gray-100" />
        </div>

    </div>
</template>
<script setup>
import { Icon } from '@iconify/vue';
import { ref, computed, watch } from 'vue';

const date = ref(null);

const props = defineProps({
    theme: {
        type: String,
        default: "dark"
    },
    type: {
        type: String,
        default: "date"
    },
    modelValue: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:modelValue']);
watch(props.modelValue, (value) => {
    emit('update:modelValue', value)
})

const available_dates = computed(() => {
    const available_dates_ = [];
    for (let i = 1; i < 90; i++) { // 3 months = 90 days (approximately)
        const date = new Date();
        date.setDate(date.getDate() + i);
        available_dates_.push(date); // Push formatted date to array
    }
    return available_dates_;
});
</script>
<style>
    .dp__theme_dark {
        --dp-background-color: #17191D !important;
        --dp-hover-color: #2C323E !important;
        --dp-primary-color: #7DA3F4 !important;
        --dp-secondary-color: #39404e !important;
        --dp-border-color: #2C323E !important;
        --dp-menu-border-color: #2d2d2d;
        --dp-border-color-hover: #4D6EB5 !important;
        --dp-icon-color: #C7D3EC !important;
        --dp-hover-icon-color: #7DA3F4 !important;
    }
    .dp__action_cancel:hover {
        color: #7DA3F4 !important;
    }
    .dp__action_cancel {
        color: #8999BA !important;
    }
    .dp__selection_preview {
        color: #8999BA !important;
    }
</style>