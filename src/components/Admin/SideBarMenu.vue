<script setup lang="ts">

// framework
import { ref, onMounted } from 'vue';

// lib
import { subscribe } from '../../Lib/mediator';

// primevue
import Menu from 'primevue/menu';

// refs
const menu_items = ref([]);
const menu_height = ref(50);
const menu_display = ref('NONE');

onMounted(() => {
    subscribe('show_admin_side_bar_menu', 'show_admin_side_bar_menu_func', (args) => {
        menu_items.value = args.menu_items;
        menu_height.value = 60 * (args.index + 1);
        menu_display.value = 'block';
    });

    subscribe('close_admin_side_bar_menu', 'close_admin_side_bar_menu_func', (_) => {
        menu_display.value = 'NONE';
    });
});

</script>

<template>
    <div id="side_bar_menu_cont" :style="`top: ${menu_height}px; display: ${menu_display};`" :key="menu_height">
        <Menu :model="menu_items" />
    </div>
</template>

<style scoped>
#side_bar_menu_cont {
    z-index: 1;
    position: absolute;
    left: 65px;
}
</style>