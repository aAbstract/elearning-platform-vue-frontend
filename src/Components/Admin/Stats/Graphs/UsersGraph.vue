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
    const chart_object = $('#users_graph') as ChartItem;
    new Chart(chart_object, {
        type: 'bar',
        data: {
            labels: props.labels,
            datasets: [{
                backgroundColor: '#42b883',
                label: 'Users Distribution',
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
    <div id="users_graph_cont">
        <canvas id="users_graph"></canvas>
    </div>
</template>

<style scoped>
#users_graph {
    width: 40vw;
    height: 500px;
    background-color: white;
    border: 1px solid #bdbdbd;
    border-radius: 4px;
}
</style>