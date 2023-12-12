<script setup lang="ts">

// fontawsome
import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

library.add(faFile);
library.add(faPencil);
library.add(faYoutube as IconDefinition);
library.add(faBookOpen);

defineProps<{
    lectures_count: number,
    videos_count: number,
    documents_count: number,
    quizzes_count: number,
}>();

</script>

<template>
    <div id="content_kpi">
        <span id="content_kpi_header">
            <FontAwesomeIcon :icon="['fa-solid', 'fa-book-open']" />
            Content KPI
        </span>
        <div class="content_kpi_values_cont">
            <div class="content_kpi_values_row">
                <div style="background-color: var(--primary-color);" class="content_kpi_value">
                    <FontAwesomeIcon :icon="['fa-solid', 'fa-book-open']" />
                    <span>Lectures: {{ lectures_count }}</span>
                </div>
                <div style="background-color: #e52d27;" class="content_kpi_value">
                    <FontAwesomeIcon :icon="['fa-brands', 'fa-youtube']" />
                    <span>Videos: {{ videos_count }}</span>
                </div>
            </div>
            <div class="content_kpi_values_row">
                <div style="background-color: #42b883;" class="content_kpi_value">
                    <FontAwesomeIcon :icon="['fa-solid', 'fa-file']" />
                    <span>Documents: {{ documents_count }}</span>
                </div>
                <div style="background-color: #FF8F00;" class="content_kpi_value">
                    <FontAwesomeIcon :icon="['fa-solid', 'fa-pencil']" />
                    <span>Quizzes: {{ quizzes_count }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.content_kpi_values_row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 16px;
}

.content_kpi_value {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 12vw;
    border-radius: 8px;
    color: white;
    margin-right: 24px;
}

.content_kpi_value svg {
    font-size: 24px;
    margin-right: 16px;
}

.content_kpi_value span {
    font-size: 24px;
    font-weight: bold;
}

#content_kpi_values_cont {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

#content_kpi_header {
    font-size: 16px;
    font-weight: bold;
    color: #757575;
    margin-bottom: 16px;
}

#content_kpi_header svg {
    margin-right: 4px;
}

#content_kpi {
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