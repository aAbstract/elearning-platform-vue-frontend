<script setup lang="ts">

// lib
import { get_trans, get_lang } from '../../Lib/lang';

// fontawsome
import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

library.add(faFacebookF as IconDefinition);
library.add(faYoutube as IconDefinition);
library.add(faAngleRight);
library.add(faPhone);
library.add(faEnvelope);
library.add(faAngleLeft);

const lang = get_lang();

</script>

<template>
    <div id="footer_outer_cont">
        <div id="footer_inner_cont" :style="`direction: ${lang == 'en' ? 'ltr' : 'rtl'};`">
            <div id="footer_about_sec" class="footer_sec">
                <img src="/images/logo-2.png" alt="logo" style="width: 200px" />
                <p>{{ get_trans('about_platform_paragraph') }}</p>
                <div id="footer_links_sec">
                    <a href="https://www.facebook.com/TheConcept.educ" target="_blank">
                        <span>
                            <FontAwesomeIcon :icon="['fa-brands', 'fa-facebook-f']" />
                        </span>
                    </a>
                    <a href="https://www.youtube.com/channel/UC76SnouNyDBZ2KTme9pL9Qg" target="_blank">
                        <span>
                            <FontAwesomeIcon :icon="['fa-brands', 'fa-youtube']" />
                        </span>
                    </a>
                </div>
            </div>
            <div id="footer_support_sec" class="footer_sec">
                <h2>{{ get_trans('support') }}</h2>
                <a href="#" class="support_item">
                    <FontAwesomeIcon :icon="['fa-solid', lang == 'en' ? 'fa-angle-right' : 'fa-angle-left']" />
                    <span>{{ get_trans('faqs') }}</span>
                </a>
                <a href="#" class="support_item">
                    <FontAwesomeIcon :icon="['fa-solid', lang == 'en' ? 'fa-angle-right' : 'fa-angle-left']" />
                    <span>{{ get_trans('support') }}</span>
                </a>
                <a href="https://www.youtube.com/watch?v=6O3-7rIazHg" class="support_item" target="_blank">
                    <FontAwesomeIcon :icon="['fa-solid', lang == 'en' ? 'fa-angle-right' : 'fa-angle-left']" />
                    <span>{{ get_trans('documentaion') }}</span>
                </a>
            </div>
            <div id="footer_contact_sec" class="footer_sec">
                <h2>{{ get_trans('contact_us') }}</h2>
                <div class="contact_item">
                    <FontAwesomeIcon :icon="['fa-solid', 'fa-phone']" />
                    <span>Eng.Ahmed Hesham [Founder]: +201098938792</span>
                </div>
                <div class="contact_item">
                    <FontAwesomeIcon :icon="['fa-solid', 'fa-phone']" />
                    <span>Eng.Eslam Elsharkawy [Developer]: +201066512891</span>
                </div>
                <div class="contact_item">
                    <FontAwesomeIcon :icon="['fa-solid', 'fa-envelope']" />
                    <span>ahesham@the-concept-academy.com</span>
                </div>
            </div>
        </div>
        <div id="footer_bottom_bar" :style="`direction: ${lang == 'en' ? 'ltr' : 'rtl'};`">
            <span>© {{ get_trans('the_concept_academy') }}</span>
        </div>
    </div>
</template>

<style scoped>
.contact_item {
    font-weight: bold;
    font-size: 16px;
    text-decoration: none;
    color: white;
}

.contact_item svg {
    margin: 0px 8px;
}

#footer_support_sec {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.support_item {
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
    color: white;
}

.support_item svg {
    margin: 0px 8px;
}

.footer_sec {
    margin-right: 36px;
    color: white;
}

.footer_sec h2 {
    margin-top: 0px;
    margin-bottom: 16px;
}

#footer_contact_sec {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

#footer_links_sec {
    display: flex;
    flex-direction: row;

}

#footer_links_sec span {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: var(--primary-color);
    cursor: pointer;
    transition: 0.3s ease;
    margin-right: 12px;
}

#footer_links_sec span:hover {
    background-color: var(--primary-color);
    color: white;
    border: 1px solid white;
}

#footer_about_sec p {
    width: 400px;
    color: white;
}

#footer_outer_cont {
    width: 100%;
    height: 350px;
    background-color: var(--primary-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;
}

#footer_inner_cont {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    max-width: 1300px;
    padding-top: 40px;
    padding-left: 16px;
}

#footer_bottom_bar {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    max-width: 1300px;
    padding: 0px 16px;
}

#footer_bottom_bar span {
    font-size: 18px;
    color: white;
    font-weight: bold;
}

@media screen and (max-width: 600px) {
    #footer_inner_cont {
        flex-direction: column;
        height: fit-content;
    }

    #footer_outer_cont {
        height: fit-content;
    }

    .footer_sec h2 {
        margin-top: 16px;
        margin-bottom: 0px;
    }

    #footer_about_sec p {
        width: 100%;
        color: white;
    }

    #footer_bottom_bar {
        margin-top: 16px;
    }
}
</style>