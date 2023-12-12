<script setup lang="ts">

// UI Components
import TestimonialCard from './TestimonialCard.vue';

// models
import { tesimonial } from '../../../Models/ui';

// lib
import { get_trans, get_lang } from '../../../Lib/lang';

// global vars
const testi_list = [
    {
        paragraph_symbol: 'testi_para_1',
        name_symbol: 'testi_name_1',
        education_symbol: 'testi_edu_1',
    },
    {
        paragraph_symbol: 'testi_para_2',
        name_symbol: 'testi_name_2',
        education_symbol: 'testi_edu_2',
    },
    {
        paragraph_symbol: 'testi_para_3',
        name_symbol: 'testi_name_3',
        education_symbol: 'testi_edu_3',
    },
] as tesimonial[];

const lang = get_lang();

</script>

<template>
    <div id="testis_outter_cont">
        <div id="testis_inner_cont" :style="`direction: ${lang == 'en' ? 'ltr' : 'rtl'};`">
            <h2>{{ get_trans('testimonials') }}</h2>
            <div id="testis_cards_cont">
                <TestimonialCard v-for="(testi_obj, index) in testi_list" :key="index" :testi_obj="testi_obj" />
            </div>
        </div>
    </div>
</template>

<style scoped>
#testis_outter_cont {
    background-color: white;
    padding: 40px;
}

#testis_cards_cont {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
}

#testis_inner_cont h2 {
    border-bottom: 4px solid var(--primary-color);
    width: fit-content;
}

@media screen and (max-width: 600px) {
    #testis_outter_cont {
        padding: 8px;
    }
}
</style>