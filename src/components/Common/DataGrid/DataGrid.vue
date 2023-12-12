<script setup lang="ts">

// framework
import { ref, onMounted } from 'vue';

// primevue
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { FilterMatchMode } from 'primevue/api';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
// Database Forms
import UsersForm from './DbForms/UsersForm.vue';
import LecturesForm from './DbForms/LecturesForm.vue';
import MaterialsForm from './DbForms/MaterialsForm.vue';
import CouponsForm from './DbForms/CouponsForm.vue';
import PaymentLogsForm from './DbForms/PaymentLogsForm.vue';
import AnnouncementsForm from './DbForms/AnnouncementsForm.vue';

// UI components
import TextFilter from './GridFilters/TextFilter.vue';
import NumberFilter from './GridFilters/NumberFilter.vue';
import EnumFilter from './GridFilters/EnumFilter.vue';
import DateTimeFilter from './GridFilters/DateTimeFilter.vue';

// lib
import { post_event } from '../../../Lib/mediator';
import { TOAST_TYPES } from '../../../Lib/toast';

// models
import { grid_col } from '../../../Models/ui';

const props = defineProps<{
    resource_id: string,
    resource_name: string,
    action_key: string,
    action_del_func: (record: any) => void,
    action_bulk_del_func: (records: any[]) => void,
    grid_data: any[],
    keys_map: any,
    max_rows_count: number,
}>();

// global vars
const filter_widgets_map = {
    'text': TextFilter,
    'number': NumberFilter,
    'enum': EnumFilter,
    'datetime': DateTimeFilter,
} as any;

const data_actions_menu_items = ref([
    {
        label: 'Count',
        icon: 'pi pi-list',
        command: () => {
            table_header.value = `${props.resource_name} : ${data_grid_ref.value.totalRecordsLength}`;
        },
    }
]);

const database_forms_map = {
    'system_users': {
        form_component: UsersForm,
        form_id: 'users_form',
    },
    'lectures': {
        form_component: LecturesForm,
        form_id: 'lectures_form',
    },
    'materials': {
        form_component: MaterialsForm,
        form_id: 'materials_form',
    },
    'coupons': {
        form_component: CouponsForm,
        form_id: 'coupons_form',
    },
    'payments_history': {
        form_component: PaymentLogsForm,
        form_id: 'payment_logs_form',
    },
    'announcements': {
        form_component: AnnouncementsForm,
        form_id: 'announcements_form',
    },
} as any;

// refs
const selected_items = ref();
const data_actions_menu = ref();
const data_grid_ref = ref();
const table_header = ref(`${props.resource_name} : ${props.grid_data.length}`);
const grid_filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
} as any);

// utils
function create_filter_args(grid_col_data: grid_col): any {
    const args_map = {
        'text': { placeholder: `${grid_col_data.col_name} Search` },
        'number': { placeholder: `${grid_col_data.col_name} Search` },
        'enum': {
            placeholder: `${grid_col_data.col_name} Picker`,
            options: [...new Set(props.grid_data.map((x) => x[grid_col_data.col_id]))],
        },
        'datetime': { placeholder: `${grid_col_data.col_name} Search` },
    } as any;

    return args_map[grid_col_data.data_type];
}

function init_grid_filters() {
    const filters_mode_map = {
        'text': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'number': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'enum': { value: null, matchMode: FilterMatchMode.IN },
        'datetime': { value: null, matchMode: FilterMatchMode.BETWEEN },
    } as any;

    const temp_filters_obj = {
        'global': { ...filters_mode_map['text'] },
    } as any;

    // generate filters scheme foreach column
    Object.keys(props.keys_map).forEach((col_id) => {
        temp_filters_obj[col_id] = { ...filters_mode_map[(props.keys_map[col_id] as grid_col).data_type] };
    });

    grid_filters.value = temp_filters_obj;
}

// event handlers
function export_csv() {
    data_grid_ref.value.exportCSV();
}

function show_data_actions_menu(event: any) {
    data_actions_menu.value.toggle(event);
}

function show_add_database_resource_form() {
    const event_name = `show_${database_forms_map[props.resource_id].form_id}`;
    post_event(event_name, { mode: 'create' });
}

function delete_records() {
    if (selected_items.value == undefined) {
        post_event('grid_controller_toast', {
            toast_msg: 'Select Records To Delete First',
            toast_type: TOAST_TYPES.ERROR,
        });
        return;
    }

    props.action_bulk_del_func(selected_items.value);
}

function show_update_record_form(record: any) {
    const event_name = `show_${database_forms_map[props.resource_id].form_id}`;
    post_event(event_name, {
        mode: 'update',
        record: record,
    });
}

onMounted(() => {
    init_grid_filters();
});
</script>

<template>
    <div>
        <!-- database form -->
        <component :is="database_forms_map[resource_id].form_component" />

        <DataTable :value="grid_data" :filters="grid_filters" filter-display="menu" ref="data_grid_ref"
            v-model:selection="selected_items" responsive-layout="scroll" :paginator="true" :rows="max_rows_count"
            :show-gridlines="true">

            <template #header>
                <div id="data_grid_header">
                    <div id="first_sec">
                        <h3>{{ table_header }}</h3>
                        <Button label="New" icon="pi pi-plus" class="p-button-success mr-2"
                            @click="show_add_database_resource_form()" />
                        <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="delete_records()" />

                        <Button type="button" icon="pi pi-chart-bar" label="Data Actions" @click="show_data_actions_menu"
                            aria-haspopup="true" aria-controls="overlay_menu" class="p-button-outlined" />
                        <Menu id="overlay_menu" ref="data_actions_menu" :model="data_actions_menu_items" :popup="true" />

                        <Button type="button" icon="pi pi-filter-slash" label="Clear Filters" @click="init_grid_filters()"
                            class="p-button-outlined"></Button>
                    </div>
                    <div id="last_sec">
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="grid_filters['global'].value" placeholder="General Search" />
                        </span>
                        <div style="text-align: left">
                            <Button icon="pi pi-external-link" label="Export" @click="export_csv()" />
                        </div>
                    </div>
                </div>
            </template>

            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>

            <Column :exportable="false" header="Actions" style="min-width:8rem">
                <template #body="slotProps">
                    <div id="actions_controls_cont">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning"
                            @click="show_update_record_form(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger"
                            @click="action_del_func(slotProps.data)" />
                    </div>
                </template>
            </Column>

            <Column v-for="(col_id, index) in Object.keys(keys_map)" :key="index" :field="col_id"
                :header="(keys_map[col_id] as grid_col).col_name" :sortable="true" :show-filter-match-modes="false">
                <template #body="{ data }">
                    {{ keys_map[col_id].data_type != 'datetime' ? data[col_id] : (data[col_id] as Date).toLocaleString() }}
                </template>

                <template #filter>
                    <component :is="filter_widgets_map[(keys_map[col_id] as grid_col).data_type]" :col_id="col_id"
                        :grid_filter_obj="grid_filters" :filter_args="create_filter_args(keys_map[col_id] as grid_col)" />
                </template>

                <template #filterclear>
                    <Button type="button" icon="pi pi-filter-slash" @click="grid_filters[col_id].value = null"
                        class="p-button-outlined"></Button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<style scoped>
#actions_controls_cont {
    display: flex;
    flex-direction: row;
}

#actions_controls_cont .p-button-warning {
    margin-right: 8px;
}

#data_grid_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 24px;
}

#data_grid_header h3 {
    margin: 0px;
}

#data_grid_header #last_sec {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

#data_grid_header #first_sec {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

#data_grid_header #first_sec * {
    margin-right: 16px;
}

#data_grid_header #last_sec .p-input-icon-left {
    margin-right: 16px;
}
</style>