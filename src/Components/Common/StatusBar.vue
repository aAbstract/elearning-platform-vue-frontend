<script setup lang="ts">

// framework
import { onMounted } from 'vue';

// lib
import { set_cookie, get_cookies } from '../../Lib/cookie';
import { get_trans } from '../../Lib/lang';

// fontawsome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGlobeAsia } from '@fortawesome/free-solid-svg-icons';

library.add(faEnvelope);
library.add(faGlobeAsia);

// event handlers
function lang_sel_event_handler(): void {
    let sel_element = document.getElementById('lang_select') as HTMLSelectElement;
    set_cookie('lang', sel_element.value);
    window.location.reload();
}

// lifecycle hooks
onMounted(() => {
    let sel_element = document.getElementById('lang_select') as HTMLSelectElement;
    sel_element.value = get_cookies()['lang'];
});

</script>

<template>
    <div id="stat_bar_cont">
        <div id="stat_bar_fsec">
            <div class="stat_bar_cont_unit">
                <FontAwesomeIcon :icon="['fa-solid', 'fa-envelope']" />
                <span>ahesham@the-concept-academy.com</span>
            </div>
        </div>
        <div id="stat_bar_ssec">
            <div class="stat_bar_cont_unit">
                <FontAwesomeIcon :icon="['fa-solid', 'fa-globe-asia']" />
                <select id="lang_select" @change="lang_sel_event_handler()" style="font-family: 'Cairo', sans-serif;">
                    <option value="en">{{ get_trans('lang_en') }}</option>
                    <option value="ar">{{ get_trans('lang_ar') }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<style scoped>
#stat_bar_cont {
    display: flex;
    flex-direction: row;
    height: 36px;
    background-color: var(--primary-color);
    align-items: center;
    justify-content: space-around;
}

.stat_bar_cont_unit {
    margin-right: 80px;
}

.stat_bar_cont_unit svg {
    color: var(--primary-color-text);
    font-size: 18px;
    margin-right: 12px;
}

.stat_bar_cont_unit span {
    color: white;
}

#stat_bar_fsec {
    display: flex;
    flex-direction: row;
}

#lang_select {
    font-size: 14px;
    background-color: transparent;
    border: none;
    color: white;
}

#lang_select option {
    color: black;
}

@media screen and (max-width: 600px) {
    .stat_bar_cont_unit {
        margin: 0px;
    }
}
</style>