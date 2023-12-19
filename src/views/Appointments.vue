
<template>
    <div>
        <div class="appointments">
        </div>
        <div v-if="appointments">
            <CustomTable :column_headers="['Lavador', 'Fecha Inicio', 'Fecha de Finalizar', 'Duración']" :data="appointments"/>
        </div>
    </div>
</template>
<script setup>
import CustomTable from '@/components/CustomTable.vue';
import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/auth.js';

const auth = useAuthStore();
const appointments = ref(null);
const format_data = (raw) => {
    const appointments_ = raw.map(({ duracionCit, fechaCit, fechaFinCit, idLavadorCit }) => {
        return Object.values({ idLavadorCit, fechaCit, fechaFinCit, duracionCit })
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