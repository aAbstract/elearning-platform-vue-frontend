<script setup lang="ts">

// framework
import { ref } from 'vue';

// primevue
import Calendar from 'primevue/calendar';

const props = defineProps<{
    col_id: string,
    grid_filter_obj: any,
    filter_args: any,
}>();

// refs
const date_1 = ref();
const date_2 = ref();

function date_selection() {
    props.grid_filter_obj[props.col_id].value = [date_1.value, date_2.value];
}

</script>

<template>
    <Calendar @date-select="date_selection()" v-model="date_1" class="p-column-filter" placeholder="First Date Limit"
        :show-icon='true' />
    <br>
    <Calendar @date-select="date_selection()" v-model="date_2" class="p-column-filter" placeholder="Second Date Limit"
        :show-icon='true' />
</template>