<script setup lang="ts">

// framework
import { onMounted, ref } from 'vue';

// UI components
import LectureCard from './LectureCard.vue';
import LoadingScreen from '../../Common/LoadingScreen.vue';

// API
import { get_lecs } from '../../../API/lectures';

// lib
import { get_lang, get_trans } from '../../../Lib/lang';
import { show_error_msg } from '../../../Lib/dom';

// models
import { lecture_info } from '../../../Models/lecture';

// global vars
const lang = get_lang();

// refs
const loading_state = ref(true);
const lecture_info_items = ref([] as lecture_info[]);

onMounted(() => {
    get_lecs().then((resp) => {
        loading_state.value = false;

        if (!resp.success) {
            show_error_msg('lectures_sec_err', resp.msg);
            return;
        }

        lecture_info_items.value = resp.data as lecture_info[];
    });
});

</script>

<template>
    <div id="lectures_section_cont" :style="`direction: ${lang == 'en' ? 'ltr' : 'rtl'};`">
        <h2>{{ get_trans('lectures') }}</h2>
        <h3 id="lectures_sec_err" class="error_text">ERROR</h3>
        <div v-if="!loading_state" id="lectures_section_cont_inner_cont">
            <LectureCard v-for="(lec, index) in lecture_info_items" :key="index" :lec_info_obj="lec" />
        </div>
        <LoadingScreen v-else />
    </div>
</template>

<style scoped>
#lectures_section_cont_inner_cont {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
}

#lectures_section_cont h2 {
    border-bottom: 4px solid var(--primary-color);
    width: fit-content;
}

#lectures_section_cont {
    padding: 40px;
    padding-left: 200px;
    width: 100%;
    height: fit-content;
}

@media screen and (max-width: 600px) {
    #lectures_section_cont {
        padding: 8px;
    }
}
</style>