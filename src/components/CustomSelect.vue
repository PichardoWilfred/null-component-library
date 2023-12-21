<template>
    <div class="select-container">
        <div class="select-input" @click="show_options = !show_options">
            <div class="label">
                {{ modelValue.label }}
            </div>
            <div class="arrow-container">
                <Icon icon="material-symbols:keyboard-arrow-down-rounded" class="text-[1.4rem] text-gray-100" />
            </div>
        </div>
        <ul ref="options_reference" v-if="show_options" class="select-options">
            <li v-for="(option, index) in options" :key="index" @click="select_option(index)">
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>
<style scoped>
/* hover:text-white hover:bg-gray-400  */
.select-container {
    @apply relative flex items-center;
}
.select-container:hover .select-input .label {
    @apply text-white;
}
.select-container:hover .select-input .arrow-container {
    @apply text-white bg-gray-400;
}
.select-container .select-input {
    @apply flex justify-between items-stretch border border-gray-400 rounded-[4px] ps-2 text-gray-100 
    w-[60px] cursor-pointer transition-all;
}
.select-container .select-input .label {
    @apply my-1 transition-all;
}
.select-container .select-input .arrow-container {
    @apply flex items-center border-l border-gray-400 transition-all;
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
import { ref } from 'vue';
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

const select_option = (index) => {
    show_options.value = false;
    emit('update:modelValue', JSON.parse(JSON.stringify(props.options[index])));
}

const options_reference = ref(null);
function close_options() {
    if (show_options.value) show_options.value = false;
}
onClickOutside(options_reference, close_options);
</script>