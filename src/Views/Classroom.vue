<script setup lang="ts">

// framework
import { onMounted, ref, shallowRef } from 'vue';
import { useRoute } from 'vue-router';

// lib
import { get_trans, get_lang } from '../Lib/lang';
import { show_error_msg } from '../Lib/dom';

// API
import { get_lec_content } from '../API/lectures';

// UI components
import TopBar from '../Components/Common/TopBar/TopBar.vue';
import VideoView from '../Components/Classroom/VideoView.vue';
import DocView from '../Components/Classroom/DocView.vue';
import QuizView from '../Components/Classroom/QuizView.vue';
import LoadingScreen from '../Components/Common/LoadingScreen.vue';

// models
import { lecture_material } from '../Models/lecture';

// fontawsome
import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

library.add(faFile);
library.add(faPencil);
library.add(faYoutube as IconDefinition);

// refs
const lec_mat_list = ref([] as lecture_material[]);
const active_item_index = ref(0);

// global vars
const route = useRoute();

const lang = get_lang();

const mat_type_icon_map = {
    'VIDEO': ['fa-brands', 'fa-youtube'],
    'DOCUMENT': ['fa-solid', 'fa-file'],
    'QUIZ': ['fa-solid', 'fa-pencil'],
} as any;

const mat_type_view_comp_map = {
    'VIDEO': VideoView,
    'DOCUMENT': DocView,
    'QUIZ': QuizView,
} as any;

// event handlers
function item_click_handler(item_index: number) {
    active_item_index.value = item_index;
}

onMounted(() => {
    const lec_id = Number(route.query.lec_id);

    get_lec_content(lec_id).then((resp) => {
        if (!resp.success) {
            show_error_msg('classroom_err_msg', resp.msg);
            return;
        }

        lec_mat_list.value = resp.data as lecture_material[];
    });
});

</script>

<template>
    <div id="classroom_page_cont">
        <TopBar />
        <h3 id="classroom_err_msg" class="error_text">ERROR</h3>
        <div id="classroom_window" :style="`direction: ${lang == 'en' ? 'ltr' : 'rtl'};`">
            <div id="items_list">
                <h3>{{ get_trans('lec_cont') }}</h3>
                <span v-if="lec_mat_list.length == 0" style="margin-left: 16px;">{{ get_trans('loading') }}</span>
                <div v-else id="item_list_cont">
                    <span v-for="(lec_mat, index) in lec_mat_list" :key="index"
                        :class="`${index == active_item_index ? `item_list_active_${lang}` : ''}`"
                        @click="item_click_handler(index)">
                        <FontAwesomeIcon :icon="mat_type_icon_map[lec_mat.mat_type]" />
                        {{ lang == 'en' ? lec_mat.name_en : lec_mat.name_ar }}
                    </span>
                </div>
            </div>
            <div id="item_view">
                <LoadingScreen v-if="lec_mat_list.length == 0" />
                <component v-else :is="mat_type_view_comp_map[lec_mat_list[active_item_index].mat_type]"
                    :mat_item="lec_mat_list[active_item_index]" />
            </div>
        </div>
    </div>
</template>

<style scoped>
#item_view {
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

#item_list_cont svg {
    font-size: 18px;
    width: 40px;
}

.item_list_active_en {
    font-weight: bold;
    border-left: 4px solid var(--primary-color);
}

.item_list_active_ar {
    font-weight: bold;
    border-right: 4px solid var(--primary-color);

}

#item_list_cont {
    display: flex;
    flex-direction: column;
}

#item_list_cont span {
    width: 100%;
    cursor: pointer;
    transition: 0.3s ease;
}

#item_list_cont span:hover {
    color: var(--primary-color);
}

#items_list h3 {
    font-weight: bold;
    width: fit-content;
    border-bottom: 4px solid var(--primary-color);
    margin-left: 8px;
    margin-right: 8px;
}

#items_list {
    overflow-y: scroll;
    width: 20vw;
}

#classroom_window {
    width: 90vw;
    height: 80vh;
    margin: auto;
    margin-top: 2vh;
    display: flex;
    flex-direction: row;
    background-color: white;
    border: 1px solid #bdbdbd;
    border-radius: 12px;
}

@media screen and (max-width: 600px) {
    #classroom_window {
        width: 96vw;
        height: 82vh;
        flex-direction: column-reverse;
    }

    #items_list {
        width: 100%;
        border-top: 1px solid #bdbdbd;
        padding-top: 16px;
        height: 30vh;
        min-height: 200px;
    }
}
</style>