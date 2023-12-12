<script setup lang="ts">

// framework
import { onMounted } from 'vue';

// lib
import { subscribe, post_event } from '../../../../Lib/mediator';
import { TOAST_TYPES } from '../../../../Lib/toast';

onMounted(() => {
    subscribe('show_payment_logs_form', 'show_payment_logs_form_func', (args) => {
        const mode = args.mode as string;

        if (mode == 'create') {
            post_event('grid_controller_toast', {
                toast_msg: 'This Feature is Not Available for This Database Resource',
                toast_type: TOAST_TYPES.WARN,
            });
        } else if (mode == 'update') {
            post_event('grid_controller_toast', {
                toast_msg: 'This Feature is Not Available for This Database Resource',
                toast_type: TOAST_TYPES.WARN,
            });
        }
    });
});

</script>

<template>
    <div style="display: none;"></div>
</template>

<style scoped></style>