<template>
    <div class="table-container">
        <div class="table-header">
            <h2 class="list-title">
                {{ table_title }}
            </h2>
            <div class="table-search-header">
                <CustomInput class="no-error only-placeholder h-[44px] mt-0" placeholder="Buscar por Fecha" icon />
                <button class="bg-gray-400 active:brightness-75 text-gray-100 text-[2rem] rounded-[4px] px-4 py-1 ms-3 transition-all">
                    <Icon icon="material-symbols:filter-alt" />
                </button>
            </div>
        </div>
        <div class="table-body"> <!-- Table Content -->
            <!-- Column Titles -->
            <div class="table-heading"> 
                <div v-for="(column, index) in column_headers" class="column-header" :key="index">
                    <span>
                        {{ column }}
                    </span>
                </div>
            </div>
            <!-- Rows -->
            <div class="table-row" v-for="(row, index) in rows" :key="index">
                <div class="cell truncate" v-for="(cell, index_) in row" :key="index_" :title="cell">
                    {{ cell }}
                </div>
            </div>
        </div>
        <!-- Table Footer -->
        <div class="table-footer">

            <CustomSelect v-model="select_model" :options="select_options" />

            <div class="pagination-container">
                <button class="pagination-btn" @click.prevent="set_index(0, 'substract')">
                    <Icon icon="material-symbols:chevron-left-rounded" class="left text-[2rem]" filled />
                </button>
                <ul class="pagination">
                    <template v-if="show_first_page">
                        <li :class="{ active: 1 === page_index }" 
                        @click.prevent="set_index(1, 'change')">
                            1
                        </li>
                        <li>
                            ...
                        </li>
                    </template>
                    <li v-for="(page, index_) of pagination" :key="index_" :class="{ active: page === page_index }" 
                    @click.prevent="set_index(page, 'change')">
                        {{ page }}
                    </li>
                    <template v-if="show_last_page">
                        <li>
                            ...
                        </li>
                        <li :class="{ active: last_page === page_index }" 
                        @click.prevent="set_index(last_page, 'change')">
                            {{ last_page }}
                        </li>
                    </template>
                </ul>
                <button class="pagination-btn" @click.prevent="set_index(0, 'add')">
                    <Icon icon="material-symbols:chevron-right-rounded" class="right text-[2rem]" filled />
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Icon } from '@iconify/vue';
import { ref, onMounted, watch } from "vue";
import CustomInput from './CustomInput.vue';
import CustomSelect from './CustomSelect.vue';

const props = defineProps({
    table_title: {
        type: String,
        default: "Nombre de la tabla"
    },
    column_headers: {
        type: Array,
        default: ["List", "Of", "Titles"]
    },
    data: {
        type: Array,
        default: [
                ["Santiago Eduardo Herrera Gómez", "Henry Reynoso", "12 de Enero", "1 hora", "B"],
                ["María Rodríguez", "Carlos Pérez", "25 de Abril", "2 horas", "A"],
                ["Luisa Martínez", "Juan González", "7 de Marzo", "3 horas", "C"],
                ["Santiago Eduardo Herrera Gómez", "Henry Reynoso", "12 de Enero", "1 hora", "B"],
                ["María Rodríguez", "Carlos Pérez", "25 de Abril", "2 horas", "A"],
                ["Luisa Martínez", "Juan González", "7 de Marzo", "3 horas", "C"],
                ["Ana Gutiérrez", "Pedro Sánchez", "18 de Mayo", "4 horas", "D"],
                ["Lucía Fernández", "Andrés López", "3 de Julio", "5 horas", "E"],
                ["Roberto Ramírez", "Elena Díaz", "30 de Septiembre", "6 horas", "F"],
                ["Carmen Vargas", "Francisco Cruz", "9 de Agosto", "7 horas", "G"],
                ["David Torres", "Sofía Medina", "14 de Febrero", "8 horas", "H"],
                ["Eduardo Nuñez", "Isabel Romero", "22 de Junio", "9 horas", "I"],
                ["Julia Herrera", "Miguel Castro", "10 de Octubre", "10 horas", "J"],
                ["Alejandro Pérez", "Laura Gómez", "5 de Marzo", "2 horas", "A"],
                ["Marta Fernández", "Daniel Ramírez", "20 de Julio", "3 horas", "B"],
                ["Cristina Soto", "Javier Martínez", "10 de Abril", "4 horas", "C"],
                ["Rosa Díaz", "Mario Rodríguez", "15 de Septiembre", "5 horas", "D"],
                ["Luis Torres", "Ana Castillo", "27 de Noviembre", "6 horas", "E"],
                ["Paula García", "Roberto Sánchez", "8 de Enero", "7 horas", "F"],
                ["Sara López", "Alberto Ruiz", "12 de Mayo", "8 horas", "G"],
                ["Eva Martín", "Gabriel Flores", "30 de Agosto", "9 horas", "H"],
                ["Fernando González", "Carla Sosa", "22 de Febrero", "10 horas", "I"],
                ["Diego Herrera", "Marina Nuñez", "18 de Octubre", "11 horas", "J"],
                ["Camila García", "Erick Rodríguez", "14 de Abril", "3 horas", "B"],
                ["Natalia Martínez", "Sebastián López", "9 de Junio", "4 horas", "C"],
                ["Sofía Pérez", "Gabriel Ramírez", "22 de Agosto", "5 horas", "D"],
                ["Valentina Hernández", "Adrián Fernández", "17 de Octubre", "6 horas", "E"],
                ["Mateo Gómez", "Paulina Díaz", "30 de Diciembre", "7 horas", "F"],
                ["Emilia Sánchez", "Lucas Martín", "25 de Enero", "8 horas", "G"],
                ["Thiago Castillo", "Abril Torres", "5 de Marzo", "9 horas", "H"],
                ["Julieta Ruiz", "Isaac González", "12 de Mayo", "10 horas", "I"],
                ["Diego Herrera", "Renata Flores", "18 de Julio", "11 horas", "J"],
                ["Mariano Castro", "Esther Nuñez", "23 de Septiembre", "12 horas", "K"],
                ["Carmen García", "Manuel Rodríguez", "10 de Febrero", "4 horas", "B"],
                ["Juan Martínez", "Valeria Pérez", "18 de Mayo", "5 horas", "C"],
                ["Lucía Díaz", "Andrés Gómez", "24 de Agosto", "6 horas", "D"],
                ["Santiago López", "Isabella Flores", "9 de Octubre", "7 horas", "E"],
                ["Diana Sánchez", "Matías Ramírez", "15 de Diciembre", "8 horas", "F"],
                ["Adriana Torres", "Pedro Fernández", "3 de Enero", "9 horas", "G"],
                ["Emilio Nuñez", "Sara González", "27 de Marzo", "10 horas", "H"],
                ["Valentina Castillo", "Javier Martín", "6 de Junio", "11 horas", "I"],
                ["Gabriel Herrera", "Renata Ruiz", "12 de Septiembre", "12 horas", "J"],
                ["Carolina Castro", "Alejandro Soto", "21 de Noviembre", "13 horas", "K"],
                ["Sofía Pérez", "Gabriel Ramírez", "22 de Agosto", "5 horas", "D"],
                ["Valentina Hernández", "Adrián Fernández", "17 de Octubre", "6 horas", "E"],
                ["Mateo Gómez", "Paulina Díaz", "30 de Diciembre", "7 horas", "F"],
                ["Emilia Sánchez", "Lucas Martín", "25 de Enero", "8 horas", "G"],
                ["Thiago Castillo", "Abril Torres", "5 de Marzo", "9 horas", "H"],
                ["Julieta Ruiz", "Isaac González", "12 de Mayo", "10 horas", "I"],
                ["Diego Herrera", "Renata Flores", "18 de Julio", "11 horas", "J"],
                ["Mariano Castro", "Esther Nuñez", "23 de Septiembre", "12 horas", "K"],
                ["Carmen García", "Manuel Rodríguez", "10 de Febrero", "4 horas", "B"],
                ["Juan Martínez", "Valeria Pérez", "18 de Mayo", "5 horas", "C"],
                ["Lucía Díaz", "Andrés Gómez", "24 de Agosto", "6 horas", "D"],
                ["Santiago López", "Isabella Flores", "9 de Octubre", "7 horas", "E"],
                ["Diana Sánchez", "Matías Ramírez", "15 de Diciembre", "8 horas", "F"],
                ["Adriana Torres", "Pedro Fernández", "3 de Enero", "9 horas", "G"],
                ["Emilio Nuñez", "Sara González", "27 de Marzo", "10 horas", "H"],
                ["Valentina Castillo", "Javier Martín", "6 de Junio", "11 horas", "I"],
                ["Gabriel Herrera", "Renata Ruiz", "12 de Septiembre", "12 horas", "J"],
                ["Carolina Castro", "Alejandro Soto", "21 de Noviembre", "13 horas", "K"],
                ["Sofía Pérez", "Gabriel Ramírez", "22 de Agosto", "5 horas", "D"],
                ["Valentina Hernández", "Adrián Fernández", "17 de Octubre", "6 horas", "E"],
                ["Mateo Gómez", "Paulina Díaz", "30 de Diciembre", "7 horas", "F"],
                ["Emilia Sánchez", "Lucas Martín", "25 de Enero", "8 horas", "G"],
                ["Thiago Castillo", "Abril Torres", "5 de Marzo", "9 horas", "H"],
                ["Julieta Ruiz", "Isaac González", "12 de Mayo", "10 horas", "I"],
                ["Diego Herrera", "Renata Flores", "18 de Julio", "11 horas", "J"],
                ["Mariano Castro", "Esther Nuñez", "23 de Septiembre", "12 horas", "K"],
                ["Carmen García", "Manuel Rodríguez", "10 de Febrero", "4 horas", "B"],
                ["Juan Martínez", "Valeria Pérez", "18 de Mayo", "5 horas", "C"],
                ["Lucía Díaz", "Andrés Gómez", "24 de Agosto", "6 horas", "D"],
                ["Santiago López", "Isabella Flores", "9 de Octubre", "7 horas", "E"],
                ["Diana Sánchez", "Matías Ramírez", "15 de Diciembre", "8 horas", "F"],
                ["Adriana Torres", "Pedro Fernández", "3 de Enero", "9 horas", "G"],
                ["Emilio Nuñez", "Sara González", "27 de Marzo", "10 horas", "H"],
                ["Valentina Castillo", "Javier Martín", "6 de Junio", "11 horas", "I"],
                ["Gabriel Herrera", "Renata Ruiz", "12 de Septiembre", "12 horas", "J"],
                ["Carolina Castro", "Alejandro Soto", "21 de Noviembre", "13 horas", "K"]
        ]
    }
});


// select model
const select_options = ref([
    {
        label: '10',
        value: 10
    },
    {
        label: '15',
        value: 15
    },
    {
        label: '20',
        value: 20
    }
]);

// Table data
const column_quantity = ref(props.column_headers.length);


// row logic
const select_model = ref({ label: '10', value: 10 });
const rows_quantity = ref(10); // limit of rows available (also the v-model of the select-input)

watch(select_model, (value) => {
    row_limit.value = value.value;
    set_rows()
});
const rows = ref(null); // table rows 
const row_limit = ref(10); // amounts of allowed rows.
const set_rows = () => { // create the rows on the table
    let starting = (row_limit.value * page_index.value) - row_limit.value;
    let limit = starting + row_limit.value;
    let rows_ = [];
    for (let i = starting; i <= limit; i++) { // getting the values out of the list
        rows_.push(props.data[i]);
    }
    rows.value = rows_;
}

// index logic
const page_index = ref(1); // table index;
watch(page_index, (new_page_index, old_page_index) => { // pagination index
    set_rows();
    if (last_page.value >= 7) {
        const largest_value = pagination.value[pagination.value.length - 1];
        const smallest_value = pagination.value[0];

        let starting_value = largest_value;
        // check if its larger or smaller.
        if (new_page_index > old_page_index) { //the index increased in value
            if (new_page_index > largest_value) { // need a new pages group
                if (new_page_index === last_page.value) { // if went directly to the last one
                    starting_value = last_page.value - 3;
                    for (let index = 0; index < pagination.value.length; index++) {
                        pagination.value[index] = starting_value + (index + 1);
                    }
                    show_last_page.value = false;
                    show_first_page.value = true;
                    return;
                }
                if (!show_first_page.value) show_first_page.value = true; // if we haven't pass the first set

                if ((smallest_value + 6) >= last_page.value) { // if we are approaching the last page
                    starting_value = last_page.value - 3;
                    show_last_page.value = false;
                }
                for (let index = 0; index < pagination.value.length; index++) { //asigning the new values
                    pagination.value[index] = starting_value + (index + 1);
                }

                if ( pagination.value.indexOf(new_page_index) === -1 ) { // In case the index is not inside the pagination array
                    pagination.value.unshift((pagination.value[0] - 1));
                }
            }
        }else { // the index decreased in value
            const create_first_page = () => {
                show_first_page.value = false;
                show_last_page.value = true;
                for (let index = 0; index < pagination.value.length; index++) {
                    pagination.value[index] = (index + 1);
                }
                if (pagination.value.length >= 4) pagination.value.pop(); // if we have added an aditional page before we need to get rid of it
                // in case there's not many pages?
            }
            if (new_page_index === 1) { // went to the first one
                create_first_page();
                return;
            }
            if (smallest_value > new_page_index) { //we needing a new group
                
                const starting_value = smallest_value - 3;
                
                if (starting_value <= 1) {
                    create_first_page();
                    return;
                }
                
                for (let index = 0; index < 3; index++) {
                    pagination.value[index] = starting_value + index;
                }
                show_first_page.value = true;
                show_last_page.value = true;
            }
        }
    }
});
const set_index = ( new_index, type = 'change' ) => { // change index
    switch (type) {
        case 'change':
            page_index.value = new_index;
            break;
        case 'dots-backwards':
            break;
        case 'dots-forwards':
            break;
        case 'substract':
            page_index.value = (page_index.value > 1) ? page_index.value - 1 : last_page.value;
            break;
        case 'add':
            page_index.value = (page_index.value + 1) <= last_page.value ? page_index.value + 1:1;
            break;
        default:
            break;
    }
}

// pagination logic
const set_pagination = () => {
    last_page.value = Math.ceil(props.data.length / row_limit.value); // setting the amount of pages
    pagination.value = [];
    Array.from( Array(last_page.value).keys() ).map((_, index) => { //setting the initial value of the pagination elements
        pagination.value.push((index + 1));
    });

    if (pagination.value.length >= 7) {
        show_last_page.value = true; //show last and first option
        pagination.value = [];
        for (let index = 1; index <= 3; index++) {
            pagination.value.push(index);
        }
    }else {
        show_last_page.value = false;
        show_first_page.value = false;
    }
}
const pagination = ref([]);

// pagination indexes logic
const last_page = ref(0); // maximun of pages that a set of students can have (re-defined on set_columns)
const show_last_page = ref(false);
const show_first_page = ref(false);

onMounted(() => {
    set_pagination();
    set_rows();
});

</script>

<style scoped>
    .table-container {
        @apply font-poppins text-white max-w-[1080px] mx-auto;
    }
    .table-container .table-header .table-search-header {
        @apply flex items-end;
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
        @apply flex flex-col border-b border-b-gray-400;
        display: grid;
        grid-template-columns: repeat(v-bind(column_quantity), 1fr);
    }
    .table-container .table-body .table-heading .column-header {
        @apply flex p-3;
    }
    .table-container .table-body .table-row {
        @apply cursor-pointer transition-all border-b border-b-gray-400 last:border-b-[0];
        display: grid;
        grid-template-columns: repeat(v-bind(column_quantity), 1fr);
    }
    .table-container .table-body .table-row .cell {
        @apply py-4 px-3 text-gray-200;
    }
    .table-container .table-body .table-row .cell .content {
        @apply flex text-ellipsis truncate max-w-max;
    }
    .table-container .table-body .table-row:hover {
        @apply bg-gray-400;
    }
    .table-container .table-body .table-row:hover .cell {
        @apply text-gray-100;
    }
    .table-container .table-footer {
        @apply flex mt-3;
    }
    .table-container .table-footer .pagination-container {
        @apply flex justify-between max-w-[270px] mx-auto;
    }
    .table-container .table-footer .pagination-container ul.pagination {
        @apply flex items-center content-center justify-between w-[60%];
    }
    .table-container .table-footer .pagination-container ul.pagination li {
        @apply flex justify-center items-center max-h-[30px] w-[25px] cursor-pointer p-2 text-gray-200 hover:bg-gray-400 hover:text-gray-100 rounded-[4px] transition-all;
    }
    .table-container .table-footer .pagination-container ul.pagination li.active {
        @apply bg-gray-300 text-gray-100;
    }
    .table-container .table-footer .pagination-container .pagination-btn {
        @apply text-gray-200 hover:bg-gray-400 p-1 rounded-[4px] transition-all;
    }
    .column-header span {
        @apply text-gray-300;
    }
    table.vtl-table, .vtl.vtl-card {
        border-radius: 4px !important;
    }
</style>