<template>
    <div class="relative border border-gray-400">
        <h5 class="translate-y-[-30px] bg-secondary px-6">
            Servicios disponibles
        </h5>
        <ul>
            <li v-for="(service, index) in services_list" :key="index">
                {{ service.descripcionSer }}
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref } from "vue";
const services_list = ref([
    { "idServicioSer": 1, "descripcionSer": "Lavado Básico" },
    { "idServicioSer": 2, "descripcionSer": "Lavado Completo" },
    { "idServicioSer": 3, "descripcionSer": "Encerado de Carrocería" },
    { "idServicioSer": 4, "descripcionSer": "Limpieza Interior" },
    { "idServicioSer": 5, "descripcionSer": "Pulido de Faros" },
    { "idServicioSer": 6, "descripcionSer": "Lavado de Motor" },
    { "idServicioSer": 7, "descripcionSer": "Lavado y Aspirado" },
    { "idServicioSer": 8, "descripcionSer": "Limpieza de Tapicería" },
    { "idServicioSer": 9, "descripcionSer": "Restauración de Plásticos" },
    { "idServicioSer": 10, "descripcionSer": "Desinfección de Interiores" }
]);
</script>