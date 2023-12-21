<template>
  <div class="flex flex-col">
    <div v-if="washers" class="border-t border-gray-400 mb-20">
      <CustomTable table_title="Lavadores" :column_headers="['ID', 'Lavador', 'Activo']" :data="washers"
      @selected_row="select_washer" />
    </div>
    <div v-if="stations" class="border-t border-gray-400">
      <CustomTable table_title="Estaciones" :column_headers="['ID','Estación', 'Activo']" :data="stations" 
      @selected_row="select_station"/>
    </div>
    
    <CustomModal v-if="detail_washer_modal" title="Detalle de Lavador" @closeModal="() => { detail_washer_modal = false }">
      <div class="text-gray-200">
        <CustomInput v-model="selected_washer[1]" label="Nombre de Lavador" class="pointer-events-none max-w-[180px]" />
        <CustomInput v-model="selected_washer[2]" label="Activo" class="pointer-events-none max-w-[80px] min-w-[none]" />

        <ServicesList button_label="Guardar Cambios" real_time no_button 
        :checked_services="washers_services" :detail_id="selected_washer[0]" @realTimeUpdate="updateWasherServices" />
      </div>
    </CustomModal>
    
    <CustomModal v-if="detail_station_modal" title="Detalle de Estación"
    @closeModal="() => { detail_station_modal = false }">
      <div class="text-gray-200">
        <CustomInput label="Nombre de la Estación" 
        v-model="selected_station[1]" class="pointer-events-none max-w-[180px]" />
        <CustomInput label="Activa" 
        v-model="selected_station[2]" class="pointer-events-none max-w-[80px] min-w-[none]" />

        <ServicesList button_label="Guardar Cambios" real_time no_button :checked_services="station_services" 
        :detail_id="selected_station[0]" @realTimeUpdate="updateStationServices" />
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

const format_stations = (raw) => {
  const stations_ = raw.map(({ idEstacionEst, descripcionEst, esActivo }) => {
    return Object.values({ idEstacionEst, descripcionEst, esActivo: esActivo ? 'Si':'No' })
  });
  console.log(stations_);
  return stations_;
}

const select_washer = async (washer) => {
  await auth.get_washers_service();
  washers_services.value = null; // services object to compare 
  selected_washer.value = washer // sended object
  washers_services.value = auth.washers_services.filter((element) => element.idLavadorLavser === selected_washer.value[0])
  .map((el) => el.idServicioLavser);
  //modal
  detail_washer_modal.value = true;
}
const updateWasherServices = async ({ entity, service, to_add}) => {
  await auth.update_washer_services(entity, service, to_add);
}

const stations = ref(null);
const selected_station = ref(null);
const station_services = ref(null);
const detail_station_modal = ref(null);

const format_washers = (raw) => {
  const washers_ = raw.map(({ idLavadorLav, nombreLav, esActivo }) => {
    return Object.values({ idLavadorLav, nombreLav, esActivo: esActivo ? 'Si':'No' })
  });
  return washers_;
}
const select_station = async (station) => {
  await auth.get_stations_service();
  station_services.value = null; // services object to compare 
  selected_station.value = station; // sended object
  station_services.value = auth.stations_services.filter((element) => element.idEstacionEstser === selected_station.value[0]).map((el) => el.idServicioEstser);
  // modal
  detail_station_modal.value = true;
}
const updateStationServices = async ({ entity, service, to_add }) => {
  await auth.update_station_services( entity, service, to_add );
}


onMounted(async () => {
  await auth.get_washers();
  await auth.get_washers_service();
  await auth.get_stations();
  await auth.get_stations_service();

  washers.value = format_washers(auth.washers);
  stations.value = format_stations(auth.stations);
});

</script>
