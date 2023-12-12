<script setup lang="ts">

// framework
import { shallowRef, onMounted, onBeforeMount, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// models
import { user_type } from '../Models/user';

// lib
import { get_logged_user } from '../Lib/auth';

// UI components
import SideBar from '../Components/Admin/SideBar.vue';
import SideBarMenu from '../Components/Admin/SideBarMenu.vue';
// admin panels
import Stats from '../Components/Admin/AdminPanels/Stats.vue';
import GridController from '../Components/Admin/AdminPanels/GridController.vue';

// global vars
const route = useRoute();
const router = useRouter();

const admin_panel_name_map = {
    'stats': Stats,
    'grid_controller': GridController,
} as any;

// refs
const force_update_key = ref(false);
const active_admin_panel = shallowRef(Stats);
const admin_panel_params = ref({} as any);

// utils
function force_panel_rerender() {
    force_update_key.value = !force_update_key.value;
}

function update_panel_from_route() {
    // set admin panel
    const panel_id = route.query.panel_id as string;
    active_admin_panel.value = admin_panel_name_map[panel_id];

    // create params object
    let query_clone = { ...route.query };
    delete query_clone.panel_id;

    // set admin panel params
    admin_panel_params.value = query_clone;
    force_panel_rerender();
}

onMounted(() => {
    // check logged in user
    const user: user_type | null = get_logged_user();
    if (user?.user_role != 'ADMIN') {
        router.push({ path: '/' });
        return;
    }

    // init route if not exist
    const url_query = route.query;

    // setup route watcher
    watch(() => route.query, () => update_panel_from_route());

    // set default admin panel to stats page
    if (Object.keys(url_query).length == 0)
        router.replace({ path: '/admin', query: { panel_id: 'stats' } });

    // if route exist update admin panel
    else
        update_panel_from_route();
});

</script>

<template>
    <div :key="force_update_key ? 1 : 0" id="admin_page_cont">
        <SideBar />
        <SideBarMenu />
        <component :is="active_admin_panel" :params="admin_panel_params" />
    </div>
</template>

<style scoped>
#admin_page_cont {
    width: 100%;
    height: 95%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
</style>