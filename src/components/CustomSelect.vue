<template>
    <div class="select-container">
        <div class="select-input" @click="show_options = !show_options">
            <span>
                {{ modelValue.label }}
            </span>
            <Icon icon="material-symbols:keyboard-arrow-down-rounded" class="text-[1.2rem] text-gray-100" />
        </div>
        <ul ref="options_reference" v-if="show_options" class="select-options">
            <li v-for="(option, index) in options" :key="index" @click="select_option(index)">
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>
<style scoped>
.select-container {
    @apply relative flex items-center;
}
.select-container .select-input {
    @apply flex justify-between items-center border border-gray-400 rounded-[4px] p-1 ps-2 text-gray-100 hover:text-white hover:bg-gray-400 w-[60px] cursor-pointer transition-all;
}
.select-container .select-options {
    @apply absolute top-[42px] left-0 flex flex-col overflow-y-scroll max-h-[50px] w-[60px] rounded-[4px] bg-gray-400;
}
.select-container .select-options li {
    @apply cursor-pointer px-2 hover:bg-gray-300 text-gray-100 hover:text-white transition-all;
}
</style>
<script setup>
import { Icon } from '@iconify/vue';
import { ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
    options: {
        type: Array,
        default: [
            {
                label: 'type',
                value: 'TYPE'
            },
            {
                label: 'of',
                value: 'OF'
            },
            {
                label: 'options',
                value: 'OPTIONS'
            },
            {
                label: 'example',
                value: 'EXAMPLE'
            },
            {
                label: 'example',
                value: 'EXAMPLE'
            },
            {
                label: 'example',
                value: 'EXAMPLE'
            },
            {
                label: 'example',
                value: 'EXAMPLE'
            },
            {
                label: 'example',
                value: 'EXAMPLE'
            },
            {
                label: 'example',
                value: 'EXAMPLE'
            },
            {
                label: 'example',
                value: 'EXAMPLE'
            },
            {
                label: 'example',
                value: 'EXAMPLE'
            },
            {
                label: 'example',
                value: 'EXAMPLE'
            },
        ]
    },
    modelValue: {
        type: Object,
        default: {
            label: 'type',
            value: 15
        }
    }
});

const emit = defineEmits(['update:modelValue']);
const show_options = ref(false);

// watch(props.modelValue, (value) => {
//     console.log(value);
// });

const select_option = (index) => {
    // props.modelValue = ;
    show_options.value = false;
    emit('update:modelValue', JSON.parse(JSON.stringify(props.options[index])));
}

const options_reference = ref(null);
function close_options() {
    if (show_options.value) show_options.value = false;
}
onClickOutside(options_reference, close_options);
</script>