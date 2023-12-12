<script setup lang="ts">

// fontawsome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faUser);

defineProps<{
    online_reg_count: number,
    offline_reg_count: number,
}>();

</script>

<template>
    <div id="users_kpi">
        <span id="users_kpi_header">
            <FontAwesomeIcon :icon="['fa-solid', 'fa-user']" />
            Users KPI
        </span>
        <div class="users_kpi_values_cont">
            <div class="users_kpi_values_row">
                <div style="background-color: var(--primary-color);" class="users_kpi_value">
                    <FontAwesomeIcon :icon="['fa-solid', 'fa-user']" />
                    <span>Online Registration: {{ online_reg_count }}</span>
                </div>
                <div style="background-color: #42b883;" class="users_kpi_value">
                    <FontAwesomeIcon :icon="['fa-solid', 'fa-user']" />
                    <span>Offline Registration: {{ offline_reg_count }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.users_kpi_value span {
    font-weight: bold;
}

.users_kpi_value {
    width: 13vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 20px;
    padding: 16px 0px;
    border-radius: 8px;
    color: white;
}

.users_kpi_values_row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 16px;
}

#users_kpi_header {
    font-size: 16px;
    font-weight: bold;
    color: #757575;
    margin-bottom: 16px;
}

#users_kpi_header svg {
    margin-right: 4px;
}

#users_kpi {
    padding: 16px;
    border-radius: 8px;
    width: 30vw;
    height: 200px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px solid #bdbdbd;
}
</style>