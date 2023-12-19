<template>
    <div>
        <div class="relative border border-gray-400 mt-6 rounded-[6px]">
            <h5 class="text-[1.4rem] text-gray-100 translate-y-[-15px] translate-x-[6px] bg-secondary px-3 font-medium max-w-max">
                Servicios
            </h5>
            <ul v-if="services" class="services-list">
                <li v-for="(service, index) in services" :key="index" :class="{'selected': service.checked}"
                @click.prevent="add_to_list(index)">
                    <span>
                        {{ service.descripcionSer }}
                    </span>
                    <span class="check" />
                </li>
            </ul>
            <span v-if="error_" class="absolute bottom-[-30px] left-0 text-gray-300">
                Necesitamos almenos un servicio
            </span>
        </div>
        
        <button v-if="!no_button" class="btn flex bg-blue-100 ms-auto mt-4" @click.prevent="send_appointment()">
            <Icon icon="mingcute:save-2-line" class="me-3 text-[1.3rem] text-white" />
            {{ button_label }}
        </button>

    </div>
</template>
<style scoped>
    ul.services-list {
        @apply max-h-[280px] h-full overflow-y-scroll;
    }
    ul.services-list li {
        @apply flex justify-between ps-4 py-3 cursor-pointer hover:bg-gray-400 text-gray-200;
    }
    ul.services-list li.selected {
        @apply text-gray-100;
    }
    ul.services-list li span.check {
        @apply border-[2px] border-gray-200 rounded-full h-[20px] w-[20px] me-3;
    }
    ul.services-list li.selected span.check {
        @apply bg-gray-200;
    }
</style>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/stores/auth.js';

const props = defineProps({
    checked_services: {
        type: Object,
        default: []
    },
    button_label: {
        type: String,
    },
    no_button: {
        type: Boolean
    },
    detail_id: {
        type: String
    },
    real_time: {
        type: Boolean
    }
})

const auth = useAuthStore();

const emit = defineEmits('services', 'realTimeUpdate');

const services = ref(null);
const error_ = ref(false);

const add_to_list = (index) => {
    services.value[index].checked = !services.value[index].checked;
    if (props.real_time) {
        emit('realTimeUpdate', {
            entity: props.detail_id, 
            service: services.value[index].idServicioSer, 
            to_add: services.value[index].checked
        });
    }
};  
const send_appointment = () => {
    const services_required = services.value.filter((service) => service.checked);
    if (services_required.length) {
        const services = [...services_required.map((service) => service.idServicioSer)];
        emit('services', services);
    }else {
        error_.value = true;
    }
} 
onMounted(async () => {
    if (!auth.services || props.real_time) {
        auth.services = null;
        await auth.get_services();
    }
    services.value = JSON.parse(JSON.stringify(auth.services)); 
    if (props.real_time) {
        const indexes_to_check = props.checked_services;
        services.value.map((service) => {
            if ( indexes_to_check.includes(service.idServicioSer) ) service.checked = true;;
        });
    }
});
</script>