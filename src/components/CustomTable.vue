<template>
    <table-lite
        :is-loading="table.isLoading"
        :columns="table.columns"
        :rows="table.rows"
        :total="table.totalRecordCount"
        :sortable="table.sortable"
    ></table-lite>
</template>
<style>
table.vtl-table, .vtl.vtl-card {
    border-radius: 4px !important;
}
</style>
<script setup>
// @do-search="doSearch"  @is-finished="tableLoadingFinish"
import TableLite from "vue3-table-lite";
// import axios from 'axios';
import { reactive, onMounted } from "vue";

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

// const papoOnline = (value) => {
//     console.log(value);
// }
/**
 * Table search event
 */
// const doSearch = (offset, limit, order, sort) => {
//     table.isLoading = true;

// // Start use axios to get data from Server
// let url = 'https://www.example.com/api/some_endpoint?offset=' + offset + '&limit=' + limit + '&order=' + order + '&sort=' + sort;
//     axios.get(url)
//     .then((response) => {
//         // Point: your response is like it on this example.
//         // refresh table rows
//         table.rows = response.rows;
//         table.totalRecordCount = response.count;
//         table.sortable.order = order;
//         table.sortable.sort = sort;
//     });
//     // End use axios to get data from Server
// };

// const tableLoadingFinish = (elements) => {
//     table.isLoading = false;
// };

// Get data first
onMounted(() => {
    // doSearch(0, 10, 'id', 'asc');
});
</script>