<script setup lang="ts">

// framework
import { ref, onMounted } from 'vue';

// lib
import { grid_constructor } from '../../../Models/ui';
import { subscribe, post_event } from '../../../Lib/mediator';
import { show_toast, TOAST_TYPES } from '../../../Lib/toast';

// API
import { get_all_payment_logs, delete_payment_logs } from '../../../API/Admin/payment_logs';
import { get_stats } from '../../../API/Admin/stats';

// primevue
import { useToast } from 'primevue/usetoast';

// UI components
import LoadingScreen from '../../Common/LoadingScreen.vue';
// KPIs
import ContentKPI from '../Stats/KPIs/ContentKPI.vue';
import UsersKPI from '../Stats/KPIs/UsersKPI.vue';
import CashKPI from '../Stats/KPIs/CashKPI.vue';
// graphs
import LecturesGraph from '../Stats/Graphs/LecturesGraph.vue';
import UsersGraph from '../Stats/Graphs/UsersGraph.vue';
// data grid
import DataGrid from '../../Common/DataGrid/DataGrid.vue';

// global vars
const toast_service = useToast();

const payments_history_grid_state = {
    grid_source_func: get_all_payment_logs,
    resource_name: 'Payments History',
    action_key: 'payment_log_id',
    action_del_func: (record: any) => {
        const action_key = 'payment_log_id';
        const key_value = record[action_key];

        delete_payment_logs([key_value]).then((resp) => {
            if (!resp.success) {
                post_event('grid_controller_toast', {
                    toast_msg: resp.msg,
                    toast_type: TOAST_TYPES.ERROR,
                });
                return;
            }

            post_event('grid_controller_toast', {
                toast_msg: 'Payment Logs Deleted From Database',
                toast_type: TOAST_TYPES.SUCCESS,
            });

            init_grid_controller();
        });
    },
    action_bulk_del_func: (records: any[]) => {
        const action_key = 'payment_log_id';
        const key_values = records.map((x) => x[action_key]);

        delete_payment_logs(key_values).then((resp) => {
            if (!resp.success) {
                post_event('grid_controller_toast', {
                    toast_msg: resp.msg,
                    toast_type: TOAST_TYPES.ERROR,
                });
                return;
            }

            post_event('grid_controller_toast', {
                toast_msg: 'Payment Logs Deleted From Database',
                toast_type: TOAST_TYPES.SUCCESS,
            });

            init_grid_controller();
        });
    },
} as grid_constructor;

// refs
const grid_data = ref([] as any[]);
const keys_map = ref({} as any);
const is_data_grid_loading = ref(true);
const is_stats_loading = ref(true);
const lecs_count = ref(0);
const vids_count = ref(0);
const docs_count = ref(0);
const quizzes_count = ref(0);
const online_reg_users_count = ref(0);
const offline_reg_users_count = ref(0);
const total_purchases = ref(0);
const users_graph_labels = ref([] as string[]);
const users_graph_values = ref([] as number[]);
const lecs_graph_labels = ref([] as string[]);
const lecs_graph_values = ref([] as number[]);

// utils
function init_grid_controller() {
    payments_history_grid_state.grid_source_func().then((resp) => {
        is_data_grid_loading.value = false;

        if (!resp.success) {
            show_toast(toast_service, resp.msg, TOAST_TYPES.ERROR);
            return;
        }

        keys_map.value = resp.data['keys_map'];
        grid_data.value = resp.data['record'];
    });
}

onMounted(() => {
    init_grid_controller();

    subscribe('grid_controller_toast', 'grid_controller_toast_func', (args) => {
        const toast_msg = args.toast_msg as string;
        const toast_type = args.toast_type as TOAST_TYPES;
        show_toast(toast_service, toast_msg, toast_type);
    });

    // load system stats
    get_stats().then((resp) => {
        is_stats_loading.value = false;

        if (!resp.success) {
            show_toast(toast_service, resp.msg, TOAST_TYPES.ERROR);
            return;
        }

        // render content KPIs
        lecs_count.value = resp.data.lecs_count;
        (resp.data.mats_count_per_mat_type as any[]).forEach((x) => {
            if (x['material_type'] == 'VIDEO')
                vids_count.value = x['materials_count']
            else if (x['material_type'] == 'DOCUMENT')
                docs_count.value = x['materials_count']
            else if (x['material_type'] == 'QUIZ')
                quizzes_count.value = x['materials_count']
        });

        // render users KPIs
        (resp.data.users_count_per_reg_type as any[]).forEach((x) => {
            if (x['reg_type'] == 'ONLINE')
                online_reg_users_count.value = x['users_count']
            else if (x['reg_type'] == 'OFFLINE')
                offline_reg_users_count.value = x['users_count']
        });

        // render total cash KPIs
        total_purchases.value = resp.data.total_purchases;

        // render users distribution graph
        users_graph_labels.value = (resp.data.users_count_per_center_name as any[]).map((x) => x['center_name']);
        users_graph_values.value = (resp.data.users_count_per_center_name as any[]).map((x) => x['users_count']);

        // render lectures purchases graph
        lecs_graph_labels.value = (resp.data.lecs_ownership_counts as any[]).map((x) => x['lecture_name_en']);
        lecs_graph_values.value = (resp.data.lecs_ownership_counts as any[]).map((x) => x['ownership_count']);
    });
});
</script>

<template>
    <div id="stats_admin_panel">
        <LoadingScreen v-if="is_stats_loading" />
        <div v-if="!is_stats_loading" id="kpis_cont">
            <ContentKPI :lectures_count="lecs_count" :videos_count="vids_count" :documents_count="docs_count"
                :quizzes_count="quizzes_count" />
            <UsersKPI :online_reg_count="online_reg_users_count" :offline_reg_count="offline_reg_users_count" />
            <CashKPI :total_cash="total_purchases" />
        </div>
        <br>
        <div v-if="!is_stats_loading" id="graphs_cont">
            <UsersGraph :labels="users_graph_labels" :values="users_graph_values" />
            <LecturesGraph :labels="lecs_graph_labels" :values="lecs_graph_values" />
        </div>
        <br>
        <div id="payments_cont">
            <LoadingScreen v-if="is_data_grid_loading" />
            <DataGrid v-else :max_rows_count="10" resource_id="payments_history"
                :resource_name="payments_history_grid_state.resource_name"
                :action_key="payments_history_grid_state.action_key"
                :action_del_func="payments_history_grid_state.action_del_func"
                :action_bulk_del_func="payments_history_grid_state.action_bulk_del_func" :grid_data="grid_data"
                :keys_map="keys_map" />
        </div>
    </div>
</template>

<style scoped>
#graphs_cont {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
}

#kpis_cont {
    width: 100%;
    height: fit-content;
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

#stats_admin_panel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow-y: scroll;
}

#payments_cont {
    width: 96%;
    margin-bottom: 16px;
}
</style>