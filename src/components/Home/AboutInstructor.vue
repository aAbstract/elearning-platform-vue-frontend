<script setup lang="ts">

// lib
import { get_trans, get_lang } from '../../Lib/lang';

// global vars
const lang = get_lang();

</script>

<template>
    <div id="about_inst_sec_outer_cont">
        <div id="about_inst_sec_inner_cont" :style="`direction: ${lang == 'en' ? 'ltr' : 'rtl'};`">
            <div id="inst_about_text">
                <h2>{{ get_trans('meet_our_inst') }}</h2>
                <h1>{{ get_trans('eng_ahesham') }}</h1>
                <div id="mobile_inst_image">
                    <img src="/images/ahesham.jpg" alt="Ahmed Hesham">
                </div>
                {{ get_trans('about_inst_paragraph') }}
            </div>
            <div id="desktop_inst_image">
                <img src="/images/ahesham.jpg" alt="Ahmed Hesham">
            </div>
        </div>
    </div>
</template>

<style scoped>
#mobile_inst_image {
    display: none;
}

#desktop_inst_image img {
    width: 600px;
    border-radius: 8px;
}

#inst_about_text h1 {
    font-size: 32px;
}

#inst_about_text {
    width: 40%;
    display: flex;
    flex-direction: column;
}

#inst_about_text p {
    font-size: 16px;
}

#inst_about_text h2 {
    border-bottom: 4px solid var(--primary-color);
    width: fit-content;
    margin-bottom: 0px;
}

#about_inst_sec_outer_cont {
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: white;
    width: 100%;
    height: fit-content;
}

#about_inst_sec_inner_cont {
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 24px;
    color: black;
    max-width: 1300px;
}

@media screen and (max-width: 600px) {
    #about_inst_sec_inner_cont {
        flex-direction: column;
        justify-content: flex-start;
    }

    #inst_about_text {
        width: 100%;
    }

    #desktop_inst_image img {
        display: none;
    }

    #mobile_inst_image {
        display: block;
    }

    #mobile_inst_image img {
        width: 300px;
        border-radius: 8px;
    }
}
</style>