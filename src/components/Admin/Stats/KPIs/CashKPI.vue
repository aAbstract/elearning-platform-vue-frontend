<script setup lang="ts">

// fontawsome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faDollar } from '@fortawesome/free-solid-svg-icons';

library.add(faDollar);

defineProps<{
    total_cash: number,
}>();

</script>

<template>
    <div id="cash_kpi">
        <span id="cash_kpi_header">
            <FontAwesomeIcon :icon="['fa-solid', 'fa-dollar']" />
            Cash KPI
        </span>
        <div style="background-color: #42b883;" class="cash_kpi_value">
            Total Purchases: {{ total_cash }} LE
        </div>
    </div>
</template>

<style scoped>
.cash_kpi_value {
    font-size: 24px;
    font-weight: bold;
    padding: 16px;
    color: white;
    border-radius: 8px;
}

#cash_kpi_header {
    font-size: 16px;
    font-weight: bold;
    color: #757575;
    margin-bottom: 16px;
    width: 100%;
}

#cash_kpi_header svg {
    margin-right: 4px;
}

#cash_kpi {
    padding: 16px;
    border-radius: 8px;
    width: 30vw;
    height: 200px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #bdbdbd;
}
</style>