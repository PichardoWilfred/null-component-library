<template>
    <!-- <table-lite
        :is-loading="table.isLoading"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
    ></table-lite> -->
    <div class="table-container">
        <div class="table-header">
            <h2 class="list-title">
                {{ table_title }}
            </h2> 
            <div class="table-search-header"> <!-- component-input-container -->
                <span class="text-[3rem] text-gray-100">
                    <svg width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 5q-.625 0-1.062-.437T10.5 3.5q0-.525.363-1.125T12 1q.775.775 1.138 1.375T13.5 3.5q0 .625-.437 1.063T12 5M7 5q-.625 0-1.062-.437T5.5 3.5q0-.525.363-1.125T7 1q.775.775 1.138 1.375T8.5 3.5q0 .625-.437 1.063T7 5m10 0q-.625 0-1.062-.437T15.5 3.5q0-.525.363-1.125T17 1q.775.775 1.138 1.375T18.5 3.5q0 .625-.437 1.063T17 5M6 21v1q0 .425-.288.713T5 23H4q-.425 0-.712-.288T3 22v-8l2.1-6q.15-.45.538-.725T6.5 7h11q.475 0 .863.275T18.9 8l2.1 6v8q0 .425-.287.713T20 23h-1q-.425 0-.712-.288T18 22v-1zm-.2-9h12.4l-1.05-3H6.85zM5 14v5zm2.5 4q.625 0 1.063-.437T9 16.5q0-.625-.437-1.062T7.5 15q-.625 0-1.062.438T6 16.5q0 .625.438 1.063T7.5 18m9 0q.625 0 1.063-.437T18 16.5q0-.625-.437-1.062T16.5 15q-.625 0-1.062.438T15 16.5q0 .625.438 1.063T16.5 18M5 19h14v-5H5z"></path>
                    </svg>
                </span>
                <CustomInput class="no-error only-placeholder h-[44px] mt-0" placeholder="Buscar por Fecha" icon />
                <button class="bg-gray-400 active:brightness-75 text-gray-100 text-[2rem] rounded-[4px] px-4 py-1 ms-3 transition-all">
                    <Icon icon="material-symbols:filter-alt" />
                </button>
            </div>
        </div>
        <div class="table-body">
            <div class="table-heading">
                <div v-for="(column, index) in column_headers" class="column-header" :key="index">
                    <span>
                        {{ column }}
                    </span>
                </div>
            </div>
            <div class="table-row">
                
            </div>
        </div>
        <div class="table-footer">

        </div>
    </div>
</template>
<script setup>
import { Icon } from '@iconify/vue';
import { ref, reactive } from "vue";
import axios from 'axios';
import CustomInput from './CustomInput.vue';

const props = defineProps({
    table_title: {
        type: String,
        default: "Nombre de la tabla"
    },
    column_headers: {
        type: Array,
        default: ["List", "Of", "Titles"]
    }
});

const table = reactive({
    isLoading: false,
    columns: [
        {
            label: "ID",
            field: "id",
            width: "3%",
            sortable: true,
            isKey: true,
        },
        {
            label: "Name",
            field: "name",
            width: "10%",
            sortable: true,
        },
        {
            label: "Email",
            field: "email",
            width: "15%",
            sortable: true,
        },
    ],
    rows: [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com" },
    { id: 4, name: "Bob Williams", email: "bob@example.com" },
    { id: 5, name: "Eva Brown", email: "eva@example.com" },
    { id: 6, name: "Michael Davis", email: "michael@example.com" },
    { id: 7, name: "Olivia Miller", email: "olivia@example.com" },
    { id: 8, name: "William Wilson", email: "william@example.com" },
    { id: 9, name: "Sophia Garcia", email: "sophia@example.com" },
    { id: 10, name: "David Rodriguez", email: "david@example.com" }
    ],
    totalRecordCount: 0,
    sortable: {
        order: "id",
        sort: "asc",
    },
});
const column_quantity = ref(props.column_headers.length);

async function makeRequest() {
    const config = {
        method: 'get',
        url: 'http://webcode.me',
        headers: { 'User-Agent': 'Axios - console app' }
    }
    let res = await axios(config);
    console.log(res.request._header);
}

</script>

<style scoped>
    .table-container {
        @apply font-poppins text-white max-w-[980px] mx-auto;
    }
    .table-container .table-header .table-search-header {
        @apply flex items-center;
    }
    .table-container .table-header h2.list-title {
        @apply text-[1.9rem] leading-[1.8rem] font-semibold;
    }
    .table-container .table-header .table-search-header .component-input-container :deep(input) {
        height: 24px;
    }
    .table-container .table-header {
        @apply flex items-end content-end justify-between mb-3;
    }
    .table-container .table-body {
        @apply border border-gray-400 rounded-[4px];
    }
    .table-container .table-body .table-heading {
        display: grid;
        grid-template-columns: repeat(v-bind(column_quantity), 1fr);
        grid-template-rows: auto;
    }
    .table-container .table-body .table-heading .column-header {
        @apply flex p-3;
    }
    .column-header span {
        @apply text-gray-300;
    }
    table.vtl-table, .vtl.vtl-card {
        border-radius: 4px !important;
    }
</style>