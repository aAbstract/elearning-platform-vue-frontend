<script setup lang="ts">

// framework
import { useRouter } from 'vue-router';

// lib
import { remove_cookie } from '../../../Lib/cookie';
import { get_logged_user } from '../../../Lib/auth';
import { get_trans } from '../../../Lib/lang';
import { post_event } from '../../../Lib/mediator';

// UI components
import Avatar from './Avatar.vue';
import Notifications from './Notifications.vue';
import ActiveLogo from '../../Common/ActiveLogo.vue';

// primevue
import Button from 'primevue/button';

// models
import { user_type } from '../../../Models/user';

// fontawsome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faDollar } from '@fortawesome/free-solid-svg-icons';

library.add(faHouse);
library.add(faScrewdriverWrench);
library.add(faBell);
library.add(faArrowRightFromBracket);
library.add(faDollar)

// gloabl vars
const router = useRouter();

// get logged user
let user: user_type | null = get_logged_user();

// event handlers
function home_btn_click_handler() {
    router.push({ path: '/' });
}

function logout_btn_click_handler() {
    remove_cookie('access_token');
    router.push({ path: '/login' });
}

function admin_panel_btn_click_handler() {
    router.push({ path: '/admin' });
}

function login_btn_click_handler() {
    router.push({ path: '/login' });
}

function signup_btn_click_handler() {
    router.push({ path: '/signup' });
}

function recharge_balance_btn_click() {
    post_event('show_recharge_balance_form', {});
}

</script>

<template>
    <div>
        <div id="top_bar_cont">
            <ActiveLogo />

            <div id="top_bar_padding">
            </div>

            <div v-if="user != null" id="top_bar_icons_cont">
                <span class="top_bar_icon_cont" @click="home_btn_click_handler()">
                    <FontAwesomeIcon :icon="['fa-solid', 'fa-house']" title="Home Page" />
                </span>
                <span v-if="user?.user_role == 'ADMIN'" class="top_bar_icon_cont" @click="admin_panel_btn_click_handler()">
                    <FontAwesomeIcon :icon="['fa-solid', 'fa-screwdriver-wrench']" title="Admin Panel" />
                </span>
                <span v-else-if="user?.user_role == 'STUDENT'" class="top_bar_icon_cont"
                    @click="recharge_balance_btn_click()">
                    <FontAwesomeIcon :icon="['fa-solid', 'fa-dollar']" title="Recharge Balance" />
                </span>
                <span class="top_bar_icon_cont" @click="logout_btn_click_handler()">
                    <FontAwesomeIcon :icon="['fa-solid', 'fa-arrow-right-from-bracket']" title="Logout" />
                </span>
                <Notifications />
            </div>

            <Avatar v-if="user != null" :user="user" />
            <div v-else id="login_btns_cont">
                <Button :label="get_trans('login')" style="font-family: Cairo, sans-serif;" icon="pi pi-user"
                    @click="login_btn_click_handler()" />
                <Button :label="get_trans('signup')" style="font-family: Cairo, sans-serif;" icon="pi pi-user-plus"
                    @click="signup_btn_click_handler()" />
            </div>

            <span v-if="user != null" class="top_bar_icon_cont mobile_icon" @click="home_btn_click_handler()">
                <FontAwesomeIcon :icon="['fa-solid', 'fa-house']" title="Home Page" />
            </span>
            <span v-if="user != null" class="top_bar_icon_cont mobile_icon" @click="recharge_balance_btn_click()">
                <FontAwesomeIcon :icon="['fa-solid', 'fa-dollar']" title="Recharge Balance" />
            </span>
            <span v-if="user != null" class="top_bar_icon_cont mobile_icon" @click="logout_btn_click_handler()">
                <FontAwesomeIcon :icon="['fa-solid', 'fa-arrow-right-from-bracket']" title="Logout" />
            </span>
        </div>
    </div>
</template>

<style scoped>
#top_bar_padding {
    flex-grow: 1;
}

#login_btns_cont {
    width: fit-content;
}

#login_btns_cont button {
    width: 180px;
    height: 50px;
    margin: 0px 8px;
}

#top_bar_cont {
    display: flex;
    flex-direction: row;
    background-color: white;
    align-items: center;
    padding: 8px 16px;
}

#top_bar_icons_cont {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: fit-content;
    margin-right: 8px;
}

#top_bar_icons_cont svg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 18px;
}

.top_bar_icon_cont {
    width: 40px;
    height: 40px;
    background-color: var(--primary-color);
    border-radius: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
    transition: 0.3s ease;
    margin: 0px 4px;
}

.top_bar_icon_cont:hover {
    background-color: white;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
}

.mobile_icon {
    display: none;
}

#top_bar_cont img {
    margin-left: 16px;
}

@media screen and (max-width: 600px) {
    #top_bar_icons_cont {
        display: none;
    }

    #top_bar_cont {
        display: flex;
        justify-content: space-around;
    }

    #top_bar_cont img {
        display: none;
    }

    .mobile_icon {
        display: flex;
    }

    #top_bar_padding {
        display: none;
    }

    #login_btns_cont button {
        width: 150px;
    }
}
</style>
