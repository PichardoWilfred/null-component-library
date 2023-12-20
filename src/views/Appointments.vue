
<template>
    <div>
        <div v-if="appointments" class="mt-20">
            <CustomTable table_title="Citas activas" :column_headers="['ID', 'Lavador', 'Fecha Inicio', 'Fecha de Finalizar', 'Duración']" 
                :data="appointments" @selected_row="open_appointment_modal" />
        </div>
        <CustomModal v-if="modal_appointment_detail" title="Detalle de Cita" @closeModal="() => { modal_appointment_detail = false }">
            <div class="text-gray-200">
                <!-- {{ selected_appointment }} -->
                <div class="pointer-events-none mb-8">
                    <CustomInput v-model="selected_appointment[0]" label="ID" />
                    <CustomInput v-model="selected_appointment[1]" label="ID Lavador" />
                    <h3 class="mt-3">
                        Fecha de Inicio:
                    </h3>
                    <VueDatePicker v-model="date_one" locale="es" :enable-time-picker="false" :clearable="false" dark />                
                    <h3 class="mt-3">
                        Fecha de Terminado:
                    </h3>
                    <VueDatePicker v-model="date_two" locale="es" :enable-time-picker="false" :clearable="false" dark />
                </div>

                <button class="cancel-appointment btn ms-auto" @click.prevent="cancel_appointment">
                    <Icon icon="material-symbols:close" class="text-gray-300 text-[1.4rem] me-2"/>
                    Cancelar Cita
                </button>
            </div>
        </CustomModal>
    </div>
</template>
<script setup>
import CustomModal from '@/components/CustomModal.vue';
import CustomTable from '@/components/CustomTable.vue';

import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/auth.js';

import moment from "moment/dist/moment";
import CustomInput from '@/components/CustomInput.vue';
import { Icon } from '@iconify/vue';

const auth = useAuthStore();
const appointments = ref(null);
const selected_appointment = ref(null);

const format_date = (date) => {
    const momentDate = moment(date, 'DD [de] MMMM YYYY, h:mm A');
    return momentDate.toDate();
}
const date_one = ref(null);
const date_two = ref(null);

const format_data = (raw) => {
    const appointments_ = raw.map(({ idCitaCit, duracionCit, fechaCit, fechaFinCit, idLavadorCit }) => {
        const format_date = (date) => {
            return moment(date, 'YYYY-MM-DDTHH:mm:ss.SS').locale('es').format('D [de] MMMM YYYY, h:mm A');
        }
        return Object.values({ idCitaCit, idLavadorCit, fechaCit: format_date(fechaCit), fechaFinCit: format_date(fechaFinCit), duracionCit })
    });
    return appointments_;
}

const modal_appointment_detail = ref(false);

const open_appointment_modal = (value) => {
    modal_appointment_detail.value = true;
    selected_appointment.value = value;

    date_one.value = format_date(selected_appointment.value[3])
    date_two.value = format_date(selected_appointment.value[2])
}
const cancel_appointment = async () => {
    await auth.cancel_appointment(selected_appointment.value[0]);
    modal_appointment_detail.value = false;
    
}

onMounted(async () => {
    await auth.get_citas();
    appointments.value = format_data(auth.appointments);
    
});


</script>
<style scoped>
button.cancel-appointment {
    @apply cursor-pointer flex items-center justify-center bg-gray-400 px-[8px];
    width: 180px;
}
</style>