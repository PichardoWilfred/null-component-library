<template>
  <div class="flex flex-col">
    <div v-if="washers" class="border-t border-gray-400 mb-20">
      <CustomTable table_title="Lavadores" :column_headers="['ID', 'Lavador', 'Servicios Capaces', 'Activo']" :data="washers"
      @selected_row="select_washer" />
    </div>
    <div v-if="stations" class="border-t border-gray-400">
      <CustomTable table_title="Estaciones" :column_headers="['ID','Estación', 'Servicios', 'Activo']" :data="stations"/>
    </div>
    
    <CustomModal v-if="detail_washer_modal" title="Detalle de Lavador" @closeModal="() => { detail_washer_modal = false }">
      <div class="text-gray-200">
        <CustomInput label="Nombre de Lavador" v-model="selected_washer[1]" class="pointer-events-none max-w-[180px]" />
        <CustomInput label="Activo" v-model="selected_washer[3]" class="pointer-events-none max-w-[80px] min-w-[none]" />

        <ServicesList :checked_services="washers_services" no_button button_label="Guardar Cambios" />
      </div>
    </CustomModal>

  </div>
</template>

<style scoped>

</style>

<script setup>
import CustomModal from '@/components/CustomModal.vue';
import CustomTable from '@/components/CustomTable.vue';
import ServicesList from '@/components/ServicesList.vue';

import { Icon } from '@iconify/vue';
import { ref, onMounted } from "vue";

import { useAuthStore } from '@/stores/auth.js';
import CustomInput from '@/components/CustomInput.vue';

const auth = useAuthStore();

const washers = ref(null);
const selected_washer = ref(null);
const washers_services = ref(null);
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

const select_washer = async (washer) => {
  washers_services.value = null;
  selected_washer.value = washer;
  washers_services.value = auth.washers_services.filter((element) => element.idLavadorLavser === selected_washer.value[0]);
  // washer_services
  detail_washer_modal.value = true;
}
// const update_services = async (services) => {
//   console.log(services);
//   console.log(washers_services.value);
// }

onMounted(async () => {
  await auth.get_washers();
  await auth.get_stations();
  await auth.get_washers_service();

  washers.value = format_washers(auth.washers);
  stations.value = format_stations(auth.stations);

  // washers_services.value = auth.washers_services;
});

</script>
