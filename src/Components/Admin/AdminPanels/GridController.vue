<script setup lang="ts">

// framework
import { onMounted, ref } from 'vue';

// UI components
import DataGrid from '../../Common/DataGrid/DataGrid.vue';
import LoadingScreen from '../../Common/LoadingScreen.vue';

// lib
import { show_error_msg } from '../../../Lib/dom';
import { subscribe } from '../../../Lib/mediator';
import { grid_state_map } from '../../../Lib/grid_states';
import { show_toast, TOAST_TYPES } from '../../../Lib/toast';

// primevue
import { useToast } from "primevue/usetoast";

// models
import { grid_constructor } from '../../../Models/ui';

const props = defineProps<{ params: any }>();

// refs
const is_loading = ref(true);
const grid_data = ref([] as any[]);
const keys_map = ref({} as any);

// global vars
const toast_service = useToast();
const grid_state = grid_state_map[props.params.resource_id] as grid_constructor;

// utils
function init_grid_controller() {
    const api_request_promise = grid_state.grid_source_func;

    api_request_promise().then((resp) => {
        is_loading.value = false;

        if (!resp.success) {
            show_error_msg('grid_controller_cont_err_text', resp.msg);
            return;
        }

        keys_map.value = resp.data['keys_map'];
        grid_data.value = resp.data['record'];
    });
}

function refresh_grid_controller() {
    is_loading.value = true;
    init_grid_controller();
}

onMounted(() => {
    subscribe('refresh_grid_controller', 'refresh_grid_controller_func', (_) => refresh_grid_controller());
    subscribe('grid_controller_toast', 'grid_controller_toast_func', (args) => {
        const toast_msg = args.toast_msg as string;
        const toast_type = args.toast_type as TOAST_TYPES;

        show_toast(toast_service, toast_msg, toast_type);
    });
    init_grid_controller();
});

</script>

<template>
    <div id="grid_controller_cont">
        <h3 id="grid_controller_cont_err_text" class="error_text">ERROR</h3>
        <LoadingScreen v-if="is_loading" />
        <DataGrid v-else :max_rows_count="20" :resource_id="params.resource_id" :resource_name="grid_state.resource_name"
            :action_key="grid_state.action_key" :action_del_func="grid_state.action_del_func"
            :action_bulk_del_func="grid_state.action_bulk_del_func" :grid_data="grid_data" :keys_map="keys_map" />
    </div>
</template>

<style scoped>
#grid_controller_cont {
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow-y: scroll;
}
</style>