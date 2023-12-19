<template>
  <div class="flex flex-col">
    <div v-if="washers" class="border-t border-gray-400 mb-20">
      <CustomTable table_title="Lavadores" :column_headers="['ID', 'Lavador', 'Servicios Capaces', 'Activo']" :data="washers"
      @selected_row="(element) => { console.log(element) }" />
    </div>
    <div v-if="stations" class="border-t border-gray-400">
      <CustomTable table_title="Estaciones" :column_headers="['ID','Estacoión', 'Servicios', 'Activo']" :data="stations"/>
    </div>
    
    <CustomModal v-if="detail_washer_modal" title="Detalle de Lavador" @closeModal="() => { detail_washer_modal = false }">
      <div class="text-gray-200">
        <p>
          Seleccione una fecha en la cual usted desee pautar su cita
        </p>
        
        <p class="text-gray-200">
          Seleccione los servicios que necesite
        </p>
        <ServicesList @services="(value) => { console.log(value) }" />
      </div>
    </CustomModal>

  </div>
</template>

<style scoped>

</style>

<script setup>
import CustomTable from '@/components/CustomTable.vue';

import { Icon } from '@iconify/vue';
import { ref, onMounted } from "vue";

import { useAuthStore } from '@/stores/auth.js';

const auth = useAuthStore();

const washers = ref(null);
const selected_washer = ref(null);
const detail_washer_modal = ref(false);

const stations = ref(null);

const format_washers = (raw) => {
  const washers_ = raw.map(({ idLavadorLav, nombreLav, idServicioLavsers, esActivo }) => {
    return Object.values({ idLavadorLav, nombreLav, idServicioLavsers, esActivo: esActivo ? 'Si':'No' })
  });
  return washers_;
}
const format_stations = (raw) => {
  const stations_ = raw.map(({ idEstacionEst, descripcionEst, esActivo, idServicioEstsers }) => {
    return Object.values({ idEstacionEst, descripcionEst, idServicioEstsers, esActivo: esActivo ? 'Si':'No' })
  });
  return stations_;
}

onMounted(async () => {
    await auth.get_washers();
    await auth.get_stations();

    washers.value = format_washers(auth.washers);
    stations.value = format_stations(auth.stations);
});

</script>
