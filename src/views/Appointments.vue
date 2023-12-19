
<template>
    <div>
        <div v-if="appointments" class="mt-20">
            <CustomTable table_title="Citas activas" :column_headers="['Lavador', 'Fecha Inicio', 'Fecha de Finalizar', 'Duración']" :data="appointments"/>
        </div>
    </div>
</template>
<script setup>
import CustomTable from '@/components/CustomTable.vue';
import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/auth.js';

import moment from "moment/dist/moment";

const auth = useAuthStore();
const appointments = ref(null);
const format_data = (raw) => {
    const appointments_ = raw.map(({ duracionCit, fechaCit, fechaFinCit, idLavadorCit }) => {
        const format_date = (date) => {
            return moment(date, 'YYYY-MM-DDTHH:mm:ss.SS').locale('es').format('D [de] MMMM YYYY, h:mm A')
        }

        return Object.values({ idLavadorCit, fechaCit: format_date(fechaCit), fechaFinCit: format_date(fechaFinCit), duracionCit })
    });
    // console.log(appointments_);
    // getting only the needed data
    return appointments_;
}
onMounted(async () => {
    await auth.get_citas();
    appointments.value = format_data(auth.appointments);
});
</script>