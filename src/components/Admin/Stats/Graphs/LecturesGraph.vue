<script setup lang="ts">

// framework
import { onMounted } from 'vue';

// primevue
import Chart, { ChartItem } from 'chart.js/auto';

// lib
import { $ } from '../../../../Lib/dom';

const props = defineProps<{
    labels: string[],
    values: number[],
}>();

onMounted(() => {
    const chart_object = $('#lectures_graph') as ChartItem;
    new Chart(chart_object, {
        type: 'bar',
        data: {
            labels: props.labels,
            datasets: [{
                backgroundColor: '#3B82F6',
                label: 'Lectures Purchases',
                data: props.values,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

</script>

<template>
    <div id="lectures_graph_cont">
        <canvas id="lectures_graph"></canvas>
    </div>
</template>

<style scoped>
#lectures_graph {
    width: 40vw;
    height: 500px;
    background-color: white;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
}
</style>