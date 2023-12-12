<script setup lang="ts">

// primevue
import MultiSelect from 'primevue/multiselect';

defineProps<{
    col_id: string,
    grid_filter_obj: any,
    filter_args: any,
}>();

</script>

<template>
    <div>
        <h4 class="enum_filter_header">{{ filter_args.placeholder }}</h4>
        <MultiSelect v-model="grid_filter_obj[col_id].value" :options="filter_args.options"
            :placeholder="filter_args.placeholder" class="p-column-filter">
            <template #option="slotProps">
                <span>{{slotProps.option}}</span>
            </template>
        </MultiSelect>
    </div>
</template>

<style scoped>
.enum_filter_header {
    margin: 16px 0px 8px 4px;
}
</style>