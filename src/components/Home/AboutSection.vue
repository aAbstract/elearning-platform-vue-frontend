<script setup lang="ts">

// framework
import { onMounted, ref } from 'vue';

// lib
import { get_lang, get_trans } from '../../Lib/lang';
import { $ } from '../../Lib/dom';

// models
import { announcement_type } from '../../Models/announcement';

// primevue
import Button from 'primevue/button';

// API
import { get_announcements } from '../../API/announcements';

// fontawsome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

library.add(faCalendarDays);

// global vars
const lang = get_lang();

// refs
const announcements_ref = ref([
    {
        announcement_id: 0,
        announcement_desc_en: 'Loading...',
        announcement_desc_ar: 'Loading...',
        announcement_datetime: '1970-1-1',
        announcement_link: 'NONE',
    },
] as announcement_type[]);

// utils
function show_error_text(msg: string) {
    const html_element = $('#news_sec_err_text') as HTMLElement;
    html_element.innerText = msg;
    html_element.style.display = 'block';
}

// event handlers
function learn_more_btn_click_handler() {
    window.open('https://www.facebook.com/TheConcept.educ', '_blank');
}

onMounted(() => {
    get_announcements().then((resp) => {
        if (!resp.success) {
            show_error_text(resp.msg);
            return;
        }

        // format datetime format
        (resp.data as announcement_type[]).forEach((x) => x['announcement_datetime'] = x['announcement_datetime'].split('T')[0]);
        announcements_ref.value = resp.data;
    });
});

</script>

<template>
    <div id="about_sec_outer_cont">
        <div id="about_sec_inner_cont" :style="`direction: ${lang == 'en' ? 'ltr' : 'rtl'};`">
            <div id="about_text">
                <h2>{{ get_trans('about_us') }}</h2>
                <h1>{{ get_trans('the_concept_academy') }}</h1>
                {{ get_trans('about_paragraph') }}
                <Button id="learn_more_btn" :label="get_trans('learn_more')" style="font-family: Cairo, sans-serif;"
                    @click="learn_more_btn_click_handler()" />
            </div>
            <div id="news_sec">
                <h1>{{ get_trans('announcements') }}</h1>
                <span id="news_sec_err_text" class="error_text"></span>
                <div v-for="announcement in announcements_ref" class="news_item_cont">
                    <span class="news_item_date">
                        <FontAwesomeIcon :icon="['fa-solid', 'fa-calendar-days']" />
                        {{ announcement.announcement_datetime }}
                    </span>
                    <h2 class="news_item_text">{{ lang == 'en' ? announcement.announcement_desc_en :
                        announcement.announcement_desc_ar }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#about_sec_outer_cont {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: white;
    width: 100%;
    height: fit-content;
}

.news_item_date svg {
    font-size: 20px;
    margin-right: 8px;
    margin-left: 8px;
    color: var(--primary-color);
}

.news_item_text {
    margin: 0px;
}

.news_item_cont {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 16px;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

#news_sec {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 60px;
    width: 300px;
}

#learn_more_btn {
    width: 200px;
    margin-top: 24px;
}

#about_sec_inner_cont {
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
    padding: 24px;
    color: black;
    max-width: 1200px;
}

#about_text {
    width: 40%;
    display: flex;
    flex-direction: column;
}

#about_text p {
    font-size: 16px;
}

#about_text h2 {
    border-bottom: 4px solid var(--primary-color);
    width: fit-content;
}

@media screen and (max-width: 600px) {
    #about_sec_inner_cont {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 90%;
    }

    #about_sec_inner_cont #about_text {
        width: 100%;
    }
}
</style>