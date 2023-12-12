<script setup lang="ts">

// framework
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// primevue
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

// UI components
import ActiveLogo from '../Components/Common/ActiveLogo.vue';

// lib
import { get_trans, get_lang } from '../Lib/lang';
import { set_cookie } from '../Lib/cookie';

// APIs
import { login_user } from '../API/auth';

// global vars
const router = useRouter();
const lang = get_lang();

// refs
const is_loading = ref(false);
const is_error = ref(false);
const error_text = ref('');
// form refs
const username_form_ref = ref('');
const passowrd_form_ref = ref('');

// utils
function show_error_text(msg: string) {
    is_error.value = true;
    error_text.value = msg;
    setTimeout(() => { is_error.value = false; }, 3000);
}

// event handlers
function login_btn_click_handler() {
    is_loading.value = true;

    login_user(username_form_ref.value, passowrd_form_ref.value).then((resp) => {
        is_loading.value = false;

        if (!resp.success) {
            show_error_text(resp.msg);
            return;
        }

        set_cookie('access_token', resp.data['access_token']);
        router.push({ path: '/' });
    });
}

function signup_btn_click_handler() {
    router.push({ path: '/signup' });
}

</script>

<template>
    <div id="login_box" :style="`direction: ${lang == 'en' ? 'ltr' : 'rtl'};`">
        <div id="login_box_logo_cont">
            <ActiveLogo />
        </div>
        <div v-if="is_error" id="login_error_text">{{ error_text }}</div>
        <div v-if="is_loading" id="login_log_text">{{ get_trans('logging_in') }}</div>
        <br>
        <span class="p-input-icon-left login_field">
            <i class="pi pi-user" />
            <InputText type="text" style="font-family: Cairo, sans-serif;" :placeholder="get_trans('username')"
                v-model="username_form_ref" />
        </span>
        <span class="p-input-icon-left login_field">
            <i class="pi pi-lock" />
            <InputText type="password" style="font-family: Cairo, sans-serif;" :placeholder="get_trans('password')"
                v-model="passowrd_form_ref" />
        </span>
        <div id="login_btn_cont">
            <Button :label="get_trans('login')" style="font-family: Cairo, sans-serif;"
                @click="login_btn_click_handler()" />
            <Button :label="get_trans('signup')" style="font-family: Cairo, sans-serif;"
                @click="signup_btn_click_handler()" />
        </div>
    </div>
</template>

<style scoped>
#login_error_text,
#login_log_text {
    width: 100%;
    text-align: center;
    font-weight: bold;
}

#login_error_text {
    color: #DD2C00;
}

#login_box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: fit-content !important;
    padding: 40px;
    transform: translate(-50%, -50%);
    background: #fff;
    box-sizing: border-box;
    border: 1px solid #bdbdbd;
    border-radius: 10px;
}

#login_box_logo_cont {
    display: flex;
    flex-direction: row;
    justify-content: center;
}

#login_btn_cont {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

#login_btn_cont button {
    margin-top: 16px;
    width: 150px;
}

.login_field {
    width: 100%;
    margin-bottom: 16px;
}

.login_field input {
    width: 100%;
}

@media screen and (max-width: 600px) {
    #login_box {
        position: absolute;
        top: 30%;
        margin-left: auto;
        margin-right: auto;
        width: 96%;
        padding: 12px;
    }
}
</style>