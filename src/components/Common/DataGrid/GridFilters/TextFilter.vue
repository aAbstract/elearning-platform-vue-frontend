<script setup lang="ts">

// primevue
import InputText from 'primevue/inputtext';

defineProps<{
    col_id: string,
    grid_filter_obj: any,
    filter_args: any,
}>();

</script>

<template>
    <InputText type="text" v-model="grid_filter_obj[col_id].value" class="p-column-filter" :placeholder="filter_args.placeholder" />
</template>