
<template>
    <div class="flex flex-col m-5">
        <form class="input-showcase flex flex-col">
            <h3 class="title">
                Input text
            </h3>
            <CustomInput label="Usuario" />
            <CustomInput label="Contraseña" type="password" />
            <CustomButton label="Iniciar Sesión" class="text-[16px] mt-6" />
        </form>
        <div class="input-showcase">
            <h3 class="title">
                Date pickers
            </h3>
            <CustomDateInput />
            <CustomDateInput type="time" />
        </div>

        <div class="input-showcase bg-white p-8 mt-5">
            <h3 class="title white">
                Light Theme
            </h3>
            <CustomInput label="Contraseña" theme="light" type="password"/>
        </div>

        <div class="input-showcase p-8 mt-5">
            <h3 class="title">
                Datatable
            </h3>
            <CustomTable />
        </div>
    </div>
</template>
<style scoped>

</style>
<script setup>
import CustomButton from '@/components/CustomButton.vue';
import CustomDateInput from '@/components/CustomDateInput.vue';
import CustomInput from '@/components/CustomInput.vue';
import CustomTable from '@/components/CustomTable.vue';
</script>